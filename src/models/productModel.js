import mongoose from "mongoose";


export const statusEnum=["AVAILABLE","NOT AVAILABLE", "DISCOTINUED"]
const productSchema = new mongoose.Schema({
    //dato importante 
    //podes asignar en el required un mensaje de error
    name: {
        type: String,
        required: [true, "Name field is required"], // es por si no te mandan el name 
        minLength: 3,
        maxLength: 30,
        unique: true,
        lowercase: true,
        trim:true,
    },
    price:{
        type:Number,
        required:[true,"Price field is required"],
        min:[0, "Price field has to be a number"],
        // //se guarda el producto con un valor y a leerlo se le multiplica
        // get: function (value){
        //     return value *1.21
        // },
    },
    profitRate:{
        type:Number,
       default: 1.21,
       min: [1, "Profit rate must be grater than or equal to 1 "]
    },

    // description:String,

    
    description:{
        type:String,
        minLenght: 5,
        maxLength: 100
    },

    status: {
        type: String,
        quantity: Number,
        status: {
            type: String,
            validate: {
                validator: function(status) {
                    return statusEnum.includes(status);
                },
                message: props => `${props.value} is not a valid status`
            }
        }
    },
    
    category: {type: mongoose.Schema.Types.ObjectId, ref:"category"},

    highlighted: {
        type: Boolean,
        default:false,
    },
    creationDate:{
        type: Date,
        default: Date.now(),
    },

    stock:{
        type:Number,
        default: 0,

    }
});
 
//esta funcion queda guardada en el modelo y cuando lo necesitamos  la usamos
//no se ejecuta automaticamente, entonces la incluimos donde necesitamos recuperar stock 
productSchema.methods.descreaseStock = function (amount) {
    if(this.stock < amount){
        throw new Error('Not enough stock') //genera un error pero no empeora la ejecucion 
    }

    this.stock -= amount;
    return this.save();
}


//virtual permite generar un valor virtual sin haberlo escrito en el esquema
//facilita hacer calcunos en nuestros propios valores
productSchema.virtual("priceWithProfitRate").get(function () {
    return this.price * this.profitRate;
})

//habilita valore svirtuales en json  y objetos
productSchema.set("toJSON",{virtuals:true});
productSchema.set("toObject",{virtuals:true})

export default mongoose.model("product",productSchema)