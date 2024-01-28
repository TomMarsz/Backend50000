import mongoose from 'mongoose'

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  description: String,
  price: Number,
  status: {
    type: Boolean,
    default: true
  },
  stock: Number,
  category: String,
  thumbnail: Array
})

const Cart = mongoose.model(cartCollection, cartSchema)

export default Cart