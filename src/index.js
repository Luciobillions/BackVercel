import express from "express";
import bodyParser from "body-parser";
import { PORT } from "./config.js";
import { connectDB } from "./db.js";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js"
import productRoute from "./routes/productRoute.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors"
//Ejecucion de express
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

//Middleware

//Parsea a json las solicitudes
app.use(bodyParser.json());
app.use(cookieParser())

app.use(session({
  secret: 'secret',
  resave: false, //evita que la sesion se vuelva a guardar si no hay datos nuevos 
  saveUninitialized: true, //guarda la sesion si no hay datos nuevos

})
)

//Parsea cuerpo de la solicitud para que pueda ser leida - querystring (transformar en un formato)
app.use(bodyParser.urlencoded({ extended: true }));

//Conexion a la base de datos
connectDB();

//rutas
//  localhost/api/
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute)
app.use("/api/product", productRoute)

//Siempre tiene que ir ultimo
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});