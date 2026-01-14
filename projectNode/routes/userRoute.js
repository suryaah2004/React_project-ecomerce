import express from 'express'
import {register, login, update, logout} from '../controller/userController.js'
import { userMiddleware } from '../midleware/userMidleware.js'
const router=express.Router()

router.post('/register',register)
router.post('/login',login)
router.patch('/update/:id',userMiddleware,update)
router.get("/logOut",logout)

export default router


