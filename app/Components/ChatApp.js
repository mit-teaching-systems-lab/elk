import React from 'react';
import MessageList from './MessageList';
import MessageForm from './MessageForm';



class ChatApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {messages:[]};
    this.props.socket.on('updatechat', (data) => this._messageRecieve(data));
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  _messageRecieve(message) {
    var {messages} = this.state;
    messages.push(message);
    this.setState({messages});
  }

  handleMessageSubmit(message) {
    this.props.socket.emit('sendchat', message);
  }

  render() {
    return (
      <div>
        <div style={{overflow:"scroll", height:500}}>
          <MessageList 
            messages={this.state.messages}
          />
        </div>
        <MessageForm
          onMessageSubmit={this.handleMessageSubmit}
          user={this.props.user}
        />
      </div>
    );
  }
}

ChatApp.propTypes = {
  socket: React.PropTypes.object,
  user: React.PropTypes.object
};

export default ChatApp;
