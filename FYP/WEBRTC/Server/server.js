
const express = require('express')

var io = require('socket.io')
({
  path: '/haziq'
})

const {checkRoom,addUser, removeUser, getUser, getUsersInRoom,addRoomTime,getRoomTime,addUserTimes,getUserTime,removeUserTime } = require('./users');


const app = express()
const port = 8080


app.use(express.static('../build'))
app.get('/', (req, res, next) => {
  res.render('../build/index.html')
})
const server = app.listen(port, () => console.log(`listening on port ${port}!`))

io.listen(server)



const peers = io.of('/webrtcPeer')

let connectedPeers = new Map()

peers.on('connection', socket => {

  connectedPeers.set(socket.id, socket)
  
  socket.emit('connection-success', socket.id)

 

  const disconnectedPeer = (socketID) => socket.broadcast.emit('peer-disconnected', {
    socketID: socketID
  })

  socket.on('disconnect', () => {
    console.log('disconnected',socket.id)
    connectedPeers.delete(socket.id)
    removeUser(socket.id);
    disconnectedPeer(socket.id)
  })

  socket.on('endCall', (id) => {
    console.log('disconnected',id)
    connectedPeers.delete(id)
    removeUser(id);
    disconnectedPeer(id)
  })


  

  socket.on('recieveMyTime', data => {
    const remove = removeUserTime(data.name)
   
    const add = addUserTimes({name: data.name,miniute:data.miniute})
   
  })


  socket.on('checkMyTime', data => {
    console.log("checkMyTime")
    const myTime = getUserTime(data.name)
   
    if (myTime){
      
      socket.emit("addMyTime",{miniute:myTime.miniute})
    }
  })

  socket.on('checkAdmin', data => {
    const users = getUsersInRoom(data.room)
    if(users.length===0){
      let type="admin"
      socket.emit("admin",type)
    }
    else{
      let type="NotAdmin"
      socket.emit("admin",type)
    }
    
    
  })



  socket.on('getAttention', (data) => {
    console.log(data);
    const users = getUsersInRoom(data.room)
    for (var temp of users){
      if(temp.id !== data.id){
       
      temp.socket.emit('attention', {id:temp.id,name:temp.name,type:temp.type,adminId:data.id,room:data.room})
      }
    }
    
  })


  socket.on('attentiveParticipant', (data) => {
    console.log(data)
    const user = getUser(data.adminId);  // sirf admin ko send krnay ke kon se partcipant active hain
    user.socket.emit('recieveAttentiveParticipant',{participantId:data.id,participantName:data.name})                                    // return to admin now
    
  })

  //set time for attendance

  socket.on('setTime', (data) => {
    const  room =  addRoomTime({ miniute:data.miniute, room:data.room });
    // console.log(room.miniute);  
    // const time = getRoomTime(data.room)
    // console.log(time.miniute)
  })
  socket.on('getTime', (data) => {

    const  time =  getRoomTime(data.room);
    console.log("TIME:", time)
    if (time)
      socket.emit('recieveTime', {miniute:time.miniute})
  })


//gonna send completed time participant to server to create attendance file
  socket.on('sendAttendanceToServer', (data) => {
    
    const user = getUser(data.id); // mera rooom kon sa tha 
    const admin = checkRoom(user.room); // uper jo room dhondha us ka admin kon ha
    admin.socket.emit('markMyAttendance', data) //now go to room.js and mark my attendance
   

  })




  socket.on('onlinePeers', (data) => {

    console.log("ROOM:" ,data.room)
    socket.join(data.room);
    const users = getUsersInRoom(data.room)

    if(users.length === 0){
      const type = "admin"
      const { error, user }=  addUser({ type , socket, id: socket.id, name:data.name, room:data.room , time:null });
      console.log(user.type);
    }
    else{
      const type = "participant"
      const time = getRoomTime(data.room)
      if (time){
        const { error, user }=  addUser({ type , socket, id: socket.id, name:data.name, room:data.room , time:time.miniute});
       console.log(user.time)
      }
      else{
        const { error, user }=  addUser({ type , socket, id: socket.id, name:data.name, room:data.room , time:null});
        console.log(user)
      }
        
    }
    
    for (var temp of users){
      if(temp.id !== data.id){
       
      socket.emit('online-peer', {id:temp.id,name:temp.name,type:temp.type})
      
    }
    }

  

  })

  

  socket.on('offer', data => {


    // for (const [socketID, socket] of connectedPeers.entries()) {
    //   if (socketID === data.remote) {
    //     socket.emit('offer', {
    //         sdp: data.sdp,
    //         socketID: data.local
    //       }
    //     )
    //   }
    // }


    const user = getUser(data.remote);

    const users = getUsersInRoom(user.room)

   

    for (var temp of users){
      if(temp.id === data.remote){
        const me = getUser(data.local)
         temp.socket.emit('offer', {sdp:data.sdp,socketID: data.local,name:data.name,type:me.type})
      }
    }
   
  })




  socket.on('answer', (data) => {


    // for (const [socketID, socket] of connectedPeers.entries()) {
    //   if (socketID === data.remote) {
        
    //     socket.emit('answer', {
    //         sdp: data.sdp,
    //         socketID: data.local
    //       }
    //     )
    //   }
    // }


    const user = getUser(data.remote);
    const users = getUsersInRoom(user.room)
    for (var temp of users){
      if(temp.id === data.remote){
      temp.socket.emit('answer', {sdp: data.sdp,socketID: data.local})
      }
    }

 
  })

 

  
  socket.on('candidate', (data) => {


    // for (const [socketID, socket] of connectedPeers.entries()) {
    //   if (socketID === data.remote) {
    //     console.log("CNADIDATE:", data.candidate)
    //     socket.emit('candidate', {
    //       candidate: data.candidate,
    //       local: data.local
    //     })
    //   }
    // }


    const user = getUser(data.remote);

    const users = getUsersInRoom(user.room)

   

    for (var temp of users){
      if(temp.id === data.remote){
      temp.socket.emit('candidate', {candidate:data.candidate,local:data.local})
      }
    }

 
  })

})