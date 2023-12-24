import { Router } from "express";
import productManager from "../managers/products.manager.js";

const realTimeProductsRouter = Router()

realTimeProductsRouter.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts()
    return res.render('realTimeProducts.handlebars', { products, title: 'Challenge05: WebsocketsHandlebars', style: 'realTimeProducts.css' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

realTimeProductsRouter.post('/', async (req, res) => {
  try {
    const { body } = req
    const productAdded = await productManager.addProduct(body)
    const products = await productManager.getProducts()
    return res.render('realTimeProducts.handlebars', { products, productAdded, title: 'Challenge05: WebsocketsHandlebars', style: 'realTimeProducts.css' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default realTimeProductsRouter