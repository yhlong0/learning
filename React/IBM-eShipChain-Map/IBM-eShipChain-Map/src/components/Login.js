import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { CardContent } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { actions, selectors } from "../redux";
import { Redirect } from "react-router-dom";
import "./Login.css";
// import { url } from "inspector";
import img from '../img/LabBG.jpg';

const styles = theme => ({
  backgroundImage: {
    width: "100%",
    backgroundImage: 'url(' + img + ')',
    backgroundSize: 'cover',

  },
  container: {
    flexWrap: "wrap",
    padding: " 110px 50px 110px 50px",
  },
  cardContainer: {
    flexWrap: "wrap",
    padding: " 40px 25px 40px 25px"
  },
  heading: {
    margin: "50px 0 50px 0",
    fontSize: "35px",
    fontFamily: "Merriweather",
    fontWeight: 900,
    fontStyle: "italic"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  error: {
    color: "red",
    paddingBottom: "10px"
  },
  buttonContainer: {
    paddingTop: "30px",
  },
  buttonItem: {
    width: "175px",
    marginLeft: "30px",
    minHeight: "40px"
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      formErrors: {
        username: null,
        password: null
      },
      buttonEnabled: false,
      errorState: false,
      loading: false
    };
  }

  handleTextFieldChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    let formErrors = this.state.formErrors;
    formErrors[name] = value === "";

    let buttonEnabled = Object.keys(formErrors).every(
      k => formErrors[k] === false
    );

    this.setState({
      [name]: value,
      formErrors: formErrors,
      buttonEnabled: buttonEnabled
    });
  };

  handleLogin = () => {
    this.props.loginUser({
      username: this.state.username,
      password: this.state.password
    });
  };

  setErrorState() {
    this.setState({
      buttonEnabled: true,
      errorState: true,
      loading: false
    });
  }
  onKeyPress = e => {
    if (e.key === "Enter") {
      this.handleLogin();
    }
  };
  render() {
    const { classes } = this.props;

    if (this.props.userProfile) return <Redirect to="/shipments" />;
    else {
      return (
        <div className={classes.backgroundImage}>
          <div className="pageContainer">
            <div className={classes.container}>
              <div className={classes.heading}>
                Log into your eShipGlobal account
          </div>

              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <form className={classes.cardContainer} noValidate autoComplete="off">
                    <TextField
                      name="username"
                      label="Username"
                      placeholder="Enter your username here"
                      value={this.state.username}
                      onChange={event => this.handleTextFieldChange(event)}
                      error={this.state.formErrors.username}
                      helperText={
                        this.state.username === "" ? this.errorMessage : ""
                      }
                      margin="normal"
                      fullWidth
                    />

                    <TextField
                      name="password"
                      type="password"
                      label="Password"
                      placeholder="Enter your password here"
                      value={this.state.password}
                      onChange={event => this.handleTextFieldChange(event)}
                      onKeyPress={this.onKeyPress}
                      error={this.state.formErrors.password}
                      helperText={
                        this.state.password === "" ? this.errorMessage : ""
                      }
                      margin="normal"
                      fullWidth
                    />

                    {this.props.error && (
                      <Typography className={classes.error}>
                        *Error: Username or password incorrect.
                  </Typography>
                    )}

                    <Grid
                      container
                      justify="flex-end"
                      justifyContent="flex-end"
                      className={classes.buttonContainer}
                    >
                      <Grid item>
                        <Button
                          className={classes.buttonItem}
                          variant="contained"
                          color="primary"
                          onClick={event => this.handleLogin(event)}
                          disabled
                        >
                          Forgot Password
                      {this.state.loading && (
                            <CircularProgress
                              size={24}
                              className={classes.buttonProgress}
                            />
                          )}
                        </Button>

                        <Button
                          className={classes.buttonItem}
                          variant="contained"
                          color="primary"
                          onClick={event => this.handleLogin(event)}
                          disabled={!this.state.buttonEnabled}
                        >
                          Login
                      {this.state.loading && (
                            <CircularProgress
                              size={24}
                              className={classes.buttonProgress}
                            />
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      );
    }
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

let LoginFinal = withStyles(styles)(Login);
function mapStateToProps(state) {
  return {
    userProfile: selectors.getUserProfile(state),
    error: state.error
  };
}
function mapDispatchToProps(dispatch) {
  return {
    loginUser: credentials => {
      dispatch(actions.loginUser(credentials));
    }
  };
}

LoginFinal = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFinal);
export default LoginFinal;
