import { Router } from "express";
import productManager from "../managers/products.manager.js";
import Product from '../models/product.model.js'

const productsRouter = Router()

productsRouter.get('/', async (req, res) => {
  try {
    const productDB = await Product.find()
    res.json({ payload: productDB })
    const products = await productManager.getProducts()
    const { limit } = req.query
    if (!limit || limit >= products.length) return res.render('products.handlebars', { products, title: 'Challenge05: WebsocketsHandlebars', style: 'products.css' })
    if (limit <= 0 || isNaN(limit)) return res.status(404).render('404.handlebars', { error: 'Invalid limit parameter', title: '404 Not Found', style: 'index.css' })
    const productsLimited = products.slice(0, limit)
    res.render('products.handlebars', { productsLimited, title: 'Challenge05: WebsocketsHandlebars', style: 'products.css' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});

productsRouter.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params
    const productDB = await Product.findOne({ _id: id })
    const products = await productManager.getProducts()
    if (isNaN(pid)) return res.status(404).render('404.handlebars', { error: 'The entered parameter is not a number', title: '404 Not Found', style: 'index.css' })
    if (pid < 1 || pid > products.length) return res.status(404).render('404.handlebars', { error: 'The entered parameter is not valid', title: '404 Not Found', style: 'index.css' })
    const productById = await productManager.getProductById(Number(pid))
    res.render('products.handlebars', { productById, title: 'Challenge05: WebsocketsHandlebars', style: 'products.css' })
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