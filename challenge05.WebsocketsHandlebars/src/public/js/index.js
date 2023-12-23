const socket = io()

socket.emit('message', 'Hi coders desde el front')

socket.on('messageServer', data => {
  console.log(data);
})
socket.on('messageOthers', data => {
  console.log(data);
})
socket.on('messageAll', data => {
  console.log(data);
})

