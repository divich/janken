import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import GameScreen from "./gameScreen";
import * as serviceWorker from "./serviceWorker";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] }, // Purple and green play nicely together.
    secondary: { main: "#11cb5f" } // This is just green.A700 as hex.
  },
  typography: {
    fontFamily: ['"Major Mono Display"', "monospace"].join(",")
  }
});

const startApp = () => {
  ReactDOM.render(
    <Router>
      <Switch>
        <MuiThemeProvider theme={theme}>
          <Route exact path="/" component={App} />
          <Route exact path="/gameScreen" component={GameScreen} />
        </MuiThemeProvider>
        />
      </Switch>
    </Router>,
    document.getElementById("root")
  );
};

if (window.cordova) {
  document.addEventListener("deviceready", startApp, false);
} else {
  startApp();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
