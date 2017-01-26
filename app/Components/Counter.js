import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    onClick(e) {
        this.setState({
            count: this.state.count + 1
        });
        if (this.state.count == 3) {
            console.log("please");
        }
    }



    render() {
        return (
            <div>
                <Link to={`/chatapp`}>now link</Link>
                <h1>{this.state.count}</h1>
                <button onClick={this.onClick.bind(this)}>Count Up!!</button>
            </div>
        )
    }
}

export default Counter;