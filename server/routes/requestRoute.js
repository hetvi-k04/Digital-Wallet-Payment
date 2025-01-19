const router = require("express").Router();
const Request= require("../models/requestModel");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/userModels");
//get all request for a user
router.post ("/get-all-requests-by-user",authMiddleware,async (req,res)=>{
    try{
        const requests = await Request.find({
            $or:[{ sender: req.user._id}, { receiver: req.user._id}],

    })
    .populate("sender")
    .populate("receiver")
    res.send({
        data: requests,
        message:"Requests fetched succesfully",
        success: true,
    })
    
    }catch(error){
    res.status(500).json({error : error.message})
}
});

//send request to another user 
router.post("/send-request", authMiddleware, async (req, res) => {
    const { receiverId, amount, message } = req.body; // Request data
  
    try {
      // Check if the receiver exists
      const receiver = await User.findById(receiverId);
      if (!receiver) {
        return res.status(404).json({ message: "Receiver not found", success: false });
      }
  
      // Create a new request
      const newRequest = new Request({
        sender: req.body.userId,
        receiver,
        amount,
        description,
        
      });
  
      // Save the request to the database
      await newRequest.save();
  
      // Optionally, you can send a notification or email to the receiver
  
      res.send({
        data: newRequest,
        message: "Request sent successfully",
        success: true,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;