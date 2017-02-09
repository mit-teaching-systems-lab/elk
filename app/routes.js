import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import App from './Components/App';
import Counter from './Components/Counter';
import ChatApp from './Components/ChatApp';
import GameSelectionPage from './Components/GameSelectionPage';
import Game from './Components/Game'
import rational2 from '../GameBundles/rational2.json';

console.log("routes being called!")

var gameBundle = {};
gameBundle["teacher"] = rational2.teacher;
gameBundle["student"] = rational2.students[0]
var questions = []
for (var i = 0; i < rational2.questions.length; i++) {
	var q = {};
	q["answer"] = rational2.questions[i].answer["0"];
	q["question"] = rational2.questions[i].question;
	questions.push(q);
}
gameBundle["questions"] = questions
console.log(gameBundle);

var GameWrapper = React.createClass({
	render: function() {
		return (
			<Game gameBundle={gameBundle}/>
		);
	}

})

export default (
  <Router history={hashHistory}>
    <Route path='/' component={GameWrapper}/>
    <Route path='/chatapp/:chatID' component={ChatApp}/>
    <Route path='/counter' component={Counter}/>  
  </Router>
);