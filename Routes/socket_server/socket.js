const express = require('express')

const router = express()
const { Server } = require('socket.io')
const { instrument } = require('@socket.io/admin-ui')

router.use(express.static('./public/socket_client'))
router.use(express.static('static'))



const io = new Server(3000 , {
    cors : {
        origin : ['http://localhost:8000' , 'https://admin.socket.io'],
        credentials : true
    }
    
} );




instrument(io , {
    auth : false
})
 

io.on('connection' , io => {
   console.log(`client connected at ${io.id}`)
    io.on('message' , (args) => {

   
        if(io.rooms.size == 2){
            let iterator = io.rooms[Symbol.iterator]()
            iterator.next()
            args.room = iterator.next().value
            io.to(args.room).emit('recieve_private' , args)
            return
        }
        args.room = 'public'
        io.broadcast.emit('recieve_message' , args)
        
    })


    io.on('private' , args => {
        if(args.flag){
            io.join(args.room)
            console.log(`sockets joined at ${args.room}`)
           // io.to(args.room).emit('recieve_message' , args)
        }
        else{
            io.leave(args.room)
        }
        
    })
})




router.get('/' , (req , res) => {
    res.render('index.html')
})

router.post('/message_send' , (req,res) => {

    res.json(req.body)
})

module.exports = router