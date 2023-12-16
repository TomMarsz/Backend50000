import express from "express"
import router from "./router/index.js"
import port from "./configs/server.config.js"

const app = express()

app.use(express.json())

router(app)

app.get("/", (req, res) => {
  res.status(404).json({ error: "Use the routes '/api/products' or '/api/carts'" });
});

app.get('*', (req, res) => {
  res.status(404).json({ error: 'Not Found 404' })
})

const server = app.listen(port, () => {
  console.log(`Server runing at http://localhost:${port}`)
})
server.on('error', (err) => console.log(`Server Error: ${err}`))