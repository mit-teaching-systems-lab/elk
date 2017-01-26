import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from '../app/routes';

// class About extends React.Component {
//     render(){
//         return (<h1>About page</h1>);
//     }
// }

// export default About;
 
// document.addEventListener('DOMContentLoaded', function() {
//   ReactDOM.render(
  	
//   	React.createElement(ChatApp),
//   	document.getElementById('root')
//   );
// });

let history = createBrowserHistory();

document.addEventListener('DOMContentLoaded', function() {
	ReactDOM.render(routes, document.getElementById('root'));
});