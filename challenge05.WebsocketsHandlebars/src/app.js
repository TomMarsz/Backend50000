import express from "express"
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import router from "./router/index.js"
import port from "./configs/server.config.js"

const app = express()

app.use(express.json())
app.use(express.static(process.cwd() + '/src/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', process.cwd() + '/src/views')
app.set('view engine', 'handlebars')

router(app)

app.get("/", (req, res) => {
  res.render('index', { title: 'Challenge05: WebsocketsHandlebars', style: 'index.css' })
});

app.get('*', (req, res) => {
  res.status(404).render('404', { error: 'Not a valid page', title: '404 Not Found', style: 'index.css' })
})

const httpServer = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
httpServer.on('error', (err) => console.log(`Server Error: ${err}`))

const io = new Server(httpServer)

io.on('connection', socket => {
  console.log(socket.id);

  socket.on('message', data => {
    console.log(data);
  })

  socket.emit('messageServer', 'Hola desde el server')
  socket.broadcast.emit('messageOthers', 'Hola a todos menos al principal')

  io.emit('messageAll', 'La lista de productos fue actualizada')
})