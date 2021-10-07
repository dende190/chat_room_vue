const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const { config } = require('../config/config');
const roomsServices = require('../services/rooms');
const messageServices = require('../services/message');

app.use('/assets', express.static(path.join(__dirname, '../public/assets')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

io.on('connection', async socket => {
  console.log('usuario conectado');
  socket.emit('rooms_names', await roomsServices.getNames())
  socket.on('rooms', room => {
    socket.join('room_' + room.name);
    roomsServices.create(io.sockets.adapter.rooms);
  });

  socket.on('sign_in', async room => {
    socket.join(room);
    io.to(room).emit(
      'message_all',
      await messageServices.getAll(room)
    );
  })

  socket.on('message', (room, data) => {
    messageServices.save(room, data);
    io.to(room).emit('message', data);
  })

  socket.on('disconnect', () => console.log('usuario desconectado'))
});

http.listen(config.port, () => {
  console.log('Servidor escuchando en el puerto', config.port);
});
