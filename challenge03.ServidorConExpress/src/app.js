import express from "express"
import productManager from "./productManager"

const app = express()
const port = 8080

const products = await productManager.getProducts()

app.get('/products', (req, res) => {
  const limit = parseInt(req.query.limit)
  if (!limit || limit >= products.length) return res.send(products)
  if (limit <= 0) return res.send({ error: 'Invalid limit parameter' })
  const productsLimited = products.slice(0, limit)
  res.send(productsLimited)
})

app.get('/products/:pid', (req, res) => {
  const pid = parseInt(req.params.pid)
  if (isNaN(pid)) return res.send({ error: 'The entered parameter is not a number' })
  if (pid < 1 || pid > products.length) return res.send({ error: 'The entered parameter is not valid' })
  res.send(products[pid - 1])
})

const server = app.listen(port, () => {
  console.log(`Server runing at http://localhost:${port}`)
})
server.on('error', (err) => console.log(`Server Error: ${err}`))