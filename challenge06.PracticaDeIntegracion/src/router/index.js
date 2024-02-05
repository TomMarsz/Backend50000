import productsController from "../controllers/products.controller.js";
import cartsController from "../controllers/carts.controller.js";
import realTimeProductsController from "../controllers/realTimeProducts.controller.js";
import messagesController from "../controllers/messages.controller.js";

const router = app => {
  app.use("/api/products", productsController);
  app.use("/api/carts", cartsController);
  app.use("/api/realtimeproducts", realTimeProductsController);
  app.use("/api/chats", messagesController)
}

export default router