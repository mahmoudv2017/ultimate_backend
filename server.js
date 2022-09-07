const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))

const chalk = require('colors')

console.log(chalk.blue('Hello Server'))

const paginated_Routes = require('./Routes/main-routes/main_routes')
const auth_routes = require('./Routes/Authorization/Authorization')
const socket_routes = require('./Routes/socket_server/socket')
const graphql_routes = require('./Routes/graphql/graphql')
const prisma_routes = require('./Routes/prisma/prisma')


app.use('/customers' , paginated_Routes)

app.use('/auth' , auth_routes)

app.use('/socket' , socket_routes)

app.use('/graphql' , graphql_routes)

app.use('/prisma' , prisma_routes)





app.use((req,res,next) => {
    res.status(404).send("<h1>Routes Available</h1> \n <ul> <li> /prisma </li> <li> /graphql/api </li><li> /socket <ul> <li>https://admin.socket.io</li> </ul> </li> <li> /auth </li> </ul>")
})


app.listen('8000' , () => console.log('server started at port 8000'))



