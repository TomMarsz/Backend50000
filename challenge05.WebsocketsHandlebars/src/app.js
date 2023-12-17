import express from "express"
import handlebars from "express-handlebars"
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
  res.status(404).json({ error: 'Not Found 404' })
})

const server = app.listen(port, () => {
  console.log(`Server runing at http://localhost:${port}`)
})
server.on('error', (err) => console.log(`Server Error: ${err}`))