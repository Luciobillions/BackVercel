import User from "../models/usermodel.js"
import bcrypt from "bcrypt"

import jwt from "jsonwebtoken"
// Controladores: Actúan como intermediarios entre el cliente y la lógica de la aplicación.
// Reciben solicitudes, las procesan y devuelven la respuesta. Esto es pura API.

// Estos controladores incluyen a los servicios.

// Crear usuario
export const usercreate = async (req, res) => {
    try {
        // Tomar los datos enviados por el POST (llegan por el body)
        const userdata = new User(req.body)
    
        // Validar: destructuramos y obtenemos el email (que es único)
        const { email } = userdata
        const userexist = await User.findOne({ email })
        
        // Si el usuario ya existe, devolvemos un error
        if (userexist) {
            return res
                .status(400)
                .json({ message: "El usuario ya existe" })
        }
        

        await userdata.save();

        // Devolvemos el usuario creado sin la contraseña
        res.status(201).json({
            message: "Usuario creado con éxito"
        });
    } catch (error) {
        // En caso de error, devolvemos un mensaje de error interno
        console.error(error);  // Esto sigue ayudando a depurar el error completo en el servidor

        res.status(500).json({
            message: "Error interno",
            error: error.message  // solo el mensaje del error
        });
    }
}

// Obtener todos los usuarios
export const userget = async (req, res) => {
    try {
        // Obtenemos todos los usuarios de la base de datos
        const users = await User.find()
        
        // Verificamos si hay usuarios
        if (users.length === 0) {
            // 204: No content, significa que la respuesta está vacía pero no hay error
            return res.status(204).json({ message: "No hay usuarios" })
        }

        // 200: OK, devolvemos los usuarios encontrados
        res.status(200).json(users)
    } catch (error) {
        // En caso de error, devolvemos un mensaje de error interno
        res.status(500).json({ message: "Error interno", error })
    }
}

//CRUD abm (alta, baja, modificacion), (create update delete)

export const deleteUser = async (req, res ) =>{
    try {
        // api/user/delete/id asi seria la ruta
        const _id =  req.params.id;
        //validar si existe, se hace un llamado
        const userExist= await User.findOne({ _id})

        
        

        if(!userExist){
            return res.status(404).json({message: "user nout found"})

        }

        await User.findByIdAndDelete(_id) //importante el await
        return res.status(200).json({message:"user delete succesfully"});
    } catch (error) {
        res.status(500).json({ error:"internal server error", error});
    }
}

export const updateUser = async(req, res) =>{
    try {
        
    
  const _id= req.params.id; 

  const userExist= await User.findOne({ _id })
  if(!userExist){
    return res.status(404).json({message: "user not found"})
  }

  //si utilizamos new:true, nos devolvera el registro actualizado 
  //si no devuelve el registro antes que se actualize 
  const updatedUser = await User.findByIdAndUpdate({ _id}, req.body,{
    new:true, //tener los datos actualizados 
  } );
 

return res.status(201).json({updatedUser})
}  catch (error) {
     return res.status(500).json({error:"interval server error", error})  
  }
};

export const validate = async (req, res) =>{
    
    
    try {

        if(!(req.body.email && req.body.password)){
            return res.status(400).json({message: "email and password are required"})
        }
        const userFound = await User.findOne({email: req.body.email})

        if(!userFound){
            return res.status(200).json({message: "Email or password are wrong"})
        }
        //comparar la password que llegue del body contra la guardada en la db 
        if(bcrypt.compareSync(req.body.password, userFound.password)){

            const payload = {
                userID: userFound._id,
                userEmail: userFound.email,
            }
            //sign necesita: 1.payload 2."secret" 3.duracion 
            const token = jwt.sign(payload,"secret", {expiresIn: "1h"})

            console.log(req.session)

            req.session.token = token;
        

            return res.status(200).json({message: "logged in ", token})

        }else{
            return res.status(400).json({message: "user or password is incorrect",})
        }

    } catch (error) {
        return res.status(500).json({error:"interval server error", error})  
     }
}