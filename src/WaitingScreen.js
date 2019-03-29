import React, { Component } from "react";
import { withRouter } from "react-router";
import "./App.css";
import Button from "@material-ui/core/Button";
import { LightSensor } from "libreact/lib/LightSensor";
// import { GeoLocationSensor } from "libreact/lib/GeoLocationSensor";
import { MotionSensor } from "libreact/lib/MotionSensor";
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
    this.state = {};
  }

  render() {
    return <div />;
  }
}

export default withRouter(App);
