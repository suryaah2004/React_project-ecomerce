import mongoose from "mongoose";
const Schema2=mongoose.Schema({
   name: {
        type: String,
        required: true,
        unique: true,
      
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const categorieSchema=mongoose.model("categorieSchema",Schema2)
export default categorieSchema