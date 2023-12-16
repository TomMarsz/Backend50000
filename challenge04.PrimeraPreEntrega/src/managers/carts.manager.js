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
      return newCart
    } catch (error) {
      throw new Error(`Error adding cart: ${error.message}`)
    }
  }

  async getCartById(cartId) {
    try {
      const carts = await this.getCarts()
      const foundCart = carts.find((c) => c.id === cartId)
      return foundCart
    } catch (error) {
      throw new Error(`Error getting cart by ID: ${error.message}`)
    }
  }

  async updateCartById(cartId, cartData) {
    try {
      const carts = await this.getCarts()
      const cartIndex = carts.findIndex((c) => c.id === cartId)
      if (cartIndex !== -1) {
        carts[cartIndex] = {
          ...carts[cartIndex],
          ...cartData,
        }
        await fs.writeFile(`./${this.path}`, JSON.stringify(carts, null, "\t"), 'utf-8')
        console.log('Product updated successfully.')
        return carts
      } else {
        console.log('Product not found.')
        return null
      }
    } catch (error) {
      throw new Error(`Error updating product by ID: ${error.message}`)
    }
  }
}

const cartManager = new CartManager('./data/carts.json')

export default cartManager