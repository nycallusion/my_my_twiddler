const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const Tweet = require('../models/Tweet');
const {authenticateToken} = require('../middleWare/authToken');

router.post('/create',authenticateToken, async (req, res, next) => {
    try {
    const {
        message
      } = req.body;

      const user = await User.findOne({ _id: req.user.id });
      
      let newTweet = await new Tweet({
        owner: user._id,
        userName : user.userName,
        message
      });
      await newTweet.save();

      return res.status(200).json({
        status: 'success',
        message: 'Tweet Created',
        tweet: newTweet,
      });
  
    } catch (err) {
      throw (err);
    }
  });

router.get('/gettweets' , async (req,res,next) => {
  try {
    let allTweets = await Tweet.find({});
    return res.status(200).json({
      status: 'success',
      tweets: allTweets,
    });

  } catch (err) {
    throw (err);
  }

});

module.exports = router;