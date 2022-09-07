const req = require('express/lib/request')
const res = require('express/lib/response')
const sql = require('mysql')

const connection = sql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'test',
    port : '3306'
})

connection.connect()

const get_data = (col_name , table_name) => {
   return new Promise( (resolve , reject) => {
        connection.query(`SELECT ${col_name} FROM ${table_name}` ,  (err , res , fields) => {
            if(err) reject(err)
         
            resolve(res)
        }) 
    } )
}
    

const paginated_data = (page , limit) => {
    let result = {}

    
    return Promise.all([
        new Promise((resolve , reject) => {
            connection.query('SELECT * FROM customers LIMIT ? , ?' , [page , limit] , (err , res , fields) => {
                if(err) reject(err)
                result.results = res
                resolve(true)
            }) 
        })
        ,
        new Promise((resolve , reject) => {
            connection.query('SELECT * FROM customers' , (err , res , fields) => {
                if(err) return reject(err)
                result.count = res.length
                
                resolve(result)
            }) 
        })

    ]).then(res => { return res[1]})
}


const post_user = (username,password) =>{
    return new Promise( (resolve , reject) => {
        let x = {username : username , password : password}


        connection.query('INSERT INTO users SET ?' , x , (err , results , field) => {

            
            if (err) {reject(err)}
        
            resolve(results)
            //if(next) {next()}
        })
    })
}

const delete_record = (id) => {
    return new Promise( (resolve , reject) => {
        connection.query('DELETE FROM `customers` WHERE `ID` = ?;' , id , (err , res , fields) => {
            if(err || res.affectedRows == 0) reject(err)
            resolve(res)
        }) 
    } )
}

const verify_user = (username) =>{

    

    return new Promise( (resolve , reject) => {


        connection.query('SELECT * FROM `users` WHERE `username` = ?;' , username , (err , results , field) => {


            if (err || results.length == 0) {reject("that username doesnot exist")}
       
            else{
                resolve(results)
        
            }
           
        })
    } )


        
    
}

const post_data = (name , gender) =>{

    let x = {Name : name , Gender : gender}

    return new Promise( (resolve , reject) => {


        connection.query('INSERT INTO customers SET ?' , x , (err , results , field) => {
            if (err) {reject(err) }

            resolve('Data Inserted')

            
        })
    } )


        
    
}
   
const get_record = (id) => {
   return new Promise( (resolve , reject) => {
        connection.query('SELECT * FROM `customers` WHERE `ID` = ?;' , id , (err , res , fields) => {
            if(err) reject(err)
            resolve(res)
        }) 
    } )
}
    

const update_record = (id , name) => {
    return new Promise( (resolve , reject) => {
         connection.query('UPDATE `customers` SET `Name`= ? WHERE ID = ?;' , [name , id] , (err , res , fields) => {
             if(err) reject(err)
             resolve(res)
         }) 
     } )
 }

//SELECT * FROM `customers` WHERE `Name` REGEXP 'mah'

const search_record = (name) => {
    return new Promise ((resolve , reject) => {
        connection.query('SELECT * FROM `customers` WHERE `Name` REGEXP ?' , name ,  (err , res) => {
            if(err){reject(err)}
            else if(res.length == 0){reject("No")}
            resolve(res)
        })
    })
}
     


console.log("connected to the database")



module.exports = {search_record , update_record , delete_record ,  get_data , paginated_data , post_user , verify_user , post_data , get_record}