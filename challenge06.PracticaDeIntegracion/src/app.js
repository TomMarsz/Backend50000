import express from "express"
import handlebars from "express-handlebars"
import mongoConnect from "./db/index.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(process.cwd() + '/src/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', process.cwd() + '/src/views')

mongoConnect()

export default app