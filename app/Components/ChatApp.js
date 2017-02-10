import React from 'react'
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import io from 'socket.io-client'
let socket = io.connect('http://localhost:3333')

class ChatApp extends React.Component {

	constructor(props) {
		super(props);
		this.state = {users: [], messages:[], text: '', at_capacity: false, role: null};
		socket.on('init', (username) =>this._initialize(username));
		socket.on('updatechat', (data) => this._messageRecieve(data));
		socket.on('getroom', () => this._getRoom());
		socket.on('connect', () => this._connect());
		socket.on('adduser', (user_role) => this._addUser(user_role));
		socket.on('fullhouse', () => this.full_house());
		this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
		this._connect = this._connect.bind(this);
	}

	_connect() {
		socket.emit('setroom', this.props.chatID);
	}

	_addUser(user_role) {
		console.log("adding user");
		this.setState({role: user_role});
		console.log(this.state.role);
		socket.emit('adduser', prompt("What's your name?"));
	}

	_initialize(username) {
		this.setState({user: username})
	}

	_messageRecieve(message) {
		console.log("_messageRecieve")
		console.log(this.state)
		var {messages} = this.state;
		messages.push(message);
		this.setState({messages});
	}

	handleMessageSubmit(message) {
		socket.emit('sendchat', message);
	}

	full_house() {
		this.setState({at_capacity: true})
	}

	render() {
		if (this.state.at_capacity) {
			console.log("at capacity here!")
			return (
				<h1>Full room</h1>
			)
		} else {
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
	}
};

export default ChatApp;
