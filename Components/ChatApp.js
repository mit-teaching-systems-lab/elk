import React from 'react'
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import io from 'socket.io-client'
let socket = io('http://localhost:3333')
// var socket = io.connect('http://localhost:8080');





// function switchRoom(room){
// 	socket.emit('switchRoom', room);
// }


// // on load of page
// $(function(){
// 	// when the client clicks SEND
// 	$('#datasend').click( function() {
// 		var message = $('#data').val();
// 		$('#data').val('');
// 		// tell server to execute 'sendchat' and send along one parameter
// 		socket.emit('sendchat', message);
// 	});

// 	// when the client hits ENTER on their keyboard
// 	$('#data').keypress(function(e) {
// 		if(e.which == 13) {
// 			$(this).blur();
// 			$('#datasend').focus().click();
// 		}
// 	});
// });
class ChatApp extends React.Component {

	constructor(props) {
		super(props);
		this.state = {users: [], messages:[], text: ''};
		socket.on('init', (username) =>this._initialize(username));
		socket.on('updatechat', (data) => this._messageRecieve(data));
		this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
	}

	componentDidMount() {
		// on connection to server, ask for user's name with an anonymous callback
		socket.on('connect', function(){
			// call the server-side function 'adduser' and send one parameter (value of prompt)
			socket.emit('adduser', prompt("What's your name?"));
		});

	}

	// _initialize(data) {
	// 	var {users, name} = data;
	// 	this.setState({users, user: name});
	// }

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
