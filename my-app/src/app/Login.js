import React from "react";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      field_user: "",
      field_pass: ""
    };
    document.title = "Login";
  }
  componentWillMount = () => {
    console.log("componentWillMount()");
    var retrievedObject = sessionStorage.getItem("userInfo");
    if (retrievedObject != null) {
      window.alert(retrievedObject + "\nAlready Log in, redirect...");
      var username = JSON.parse(retrievedObject)["username"];
      this.props.history.push("/blog/");
    }
  };
  handleUserChange = event => {
    this.setState({
      field_user: event.target.value
    });
  };
  handlePasswordChange = event => {
    this.setState({
      field_pass: event.target.value
    });
  };

  toggleRegist = e => {
    // Math.random().toString(36).substr(2, 5);
    e.preventDefault();

    var re = RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$");
    if (this.state.field_user.match(re) === null) {
      window.alert(
        "Register failed! The account can only contain English letters and numbers!"
      );
      this.setState({
        field_user: "",
        field_pass: ""
      });
      return;
    }
    axios
      .post("/user/signup", {
        username: this.state.field_user,
        password: this.state.field_pass
      })
      .then(res => {
        if (res.data._message == null) {
          // no error
          window.alert("Register Successfully！");
          // this.loginPage();
        } else {
          // _message is ERROR message, error occurs!
          console.log(res.data._message);
          window.alert(res.data._message + " (is already in used or invalid)");
          this.setState({
            field_user: "",
            field_pass: ""
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    // loginPage = e => {
    //   this.props.history.push("/login");
    // };
  };

  toggleLogin = e => {
    e.preventDefault();

    axios
      .post("/user/login", {
        username: this.state.field_user,
        password: this.state.field_pass
      })
      .then(res => {
        if (res.data != "not found") {
          // no error

          sessionStorage.clear(); // clear old data
          var userInfo = {
            username: this.state.field_user,
            password: this.state.field_pass
          };
          sessionStorage.setItem("userInfo", JSON.stringify(userInfo));

          window.alert(userInfo["username"] + ": Login Successfully！");
          this.props.history.push("/blog/");
        } else {
          // _message is ERROR message, error occurs!
          console.log(res.data);
          window.alert(res.data);
          this.setState({
            error: true,
            field_user: "",
            field_pass: ""
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  toggleVisit = e => {
    e.preventDefault();
    this.props.history.push("/blog/");
  };
  render() {
    return (
      <div className="container">
        <div id="login" className="signin-card">
          <div className="logo-image">
            <img
              src="https://image.flaticon.com/icons/svg/148/148926.svg"
              alt="Logo"
              title="Logo"
              width="138"
            />
          </div>
          <h1 className="display1">Blog</h1>
          <form action="" method="" className="" role="form">
            <div id="form-login-username" className="form-group">
              <input
                id="username"
                className="form-control"
                name="username"
                placeholder="Username"
                value={this.state.field_user}
                type="text"
                size="18"
                alt="login"
                placeholder="account"
                onChange={e => this.handleUserChange(e)}
                required
              />
              <span className="form-highlight" />
              <span className="form-bar" />
              {/*<label for="username" className="float-label">
                login
    </label>*/}
            </div>
            <div id="form-login-password" className="form-group">
              <input
                id="passwd"
                className="form-control"
                name="password"
                type="password"
                value={this.state.field_pass}
                size="18"
                alt="password"
                placeholder="password"
                onChange={e => this.handlePasswordChange(e)}
                required
              />
              <span className="form-highlight" />
              <span className="form-bar" />
              {/*{" "}
              <label for="password" className="float-label">
                // password //{" "}
  </label>*/}
            </div>
            <div>
              <button
                onClick={e => this.toggleLogin(e)}
                className="btn btn-block btn-info ripple-effect logBtn"
                type="submit"
                name="submit"
                alt="sign in"
              >
                Login
              </button>
              <button
                onClick={e => this.toggleRegist(e)}
                className="btn btn-default ripple-effect regBtn"
                type="submit"
                name="register"
                alt="register"
              >
                Register
              </button>
              <button
                onClick={e => this.toggleVisit(e)}
                className="btn btn-default ripple-effect vstBtn"
                type="submit"
                name="visitor"
                alt="visitor"
              >
                Visitor
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
