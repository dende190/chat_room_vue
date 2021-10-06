const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const {config} = require('../config/config');

app.use('/assets', express.static(path.join(__dirname, '../public/assets')));
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin.html'));
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

io.on('connection', socket => {
  console.log('usuario conectado');
  socket.on('rooms', room => {
    socket.join('admin_' + room.name);
    console.log(io.sockets.adapter.rooms);
  });
  socket.on('message', (room, message) => {
    socket.join('admin_' + room);
    io.to('admin_' + room).emit('message', message);
  })

  socket.on('disconnect', () => console.log('usuario desconectado'))
});

http.listen(config.port, () => {
  console.log('Servidor escuchando en el puerto', config.port);
});
