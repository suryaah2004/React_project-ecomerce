import express from "express";
import { userMiddleware } from "../midleware/userMidleware.js";
import { adminMidleware } from "../midleware/adminMidleware.js";
import { addCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controller/categorieController.js";

const router=express.Router()

router.post("/createCategory", userMiddleware, adminMidleware, addCategory);
router.put("/updateCategory/:id", userMiddleware, adminMidleware, updateCategory);
router.delete("/deleteCategory/:id", userMiddleware, adminMidleware, deleteCategory);

router.get("/allCategory", getAllCategories);
router.get("/singleCategory/:id", getCategoryById);

export default router;