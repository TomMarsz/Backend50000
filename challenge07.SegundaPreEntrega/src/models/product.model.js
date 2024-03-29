import mongoose from 'mongoose'

const productCollection = 'products'

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: {
    type: String,
    unique: true
  },
  price: Number,
  status: {
    type: Boolean,
    default: true
  },
  stock: Number,
  category: String,
  thumbnail: Array
})

const Product = mongoose.model(productCollection, productSchema)

export default Product