import mongoose from "mongoose";
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    productCode:{
         type:String,
         unique:true 
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    stock: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Products = mongoose.model("Products", productSchema);
export default Products