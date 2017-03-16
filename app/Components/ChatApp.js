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
        <div style={{display:'flex', flexDirection:'column', height:"100%"}}>
        <h2> Conversation: </h2>
          <div style={{overflowY:"scroll", flex:3}}>
            <MessageList
              messages={this.state.messages}
            />
          </div>
          <div style={{flex:1}}>
            <MessageForm
              onMessageSubmit={this.handleMessageSubmit}
              user={this.props.user}
            />
          </div>
        </div>
      </div>
    );
  }
}

ChatApp.propTypes = {
  socket: React.PropTypes.object.isRequired,
  user: React.PropTypes.string.isRequired
};

export default ChatApp;
