const socket = io()

async function getFormData() {
  try {
    const form = document.getElementById('form')
    form.addEventListener('submit', async e => {
      e.preventDefault()
      const formData = JSON.stringify(Object.fromEntries(new FormData(e.target)))
      try {
        const response = await fetch('/realtimeproducts', {
          method: 'POST',
          body: formData
        });
      } catch (error) {
        console.error(error);
      }
    })
  } catch (error) {
    console.error(error);
  }
};

const data = getFormData()
socket.emit('productAddByForm', data)