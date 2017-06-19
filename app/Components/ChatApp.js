import React from 'react';
import MessageList from './MessageList';
import MessageForm from './MessageForm';

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages:[], isTyping:false};
    this.props.socket.on('updatechat', (data) => this._messageRecieve(data));
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.sendTypingState  = this.sendTypingState.bind(this);
    this.props.socket.on('receiveTypingState', (user, typingState) => this.receiveTypingState(user, typingState));
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const node = this.refs.hello;
    node.scrollIntoView({behavior: "smooth"});
  }

  _messageRecieve(message) {
    var {messages} = this.state;
    messages.push(message);
    this.setState({messages});
  }

  handleMessageSubmit(message) {
    this.props.socket.emit('sendchat', this.props.gameID, message);
  }

  sendTypingState(typingState) {
    this.props.socket.emit('sendtypingstate', this.props.gameID, this.props.user, typingState);
  }

  receiveTypingState(user, typingState) {
    if (user != this.props.user)
      this.setState({isTyping: typingState});
  }

  render() {
    var typer;
    if (this.props.user == "student") {
      typer = "teacher";
    } else {
      typer = "student";
    }
    var messageForm = <div style={{flex:1, borderTopStyle:"solid", borderTopWidth:1, borderTopColor:"lightGray"}}>
      {this.state.isTyping ? <i>{typer} is typing</i> : <i style={{visibility:"hidden"}}>lol</i>}
      <MessageForm
        onMessageSubmit={this.handleMessageSubmit}
        sendTypingState={this.sendTypingState}
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
            <div style={ {float:"left", clear: "both"} }
                ref="hello"></div>
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
  gameID: React.PropTypes.any.isRequired
};

export default ChatApp;
