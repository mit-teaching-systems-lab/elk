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
    this.props.socket.emit('sendchat', this.props.gameID, message);
  }

  render() {
    var messageForm = <div style={{flex:1, borderTopStyle:"solid", borderTopWidth:1, borderTopColor:"lightGray"}}>
      <MessageForm
        onMessageSubmit={this.handleMessageSubmit}
        user={this.props.user}
      />
    </div>;
    var isActive = !this.props.isObserver && this.props.roundBegan && !this.props.roundOver;
    return (
      <div>
        <div style={{display:'flex', flexDirection:'column', height:"100%"}}>
        <h2> Conversation </h2>
          <div style={{borderTopStyle:"solid", borderTopWidth:1, borderTopColor:"lightGray", overflowY:"scroll", flex:3}}>
            <MessageList
              messages={this.state.messages}
            />
          </div>
          {isActive ? messageForm : null}
          
        </div>
      </div>
    );
  }
}

ChatApp.propTypes = {
  socket: React.PropTypes.object.isRequired,
  user: React.PropTypes.string.isRequired,
  isObserver: React.PropTypes.bool.isRequired,
  roundBegan: React.PropTypes.bool.isRequired,
  roundOver: React.PropTypes.bool.isRequired,
  gameID: React.PropTypes.number.isRequired
};

export default ChatApp;
