import React from 'react'
import MessageList from './MessageList';
import MessageForm from './MessageForm';
// import io from 'socket.io-client'
// let socket = io.connect('http://localhost:3333')

class ChatApp extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<MessageList
					messages={this.props.messages}
				/>
				<MessageForm
					onMessageSubmit={this.props.onMessageSubmit}
					user={this.props.user}
				/>
			</div>
		);

	}
};

export default ChatApp;
