import Cart from "../models/cart.model.js";

class CartDAO {
  async getAll() {
    return await Cart.find({ status: true })
  }

  async insertOne(newCartInfo) {
    newCartInfo.createdAt = new Date()
    newCartInfo.updatedAt = new Date()
    return await Cart.create(newCartInfo)
  }

  async findOne(cid) {
    return await Cart.find({ _id: cid, status: true })
  }

  async updateOne(cid, cartInfo) {
    cartInfo.updatedAt = new Date()
    await Cart.updateOne({ _id: cid, status: true }, cartInfo)
    return await Cart.find({ _id: cid })
  }
  async deleteOne(cid) {
    await Cart.updateOne({ _id: cid }, { status: false })
    return await Cart.find({ _id: cid })
  }
}

export default CartDAO