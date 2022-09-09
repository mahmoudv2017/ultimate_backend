require('dotenv').config()
const fetch = require('node-fetch')
const faker = require('@faker-js/faker')
const mysql = require('mysql')








const connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    database : 'test',
    user : 'root'

})



const data_feller_customers =  (loops) => {
    connection.connect()
    
    for(let i = 0 ; i < loops ; i++){

        let x = {Name : faker.faker.name.findName() , gender :  faker.faker.vehicle.manufacturer()}

        
        connection.query('INSERT INTO customers SET ?' , x , (err , results , field) => {
            if (err) {throw err}

            
        })

    }
    console.log("Records Saved To The Database")
    connection.end()
   // return data
}

const data_feller_more_info =  (loops) => {
    connection.connect()
    
    for(let i = 0 ; i < loops ; i++){

        let x = {
            Animal : faker.faker.animal.dog() ,
            Car : faker.faker.vehicle.manufacturer(),
            Bitcoin_Address : faker.faker.finance.bitcoinAddress(),
            Ethirium_Address : faker.faker.finance.ethereumAddress(),
            Music_Genre : faker.faker.music.genre(),
        }

        
        connection.query('INSERT INTO more_info SET ?' , x , (err , results , field) => {
            if (err) {throw err}

            
        })

    }
    console.log("Records Saved To The Database")
    connection.end()
   // return data
}

const delete_data = () => {
    connection.query('DELETE from customers' , (err , results , field) => {
        if(err){throw err}

        console.log({result : results , fields : field})
    })
}

data_feller_customers(20)

//data_feller_more_info(20)
//delete_data()
// let int = document.querySelector('input[name : `username`]')

// console.log(int)



