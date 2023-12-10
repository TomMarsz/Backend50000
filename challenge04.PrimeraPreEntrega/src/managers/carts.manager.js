import { promises as fs } from 'fs'

class CartManager {
  constructor(path) {
    this.path = path
  }

  async getCarts() {
    try {
      const content = JSON.parse(await fs.readFile(`./${this.path}`, 'utf-8'))
      return content
    } catch (error) {
      console.log(error)
      throw new Error(`Error reading carts: ${error.message}`)
    }
  }

  async addCart(cartData) {
    try {
      const carts = await this.getCarts()
      const id = carts.length + 1
      const newCart = { id, ...cartData }
      carts.push(newCart)
      await fs.writeFile(`./${this.path}`, JSON.stringify(carts, null, "\t"))
      console.log('New cart added:', newCart)
      return carts
    } catch (error) {
      throw new Error(`Error adding cart: ${error.message}`)
    }
  }

  async getCartById(cartId) {
    try {
      const carts = await this.getCarts()
      const foundCart = carts.find((c) => c.id === cartId)
      return foundCart ? [foundCart] : console.log('Cart not found.')
    } catch (error) {
      throw new Error(`Error getting cart by ID: ${error.message}`)
    }
  }

  async updateProductById(productId, productData) {
    try {
      const products = await this.getProducts()
      const productIndex = products.findIndex((p) => p.id === productId)
      if (productIndex !== -1) {
        products[productIndex] = {
          ...products[productIndex],
          ...productData,
        }
        await fs.writeFile(`./${this.path}`, JSON.stringify(products, null, "\t"), 'utf-8')
        console.log('Product updated successfully.')
        return products
      } else {
        console.log('Product not found.')
        return null
      }
    } catch (error) {
      throw new Error(`Error updating product by ID: ${error.message}`)
    }
  }

  async deleteProductById(productId) {
    try {
      const products = await this.getProducts()
      const productIndex = products.findIndex((p) => p.id === productId)
      if (productIndex === -1) {
        throw new Error(`Product with ID ${productId} not found`)
      }
      const productsFilt = products.filter((p) => p.id !== productId)
      await fs.writeFile(`./${this.path}`, JSON.stringify(productsFilt, null, "\t"))
      console.log(`Product with Id: ${productId} is deleted`)
      return productsFilt
    } catch (error) {
      throw new Error(`Error deleting product by ID: ${error.message}`)
    }
  }
}

const cartManager = new CartManager('./data/carts.json')

export default cartManager