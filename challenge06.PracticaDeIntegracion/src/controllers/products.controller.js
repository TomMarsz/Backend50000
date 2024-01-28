import { Router } from "express";
// import productManager from "../managers/products.manager.js";
import Product from '../models/product.model.js'
import HTTP_RESPONSES from "../constants/http-responses.constant.js";

const productsController = Router()

productsController.get('/', async (req, res) => {
  try {
    const products = await Product.find({ status: true })
    res.status(HTTP_RESPONSES.SUCCESS).json({ payload: { products } })
    // const products = await productManager.getProducts()
    // const { limit } = req.query
    // if (!limit || limit >= products.length) return res.render('products.handlebars', { products, title: 'Challenge05: WebsocketsHandlebars', style: 'products.css' })
    // if (limit <= 0 || isNaN(limit)) return res.status(404).render('404.handlebars', { error: 'Invalid limit parameter', title: '404 Not Found', style: 'index.css' })
    // const productsLimited = products.slice(0, limit)
    // res.render('products.handlebars', { productsLimited, title: 'Challenge05: WebsocketsHandlebars', style: 'products.css' })
  } catch (error) {
    res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
});

productsController.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params
    const products = await Product.findOne({ _id: pid, status: true })
    res.status(HTTP_RESPONSES.SUCCESS).json({ payload: { products } })

    // const products = await productManager.getProducts()
    // if (isNaN(pid)) return res.status(404).render('404.handlebars', { error: 'The entered parameter is not a number', title: '404 Not Found', style: 'index.css' })
    // if (pid < 1 || pid > products.length) return res.status(404).render('404.handlebars', { error: 'The entered parameter is not valid', title: '404 Not Found', style: 'index.css' })
    // const productById = await productManager.getProductById(Number(pid))
    // res.render('products.handlebars', { productById, title: 'Challenge05: WebsocketsHandlebars', style: 'products.css' })
  } catch (error) {
    res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
})

productsController.post('/', async (req, res) => {
  try {
    const { title, description, price, stock, category, thumbnail } = req.body
    const newProductInfo = { title, description, price, stock, category, thumbnail }

    const newProduct = await Product.create(newProductInfo)
    res.status(HTTP_RESPONSES.CREATED).json({ payload: { newProduct } })

    // const productAdded = await productManager.addProduct(body)
    // const products = await productManager.getProducts()
    // res.json({ payload: { productAdded, products } })
  } catch (error) {
    res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
})

productsController.put('/:pid', async (req, res) => {
  try {
    const { pid } = req.params
    const { title, description, price, stock, category, thumbnail } = req.body

    if (!title || !description || !price || !stock || !category || !thumbnail) res.status(HTTP_RESPONSES.BAD_REQUEST).json({ error: error.message })

    await Product.updateOne({ _id: pid, status: true }, body)
    const updatedProduct = await Product.findOne({ _id: pid })
    res.status(HTTP_RESPONSES).json({ payload: { updatedProduct } })

    // const updatedProduct = await productManager.updateProductById(Number(pid), body)
    // const products = await productManager.getProducts()
    // res.json({ payload: { updatedProduct, products } })
  } catch (error) {
    res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
})

productsController.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params

    await Product.updateOne({ _id: pid }, { status: false })
    const deletedProduct = await Product.findOne({ _id: pid })
    res.json({ payload: { deletedProduct } })

    // const deletedProduct = await productManager.deleteProductById(Number(pid))
    // const products = await productManager.getProducts()
    // res.json({ payload: { deletedProduct, products } })
  } catch (error) {
    res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
})

export default productsController