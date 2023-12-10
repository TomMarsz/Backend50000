import { promises as fs } from 'fs'
import { Router } from "express";
import cartManager from '../../manager/carts.manager.js';

const cartsRouter = Router()

cartsRouter.get('/', async (req, res) => {
  try {
    const carts = await cartManager.getCarts()
    res.json({ payload: carts })
  } catch (error) {
    console.log(error);
  }
})

cartsRouter.post('/', async (req, res) => {
  try {
    const { body } = req
    const carts = await cartManager.addCart(body)
    res.json({ payload: carts })
  } catch (error) {
    console.log(error);
  }
})

cartsRouter.get('/:cid', async (req, res) => {
  try {
    const cid = parseInt(req.params.cid)
    const carts = await cartManager.getCarts()
    if (isNaN(cid)) return res.json({ error: 'The entered parameter is not a number' })
    if (cid < 1 || cid > carts.length) return res.json({ error: 'The entered parameter is not valid' })
    const cartById = await cartManager.getCartById(cid)
    res.json({ payload: cartById })
  } catch (error) {
    console.log(error);
  }
})

cartsRouter.post('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params
    res.json(await cartManager.createCart())
  } catch (error) {
    console.log(error);
  }
})

export default cartsRouter