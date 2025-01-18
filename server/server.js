require("dotenv").config();
const express=require("express")
const app=express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const dbConfig= require("./config/dbconfig");
const userRoutes=require("./routes/userRoutes");
const transactionRoute = require("./routes/transactionsRoutes");
console.log("JWT_SECRET from .env:", process.env.jwt_secret);
app.use('/api/users',userRoutes);
app.use('/api/transactions',transactionRoute);
const PORT = process.env.PORT || 5000;
app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});