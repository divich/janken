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
import Randomatic from "randomatic";
import IconButton from "@material-ui/core/IconButton";
import { SvgIcon } from "@material-ui/core";
import SettingsIcon from "../src/dist/settings";
import Logout from "../src/dist/logout";
import { db, auth, provider, fbProvider, users } from "./store.js";
import { Store } from "tough-cookie";
import Login from "./Login";

var user = null;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loginOpen: null
    };
  }

  componentWillMount() {
    // if (auth.currentUser) {
    //   this.setState({ loginOpen: false });
    // } else {
    //   this.setState({ loginOpen: true });
    // }

    auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        this.setState({ loginOpen: false });
        // let photoURL = user.photoURL; //eslint-disable-line
        // users
        //   .doc(user.uid)
        //   .add({
        //     onBoardingDone: false,
        //     userId: user.uid,
        //     displayName: user.displayName,
        //     email: user.email,
        //     photoURL
        //   })
        //   .then(() => {
        //     users
        //       .doc(user.uid)
        //       .get()
        //       .then(querySnapshot => {
        //         console.log(querySnapshot.data());
        //       });
        //   });
      } else {
        this.setState({ loginOpen: true });
      }
    });

    this.setState({ code: Randomatic("A0", 4) });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleLoginClose = () => {
    this.setState({ loginOpen: false });
  };

  logOut = () => {
    auth.signOut().then(
      function() {
        //  eslint-disable-line
        console.log("Signed Out");
      },
      function(error) {
        //  eslint-disable-line
        console.error("Sign Out Error", error);
      }
    );
  };

  googleSignIn = () => {
    auth
      .signInWithPopup(provider)
      // .then(() => auth.getRedirectResult())
      .then(result => {
        // The signed-in user info.
        console.log(result.user.displayName);
        console.log(result.user.uid);
        console.log(result.user.email);
        this.setState({ loginOpen: false });

        users.doc(result.user.uid).set({
          userId: result.user.uid,
          displayName: result.user.displayName,
          email: result.user.email
          // photoURL
        });
        // .then(() => {
        //   users
        //     .doc(user.uid)
        //     .get()
        //     .then(querySnapshot => {
        //       console.log(querySnapshot.data());
        //     });
        // });
      })
      // .then(() => {
      //   // this.handleAuthChange();
      //   users.add({
      //     userId: user.uid,
      //     displayName: user.displayName,
      //     email: user.email
      //   });
      // })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  handleAuthChange = () =>
    auth.onAuthStateChanged(function(user) {
      if (user) {
        // this.setState({ user: user });
        let photoURL = user.photoURL; //eslint-disable-line
        users
          .add({
            userId: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL
          })
          .then(() => {
            users
              .doc(user.uid)
              .get()
              .then(querySnapshot => {
                console.log(querySnapshot.data());
              });
          });
      } else {
        // No user is signed in.
      }
    });

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
        <Logout
          className="settings"
          onClick={e => {
            e.preventDefault();
            this.logOut();
          }}
          title="Logout"
        />
        {/* <SettingsIcon
          className="settings"
          onClick={e => {
            e.preventDefault();
            alert("Coming Soon!!!");
          }}
          title="Settings"
        /> */}
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
            this.handleClickOpen();
          }}
        >
          Play
        </Button>
        {/* <Button
          style={{ position: "absolute", bottom: "50px" }}
          variant="contained"
          color="primary"
          onClick={e => {
            e.preventDefault();
            this.googleSignIn();
          }}
        >
          Login
        </Button> */}

        <Dialog
          style={{
            textAlign: "center"
          }}
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Join or Host a game</DialogTitle>
          <DialogContent>
            <div
              style={{
                fontFamily: "'VT323', monospace",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <Button
                onClick={e => {
                  e.preventDefault();
                  this.props.history.push("/waitingScreen");
                }}
                color="primary"
              >
                Host a game
              </Button>
              Your Code: {this.state.code}
            </div>
            <br />
            <br />
            OR
            <br />
            <br />
            <Button
              onClick={e => {
                e.preventDefault();
                this.props.history.push("/waitingScreen");
              }}
              color="primary"
            >
              Join a game
            </Button>
          </DialogContent>
        </Dialog>

        <Dialog
          style={{
            textAlign: "center"
          }}
          disableBackdropClick
          open={this.state.loginOpen}
          onClose={this.handleLoginClose}
        >
          <DialogTitle>CHOOSE A MODE</DialogTitle>
          <DialogContent>
            <div
              style={{
                fontFamily: "'VT323', monospace",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <Button
                // style={{ position: "absolute", bottom: "50px" }}
                variant="contained"
                color="primary"
                onClick={e => {
                  e.preventDefault();
                  this.googleSignIn();
                }}
              >
                Login with Google
              </Button>
              <br />
              to play with other players
              <br />
              <br />
              <div style={{ fontSize: "30px" }}>OR</div>
              <br />
              <Button
                // style={{ position: "absolute", bottom: "50px" }}
                variant="contained"
                color="primary"
                onClick={e => {
                  e.preventDefault();
                  this.props.history.push("/gameScreen");
                }}
              >
                Play with Computer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(App);
