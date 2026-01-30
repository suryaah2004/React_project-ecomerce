import express from "express";
import dotenv from "dotenv";
import { connectdb } from "./connectiondb.js";
import userRoute from "./routes/userRoute.js";
import session from "express-session";
import adminRout from "./routes/adminRoute.js";
import productRouter from "./routes/productRoute.js";
import categoiesRoute from "./routes/categoiesRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import MongoStore from "connect-mongo";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectdb();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: "http://65.2.132.121",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static uploads
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/user", userRoute);
app.use("/api/admin", adminRout);
app.use("/api/product", productRouter);
app.use("/api/category", categoiesRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

