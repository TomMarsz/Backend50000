import Product from "../models/product.model.js";

class ProductDAO {
  async getAll() {
    return await Product.find({ status: true })
  }

  async insertOne(newProductInfo) {
    newProductInfo.createdAt = new Date()
    newProductInfo.updatedAt = new Date()
    return await Product.create(newProductInfo)
  }

  async findOne(pid) {
    return await Product.find({ _id: pid, status: true })
  }

  async updateOne(pid, productInfo) {
    productInfo.updatedAt = new Date()
    await Product.updateOne({ _id: pid, status: true }, productInfo)
    return await Product.find({ _id: pid })
  }
  async deleteOne(pid) {
    await Product.updateOne({ _id: pid }, { status: false })
    return await Product.find({ _id: pid })
  }
}

export default ProductDAO