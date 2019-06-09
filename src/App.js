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
import CircularProgress from '@material-ui/core/CircularProgress';
import FolderIcon from '@material-ui/icons/Folder';
import Randomatic from "randomatic";
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from "@material-ui/core/IconButton";
import { SvgIcon } from "@material-ui/core";
import SettingsIcon from "../src/dist/settings";
import {
  signIn,
  auth,
  googleSignIn,
  users,
  createNewDbUser
} from './store.js';
import { sign } from "crypto";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      code: null,
      joinCode: null,
      isUser: false
    };
  }
  componentWillMount() {
    this.setState({ code: Randomatic("A0", 4) });
    // this.isUser();
    auth.onAuthStateChanged(loggedInUser => {
      this.setState({
        authUser: loggedInUser,
        user: loggedInUser
      });
      if (loggedInUser) {
        // check if user is logged in
        const user = this.returnDbEntry(loggedInUser);
        if (user) {
          // check if db has an entry
          console.log(users.doc(loggedInUser.uid));
        } else {
          // if db doesn't have entry, create entry
          createNewDbUser();
          this.returnDbEntry(loggedInUser);
        }
      } else {
        // signInAnonymously(); // signInAnonymously
      }
    });
    // console.log(this.state.user);
  }

  returnDbEntry = loggedInUser => {
    users.doc(loggedInUser.uid).onSnapshot(doc => {
      const user = loggedInUser;
      if (doc.exists) {
        user.db = doc.data();
        this.setState({
          user
        });
        return true;
      } else {
        return false;
      }
    });
  };

  handleTextChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

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
      <div>
        {!this.state.authUser ? (
          <Button
            style={{
              position: "absolute",
              bottom: "30px"
            }}
            variant="contained"
            color="primary"
            onClick={e => {
              e.preventDefault();
              // this.props.history.push("/gameScreen");
              googleSignIn();
            }}
          >
            sign in
          </Button>
        ) : (
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
            <Avatar
              style={{
                position: "absolute",
                top: "10px",
                right: "10px"
              }}
              src={this.state.user.photoURL}
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
            {/* <Button
          style={{ position: "absolute", bottom: "30px" }}
          variant="contained"
          color="primary"
          onClick={e => {
            e.preventDefault();
            // this.props.history.push("/gameScreen");
            googleSignIn();
          }}
        >
          sign in
        </Button> */}
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
                  name="joinCode"
                  value={this.state.joinCode}
                  onChange={this.handleTextChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={e => {
                    e.preventDefault();
                    {this.state.joinCode === null
                       ? this.props.history.push(
                           `/gameSession/${
                             this.state.code
                           }`
                         )
                       : this.props.history.push(
                           `/gameSession/${
                             this.state.joinCode
                           }`
                         );}
                  }}
                  color="primary"
                >
                  Play
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(App);
