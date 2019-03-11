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
import IconButton from "@material-ui/core/IconButton";
import { SvgIcon } from "@material-ui/core";
import SettingsIcon from "../src/dist/settings";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentWillMount() {
    this.setState({ code: Randomatic("A0", 4) });
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
        <SettingsIcon
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
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(App);
