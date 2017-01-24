import React from 'react';
import ReactDOM from 'react-dom';
import ChatApp from '../Components/ChatApp';
 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
  	React.createElement(ChatApp),
  	document.getElementById('root')
  );
});
