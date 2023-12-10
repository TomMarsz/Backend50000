import { Router } from "express";
import productManager from "../../manager/products.manager.js";

const productsRouter = Router()

productsRouter.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts()
    const limit = parseInt(req.query.limit)
    if (!limit || limit >= products.length) return res.json({ payload: products })
    if (limit <= 0) return res.json({ error: 'Invalid limit parameter' })
    const productsLimited = products.slice(0, limit)
    res.json({ payload: productsLimited })
  } catch (error) {
    console.log(error);
  }
});

productsRouter.get('/:pid', async (req, res) => {
  try {
    const pid = parseInt(req.params.pid)
    const products = await productManager.getProducts()
    if (isNaN(pid)) return res.json({ error: 'The entered parameter is not a number' })
    if (pid < 1 || pid > products.length) return res.json({ error: 'The entered parameter is not valid' })
    const productById = await productManager.getProductById(pid)
    res.json({ payload: productById })
  } catch (error) {
    console.log(error);
  }
})

productsRouter.post('/', async (req, res) => {
  const { body } = req
  const products = await productManager.addProduct(body)
  res.json({ payload: products })
})

productsRouter.put('/:pid', async (req, res) => {
  const pid = parseInt(req.params.pid)
  const { body } = req
  const products = await productManager.updateProductById(pid, body)
  res.json({ payload: products })
})

productsRouter.delete('/:pid', async (req, res) => {
  const pid = parseInt(req.params.pid)
  const products = await productManager.deleteProductById(pid)
  res.json({ payload: products })
})

export default productsRouter