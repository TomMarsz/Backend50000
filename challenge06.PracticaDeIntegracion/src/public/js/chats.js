const socket = io()

const chatBox = document.getElementById('chatBox')
const messageLogs = document.getElementById('messageLogs')

const sendMessage = async () => {
  try {
    const userEmail = await Swal.fire({
      title: "Ups 😢",
      text: "Please, add your email to log the chat",
      input: "text",
      icon: "question"
    })

    socket.emit('newUser', { useremail: userEmail.value })

    socket.on('userConnected', user => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: `${user.useremail} is connected`
      });
    })

    chatBox.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        if(chatBox.value === '') {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please, enter a message to send",
          });
          return
        }
        const data = {
          useremail: userEmail.value,
          message: chatBox.value
        }
        chatBox.value = ''
        socket.emit('message', data)
      }
    })
  } catch (error) {
    console.log(error);
  }
}
sendMessage()


socket.on('messageLogs', chats => {
  let messages = ''
  chats.forEach(chat => (messages += `<strong style="color: yellow">${chat.useremail}:</strong> ${chat.message} <br>`));
  messageLogs.innerHTML = messages
})