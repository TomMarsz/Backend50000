const socket = io()

const form = document.querySelector('form')
form.addEventListener('submit', e => {
  const data = JSON.stringify(Object.fromEntries(new FormData(e.target)))
  console.log(data);
})

