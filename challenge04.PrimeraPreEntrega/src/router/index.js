import productsRouter from "../controllers/products.controler.js";
import cartsRouter from "../controllers/carts.controler.js";

const router = app => {
  app.use("/api/products", productsRouter);
  app.use("/api/carts", cartsRouter);
}

export default router