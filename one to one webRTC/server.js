const express = require('express');
const { Socket } = require('socket.io-client');
var io = require('socket.io')({
    path: '/haziq'
})

const app = express()
const port = 8080;

app.use(express.static(__dirname + '/build'))

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 


io.listen(server) // must recieve which app.listen returning

const peer = io.of('/rtcHaziq')

let connectedPeers = new Map();

peer.on('connect', socket=> {
    console.log("Connect");
    connectedPeers.set(socket.id,socket);

    socket.emit('success')

    socket.on('offer', (offerData)=>{
        console.log(offerData.id);
        
        for (const temp of connectedPeers.entries()){
            //console.log(temp[0]);
            if (offerData.id != temp[0]){
                temp[1].emit('reciever', offerData.sdp);

            }
        }
    })

    socket.on('icecadidate', (candidateData)=>{

        for (const temp of connectedPeers.entries()){
            //console.log(temp[0]);
            if (candidateData.id != temp[0]){
                temp[1].emit('recieverCandi', candidateData.candid);

            }
        }
    })

})