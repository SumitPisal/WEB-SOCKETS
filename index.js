const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const {Server} = require('socket.io');
// we acquire the server
app.use(express.static(path.resolve('./public')));
const server = http.createServer(app);
const io = new Server(server);
// we pass our server and instance io i.e input/output is created
app.get('/',(req,res) => {
    return res.sendFile('/public/index.html');
});

io.on("connection",(socket) => {
    socket.on('user-message',(message) => {
        io.emit('message',message);
        // emit means to send message 
    });
})
// here when the user or client makes the connection the callback function is begin executed

server.listen(9000,() => console.log('ok bhai'));