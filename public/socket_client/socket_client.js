localStorage.debug = 'socket.io-client:socket'

let global_room = 'public'

 const socket = io('http://localhost:3000')



socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });




//   socket.on("reconnect", (socket) => {
//     console.log('reconnect'); // x8WIv7-mJelg7on_ALbx
//   });

//   socket.on("reconnect_attempt", (socket) => {
//     console.log("reconnect_attempt"); // x8WIv7-mJelg7on_ALbx
//   });

  socket.on('connect_error' , err => {
      console.log(err)
  })


socket.on('recieve_message' , args => {
    console.log(args)
    display_message(args.username , args.msg,'public')
})

socket.on('recieve_private' , args => {
  display_message(args.username , args.msg , args.room)
})




$('form').on('submit' , (e) => {

    e.preventDefault()


    display_message(e.target.username.value , e.target.message.value , global_room)
    // if(e.target.room.value == 'private'){
    //  // socket.join(e.target.room.value)
    //   socket.emit('message' ,{room : e.target.room.value , username :  e.target.username.value , msg :  e.target.message.value})
    //   return
    // }
  
      socket.emit('message' ,{ color : e.target.color.value , username :  e.target.username.value , msg :  e.target.message.value})

    
    // $.ajax({
    //     type: "POST",
    //     url: "/socket/message_send",
    //     data: {username : e.target.username.value , message : e.target.message.value},

        
       
    //     success: function (response) {
    //         console.log(response)
    //     }
    // });
})

$('.room_joiner').on('click' , () => {
  let room = document.querySelector('input[name=room]').value
  document.querySelector('input[name=room]').style.backgroundColor = 'green'
  global_room  = room
  socket.emit('private' , {room : room , flag : true})
  display_message('' , `Joined Room ${room}`)
})

$('.room_leaver').on('click' , () => {
  let room = document.querySelector('input[name=room]').value
  document.querySelector('input[name=room]').style.backgroundColor  = 'red'
  global_room = 'public'
  socket.emit('private' , {room : room , flag : false})
  display_message('' , `Leaved Room ${room}` )
})

let display_message = ( name , message , room = 'public' , color = '#39ff14') => {

document.querySelector('textarea').value  += '\r\n\n\n'  + name + ' > ' + message + '   //'+room
document.querySelector('textarea').style.color = color
}