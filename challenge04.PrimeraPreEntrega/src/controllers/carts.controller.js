import { Router } from "express";
import cartManager from '../managers/carts.manager.js';

const cartsRouter = Router()

cartsRouter.get('/', async (req, res) => {
  try {
    const carts = await cartManager.getCarts()
    res.json({ payload: carts })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

cartsRouter.post('/', async (req, res) => {
  try {
    const { body } = req
    const cartAdded = await cartManager.addCart(body)
    res.json({ payload: { cartAdded } })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

cartsRouter.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params
    const carts = await cartManager.getCarts()
    if (isNaN(cid)) return res.json({ error: 'The entered parameter is not a number' })
    if (cid < 1 || cid > carts.length) return res.json({ error: 'The entered parameter is not valid' })
    const cartById = await cartManager.getCartById(Number(cid))
    if (!cartById) return res.status(404).json({ error: 'Cart not found' });
    const productsInCart = cartById.products
    res.json({ payload: { productsInCart } })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

cartsRouter.post('/:cid/products/:pid', async (req, res) => {
  try {
    const { quantity } = req.body
    const { cid, pid } = req.params
    const updatedCart = await cartManager.updateCartById(Number(cid), Number(pid), quantity)
    res.json({ payload: { updatedCart } })
  }
  catch (error) {
    res.status(500).json({ error: error.message })
  }

})

export default cartsRouter