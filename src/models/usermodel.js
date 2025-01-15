import mongoose from "mongoose";
import {isGoodPassword} from "../utils/validator.js"
import bcrypt from "bcrypt"
//definicion del modelo
const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlenght:20,
        minlenght: 2,
        trim: true, //arregla espacios y atras
        lowercase: true, //validar formulario, api tiene que ser agnostica

    },
    lastname:{
        type: String,
        required: true,
        maxlenght:20,
        minlenght: 2,
        trim: true, 
        lowercase: true,
    },
    email:{
        type: String,
        required: true,
        maxlenght:30,
        minlenght: 6,
        trim: true, 
        lowercase: true,
        match: /^\S+@\S+\.\S+$/,
        unique: true,
    },
    age:{
        type: Number,
        required: true,
        min: 16,
        max:100,
    },
    registrationDate:{
        type: Date,
        default: Date.now(),
    },
    password:{
        type: String,
        required: true,
       validate:{
        validator: function(value){
            return isGoodPassword(value)
       },
       message:
       "Password is not good"
        
     },

    },

});

//paso previo a algo 
//encriptado de contraseña
userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10 ) //salt es la complejidad del encriptado
    next() //este next retorna un error 
})

export default mongoose.model("user", userSchema)
