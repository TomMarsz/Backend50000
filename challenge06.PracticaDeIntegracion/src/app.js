import express from "express"
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import router from "./router/index.js"
import mongoConnect from "./db/index.js";
import port from "./configs/server.config.js"
import messagesService from "./services/messages.service.js";
import HTTP_RESPONSES from "./constants/http-responses.constant.js";


const chats = []

const app = express()

const hbs = handlebars.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
})

app.use(express.json())
app.use(express.static(process.cwd() + '/src/public'))
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', hbs.engine)
app.set('views', process.cwd() + '/src/views')


mongoConnect()

router(app)

app.get("/", (req, res) => {
  res.status(HTTP_RESPONSES.SUCCESS).render('index.handlebars', { title: 'Challenge05: WebsocketsHandlebars', style: 'index.css' })
});

app.get('*', (req, res) => {
  res.status(HTTP_RESPONSES.NOT_FOUND_ERROR).render('404.handlebars', { error: 'Not a valid page', title: '404 Not Found', style: 'index.css' })
})

const httpServer = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
httpServer.on('error', (err) => console.log(`Server Error: ${err}`))

const io = new Server(httpServer)

io.on('connection', socket => {
  console.log(socket.id);
  
  socket.on('newUser', data => {
    socket.broadcast.emit('userConnected', data)
    socket.emit('messageLogs',chats)
  })
  
  socket.on('message', async data => {
    chats.push(data)
    io.emit('messageLogs', chats)
    try {
      const newMeesage = {
        user: data.useremail,
        message: data.message,
      }
      await messagesService.insertOne(newMeesage)
    } catch (error) {
      console.log(error);
    }
  })
})

export { io }