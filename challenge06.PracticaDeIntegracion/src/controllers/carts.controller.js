import { Router } from "express";
import cartsService from "../services/carts.service.js";
import HTTP_RESPONSES from "../constants/http-responses.constant.js";
// import cartManager from '../../DAO/managers/carts.manager.js';

const cartsController = Router()

cartsController.get('/', async (req, res) => {
  try {
    const carts = await cartsService.getAll()
    res.status(HTTP_RESPONSES.SUCCESS).render('carts.handlebars', { carts, title: 'Challenge05: WebsocketsHandlebars', style: 'carts.css' })
  } catch (error) {
    res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
})

cartsController.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params
    const cart = await cartsService.findOne(cid)
    console.log(cart);
    const productsInCart = cart.products
    res.status(HTTP_RESPONSES.SUCCESS).render('carts.handlebars', { productsInCart, cid, title: 'Challenge05: WebsocketsHandlebars', style: 'carts.css' })
  } catch (error) {
    res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
})

cartsController.post('/', async (req, res) => {
  try {
    const { body } = req
    const newCartInfo = body

    const newCart = await cartsService.insertOne(newCartInfo)
    res.status(HTTP_RESPONSES.CREATED).json({ payload: { newCart } })

    // const cartAdded = await cartManager.addCart(body)
    // res.json({ payload: { cartAdded } })
  } catch (error) {
    res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
})

cartsController.post('/:cid/products/:pid', async (req, res) => {
  try {
    const { quantity } = req.body
    const { cid, pid } = req.params
    const updatedCart = await cartManager.updateCartById(Number(cid), Number(pid), quantity)
    res.json({ payload: { updatedCart } })
  }
  catch (error) {
    res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }

})

export default cartsController