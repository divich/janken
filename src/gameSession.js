import React, {
    Component
} from "react";
import {
    withRouter
} from "react-router";
import "./App.css";

import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";


class GameSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    render() {
        return (
            <div>
                your game id: {this.props.match.params.id}
            </div>
        );
    }
}

export default withRouter(GameSession);
