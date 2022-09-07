
const express = require('express')
const app = express()
const sql = require('mysql')
const router = express.Router()

const sql_funcs = require("../../Scripts/sql-init")


router.post('/' , (req , res) => {
    sql_funcs.post_data(req.body.name , req.body.gender)
    .then( msg => {res.send(msg)} )

})

router.get('/' , paginated_results , (req,res) => {
    
    res.send(res.data)
})


router.get('/'  , (req,res) => {
    
    res.send(res.data)
})

router.get('/:id'  , (req,res) => {
    
    sql_funcs.get_record(req.params.id)
    .then(results => {

        if(results.length == 0){
            res.status(301).send('ID not found in Database')
        }
        else{
            res.send(results)

        }
    })
    .catch(err => {
        res.status(301).send(err)
    })
    
})



router.delete('/:id'  , (req,res) => {
    
    sql_funcs.delete_record(req.params.id)
    .then(results => {

       
        res.send(results)

        
    })
    .catch(err => {
        res.status(301).send(err)
    })
    
})

router.put('/:id'  , (req,res) => {
    
    sql_funcs.update_record(req.params.id , req.body.name)
    .then(results => {

       
        res.send('Record Updated Successfully')

        
    })
    .catch(err => {
        res.status(301).send(err)
    })
    
})

router.get('/search/:name'  , (req , res) => {

    sql_funcs.search_record(req.params.name)
    .then(results => res.send(results))
    .catch(err => res.send('No User Was Found'))

})
function paginated_results (req  , res , next){

    let limit , page
    if(!req.query.limit && !req.query.page){
        req.query.limit = 5
        req.query.page  = 1
    }
    limit = parseInt(req.query.limit)
    page  = parseInt(req.query.page)
    


    
    
    
    start_index = (page - 1) * limit
    last_index =  limit

    let limiter = page * limit
    

    sql_funcs.paginated_data(start_index ,last_index)
    .then( (result) => {
        //console.log({count : res.results.count})
        

        res.data = result
        //console.log(res.data.results.length)
        if(res.data.results.length == 0){
           return res.status(404).send("Not Found")
        }
        if(start_index > 1){
            res.data.prev = {page :  page-1 , limit : limit}
        }
        
        if(limiter  < res.data.count){
            res.data.next = {page :  page+1 , limit : limit}
        }

        
       
        next()

        
    } )
    .catch(err => {res.status(500).send("Internal Server Error \n" + err)})

    
}







module.exports =  router