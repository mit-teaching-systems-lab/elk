import React from 'react';
import Message from './Message';
 
class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
    <div className='messages' style={{
      overflowScrolling: "touch", 
      WebkitOverflowScrolling: "touch", 
      overflowy: "scroll", 
      maxHeight: 400}}>
        <h2> Conversation: </h2>
        {
          this.props.messages.map((message, i) => {
            return (
              <Message
                key={i}
                user={message.user}
                text={message.text} 
              />
            );
          })
        } 
      </div>
    );
  }
}

MessageList.propTypes = {
  messages: React.PropTypes.object
};

export default MessageList;
