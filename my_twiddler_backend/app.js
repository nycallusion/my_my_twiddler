const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tweetRouter = require('./routes/tweet');
const mongoose = require('mongoose');
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

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', indexRouter);
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
  let tweet;
  console.log("New client connected");
  setInterval(async () => {
     let newTweet = await Tweet.find()
     const reverseNewTweet = [...newTweet].reverse()
    if (tweet) {
      /// emits data if theres new data
      if( newTweet.length > 0 && reverseNewTweet[0].timestamp !== tweet[0].timestamp){
        if (newTweet.length > 30){
          tweet = newTweet.slice(newTweet.length - 30).reverse();
          return socket.emit("data", tweet);
        }
      tweet = newTweet.reverse();
      return socket.emit("data", tweet);
      }
    }
    if(!tweet){
      if (newTweet.length < 1) {
        return socket.emit("data", tweet);
      }
      if (newTweet.length > 30){
        tweet = newTweet.slice(newTweet.length - 30).reverse();
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
