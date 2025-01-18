const router=require("express").Router();
const User=require("../models/userModels");
const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
//register user
router.post("/register",async(req,res)=>{
    try{
        //check user exists
        let user=await User.findOne({email : req.body.email});
        if(user){
            return res.send({
                success:false,
                message:"User already exists",
            })
          }
        //hashpassword
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        req.body.password=hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            message:"User created sucessfully",
            data:null,
            success:true,
        })

    }catch(error){
        res.send({
            message:error.message,
            success:false,
        });
    }

});

//login user
router.post("/login", async (req, res) => {
    try {
      // Check if user exists
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.send({
          success: false,
          message: "User does not exist",
        });
      }
      console.log("User ID:", user._id);
      console.log("Request Body:", req.body);
  
      // Compare password
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.send({
          success: false,
          message: "Invalid Password",
        });
      }
  
      // Generate token
      const token = jwt.sign(
        { user_id: user._id },
        process.env.jwt_secret, 
        { expiresIn: "1d" }
       
      );
      console.log("JWT_SECRET in login:", process.env.jwt_secret);
  
      res.send({
        message: "Logged in successfully",
        success: true,
        token,
      });
    } catch (error) {
      res.send({
        message: error.message,
        success: false,
      });
    }
  });

  //get user info
  // router.post('/get-user-info', authMiddleware, async (req, res) => {
  //   try {
  //     const user = await User.findById(req.body.userId);
  
  //     if (!user) {
  //       return res.status(404).send({
  //         message: "User not found",
  //         success: false,
  //       });
  //     }
  
  //     user.password = "";  // Avoid modifying null
  //     res.send({
  //       message: "User info fetched successfully",
  //       data: user,
  //       success: true,
  //     });
  //   } catch (error) {
  //     res.status(500).send({
  //       message: error.message,
  //       success: false,
  //     });
  //   }
  // });
  router.post('/get-user-info', authMiddleware, async (req, res) => {
    try {
      const userId = req.body.userId;
      console.log("User ID from request:", userId);
  
      if (!userId) {
        return res.status(400).send({
          success: false,
          message: "User ID is missing",
        });
      }
  
      const user = await User.findById(userId).select("-password");
  
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
  
      res.status(200).send({
        success: true,
        message: "User info fetched successfully",
        data: user,
      });
  
    } catch (error) {
      console.error("Error in get-user-info:", error.message);
      res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  });
  
   module.exports = router;
