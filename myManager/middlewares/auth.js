const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token 
                        || req.body.token 
                        || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));
        console.log(token);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token is missing',
            });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            console.log(req.user);
            next();
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: 'Token is invalid',
            });
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while validating the token',
        });
    }
};






