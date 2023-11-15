class ProductManager {
  constructor() {
    this.productId = 1
    this.products = [];
  }

  getProducts() {
    return this.products
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const productExist = this.products.find(p => p.code === code)
    if (productExist) return console.log(`El producto ${title} con code ${code} ya existe`);

    const newProduct = {
      id: this.productId++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    }

    this.products.push(newProduct)
  }

  getProductById(productId) {
    const product = this.products.find((p) => p.id === productId);
    if (!product) return console.log('Product not found');
    return console.log(product);;
  }
}

const productManager = new ProductManager()

const allProducts = productManager.getProducts()
console.log(allProducts);

productManager.addProduct('Honda', 'Car', 9000, 'https://w7.pngwing.com/pngs/801/997/png-transparent-2017-honda-civic-2018-honda-civic-honda-city-honda-today-honda-compact-car-glass-sedan.png', 'abc123', 10)
productManager.addProduct('Honda', 'Car', 9000, 'https://w7.pngwing.com/pngs/801/997/png-transparent-2017-honda-civic-2018-honda-civic-honda-city-honda-today-honda-compact-car-glass-sedan.png', 'abc123', 10)
console.log(allProducts);

productManager.getProductById(1)
productManager.getProductById(3)