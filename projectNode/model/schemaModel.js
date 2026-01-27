import mongoose from 'mongoose'
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        default: 'User'
    },
    
})
const Schemaa = mongoose.model("Schemaa", userSchema)
export default Schemaa