const express = require("express");
const router = express.Router();


const {login, signup} = require("../controllers/Auth");
const {auth} = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);

//testing protected routes for single middleware
router.get("/test", auth, (req,res) =>{
    res.json({
        success:true,
        message:'Welcome to the Protected route for TESTS',
    });
});


module.exports = router;