import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

class PostsListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  handlePreviewCb = e => {
    e.preventDefault();
    this.props.handlePreviewCb(this.props.hashNum);
  };
  render() {
    return (
      <ListItem button divider onClick={e => this.handlePreviewCb(e)}>
        <ListItemText
          primary={this.props.title}
          secondary={this.props.author + " at " + this.props.time}
        />
      </ListItem>
    );
  }
}

export default PostsListItem;
