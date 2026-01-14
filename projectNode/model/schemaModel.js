import mongoose from 'mongoose'
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
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
    status: {
        type: String,

        default: 'active'
    }
})
const Schemaa = mongoose.model("Schemaa", userSchema)
export default Schemaa