import { Router } from "express";
import productManager from "../managers/products.manager.js";

const realTimeProductsRouter = Router()

realTimeProductsRouter.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts()
    return res.render('realTimeProducts', { products, title: 'Challenge05: WebsocketsHandlebars', style: 'realTimeProducts.css' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default realTimeProductsRouter