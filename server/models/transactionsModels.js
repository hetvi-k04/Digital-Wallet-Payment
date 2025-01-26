// const mongoose = require('mongoose')

// const transactionsSchema = new mongoose.Schema({
//     amount: {
//         type:Number,
//         required:true,
//     },
//     sender :{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"users",
//         required:true,
//     },
//     receiver :{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"users",
//         required:true,
//     },

//     type: {
//         type:String,
//         required:true,
//     },
//     reference: {
//         type:String,
//         required:true,
//     },
//     status: {
//         type:String,
//         required:true,
//     },

// },{
//    timestamps: true 
// });

// module.exports = mongoose.model("Transactions",transactionsSchema)
const mongoose = require("mongoose");

// Define the schema for transactions
const transactionSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    status: { type: String, default: "Pending" },  // Default value
    reference: { type: String, default: () => `TXN-${Date.now()}` },  // Default reference
    // type: { type: String, default: "Transfer" },  // Default type
  },
  { timestamps: true }  // This automatically adds createdAt and updatedAt
);

// Create and export the Transaction model
const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
