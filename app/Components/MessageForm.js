import React from 'react';
 
class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onHandleSubmit(e) {
    e.preventDefault();
    var message = {
      user : this.props.user,
      text : this.state.text
    };
    this.props.onMessageSubmit(message);  
    this.setState({ text: '' });
  }

  onChangeHandler(e) {
    this.setState({ text : e.target.value });
  }

  render() {
    return(
      <div className='message_form'>
        <h3>Write New Message</h3>
        <form onSubmit={this.onHandleSubmit}>
          <input
            onChange={this.onChangeHandler}
            value={this.state.text}
          />
        </form>
      </div>
    );
  }
}

MessageForm.propTypes = {
  user: React.PropTypes.string.isRequired,
  onMessageSubmit: React.PropTypes.func.isRequired
};

export default MessageForm;
