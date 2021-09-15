const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "ItsNotToWorry";

// Create a User

router.post(
  "/createUser",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("password", "Password must be at least of 5 length").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({success,  errors: errors.array() });
    }
    try {
      let user = await User.findOne({success,  email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success,  error: "Sorry a user with this email already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      success=true;
      const token = jwt.sign(data, JWT_SECRET);
      res.json({success, token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(success, "Some Error Occurred");
    }
  }
);

// Login a User
router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password Cannot be Blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({success,  error: "Please try to Login with Correct Credentials" });
      }
      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        return res
          .status(400)
          .json({success,  error: "Please try to Login with Correct Credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success,token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occurred");
    }
  }
);


// Getting Logged User Details

router.post(
    "/getUser",fetchUser,async (req, res) => {
      try {
          const userId = req.user.id;
        const user= await User.findById(userId).select("-password");
        res.send(user);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occurred");
      }
    }
  );
  

module.exports = router;
