import mongoose from 'mongoose'

const categorySchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        lowercase:true,

    },
});

export default mongoose.model("category", categorySchema)