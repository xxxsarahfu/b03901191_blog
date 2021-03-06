const PostSchema = require("../models/Post.js");
const mongoose = require("mongoose");

var Post = null;
class PostSocket {
  constructor(con) {
    Post = con.model("Post", PostSchema);
  }

  putPosts(data, res) {
    // console.log(data);

    var query = { hash: data.hash };
    var update = {
      title: data.title,
      content: data.content,
      author: data.author,
      hash: data.hash,
      time: data.time,
      timestamp: data.timestamp
    };
    var options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // Find the document
    Post.findOneAndUpdate(query, update, options, function(error, result) {
      if (error) {
        console.log(error);
        res.send(error);
        return;
      } else {
        // console.log(result);
        res.send(result);
      }
    });
  }

  loadPostList(res) {
    Post.find({}, function(error, posts) {
      if (error) {
        console.log(error);
        res.send(error);
        return;
      } else {
        // console.log(posts);
        res.send(posts);
      }
    });
  }

  deleteArticle(hash, res) {
    const query = { hash: hash };
    Post.findOneAndRemove(query, function(error, result) {
      if (error) {
        console.log(error);
        res.send(error);
        return;
      } else {
        // console.log(result);
        res.send(result);
      }
    });
  }
}
module.exports = PostSocket;
