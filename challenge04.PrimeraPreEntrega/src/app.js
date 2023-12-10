import express from "express"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"

const app = express()
const port = 8080

app.use(express.json())

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

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