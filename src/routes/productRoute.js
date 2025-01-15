import { Router } from "express";
import { createProduct, deleteProduct, findProductById, getProducts, updateProduct, getStatus, findProductByName} from "../controllers/productController.js";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";

const productRoute = Router()

productRoute.get("/get",getProducts)
//endpoint exclusivo para obtener los status disponibles
productRoute.get("/status",verifyTokenMiddleware, getStatus);
productRoute.post("/create",createProduct)
productRoute.get("/get-by-id/:id",verifyTokenMiddleware,findProductById)
productRoute.post("/get-by-name",verifyTokenMiddleware,findProductByName)
productRoute.put("/update/:id",updateProduct)
productRoute.delete("/delete/:id",deleteProduct);

export default productRoute;