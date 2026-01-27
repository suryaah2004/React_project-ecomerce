import express from "express"
import { userMiddleware } from "../midleware/userMidleware.js"
import { addCart, deleteProductCart, editCart, getCart} from "../controller/cartController.js"
const router = express.Router()
router.post("/addCart", userMiddleware,addCart)
router.put("/updateCart", userMiddleware, editCart)
router.delete("/deleteCart/:productId", userMiddleware, deleteProductCart)
router.get("/getCart", userMiddleware, getCart)
export default router




