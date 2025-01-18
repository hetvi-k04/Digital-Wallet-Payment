const mongoose = require('mongoose');
 mongoose.connect(process.env.mongo_url)

const connectionresult= mongoose.connection
connectionresult.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

// Handle successful connection
connectionresult.on("connected", () => {
    console.log("MongoDB connected successfully");
});
