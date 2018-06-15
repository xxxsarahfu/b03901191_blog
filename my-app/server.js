var express = require("express");
var path = require("path");
var app = express();
var http = require("http").Server(app);
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const con = mongoose.createConnection("mongodb://localhost/postdb");

const UserSocket = require("./src/socket/UserSocket.js");
const userSocket = new UserSocket(con);
const PostSocket = require("./src/socket/PostSocket.js");
const postSocket = new PostSocket(con);
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.post("/user/signup", function(req, res) {
  var newUser = {
    username: req.body.username,
    password: req.body.password
  };

  userSocket.storeUsers(newUser, res);
});
app.post("/user/login", function(req, res) {
  var myUser = {
    username: req.body.username,
    password: req.body.password
  };

  userSocket.checkUsers(myUser, res);
});

app.put("/blog/post", (req, res) => {
  var date = new Date();
  var localeSpecificTime = date.toLocaleTimeString();
  var localeSpecificDate = date.toLocaleDateString();
  var TimeStr = localeSpecificTime + "at " + localeSpecificDate;

  var newPost = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    hash: req.body.hash,
    time: TimeStr,
    timestamp: new Date().getTime().toString()
  };
  postSocket.putPosts(newPost, res);
});

app.delete("/blog/post", (req, res) => {
  const hash = req.query.hash;
  postSocket.deleteArticle(hash, res);
});

app.get("/user/allusers", function(req, res) {
  const me = req.query.username;

  userSocket.loadUserList(me, res);
});
app.get("/blog/list", function(req, res) {
  postSocket.loadPostList(res);
});

// https://stackoverflow.com/questions/43557390/react-router-and-express-get-conflict
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

http.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
  console.log("listen on port " + port);
});
