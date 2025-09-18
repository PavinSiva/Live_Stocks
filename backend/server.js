import express from "express";
import mongoose from "mongoose"
import cors from "cors";
import stocksRoutes from "./routes/stocks.routes.js";
import dotenv from "dotenv"
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()
connectDB()

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

// Use stock routes
app.use("/api/stocks", stocksRoutes);
app.use("/api/auth", authRoutes);





    app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
    });