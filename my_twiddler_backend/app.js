var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tweetRouter = require('./routes/tweet');
const mongoose = require('mongoose');
var app = express();
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
  let tweet
  console.log("New client connected");
  setInterval(async () => {
     let newTweet = await Tweet.find()
    if (tweet) {
      if(newTweet[newTweet.length -1].timestamp !== tweet[tweet.length -1].timestamp){
        if (newTweet.length > 30){
          tweet = newTweet.slice(newTweet.length - 30).reverse()
          return socket.emit("data", tweet)
        }
        tweet = newTweet.reverse()
          return socket.emit("data", tweet)
      }
      return
    }
    if(!tweet){
      if (newTweet.length > 30){
        tweet = newTweet.slice(newTweet.length - 30).reverse()
        return socket.emit("data", tweet)
      }
      tweet = newTweet.reverse()
      socket.emit("data", tweet)
    }
  }
  , 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(process.env.PORT2, () => console.log(`Listening on port ${process.env.PORT2}`))
module.exports = app;
