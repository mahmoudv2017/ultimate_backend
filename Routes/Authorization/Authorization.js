const express = require('express')
const jwt = require('jsonwebtoken')
const mysql = require('mysql')
const bcrypt = require("bcrypt")
var cookieParser = require('cookie-parser')


const {post_data , verify_user , post_user} = require('../../Scripts/sql-init')

require('dotenv').config()

const router = express.Router()
router.use(cookieParser());

//router.use(express.static('public'))
router.use(express.static('./public/auth'))


router.get('/' , (req,res) => {
    res.render('index.html')
})

router.post('/login'  , (req,res) => {


    
    verify_user(req.body.username)

    .then( results => {

       
        let hashed = results[0].password
     
        bcrypt.compare(req.body.password , hashed, function(err, result) {
 
            if(result){
      

               let token = token_gen({name : req.body.username})
               res.cookie('token' , token)
               res.send('logged in')
            
            }
            else{res.status(301).send('wrong pass')}
    
            
        });

    } )



    .catch(err => {res.status(401).send(err)})

   

})

router.post('/verify' , (req,res) => {
    
    if(!req.headers.cookie || req.headers.cookie.search('token') == -1){
        res.status(401).send('no cookeis here')
        return    
    }
    

    payload = jwt.verify(req.cookies.token , process.env.secret , (err , payload) => {
        if(err){
            
            res.clearCookie('token')
            res.status(401).send(err.name)
         
        }
        res.send(payload)
    })
    
})


router.post('/register'  , (req , res) => {

    bcrypt.hash(req.body.password , parseInt( process.env.gensalts) , (err , hashed) => {
        if(err) {res.status(500).send(err)}
   

        post_user(req.body.username , hashed)
        .then(  (results) => {
       
            let token = token_gen({name : req.body.username})
            
            res.cookie('token' , token)
            res.send(results)
        })
        .catch(err => {res.status(400).send(err.sqlMessage)})
    })

})






    
let token_gen = ( payload = {}) => {
  
    let token = jwt.sign(payload , process.env.secret,{
        expiresIn : 10
    })
  
    return token
    
}


module.exports = router