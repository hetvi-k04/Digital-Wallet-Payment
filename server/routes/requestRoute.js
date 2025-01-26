const router = require("express").Router();
const Request= require("../models/requestModel");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/userModels");
const Transaction=require("../models/transactionsModels")
//get all request for a user
router.post("/get-all-requests-by-user", authMiddleware, async (req, res) => {
  try {
    // Ensure you correctly populate the sender and receiver
    const requests = await Request.find({
      $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
    })
      .populate("sender")   // Populate sender data
      .populate("receiver"); // Populate receiver data

    res.send({
      message: "Requests fetched successfully",
      data: requests,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error fetching requests",
      data: error.message,
      success: false,
    });
  }
});
// send request to another user 
router.post("/send-request", async (req, res) => {
  try {
    const { sender, receiver, amount, description } = req.body;

    console.log("Received Payload:", req.body); // Add this to debug the incoming request

    if (!sender || !receiver || !amount) {
      return res.status(400).send({ success: false, message: "Missing required fields" });
    }

    const newRequest = new Request({
      sender,
      receiver,
      amount,
      description,
    });

    await newRequest.save();

    res.send({ success: true, message: "Request sent successfully", data: newRequest });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ success: false, message: error.message });
  }
});
// Accept a request
router.post("/accept-request", authMiddleware, async (req, res) => {
  const { requestId } = req.body;

  try {
    // Find the request by ID
    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    // Check if the request is already accepted or declined
    if (request.status !== "pending") {
      return res.status(400).json({ success: false, message: "Request is not pending" });
    }

    // Find sender and receiver
    const sender = await User.findById(request.sender);
    const receiver = await User.findById(request.receiver);

    if (!sender || !receiver) {
      return res.status(404).json({ success: false, message: "Sender or receiver not found" });
    }

    // Check if the receiver has enough balance
    if (receiver.balance < request.amount) {
      return res.status(400).json({ success: false, message: "Insufficient balance" });
    }

    // Update balances
    receiver.balance -= request.amount; // Deduct amount from receiver
    sender.balance += request.amount; // Add amount to sender

    // Save updated balances
    await receiver.save();
    await sender.save();

    // Update request status to 'accepted'
    request.status = "accepted";
    await request.save();

    res.send({
      data: request,
      message: "Request accepted successfully. Balances updated.",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// Decline a request
router.post("/decline-request", authMiddleware, async (req, res) => {
  const { requestId } = req.body;

  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      { status: "declined" },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    res.send({
      data: updatedRequest,
      message: "Request declined successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
module.exports = router;
