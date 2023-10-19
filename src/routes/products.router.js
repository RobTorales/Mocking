import { Router } from "express";
import ProductController from "../controllers/products.controlers.js";

const productsRouter = Router();
const productController = new ProductController();

productsRouter.get("/", productController.getProducts);
productsRouter.get("/:productId", productController.getProductById);
productsRouter.post("/", productController.addProduct);
productsRouter.put("/:productId", productController.updateProduct);
productsRouter.delete("/:productId", productController.deleteProduct);

export default productsRouter;