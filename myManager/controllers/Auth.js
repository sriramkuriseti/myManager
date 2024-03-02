const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { options } = require("../routes/User");
require("dotenv").config();


//signup route handler
exports.signup = async (req,res) => {
    try{
        //get data
        const {
			firstName,
			lastName,
			 email,
			 phone_number,
			 password,
			} = req.body;

// Check if All Details are there or not
if (
	!firstName ||
	!lastName ||
	!email ||
	!password ||
	!phone_number
) {
	return res.status(403).send({
		success: false,
		message: "All Fields are required",
	});
}

        //check if user already exist
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already Exists',
            });
        }

        //secure password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err) {
            return res.status(500).json({
                success:false,
                message:'Error inn hashing Password',
            });
        }

        //create entry for User
        const user = await User.create({
            firstName,lastName,phone_number,email,password:hashedPassword
        })

        return res.status(200).json({
            success:true,
			user,
            message:'User Created Successfully',
        });

    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'User cannot be registered, please try again later',
        });
    }
}


//login
exports.login = async (req,res) => {
    try {

        //data fetch
        const {email, password} = req.body;
        //validation on email and password
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:'PLease fill all the details carefully',
            });
        }

        //check for registered user
        let user = await User.findOne({email});
        //if not a registered user
        if(!user) {
            return res.status(401).json({
                success:false,
                message:'User is not registered',
            });
        }

        const payload = {
            email:user.email,
            id:user._id,
            phone_number:user.phone_number,
			priority:user.priority

        };
        //verify password & generate a JWT token
        if(await bcrypt.compare(password,user.password) ) {
            //password match 
            let token =  jwt.sign(payload, 
                                process.env.JWT_SECRET,
                                { 
                                    expiresIn:"24h",
                                });

                                
            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date( Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:'User Logged in successfully',
            });

            // res.status(200).json({
            //     success:true,
            //     token,
            //     user,
            //     message:'User Logged in successfully',
            // });
        }
        else {
            //passwsord do not match
            return res.status(403).json({
                success:false,
                message:"Password Incorrect",
            });
        }

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure',
        });

    }
};