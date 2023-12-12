import { Router } from "express";
import productManager from "../managers/products.manager.js";

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
    const { pid } = req.params
    const products = await productManager.getProducts()
    if (isNaN(pid)) return res.json({ error: 'The entered parameter is not a number' })
    if (pid < 1 || pid > products.length) return res.json({ error: 'The entered parameter is not valid' })
    const productById = await productManager.getProductById(Number(pid))
    res.json({ payload: productById })
  } catch (error) {
    console.log(error);
  }
})

productsRouter.post('/', async (req, res) => {
  const { body } = req
  const productAdded = await productManager.addProduct(body)
  const products = await productManager.getProducts()
  res.json({ payload: { productAdded, products } })
})

productsRouter.put('/:pid', async (req, res) => {
  const { pid } = req.params
  const { body } = req
  const updatedProduct = await productManager.updateProductById(Number(pid), body)
  const products = await productManager.getProducts()
  res.json({ payload: { updatedProduct, products } })
})

productsRouter.delete('/:pid', async (req, res) => {
  const { pid } = req.params
  const deletedProduct = await productManager.deleteProductById(Number(pid))
  const products = await productManager.getProducts()
  res.json({ payload: { deletedProduct, products } })
})

export default productsRouter