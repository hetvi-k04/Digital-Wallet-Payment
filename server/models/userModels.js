const mongoose=require("mongoose");
const userSchema= new mongoose.Schema({
   firstName:{
    type: String,
    required:true,
   },
   lastName:{
    type: String,
    required: true,
   },
   email: {
    type: String,
    required: true,
    // unique: true,
    // match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
},
phoneNumber: {
    type: Number,
    required: true,
    // match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
},
identificationType: {
    type: String,
    required: true,
    // enum: ["Aadhar", "PAN", "Passport", "Voter ID", "Driving License"],
},
identificationId: {
    type: Number,
    required: true,
},
address: {
    type: String,
    required: true,
},
password: {
    type: String,
    required: true,
},
balance :{
    type: Number,
    required:true,
    default: 0,
},
isverified: {
    type: Boolean,
    default: false,
},
isadmin:{
    type: Boolean,
    default:false,
}
}, { timestamps: true });

module.exports = mongoose.model("users", userSchema);
