import React, { Component } from "react";
import { withRouter } from "react-router";
import "./App.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import GenerateRandomCode from "GenerateRandomCode";
import Randomatic from "randomatic";
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from "@material-ui/core/IconButton";
import { SvgIcon } from "@material-ui/core";
import SettingsIcon from "../src/dist/settings";
import { signIn, auth } from './store.js';
import { sign } from "crypto";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      picLoading: true
    };
  }

  componentWillMount() {
    this.setState({ code: Randomatic("A0", 4) });
    this.isUser();
  }

isUser = () => {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      console.log(user);
      this.setState({
        photoURL: user.photoURL,
        picLoading: false
      })
    } else {
      // No user is signed in.
    }
  });
}

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  // generateCode = () => {
  //   console.log(Randomatic("a0", 4));
  //   // console.log(GenerateRandomCode.TextNumCode(2, 2));
  // };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <div
        style={{
          backgroundImage: "url('rps1.jpg')",
          backgroundSize: "contain",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {/* <IconButton
          onClick={e => {
            e.preventDefault();
            alert("hey");
          }}
          style={{ fontSize: "35px" }}
        > */}
        {/* <SettingsIcon
          className="settings"
          onClick={e => {
            e.preventDefault();
            alert("Coming Soon!!!");
          }} // style={{ // onMouseEnter={() => alert("hey")}
          //   fontSize: "55px",
          //   filter: "drop-shadow(0px 4px 4px #000)",
          //   position: "absolute",
          //   right: "10px"
          // }}
          title="Settings"
        /> */}
        < Avatar style = {
          {
            position: 'absolute',
            top: '10px',
            right: '10px'
          }
        }
        src = {
          this.state.photoURL === false ? null : this.state.photoURL
        }
        />
        <div
          style={{
            color: "firebrick",
            fontSize: "70px",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold"
          }}
        >
          Let's Settle This!
        </div>
        <Button
          style={{ position: "absolute", bottom: "50px" }}
          variant="contained"
          color="primary"
          onClick={e => {
            e.preventDefault();
            // this.props.history.push("/gameScreen");
            this.handleClickOpen();
          }}
        >
          Play
        </Button>
        <Button
          style={{ position: "absolute", bottom: "30px" }}
          variant="contained"
          color="primary"
          onClick={e => {
            e.preventDefault();
            // this.props.history.push("/gameScreen");
            signIn();
          }}
        >
          sign in
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Join or Host a game</DialogTitle>
          <DialogContent>
            <DialogContentText>Host a game</DialogContentText>
            {/* <Button
              // style={{ position: "absolute", bottom: "50px" }}
              variant="contained"
              color="primary"
              onClick={e => {
                e.preventDefault();
                // this.props.history.push("/gameScreen");
                this.generateCode();
              }}
            >
              generate code
            </Button> */}
            Your Code: {this.state.code}
            <br />
            <br />
            OR
            <br />
            <br />
            <DialogContentText>Join a game</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Enter code here"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            < Button onClick = {
              e => {
                e.preventDefault();
                this.props.history.push("/gameScreen");
              }
            }
            color = "primary" >
              Play
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(App);
