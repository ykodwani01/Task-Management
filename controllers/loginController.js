const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

JWT_SECRET_KEY="";

const login = async (req,res)=>{
    const {username,password} = req.body;
    if(!username || !password) return res.status(400).json({ status: false, msg: "Username and password are required" });

    try{
        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({status:false,"msg" : "Invalid user"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ status: false, msg: "Invalid username or password" });
        }

        // User authentication successful, generate JWT token
        const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET_KEY, { expiresIn: "1h" });

        return res.status(200).json({
            status: true,
            msg: "Login successful",
            token
        });

    } catch{
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }

}

const register = async (req, res) => {
    const { username, password } = req.body;

    // Validate the input
    if (!username || !password) {
        return res.status(400).json({ status: false, msg: "Username and password are required" });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ status: false, msg: "Username already taken" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of hashing

        // Create a new user and save to database
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ status: true, msg: "Registration successful" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
};

module.exports = { login,register };