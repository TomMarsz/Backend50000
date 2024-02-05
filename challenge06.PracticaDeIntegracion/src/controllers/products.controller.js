import { Router } from "express";
import productsService from "../services/products.service.js";
import HTTP_RESPONSES from "../constants/http-responses.constant.js";

const productsController = Router()

productsController.get('/', async (req, res) => {
  try {
    const { limit } = req.query
    const products = await productsService.getAll()
    if (!limit || limit >= products.length) return res.status(HTTP_RESPONSES.SUCCESS).render('products.handlebars', { products, title: 'Challenge05: WebsocketsHandlebars', style: 'products.css' })
    if (limit <= 0 || isNaN(limit)) return res.status((HTTP_RESPONSES.NOT_FOUND_ERROR)).render('404.handlebars', { error: 'Invalid limit parameter', title: '404 Not Found', style: 'index.css' })
    const productsLimited = products.slice(0, limit)
    res.status(HTTP_RESPONSES.SUCCESS).render('products.handlebars', { productsLimited, title: 'Challenge05: WebsocketsHandlebars', style: 'products.css' })
  } catch (error) {
    res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
});

productsController.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params
    const productById = await productsService.findOne(pid)
    res.status(HTTP_RESPONSES.SUCCESS).render('products.handlebars', { productById, title: 'Challenge05: WebsocketsHandlebars', style: 'products.css' })
  } catch (error) {
    res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
})

productsController.post('/', async (req, res) => {
  try {
    const { title, description, price, stock, category, thumbnail } = req.body
    const newProductInfo = { title, description, price, stock, category, thumbnail }
    const newProduct = await productsService.insertOne(newProductInfo)
    res.status(HTTP_RESPONSES.CREATED).json({ payload: { newProduct } })
  } catch (error) {
    res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
})

productsController.put('/:pid', async (req, res) => {
  try {
    const { pid } = req.params
    const { title, description, price, stock, category, thumbnail } = req.body
    if (!title || !description || !price || !stock || !category || !thumbnail) return res.status(HTTP_RESPONSES.BAD_REQUEST).json({ error: error.message })
    const productInfo = { title, description, price, stock, category, thumbnail }
    const updatedProduct = await productsService.updateOne(pid, productInfo)
    res.status(HTTP_RESPONSES.ACCEPTED).json({ payload: { updatedProduct } })
  } catch (error) {
    res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
})

productsController.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params
    const deletedProduct = await productsService.deleteOne(pid)
    res.status(HTTP_RESPONSES.ACCEPTED).json({ payload: { deletedProduct } })
  } catch (error) {
    res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
})

export default productsController