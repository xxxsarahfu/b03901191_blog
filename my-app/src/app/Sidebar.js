import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";

const styles = {
  list: {
    width: 270
  },
  menuButton: {
    marginTop: 10,
    marginLeft: 12,
    marginRight: 20
  }
};

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false
    };
  }
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };
  redirectAuth = e => {
    e.preventDefault();
    sessionStorage.clear();
    this.props.history.push("/login/");
  };
  returnUser = e => {
    e.preventDefault();
    this.props.history.push("/blog/");
    location.reload();
  };
  handleClickOpen = e => {
    e.preventDefault();
    this.props.handleClick(e);
  };
  // returnGithub = e => {
  //   e.preventDefault();
  //   var urlStr = this.props.history;
  //   let urlStr = "";
  //   this.props.history.push("https://github.com/xxxsarahfu");
  // };

  loginButton = () => {
    if (this.props.username === "__guest__") {
      return (
        <List>
          <ListItem dense button onClick={e => this.returnUser(e)}>
            <ListItemText primary={"Welcome, Guest!"} />
          </ListItem>
          <ListItem button onClick={e => this.redirectAuth(e)}>
            Login
          </ListItem>
        </List>
      );
    } else {
      return (
        <List>
          <ListItem dense button onClick={e => this.returnUser(e)}>
            <Avatar alt="user" src="/profile_pic.jpg" />
            <ListItemText primary={"Welcome, " + this.props.username} />
          </ListItem>
          <ListItem button onClick={e => this.redirectAuth(e)}>
            Log Out
          </ListItem>
        </List>
      );
    }
  };

  render() {
    const { classes } = this.props;

    const sideList = <div className={classes.list}>{this.loginButton()}</div>;

    return (
      <div>
        <IconButton
          className={classes.menuButton}
          onClick={this.toggleDrawer("left", true)}
          color="inherit"
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
