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
    this.refs.text.focus();
  }

  onChangeHandler(e) {
    this.setState({ text : e.target.value });
  }

  render() {
    return(
      <div className='message_form' style={{paddingRight:10}}>
        <h3>Write New Message</h3>
        <form onSubmit={this.onHandleSubmit}>
          <textarea ref="text" style={{width:"100%", height:50}}
            onChange={this.onChangeHandler}
            value={this.state.text}
          />
        <input style={{height:50}} type="submit" disabled={this.state.text.length <= 0}/>
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
