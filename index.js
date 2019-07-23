const path = require('path')
const express = require('express');
const socketIO =  require('socket.io');
const app = express();

//Settings
app.set('port',process.env.PORT || 3000);
//Static files
app.use(express.static(path.join(__dirname,'public')));

//start server
const server = app.listen(app.get('port'), () => {
    console.log('Server on port',app.get('port'));
});

//Web Sockets
const io = socketIO(server);


io.on('connection', (socket) => {

    /*
    * Recibir evento "message" del cliente
    * Se crea un nuevo evento llamado "messageToClient" enviandolo a todos los usuarios
    */
    socket.on('message',(data) => {
        io.sockets.emit('messageToClient',data);
        console.log('message',data);
    });
    /**
     * Recibir evento "typing" del cliente
     * Se emite un nuevo evento para todos los usuarios excepto el que lo esta enviado 
     */
    socket.on('typing',(data) => {
        socket.broadcast.emit('typingToClient',data);
        console.log(data +" is typing ...");
    });

    console.log('New Connection',socket.id);

});


