import React from 'react'
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import io from 'socket.io-client'
let socket = io.connect('http://localhost:3333')

class ChatApp extends React.Component {

	constructor(props) {
		super(props);
		this.state = {users: [], messages:[], text: ''};
		socket.on('init', (username) =>this._initialize(username));
		socket.on('updatechat', (data) => this._messageRecieve(data));
		socket.on('getroom', () => this._getRoom());
		socket.on('connect', () => this._connect());
		this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
		this._connect = this._connect.bind(this);
	}

	_connect() {
		socket.emit('setroom', this.props.chatID);
		socket.emit('adduser', prompt("What's your name?"));
	}

	_initialize(username) {
		this.setState({user: username})
	}

	_getRoom() {
		socket.emit('setroom', this.props.chatID);
		console.log("sent room")
	}

	_messageRecieve(message) {
		console.log("_messageRecieve")
		console.log(this.state)
		var {messages} = this.state;
		messages.push(message);
		this.setState({messages});
	}

	_userJoined(data) {
		var {users, messages} = this.state;
		var {name} = data;
		users.push(name);
		messages.push({
			user: 'APPLICATION BOT',
			text : name +' Joined'
		});
		this.setState({users, messages});
	}

	_userLeft(data) {
		var {users, messages} = this.state;
		var {name} = data;
		var index = users.indexOf(name);
		users.splice(index, 1);
		messages.push({
			user: 'APPLICATION BOT',
			text : name +' Left'
		});
		this.setState({users, messages});
	}

	handleMessageSubmit(message) {
		socket.emit('sendchat', message);
	}

	render() {
		return (
			<div>
				<MessageList
					messages={this.state.messages}
				/>
				<MessageForm
					onMessageSubmit={this.handleMessageSubmit}
					user={this.state.user}
				/>
			</div>
		);
	}
};

export default ChatApp;
