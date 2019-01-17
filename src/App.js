import React, { Component } from "react";
import { withRouter } from "react-router";
import "./App.css";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { SvgIcon } from "@material-ui/core";
import SettingsIcon from "../src/dist/settings";

class App extends Component {
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
            this.props.history.push("/gameScreen");
          }}
        >
          Play
        </Button>
      </div>
    );
  }
}

export default withRouter(App);
