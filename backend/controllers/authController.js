const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//Registration Controller for new Users
exports.registerUser = async (req, res) => {
    try{
        // accept either 'fullname', 'firstname' or 'name' from client for flexibility
        const fullname = req.body.fullname || req.body.firstname || req.body.name;
        const { email, password } = req.body;

        // Validate required fields
        if (!fullname || !email || !password) {
            return res.status(400).json({
                message: "Please provide fullname, email, and password"
            });
        }

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

//Login Controllers for users
exports.loginUser = async(req, res) => {
    try{
        const{email, password} = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }

        //Checking if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ 
                message: "Invalid email or password"
            });
        }

        //Checking an comparing passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ 
                message: "Invalid email or password" 
            });
        }

        //Token generation 
        const token = jwt.sign(
            {
                id: user._id, 
                email: user.email
            },
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.json({
            message: "Login Successful",
            token: token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email
            }
        });

    } catch(error){
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

