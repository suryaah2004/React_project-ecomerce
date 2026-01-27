import express from "express";
import { upload } from "../midleware/productMidleware.js";

import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controller/productController.js";
import { userMiddleware } from "../midleware/userMidleware.js";
import { adminMidleware } from "../midleware/adminMidleware.js";

const router = express.Router();

router.post("/create-product", userMiddleware, adminMidleware, upload.single("image"), createProduct);
router.get("/getAllProduct", getAllProducts);
router.get("/getSingleProduct/:id", getSingleProduct);
router.put("/update/:id", userMiddleware, adminMidleware, upload.single('image'), updateProduct);
router.delete("/delete/:id", userMiddleware, adminMidleware, deleteProduct);
export default router;



