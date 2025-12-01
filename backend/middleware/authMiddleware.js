const jwt = require("jsonwebtoken");

const authMIddleware = (req, res, next) => {
    try{
        //Used to get the token from the headers
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if(!token){
            return res.status(401).json({
                message: "Access denied. No token provided."
            })
        }

        //Token VErification
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next(); //this allows rthe request to proceed.

    } catch(error){
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = authMIddleware;