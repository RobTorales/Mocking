import ProductService from "../services/product.services.js";
import mongoose from "mongoose";
import CustomeError from "../services/error/customeError.js";
import { productError } from "../services/error/errorMessages/product.error.js";

class ProductController {
    constructor() {
        this.productService = new ProductService();
    }

    async getProducts(req, res) {
        try {
            const products = await this.productService.getProducts(req.query);
            res.send(products);
        } catch (error) {
            const productErr = new CustomeError({
                name: "Product Fetch Error",
                message: "Error al obtener los productos",
                code:500,
                cause:error.message,
              });
              console.error(productErr);
              res.status(500).send({status:"error", message:"Error al obtener los productos"})
            }
    }

    async getProductById(req, res) {
        try {
            const pid = req.params.pid;
            const product = await this.productService.getProductbyId(pid);
            if (!product) {
                throw new CustomeError({
                    name: "Product not found",
                    message: "El producto no pudo ser encontrado",
                    code:404,
                  });
        } 
            res.status(200).json({ status: "success", data: product });
            return;
        }catch (error) {
            next(error)
        }
    }

    async addProduct(req, res) {
        const { title, description, code, price, stock, category, thumbnail } = req.body;
        if (!this.validateRequiredFields(req.body, ["title", "description", "code", "price", "stock", "category", "thumbnail"])) {
            return res.status(400).send({ status: "error", message: "Faltan campos requeridos" });
        }
        try {
            const add = await this.productService.addProduct({
                title,
                description,
                code,
                price,
                stock,
                category,
                thumbnail,
            });
            if (add && add._id) {
                console.log("Producto añadido correctamente:",add);
                res.send({
                status: "ok",
                message: "El Producto se agregó correctamente!",
                });
                socketServer.emit("product_created", {
                _id: add._id,
                title,
                description,
                code,
                price,
                stock,
                category,
                thumbnail,
                });
                return;
            } else {
                res.status(500).send({
                    status: "error",
                    message: "Error! No se pudo agregar el Producto!",
                  });
            }
        } catch (error) {
            console.error("Error en addProduct:", error, "Stack:", error.stack);
            res
                .status(500)
                .send({ status: "error", message: "Internal server error." });
            return;
        }
    }

    async updateProduct(req, res) {
        try {
            const {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnail,
              } = req.body;
              const pid = req.params.pid;
        
              const wasUpdated = await this.productService.updateProduct(pid, {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnail,
              });
        
              if (wasUpdated) {
                res.send({
                  status: "ok",
                  message: "El Producto se actualizó correctamente!",
                });
                socketServer.emit("product_updated");
              } else {
                res.status(500).send({
                  status: "error",
                  message: "Error! No se pudo actualizar el Producto!",
                });
              }
        } catch (error) {
            console.log(error);
            res.status(500).send({status: "error", message: "Error Interno"});
        }
    }

    async deleteProduct(req, res) {
        try {
            const pid = req.params.pid;

            if (!mongoose.Types.ObjectId.isValid(pid)) {
                console.log("ID del producto no válido");
                res.status(400).send({
                status: "error",
                message: "ID del producto no válido",
                });
                return;
            }

            const product = await this.productService.getProductById(pid);

            if (!product) {
                console.log("Producto no encontrado");
                res.status(404).send({
                status: "error",
                message: "Producto no encontrado",
                });
                return;
            }

            const wasDeleted = await this.productService.deleteProduct(pid);

            if (wasDeleted) {
                console.log("Producto eliminado exitosamente");
                res.send({
                status: "ok",
                message: "Producto eliminado exitosamente",
                });
                socketServer.emit("product_deleted", { _id: pid });
            } else {
                console.log("Error eliminando el producto");
                res.status(500).send({
                status: "error",
                message: "Error eliminando el producto",
                });
            }
        } catch (error) {
            res.status(500).send({
                status: "error",
                message: "Error interno del servidor",
              });
        }
    }
}

export default ProductController;