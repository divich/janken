import React, { Component } from "react";
import { withRouter } from "react-router";
import "./App.css";
import one from "./1.mp3";
import two from "./2.mp3";
import three from "./3.mp3";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

const rock = (
  <img
    // onClick={e => {
    //   e.preventDefault();
    //   alert("rock");
    // }}
    src="./rock.svg"
    height="100px"
    width="100px"
  />
);
const paper = (
  <img
    // onClick={e => {
    //   e.preventDefault();
    //   alert("paper");
    // }}
    src="./paper.svg"
    height="100px"
    width="100px"
  />
);
const scissors = (
  <img
    // onClick={e => {
    //   e.preventDefault();
    //   alert("scissors");
    // }}
    src="./scissors.svg"
    height="100px"
    width="100px"
  />
);

const items = [rock, paper, scissors];
var item = items[Math.floor(Math.random() * items.length)];
console.log(item);

var oneAudio = new Audio(one);
var twoAudio = new Audio(two);
var threeAudio = new Audio(three);

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sec: 3,
      roundSec: 8,
      weapon: null
      // gameStartsIn: null
    };
  }

  componentWillMount() {
    oneAudio.playbackRate = 2;
    twoAudio.playbackRate = 2;
    threeAudio.playbackRate = 2;
  }

  handletimer = () => {
    this.interval1 = setInterval(() => {
      let roundSec = this.state.roundSec;
      this.state.roundSec < 0
        ? this.setState({
            gameStart: "ended"
          })
        : console.log(1);
      this.setState({ roundSec: roundSec - 1 });
    }, 1000);
    clearInterval(this.interval1);
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      let sec = this.state.sec;
      // sec === 1
      //   ? oneAudio.play()
      //   : sec === 2
      //   ? twoAudio.play()
      //   : sec === 3
      //   ? threeAudio.play()
      //   : this.setState({ audio: "off" });
      let roundSec = this.state.roundSec;
      this.state.sec <= 1
        ? this.setState({
            gameStart: "started"
          })
        : this.state.sec < -5
        ? this.setState({
            gameStart: "ended"
          })
        : this.setState({ gameStart: "notStarted" });
      this.setState({ sec: sec - 1, roundSec: roundSec - 1 });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    // setTimeout(clearInterval(this.interval1), 7500);
  }

  render() {
    return (
      <div style={{ height: "100vh", textAlign: "center" }}>
        {this.state.sec < 1 ? null : (
          <div style={{ height: "100%" }}>
            <div style={{ fontSize: "50px" }}>game starts in:</div>
            <div
              style={{
                fontSize: "200px",
                display: "flex",
                height: "90%",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {/* {this.state.sec === 3
                ? threeAudio.play()
                : this.state.sec === 2
                ? twoAudio.play()
                : this.state.sec === 1
                ? oneAudio.play()
                : null} */}
              {this.state.sec}
            </div>
          </div>
        )}
        {/* {this.state.roundSec < 6 && this.state.roundSec > 0 ? (
          <div>Select your weapon in {this.state.roundSec} seconds</div>
        ) : null} */}
        {this.state.gameStart === "started" ? (
          this.state.weapon === null ? (
            <div
              style={{
                height: "90%",
                width: "100%",
                position: "absolute",
                bottom: "0px"
              }}
            >
              <div style={{ height: "10%" }}>
                <div>please choose your weapon:</div>
              </div>
              <div
                style={{
                  height: "90%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "center"
                }}
              >
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "20px",
                    filter: "drop-shadow(0px 4px 4px #000)",
                    backgroundColor: "aliceblue"
                  }}
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ weaponText: "rock", weapon: rock });
                  }}
                >
                  {rock}
                </div>
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "20px",
                    filter: "drop-shadow(0px 4px 4px #000)",
                    backgroundColor: "aliceblue"
                  }}
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ weaponText: "paper", weapon: paper });
                  }}
                >
                  {paper}
                </div>
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "20px",
                    filter: "drop-shadow(0px 4px 4px #000)",
                    backgroundColor: "aliceblue"
                  }}
                  onClick={e => {
                    e.preventDefault();
                    this.setState({
                      weaponText: "scissors",
                      weapon: scissors
                    });
                  }}
                >
                  {scissors}
                </div>
              </div>
            </div>
          ) : (
            <div
              style={
                {
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column"
                }
                // backgroundColor: "aliceblue"
              }
            >
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "rgba(14, 14, 14, 0.51)",
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "xx-large",
                  fontWeight: "bold",
                  color: "cornsilk"
                }}
              >
                {item === this.state.weapon
                  ? "DRAW"
                  : item === rock && this.state.weapon === paper
                  ? "You Win"
                  : item === paper && this.state.weapon === rock
                  ? "COMPUTER Wins"
                  : item === paper && this.state.weapon === scissors
                  ? "You Win"
                  : item === scissors && this.state.weapon === paper
                  ? "COMPUTER Wins"
                  : item === scissors && this.state.weapon === rock
                  ? "You Win"
                  : item === rock && this.state.weapon === scissors
                  ? "COMPUTER Wins"
                  : null}
                <Button
                  style={{ position: "absolute", bottom: "50px" }}
                  variant="contained"
                  color="primary"
                  onClick={e => {
                    e.preventDefault();
                    window.location.reload();
                  }}
                >
                  Play Again
                </Button>
              </div>
              <div
                style={
                  {
                    height: "50%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                  }
                  // backgroundColor: "aliceblue"
                }
              >
                <div style={{ fontSize: "xx-large" }}>Computer Chose:</div>
                {item}
              </div>
              <Divider />
              <div
                style={
                  {
                    height: "50%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                  }
                  // backgroundColor: "aliceblue"
                }
              >
                <div style={{ fontSize: "xx-large" }}>You Chose:</div>
                {this.state.weapon}
              </div>
            </div>
          )
        ) : null}
      </div>
    );
  }
}

export default withRouter(GameScreen);
