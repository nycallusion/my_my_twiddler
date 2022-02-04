const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tweetRouter = require('./routes/tweet');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const Tweet = require('./models/Tweet')

require('dotenv').config();


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('mongodb connected');
  })
  .catch(() => {
    console.log('server err');
  });

app.use(fileUpload())
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', usersRouter);
app.use('/api/Tweet', tweetRouter);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }});

io.on("connection", (socket) => {
  let tweet = []
  console.log("New client connected");
  setInterval(async () => {
     let newTweet = await Tweet.find()
     let reverseNewTweet = [...newTweet].reverse()
     if (tweet.length > 0) {
      // emits data if theres new data
      if(reverseNewTweet.length <= 30){
        if(JSON.stringify(reverseNewTweet) !== JSON.stringify(tweet)) {
          tweet = reverseNewTweet;
          return socket.emit("data", tweet);
        }
      }
      if(reverseNewTweet.length > 30){
        reverseNewTweet = reverseNewTweet.slice(0,30);
        if(JSON.stringify(reverseNewTweet) !== JSON.stringify(tweet)) {
          tweet = reverseNewTweet;
          return socket.emit("data", tweet);
        }
      }

    }
    if(tweet.length < 1){
      if (newTweet.length < 1) {
        return
      }
      if (newTweet.length > 30){
        tweet = reverseNewTweet.slice(0,30);
        return socket.emit("data", tweet)
      }
      tweet = newTweet.reverse();
      socket.emit("data", tweet);
    }
    // console.log('do nothing')
  }
  , 2000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(process.env.PORT2, () => console.log(`Listening on port ${process.env.PORT2}`));
module.exports = app;
