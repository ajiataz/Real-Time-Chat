const socket = io();

let today = new Date();
let date = today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date +" "+ time;

let message = document.getElementById('message');
let username = document.getElementById('username');
let btnSend = document.getElementById('send');
let receivedMsg = document.getElementById('chat_ib'); 
let incomingMsg = document.getElementById('incoming_msg'); 
let typing = document.getElementById('typing_container');

//Enviar evento llamado message al server
btnSend.addEventListener('click', function(){
    socket.emit('message', {
        message: message.value,
        username: username.value,
        dateTime: dateTime 
    });
    message.value = '';   
})

//Recibir del server data con un evento llamado "messageToClient"
socket.on('messageToClient', function (data) {
    receivedMsg.innerHTML += `
    <h5>${data.username} <span class="chat_date">${data.dateTime}</span></h5>
    <p>${data.message}</p>
    `;

    incomingMsg.innerHTML += `
    <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
    <div class="received_msg">
        <div class="received_withd_msg">
            <span class="time_date"><strong>${data.username}</strong></span>
        </div>
        <p id="received_message">${data.message}</p>
        <span class="time_date" id="time_date">${data.dateTime}</span>
    </div>
    `;
    typing.innerHTML = '';           
    console.log(data);
});

//Emitir evento al servidor, cuando se este escribiendo
message.addEventListener('keypress', function(){
    socket.emit('typing',username.value);
});

//Recibiendo evento llamado "typingToClient" desde el servidor
socket.on('typingToClient', function(data) {
    typing.innerHTML = `<span>${data} is typing ...</span>`;
    console.log(data+' is typing ...')
});