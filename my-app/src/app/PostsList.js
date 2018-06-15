import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import PostsListItem from "./PostsListItem.js";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: "90%", //360
    backgroundColor: theme.palette.background.paper,
    padding: 20,
    marginTop: 50,
    marginLeft: 20,
    marginRight: 40 //theme.spacing.unit * 8
  }
});

class PostsList extends React.Component {
  constructor(props) {
    super(props);
  }
  handlePreviewCb = key => {
    this.props.handlePreviewCb(key);
  };
  handleClick = e => {};
  render() {
    const { classes } = this.props;
    var list = this.props.postList.map(item => (
      <PostsListItem
        hashNum={item.hash}
        key={item.hash}
        title={item.title}
        time={item.time}
        author={item.author} // new added
        handlePreviewCb={this.handlePreviewCb}
      />
    ));
    return (
      <div className={classes.root}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Post List</ListSubheader>}
        >
          {list}
        </List>
      </div>
    );
  }
}

PostsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostsList);
