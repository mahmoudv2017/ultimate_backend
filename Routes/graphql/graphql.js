const { buildSchema , graphql } = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const { get_data } = require('../../Scripts/sql-init')
const express = require('express')
const router = express.Router()



var new_schema = buildSchema(`

    type record{
        ID : Int,
        Animal : String,
        Car : String,
        Bitcoin_Address : String,
        Ethirium_Address : String,
        Music_Genre : String
    },
  type Query {
    more_info : [record]
  }
  
`);

const cars_resolver = {
    more_info :  async () => {
      try {
            const res = await get_data('*', 'more_info')
            return res
        } catch (err) {
            return err
        }
       // return 'hello_worlds'
    }
}




router.get('/' , (req,res) => {

    graphql(
        {
            schema : new_schema,
            source : req.body.body,
            rootValue: cars_resolver,
        
        }
    
    ).then(response => {
        res.json(response)
    })

})

router.use('/api' , graphqlHTTP({
    schema : new_schema,
    rootValue : cars_resolver,
    graphiql : true
}))

module.exports = router



