const { PrismaClient } = require('@prisma/client')
const { Router } = require('express')
const router = new Router()

const prisma = new PrismaClient()


async function main(){
    //querying code goes gere
    const allusers = await prisma.users.findMany()

    return allusers
}





router.get('/' , (req,res) => {
    main( )
    .then( response => res.send(response) )
    .catch(err => console.error(err))
    .finally( async () => { await prisma.$disconnect() })
})

router.get('/customers' , async (req,res) => {
    const customer = await prisma.customers.count()


    res.json({ count : customer })

   await prisma.$disconnect()
})

router.get('/customers/:id' , async (req,res) => {
    
    const customer = await prisma.customers.findUnique({ where : { ID : parseInt(req.params.id)  } })

    res.send(customer)

   await prisma.$disconnect()
})



module.exports = router