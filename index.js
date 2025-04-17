const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

app.get('/', (req, res) => {
  res.send('Hello from Express + Socket.IO!');
});

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  socket.on('hello', (msg) => {
    console.log(msg);
    socket.emit('reply', 'Hi from the server!');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

