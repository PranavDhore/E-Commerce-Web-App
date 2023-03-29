const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const {signout,signup,signin} = require("../controllers/auth");

router.post("/signup",[
    check("name","Name should be atleast 3 chars").isLength({min:3}),
    check("email","Email is required").isEmail(),
    check("password","Password should be at least 3 chars").isLength({min:3})
],signup);


router.get("/signout",signout);

router.post("/signin",[
   
    check("email","Email is required").isEmail(),
    check("password","Password should be at least 3 chars").isLength({min:3})
],signin);



module.exports = router;