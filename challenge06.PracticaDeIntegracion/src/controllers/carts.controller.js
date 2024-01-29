import { Router } from "express";
import cartsService from "../services/carts.service.js";
import HTTP_RESPONSES from "../constants/http-responses.constant.js";
// import cartManager from '../../DAO/managers/carts.manager.js';

const cartsController = Router()

cartsController.get('/', async (req, res) => {
  try {
    const carts = await cartsService.getAll()
    res.status(HTTP_RESPONSES.SUCCESS).json({ payload: { carts } })

    // const carts = await cartManager.getCarts()
    // return res.render('carts.handlebars', { carts, title: 'Challenge05: WebsocketsHandlebars', style: 'carts.css' })
  } catch (error) {
    res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
})

cartsController.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params
    const carts = await cartsService.findOne(cid)

    res.status(HTTP_RESPONSES.SUCCESS).json({ payload: { carts } })

    // if (isNaN(cid)) return res.json({ error: 'The entered parameter is not a number' })
    // if (cid < 1 || cid > carts.length) return res.json({ error: 'The entered parameter is not valid' })
    // const cartById = await cartManager.getCartById(Number(cid))
    // if (!cartById) return res.status(404).json({ error: 'Cart not found' });
    // const productsInCart = cartById.products
    // return res.render('carts.handlebars', { productsInCart, cid, title: 'Challenge05: WebsocketsHandlebars', style: 'carts.css' })
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