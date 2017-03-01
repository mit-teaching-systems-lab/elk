import React from 'react';
import {Link} from 'react-router';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  onClick(e) {
    this.setState({
      count: this.state.count + 1
    });
  }



  render() {
    return (
        <div>
            <Link to={`/chatapp/1`}>chatapp1</Link>
            <Link to={`/chatapp/2`}>chatapp2</Link>
            <h1>{this.state.count}</h1>
            <button onClick={this.onClick.bind(this)}>Count Up!!</button>
        </div>
    );
  }
}

export default Counter;