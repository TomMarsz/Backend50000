import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

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

  async addProductToCart(cid, pid) {
    try {
      const cart = await Cart.find({ _id: cid, status: true })
      if (cart) {
        const product = await Product.find({ _id: pid, status: true })
        if (product) {
          const productIndex = cart.products.findIndex(prod => prod.product.toString() === pid.toString())
          if (productIndex !== -1) {
            cart.products[productIndex].quantity++
          } else {
            cart.products.push({ product: new mongoose.Types.ObjectId(pid), quantity: 1 })
          }
          await cart.save()
          console.log('Producto agregado al carrito con éxito')
          return { cart, success: true, message: 'Producto agregado correctamente al carrito' }
        } else {
          console.log('El producto no existe en la base de datos')
          return { success: false, message: 'El producto no existe en la lista general de productos.' }
        }
      } else {
        console.log('El carrito no existe en la base de datos')
        return { success: false, message: 'carrito no encontrado.' }
      }
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error)
      return { success: false, message: 'internal server error' }
    }
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