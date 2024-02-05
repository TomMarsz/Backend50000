import { Router } from "express";
import { io } from "../app.js";
import productsService from "../services/products.service.js";
import HTTP_RESPONSES from "../constants/http-responses.constant.js";

const realTimeProductsController = Router()

realTimeProductsController.get('/', async (req, res) => {
  try {
    const products = await productsService.getAll()
    return res.render('realTimeProducts.handlebars', { products, title: 'Challenge05: WebsocketsHandlebars', style: 'realTimeProducts.css' })
  } catch (error) {
    res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
})

realTimeProductsController.post('/', async (req, res) => {
  try {
    const { body } = req
    const newProduct = await productsService.insertOne(body)
    const products = await productsService.getAll()
    io.emit('newArrProducts', products)
    return res.status(HTTP_RESPONSES.CREATED).json({ payload: { newProduct } })
  } catch (error) {
    res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
})

realTimeProductsController.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params
    const deletedProduct = await productsService.deleteOne(pid)
    const products = await productsService.getAll()
    io.emit('newArrProducts', products)
    return res.status(HTTP_RESPONSES.ACCEPTED).json({ payload: { deletedProduct } })
  } catch (error) {
    res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
})

export default realTimeProductsController