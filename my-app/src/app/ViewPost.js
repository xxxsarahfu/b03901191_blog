import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: theme.spacing.unit * 6
  }),
  button: {
    margin: theme.spacing.unit
  }
});

class ViewPost extends React.Component {
  constructor(props) {
    super(props);
    this.showCard = this.showCard.bind(this);
  }
  handleEditCb = e => {
    e.preventDefault();
    this.props.handleEditCb();
  };
  deletePostCb = e => {
    e.preventDefault();
    this.props.deletePostCb();
  };
  funcButton(classes) {
    if (this.props.isSelf === false) return null;
    return (
      <div>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          onClick={this.props.deletePostCb}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={this.props.handleEditCb}
        >
          Edit
        </Button>
      </div>
    );
  }
  showCard = classes => {
    if (this.props.time === "") return null; // null article
    return (
      <Card className={classes.root} elevation={4}>
        <Typography variant="display2">{this.props.title}</Typography>
        <Typography variant="headline">{this.props.author}</Typography>
        <Typography variant="caption">{this.props.time}</Typography>
        <Typography variant="body1">{this.props.content}</Typography>
        {this.funcButton(classes)}
      </Card>
    );
  };
  render() {
    const { classes } = this.props;
    return <div>{this.showCard(classes)}</div>;
  }
}

ViewPost.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ViewPost);
