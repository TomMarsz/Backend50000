import productsRouter from "../controllers/products.controller.js";
import cartsRouter from "../controllers/carts.controller.js";

const router = app => {
  app.use("/api/products", productsRouter);
  app.use("/api/carts", cartsRouter);
}

export default router