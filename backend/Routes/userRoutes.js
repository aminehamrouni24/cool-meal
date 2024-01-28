const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

// @ create a user
// @ public route (post)
router.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if ((fullName || email || password)==('')) {
        return res.status(400).json({msg:"Please fill all fileds"})
    }
    const existingUser = await User.findOne({email: email})
    if (existingUser){
      return res.status(401).json({msg : "User already exists, try Login."})
    }
    //  hashing the password 
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
      });
      return res.status(200).json({msg:"User created successfully" , data: user })
   
  } catch (err) {
    res.status(500).json({msg:err})
  }
});
// @desc login user
// @public route
// @ /api/users/login

router.post("/login", async (req, res) => {
  // checking user fields
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const verify_user = await bcrypt.compare(password, user.password);
      if (verify_user) {
        const token = await jwt.sign(
          { id: user._id, email: user.email },
          process.env.SECRET,
          { expiresIn: "1h" }
        );
        return res.status(200).json({
          status: true,
          msg: "Logged in successfully",
          token: token,
          data: user._id,
        });
      } else {
        return res.status(400).json({ status: true, msg: "Wrong Password!!" });
      }
    } else {
      return res
        .status(400)
        .json({ status: true, msg: "User doesn't exit !!" });
    }
  } catch (err) {
    res.status(500).json({ status: false, msg: err });
  }
});

module.exports = router;
