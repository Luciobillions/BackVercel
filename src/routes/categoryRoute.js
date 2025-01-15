import { Router } from "express";
import { getcategorys, createCategorys, deleteCategorys} from "../controllers/categoryController.js";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";
const categoryRoute = Router();

categoryRoute.get("/get", verifyTokenMiddleware,getcategorys);
categoryRoute.post("/create",createCategorys)
categoryRoute.delete("/delete/:id",verifyTokenMiddleware, deleteCategorys);

export default categoryRoute;