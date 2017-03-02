import React from 'react';
import { Router, Route, hashHistory} from 'react-router';
import Counter from './Components/Counter';
import Game from './Components/Game/index.js';
import rational2 from '../GameBundles/rational2.json';
import App from './Components/App';

var gameBundle = {};
gameBundle["teacher"] = rational2.teacher;
gameBundle["student"] = rational2.students[0];
var questions = [];
for (var i = 0; i < rational2.questions.length; i++) {
  var q = {};
  q["answer"] = rational2.questions[i].answer["0"];
  q["question"] = rational2.questions[i].question;
  questions.push(q);
}
gameBundle["questions"] = questions;

export default (
  <Router history={hashHistory}>
    <Route path='/' component={App}/>
    <Route path='/:gameID' bundle={gameBundle} component={Game}/>
    <Route path='/counter' component={Counter}/>
  </Router>
);