import express from 'express'
import { getSingleUser, getUsers, toggleUserStatus } from '../controller/adminController.js'
import { adminMidleware } from '../midleware/adminMidleware.js'
import { userMiddleware } from '../midleware/userMidleware.js'
import { upload } from '../midleware/productMidleware.js'
const adminRout = express.Router()

adminRout.get('/getAllUser',userMiddleware,adminMidleware,getUsers)

adminRout.get('/getSingleUser',userMiddleware,getSingleUser)

adminRout.put('/toggleUserStatuss/:id',userMiddleware,adminMidleware,toggleUserStatus)

export default adminRout


