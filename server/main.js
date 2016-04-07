var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static('web'));
server.listen(80);

var sessions = [];

var clients = [];

var messages = [{
  userId:1,
  messageId:10,
  userName:"Asha Greyjoy",
  content:{
    text:"The stone tree of the Stonetrees.",
    link:"http://awoiaf.westeros.org/index.php/House_Stonetree"
  },
  likedBy:[1],
  ts:Date.now() - 10000
},{
  userId:2,
  messageId:11,
  userName:"Arya Stark",
  content:{
    text:"We'll come see this inn.",
    link:"http://gameofthrones.wikia.com/wiki/Inn_at_the_Crossroads"
  },
  likedBy:[2,3],
  ts:Date.now() - 100000
}];

io.on('connection', function(socket) {

  console.info('New client connected (id=' + socket.id + ').');
  clients.push(socket);

  socket.on('disconnect', function() {
    var index = clients.indexOf(socket);
    if (index != -1) {
      clients.splice(index, 1);
      console.info('Client gone (id=' + socket.id + ').');
    }
  });

	socket.emit('messages', messages);
	socket.on('new-message', function(data) {
		console.log('test');
		messages.push(data);
		io.sockets.emit('messages', messages);
	});

  socket.on('join-sinc', function(data) {
    console.log('init join-sinc');
    if (data.origin == "desk") {
      sessions.push(data.code);
      socket.join(data.code);
      io.sockets.in(data.code).emit('session-created', 'Sesion Creada: ' + data.code);
      console.log('sesion creada');
      //en un pinto destruir las sesiones
    } else if (data.origin == "mb") {
      console.log('viene de mobile');
      //var users = socket.rooms.indexOf(data.code);
      console.log(sessions);
      var a = sessions.indexOf(data.code);
      console.log(a);
      if (a != -1) {
        console.log('entra al sitio');
        socket.join(data.code);
        io.sockets.in(data.code).emit('sinc-success', true);
      } else {
        console.log('fuera');
        io.sockets.in(data.code).emit('sinc-failed', true);
      }
    }
  });
  socket.on('acceso-total', function(data) {
    console.log(data);
    console.log('listo, entra al sitio');
    io.sockets.in(data).emit('accede-sitio', true);
  });
  socket.on('rotate-mobil-emit', function(data) {
    io.sockets.in(data).emit('rotate-mobil-listen', true);
  })

  
})


