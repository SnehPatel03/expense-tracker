import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from "cookie-parser";
import userRoutes from './Routes/userRoutes.js'
import incomeRoutes from "./Routes/incomeRoutes.js"
import expenseRoutes from './Routes/expenseRoutes.js'
import dashboardRoutes from './Routes/dashboardRoutes.js'
import cors from "cors"

const Port = 3000 
const app = express()

dotenv.config()

const mongoUri = process.env.MONGODB_URI;

app.use(cookieParser());
app.use(express.json());


app.use(
  cors({
    origin: 'https://687947251092554411d64a3c--bytesbudget.netlify.app',
    credentials: true,
    methods: "GET,POST,DELETE,PUT",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use('/upload', express.static('public/upload'));
app.use("/",userRoutes)
app.use("/income",incomeRoutes)
app.use("/expense",expenseRoutes)
app.use("/",dashboardRoutes)


try {
    await mongoose.connect(mongoUri)
    console.log("database connected succesfully")

} catch (error) {
    console.log("error in database connection" , error)
}

app.listen(Port,() => {
    console.log(`Server Listening on PORT:${Port}`)
})
