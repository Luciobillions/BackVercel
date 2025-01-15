import Product, { statusEnum } from "../models/productmodel.js"

export const getProducts = async (req, res ) =>{
    try {
        //En los productos tenemos categorias que es un esquema aparte 
        //para poder traer dichos datos se necesita hacer Populate/popular
        const products = await Product.find().populate("category"); //este es populate Mongoose
        if(products.lenght === 0){
            return res.status(400).json({message: "there a not product"})
        }

        return res.status(200).json(products);

    } catch (error) {
        return res.status(500).json({message:"internal server error",error})
    }
};
//esto se usa en todos los controladores importante
//casi todos los conceptos en esta linea de codigo
export const createProduct= async (req, res )=>{
    try {
        // con el const podes ver el tipado en "productData"
        const productData= new Product(req.body)
        //si llega mal el modelo va a responder 
        const {name} = productData;
       const productExist = await Product.findOne({name})

       if(productExist){
        return res.status(400).json({message:`product ${name} already exist`})

       }

      const saveProduct =   await productData.save()
      return res.status(200).json(saveProduct)

    } catch (error) {
        return res.status(500).json({message:"internal server error", error})
    }
}

export const findProductByName = async (req, res) =>{
    try {
        //quito espacio y paso a miniscula 
        const name = req.body.name;
        const persedName = name.trim().toLowerCase()
        const productExist = await Product.findOne({name: persedName})
        if(!productExist){
            return res.status(400).json({message:`product ${name} not exist`})
        }
        res.status().json({productExist})
    } catch (error) {
        res.status(500).json({message:"internal server error",error})
    }
 
}

export const findProductById = async (req, res) =>{
    try {
        //quito espacio y paso a miniscula 
        const _id = req.params.id;
        const productExist = await Product.findOne({_id})
        if(!productExist){
            return res.status(400).json({message:`product ${_id} not exist`})
        }
        res.status().json({productExist})
    } catch (error) {
        res.status(500).json({message:"internal server error",error})
    }
 
}

export const updateProduct = async(req, res) =>{
    try {
        const _id = req.params.id;
        const productExist = await Product.findOne({_id })
        if(!productExist){
            return res.status(400).json({message:"  User you're trying to update does not exist"})
        }

        const updateProduct= await Product.findByIdAndUpdate({_id}, req.body, {new: true})

        // const updateProduct= await Product.updateOne({_id}, req.body)
        res.status(201).json(updateProduct)
    } catch (error) {
        res.status(500).json({message:"internal server error",error})
    }
}

export const deleteProduct = async (req, res) => {
    try {
      const _id = req.params.id;
      const productExist = await Product.findOne({ _id });
      if (!productExist) {
        return res.status(400).json({ message: "Product does not exist" });
      }
      const response = await Product.findByIdAndDelete(_id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  };

  export const getStatus = async (req, res) => {
    try {
      return res.status(200).json(statusEnum);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  };