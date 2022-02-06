const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const Tweet = require("../models/Tweet");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const { comparePassword, createUser } = require("../middleWare/auth");
const { validateRegister } = require("../middleWare/userRequestValidation");
const { createJwtToken } = require("../middleWare/createJwtToken");
const { authenticateToken } = require("../middleWare/authToken");
require("dotenv").config();

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", validateRegister, async (req, res, next) => {
  try {
    let newUser = await createUser(req.body);
    let savedUser = await newUser.save();
    let jwtToken = await jwt.sign(
      { id: savedUser._id },
      process.env.SECRET_KEY,
      {
        expiresIn: 360000,
      }
    );
    return res.status(200).json({
      status: "success",
      message: "Successfully signed up",
      token: jwtToken,
      user: savedUser._id,
      userName: savedUser.userName,
      profilePic: savedUser.profilePic,
    });
  } catch (err) {
    throw err;
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = await req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({
        status: "error",
        message: "User Not Found",
      });
    }
    let comparedPassword = await comparePassword(password, user.password);
    if (comparedPassword === 409) {
      return res.status(409).json({
        status: "error",
        message: "Check your email and password",
      });
    }

    let jwtToken = await createJwtToken(user);
    return res.status(200).json({
      status: "success",
      message: "Successfully logged in",
      token: jwtToken,
      user: user._id,
      profilePic: user.profilePic,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

router.post("/update", authenticateToken, async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    if (req.files) {
      let image = req.files.image;
      let s3 = new AWS.S3({
        AWS_Access_Key_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_Secret_Access_Key: process.env.AWS_SECRET_ACCESS_KEY,
      });
      let bucketName = "mytwiddler";
      let keyName = `users/${user.email}/${uuidv4()}_${req.body.name}`;
      var objectParams = {
        Bucket: bucketName,
        Key: keyName,
        Body: image.data,
        ACL: "public-read",
      };
      var uploadPromise = await s3.putObject(objectParams).promise();
      let url = `https://${bucketName}.s3.amazonaws.com/${keyName}`;
      user.profilePic = url;
    }
    await user.save();
    let profilePic = user.profilePic;
    let tweets = await Tweet.updateMany({ owner: req.user.id }, { profilePic });
    return res.status(200).json({
      status: "success",
      message: "Profile Pic been updated",
      profilePic: user.profilePic,
    });
  } catch (err) {
    throw err;
  }
});

module.exports = router;
