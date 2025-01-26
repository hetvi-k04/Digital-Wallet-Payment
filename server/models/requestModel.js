const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
   sender : {
    type : mongoose.Schema.Types.ObjectId,
    ref: "User",
   },
   receiver :{
    type : mongoose.Schema.Types.ObjectId,
    ref: "User",
   },
   amount :{
    type:Number,
    required:true,
   },
   description: {
    type : String,
    default : "",
   },
   status:{
    type : String,
    default:"pending",
   }
},{
    timestamps: true
});

const Request = mongoose.model("Request", requestSchema);

 module.exports = Request;