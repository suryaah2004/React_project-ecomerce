import express from "express"
import { userMiddleware } from "../midleware/userMidleware.js"
import { cancelOrder, createOrder, getAllOrders, getsingleorder, getUserOrders,  updateOrderStatus  } from "../controller/orderController.js"
import { adminMidleware } from "../midleware/adminMidleware.js"
const router = express.Router()
router.post("/createOrder",userMiddleware,createOrder)
router.get("/getSingleOrder/:id",userMiddleware,getUserOrders)
router.get("/singleOrder/:id",userMiddleware,getsingleorder)
router.get("/getAllOrder",userMiddleware,adminMidleware,getAllOrders)
router.put('/updateStatus/:id',userMiddleware,adminMidleware,updateOrderStatus)
router.delete('/cancelOrder/:id',userMiddleware,cancelOrder)

export default router