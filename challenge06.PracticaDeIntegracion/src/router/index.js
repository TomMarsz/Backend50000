import productsController from "../controllers/products.controller.js";
import cartsController from "../controllers/carts.controller.js";
import realTimeProductsController from "../controllers/realTimeProducts.controller.js";

const router = app => {
  app.use("/api/products", productsController);
  app.use("/api/carts", cartsController);
  app.use("/realtimeproducts", realTimeProductsController)
}

export default router