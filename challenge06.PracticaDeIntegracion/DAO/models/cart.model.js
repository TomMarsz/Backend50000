import mongoose from 'mongoose'
import Product from './product.model.js';

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    products: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product, 
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    }],
    status: {
      type: Boolean,
      default: true
    },
    createdAt: Date,
    updatedAt: Date
  });

const Cart = mongoose.model(cartCollection, cartSchema)

export default Cart
