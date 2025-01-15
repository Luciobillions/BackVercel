import express from "express" 
import { usercreate, userget, deleteUser, updateUser, validate} from "../controllers/usercontroller.js";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware.js";

//Crear enrutador
//enrutador, controla un conjunto de rutas 
//Orientado a una entidad en especifica 

const userRoute= express.Router()

//endpoints 
//GET: obtener datos
//POST: crear datos
//PUT: actualizar datos
//DELETE: eliminar datos

//ruta de creacion con POST
userRoute.post("/create", usercreate)
//Ruta getAll traer todo getAll
userRoute.get("/get",userget)
//definimos path param con ":id"
userRoute.delete("/delete/:id",verifyTokenMiddleware ,deleteUser);
userRoute.put('/update/:id', verifyTokenMiddleware, updateUser)
userRoute.post("/login", validate)

//enrutador 
export default userRoute;