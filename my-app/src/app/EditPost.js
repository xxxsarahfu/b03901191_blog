import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Icon from "@material-ui/core/Icon";
import Save from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import classNames from "classnames";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 20,
    paddingBottom: 16,
    marginTop: 50,
    marginLeft: 80,
    marginRight: 0 //theme.spacing.unit * 8
  }),
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});
class EditPost extends React.Component {
  constructor(props) {
    super(props);
  }
  handleTitleChange = event => {
    this.props.handleTitleCb(event.target.value);
  };
  handleContentChange = event => {
    this.props.handleContentCb(event.target.value);
  };
  savePostCb = event => {
    this.props.savePostCb();
  };
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root} elevation={4}>
        <TextField
          id="name"
          label="Title"
          className={classes.textField}
          value={this.props.title}
          onChange={e => this.handleTitleChange(e)}
          margin="normal"
        />
        <TextField
          id="multiline-static"
          label="Content"
          multiline
          rows="15"
          value={this.props.content}
          onChange={e => this.handleContentChange(e)}
          className={classes.textField}
          margin="normal"
        />
        {/*<Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          onClick={e => this.cancelPostCb(e)}
        >
          <Delete className={classNames(classes.leftIcon, classes.iconSmall)} />
          Cancel
        </Button>*/}
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={e => this.savePostCb(e)}
        >
          <Save className={classNames(classes.leftIcon, classes.iconSmall)} />
          Save
        </Button>
      </Card>
    );
  }
}

EditPost.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditPost);
