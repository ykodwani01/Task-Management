const mongoose = require("mongoose");
const uri =
    "mongodb+srv://yashkodwani:<password>@cluster0.lathy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Function to connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri);
        console.log("connect");
    } catch (err) {
        console.error(err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = { connectDB };
