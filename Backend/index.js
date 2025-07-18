import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/userRoutes.js";
import incomeRoutes from "./Routes/incomeRoutes.js";
import expenseRoutes from "./Routes/expenseRoutes.js";
import dashboardRoutes from "./Routes/dashboardRoutes.js";
import goalRoutes from "./Routes/goalRoutes.js";
import cors from "cors";

const Port = 3000;
const app = express();

dotenv.config();

const mongoUri = process.env.MONGODB_URI;

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    // origin: 'https://expense-tracker-frontend-bmpg.onrender.com',
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,DELETE,PUT",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/upload", express.static("public/upload"));
app.use("/", userRoutes);
app.use("/income", incomeRoutes);
app.use("/expense", expenseRoutes);
app.use("/goal", goalRoutes);
app.use("/", dashboardRoutes);

try {
  await mongoose.connect(mongoUri);
  console.log("database connected succesfully");
} catch (error) {
  console.log("error in database connection", error);
}

app.listen(Port, () => {
  console.log(`Server Listening on PORT:${Port}`);
});
