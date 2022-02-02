var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const { comparePassword, createUser } = require('../middleWare/auth');
const { validateRegister } = require('../middleWare/userRequestValidation');
const{ createJwtToken } = require('../middleWare/createJwtToken')
require('dotenv').config();



router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', validateRegister , async (req, res, next) => {
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
      status: 'success',
      message: 'Successfully signed up',
      token: jwtToken,
      user: savedUser._id,
      userName: savedUser.userName
    });

  } catch (err) {
    throw (err);
  }
});

router.post('/login',async (req, res) => {
  const { email, password } = await req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({
        status: 'error',
        message: 'User Not Found',
      });
    }
    let comparedPassword = await comparePassword(password, user.password);
    if (comparedPassword === 409) {
      return res.status(409).json({
        status: 'error',
        message: 'Check your email and password',
      });
    }

    let jwtToken = await createJwtToken(user);
    return res.status(200).json({
      status: 'success',
      message: 'Successfully logged in',
      token: jwtToken,
      user: user._id
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
})



module.exports = router;