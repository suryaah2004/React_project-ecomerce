import express from 'express'
import dotenv from 'dotenv'
import {connectdb} from './connectiondb.js'
import userRoute from './routes/userRoute.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import adminRout from './routes/adminRoute.js'
import productRouter from './routes/productRoute.js'
import categoiesRoute from './routes/categoiesRoute.js'
import cartRoute from './routes/cartRoute.js'
import orderRoute from './routes/orderRoute.js'
import cors from "cors"
const app=express()
dotenv.config()
connectdb()
const port=process.env.port
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


app.use(express.json())
app.use(express.urlencoded({express:true}))



app.use('/uploads',express.static('uploads'))
app.use(session({
    secret:'mysecrete',
    resave:'false',
    saveUninitialized:'false',
    store:MongoStore.create({
        mongoUrl:'mongodb://127.0.0.1:27017/Schemaa',
        collectionName:'session-db'
    })
}))

app.use('/',userRoute)
app.use('/admin',adminRout)
app.use('/product',productRouter)
app.use('/categories',categoiesRoute)
app.use('/cart',cartRoute)
app.use('/order',orderRoute)
app.listen(5000||port,()=>{
console.log(port);
console.log(`http://localhost:5000`)   
})