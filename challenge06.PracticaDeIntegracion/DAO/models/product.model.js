import mongoose from 'mongoose'

const productCollection = 'products'

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  status: {
    type: Boolean,
    default: true
  },
  stock: Number,
  category: String,
  thumbnail: Array,
  createdAt: Date,
  updatedAt: Date
})

const Product = mongoose.model(productCollection, productSchema)

export default Product