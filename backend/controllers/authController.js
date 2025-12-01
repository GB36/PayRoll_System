const User = require("../models/User");
const bcrypt = require("bcryptjs");

//Registration Controller for new Users
exports.registerUser = async (req, res) => {
    try{
        const {fullname, email, password} = req.body;

        //Check if user already exists

        const emailExists = await User.findOne({email});
        if (emailExists) {
            return res.status(400).json({
                message: "Email already registered"});
        }

        //Password Hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        //Creating new users
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch(error){
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};



