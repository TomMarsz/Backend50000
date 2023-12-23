import { Router } from "express";
import productManager from "../managers/products.manager.js";

const productsRouter = Router()

productsRouter.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts()
    const limit = parseInt(req.query.limit)
    if (!limit || limit >= products.length) return res.render('products', { products, title: 'Challenge05: WebsocketsHandlebars', style: 'products.css' })
    if (limit <= 0) return res.json({ error: 'Invalid limit parameter' })
    const productsLimited = products.slice(0, limit)
    res.render('products', { productsLimited, title: 'Challenge05: WebsocketsHandlebars', style: 'products.css' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});

productsRouter.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params
    const products = await productManager.getProducts()
    if (isNaN(pid)) return res.json({ error: 'The entered parameter is not a number' })
    if (pid < 1 || pid > products.length) return res.json({ error: 'The entered parameter is not valid' })
    const productById = await productManager.getProductById(Number(pid))
    res.render('products', { productById, title: 'Challenge05: WebsocketsHandlebars', style: 'products.css' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

productsRouter.post('/', async (req, res) => {
  try {
    const { body } = req
    const productAdded = await productManager.addProduct(body)
    const products = await productManager.getProducts()
    res.json({ payload: { productAdded, products } })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

productsRouter.put('/:pid', async (req, res) => {
  try {
    const { pid } = req.params
    const { body } = req
    const updatedProduct = await productManager.updateProductById(Number(pid), body)
    const products = await productManager.getProducts()
    res.json({ payload: { updatedProduct, products } })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

productsRouter.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params
    const deletedProduct = await productManager.deleteProductById(Number(pid))
    const products = await productManager.getProducts()
    res.json({ payload: { deletedProduct, products } })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default productsRouter