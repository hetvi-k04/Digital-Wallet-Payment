const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const Transaction = require("../models/transactionsModels");
const User = require("../models/userModels");


// Transfer money

router.post("/transfer-funds" ,authMiddleware,async(req,res)=>
{
  try{
    //save transaction
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();

    //decrease the snder balance
    await User.findByIdAndUpdate(req.body.sender, {
      $inc : {balance: -req.body.amount},
    });
    //increase receiver balane
    await User.findByIdAndUpdate(req.body.receiver, {
      $inc : {balance : req.body.amount},
    });

    res.send({
      message:"transaction succesful",
      data : newTransaction,
      success:true
  })
  }catch(error) {
    res.send({
      message:"transaction failed",
      data : error.message,
      success: false,
  })
  }
});
// Verify receiver account number
router.post("/verify-account", authMiddleware, async (req, res) => {
  try {
    const { receiver } = req.body;

    if (!receiver) {
      return res.status(400).send({
        message: "Receiver ID is required",
        success: false,
      });
    }

    const user = await User.findById(receiver);
    if (user) {
      res.send({
        message: "Account verified",
        data: user,
        success: true,
      });
    } else {
      res.send({
        message: "Account not found",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error verifying account",
      data: error.message,
      success: false,
    });
  }
});

// get all transactionstions for users
// router.post("/get-all-transactions-by-user",authMiddleware,async (req,res) => {
// try{
//   const transactions = await transactions.find({
//     $or:[{ sender : req.body.userId} , { receiver : req.body.userId}],
//   });
//   res.send({
//     message:"transaction fetched",
//     data : transactions,
//     success : true
//   })
// }catch(error){
//   res.send({
//     message:"transactions not fetched",
//     data: error.message,
//     success : false
//   });
// }
// })

router.post('/get-all-transactions-by-user', authMiddleware, async (req, res) => {
  try {
    
    console.log('Received request:', req.body);
      const transactions = await Transaction.find({
          $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
      });
      console.log('Transactions data:', transactions);
      res.send({
          message: 'Transactions fetched',
          data: transactions.map((transaction) => ({
              _id: transaction._id,
              date: transaction.createdAt, // Ensure you include a date
              amount: transaction.amount,
              //type: transaction.type,
              reference: transaction.reference,
              status: transaction.status,
          })),
          success: true,
      });
  } catch (error) {
      res.send({
          message: 'Transactions not fetched',
          data: error.message,
          success: false,
      });
  }
});

// router.post("/get-all-transactions-by-user", authMiddleware, async (req, res) => {
//   try {
//     const transactions = await Transaction.find({
//       $or: [{ sender: req.body.user_id }, { receiver: req.body.user_id }],
//     });
//     res.send({
//       message: "Transactions fetched",
//       data: transactions,
//       success: true,
//     });
//   } catch (error) {
//     res.send({
//       message: "Transactions not fetched",
//       data: error.message,
//       success: false,
//     });
//   }
// });


module.exports = router;
