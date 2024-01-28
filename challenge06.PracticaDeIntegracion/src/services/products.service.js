import ProductDAOMongo from "../../DAO/mongo/product-dao.mongo.js"

const Product = new ProductDAOMongo()

const getAll = async () => {
  try {
    const products = await Product.getAll()
    return products
  } catch (error) {
    throw error
  }
}

const insertOne = async (newProductInfo) => {
  try {
    const newProduct = await Product.insertOne(newProductInfo)
    return newProduct
  } catch (error) {
    throw error
  }
}

const findOne = async (pid) => {
  try {
    const product = await Product.findOne(pid)
    return product
  } catch (error) {
    throw error
  }
}

const updateOne = async (pid, productInfo) => {
  try {
    const updatedProduct = await Product.updateOne(pid, productInfo)
    return updatedProduct
  } catch (error) {
    throw error
  }
}

const deleteOne = async (pid) => {
  try {
    const deletedProduct = await Product.deleteOne(pid)
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