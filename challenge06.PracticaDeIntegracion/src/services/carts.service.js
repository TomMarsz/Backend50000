import CartDAOMongo from "../../DAO/mongo/cart-dao.mongo.js"

const Cart = new CartDAOMongo()

const getAll = async () => {
  try {
    const carts = await Cart.getAll()
    return carts
  } catch (error) {
    throw error
  }
}

const insertOne = async (newCartInfo) => {
  try {
    const newCart = await Cart.insertOne(newCartInfo)
    return newCart
  } catch (error) {
    throw error
  }
}

const findOne = async (cid) => {
  try {
    const cart = await Cart.findOne(cid)
    return cart
  } catch (error) {
    throw error
  }
}

const updateOne = async (cid, productInfo) => {
  try {
    const updatedProduct = await Cart.updateOne(cid, productInfo)
    return updatedProduct
  } catch (error) {
    throw error
  }
}

const deleteOne = async (pid) => {
  try {
    const deletedProduct = await Cart.deleteOne(pid)
    return deletedProduct
  } catch (error) {
    throw error
  }
}

export default {
  getAll,
  insertOne,
  findOne,
  updateOne,
  deleteOne
}