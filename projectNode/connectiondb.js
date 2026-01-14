import mongoose from 'mongoose'
export const connectdb=async()=>{
    try{
         await mongoose.connect(`mongodb://127.0.0.1:27017/Schemaa`)
         console.log('successfully connected')
    }
    catch(error){
        console.log(error)
    }
}