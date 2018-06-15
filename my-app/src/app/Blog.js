import React from "react";
import axios from "axios";
import { render } from "react-dom";
import "../../StyleLib/app.css";
import Sidebar from "./Sidebar.js";
import { Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/ModeEdit";
import Button from "@material-ui/core/Button";
import AddPostBtn from "./AddPostBtn";
import PostsList from "./PostsList";
import EditPost from "./EditPost";
import ViewPost from "./ViewPost";

// Be sure to include styles at some point, probably during your bootstraping
// import "@trendmicro/react-sidenav/dist/react-sidenav.css";

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      // hostname: "",
      title: "",
      time: "",
      content: "",
      hash: "",
      postList: [],
      userList: [],
      mode: "view",
      open: false,
      author: "" //new added
    };
    this.handleEditPress = this.handleEditPress.bind(this);
  }
  componentDidMount() {
    var retrievedObject = sessionStorage.getItem("userInfo");
    if (retrievedObject == null) {
      var username = "__guest__";
    } else {
      retrievedObject = JSON.parse(retrievedObject);
      var username = retrievedObject.username;
    }

    // var host = this.props.location.pathname.split("/")[2];
    // if (host === undefined) {
    //   host = "";
    // }

    axios
      .get("/user/allusers", {
        params: {
          username: username
        }
      })
      .then(res => {
        for (var i = 0; i < res["data"].length; i++) {
          var user = JSON.parse(res["data"][i]);
          this.setState(
            {
              userList: this.state.userList.concat(user)
            },
            () => console.log(this.state.userList)
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get("/blog/list")
      .then(res => {
        res.data.sort((a, b) => a.timestamp - b.timestamp);
        for (let i = 0; i < res["data"].length; ++i) {
          var post = res["data"][i];
          this.setState({ postList: this.state.postList.concat(post) });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
    this.setState({ username: username }, () => {
      document.title = this.state.username + " in Aqua Blog";
    });
  }
  funcArticle() {
    if (this.state.mode === "view") {
      return (
        <ViewPost
          title={this.state.title}
          time={this.state.time}
          author={this.state.author}
          content={this.state.content}
          handleEditCb={this.handleEditCb}
          isSelf={this.state.username === this.state.author}
          deletePostCb={this.deletePostCb}
        />
      );
    } else if (this.state.mode === "edit") {
      return (
        <EditPost
          title={this.state.title}
          time={this.state.time}
          content={this.state.content}
          handleTitleCb={this.handleTitleCb}
          handleContentCb={this.handleContentCb}
          savePostCb={this.savePostCb}
        />
      );
    } else {
      return null;
    }
  }
  handleTitleCb = t => {
    this.setState({ title: t });
  };
  handleContentCb = c => {
    this.setState({ content: c });
  };
  handlePreviewCb = hash => {
    var tmpList = [];
    for (let i = 0; i < this.state.postList.length; ++i) {
      var post = this.state.postList[i];
      if (post["hash"] === hash) {
        this.setState({
          title: post["title"],
          time: post["time"],
          content: post["content"],
          hash: post["hash"],
          author: post["author"]
        });
      }
      tmpList.push(post);
    }
    this.setState({
      postList: tmpList,
      mode: "view"
    });
  };
  savePostCb = () => {
    // make hash for each post(article)
    var newPost = false;

    if (this.state.hash === "") {
      var hash = Math.random()
        .toString(36)
        .substr(2, 5);
      if (this.state.title === "" && this.state.content === "") newPost = false;
      else newPost = true;
    } else {
      var hash = this.state.hash;
    }
    var myres = null;
    this.setState({ hash: hash }, () => {
      axios
        .put("/blog/post", {
          title: this.state.title,
          content: this.state.content,
          hash: this.state.hash,
          author: this.state.username
        })
        .then(res => {
          // console.log(res.data);
          myres = res.data;
          myres["pressed"] = "false";

          if (newPost == true) {
            this.setState({
              postList: this.state.postList.concat(myres),
              title: "",
              time: "",
              content: "",
              hash: "",
              mode: "",
              author: this.state.username //new added
            });
          } else {
            var tmpList = [];
            for (let i = 0; i < this.state.postList.length; ++i) {
              var post = this.state.postList[i];
              if (post["hash"] === hash) {
                // same post, remain unchaged
                post = myres;
              }
              tmpList.push(post);
            }
            tmpList.sort((a, b) => a.timestamp - b.timestamp);
            this.setState({
              postList: tmpList,
              title: "",
              content: "",
              time: "",
              hash: "",
              mode: "",
              author: ""
            });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    });
  };
  handleEditCb = e => {
    e.preventDefault();
    this.setState({ mode: "edit" });
  };
  deletePostCb = () => {
    console.log("Want to delete!");
    axios
      .delete("/blog/post", {
        params: {
          hash: this.state.hash
        }
      })
      .then(res => {
        console.log(this.state.hash);
        var tmpList = [];
        var orig_title = [];
        for (var i = 0; i < this.state.postList.length; i++) {
          var post = this.state.postList[i];
          if (post["hash"] === this.state.hash) {
            orig_title = post["title"];
            continue;
          } else {
            post["pressed"] = false;
          }
          tmpList.push(post);
        }
        this.setState(
          {
            postList: tmpList,
            title: "",
            content: "",
            time: "",
            author: "",
            hash: "",
            mode: "view"
          },
          () => {
            window.alert("Post " + orig_title + " has been deleted.");
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleEditPress() {
    this.setState({
      mode: "edit",
      title: "",
      content: "",
      hash: ""
    });
    console.log("pressed");
  }
  addButton() {
    if (this.state.username === "__guest__") return null;
    return <AddPostBtn edit={this.handleEditPress} />;
  }
  handleFab = e => {
    e.preventDefault();
    this.setState({
      mode: "edit",
      hash: "",
      title: "",
      time: "",
      content: ""
    });
  };
  // handleClick = e => {
  //   this.setState({
  //     open: true
  //   });
  // };
  // handleClose = value => {
  //   this.setState(
  //     {
  //       //hostname: value,
  //       open: false
  //     },
  //     () => {
  //       this.props.history.push("/blog/");
  //       location.reload();
  //     }
  //   );
  // };
  render() {
    return (
      <div>
        <Sidebar
          username={this.state.username}
          history={this.props.history}
          handleClick={e => this.handleClick(e)}
        />
        <Grid container spacing={24}>
          <Grid item xs={12} sm={9}>
            {this.funcArticle()}
          </Grid>
          <Grid item xs={12} sm={3}>
            <PostsList
              mode={this.state.mode}
              handlePreviewCb={this.handlePreviewCb}
              postList={this.state.postList}
            />
          </Grid>
        </Grid>
        {this.addButton()}
        <div className="blog-title">Pinky Blogger</div>
      </div>
    );
  }
}

export default Blog;
