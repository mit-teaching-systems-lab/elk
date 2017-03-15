import React from 'react';
import { Router, Route, hashHistory} from 'react-router';
import Game from './Components/Game/index.js';
import evolution2 from '../GameBundles/evolution2.json';
import App from './Components/App';

var gameBundle = {};
gameBundle["teacher"] = evolution2.teacher;
gameBundle["student"] = evolution2.students[0];
var questions = [];
for (var i = 0; i < evolution2.questions.length; i++) {
  var q = {};
  q["answer"] = evolution2.questions[i].answer["0"];
  q["question"] = evolution2.questions[i].question;
  questions.push(q);
}
gameBundle["questions"] = questions;

export default (
  <Router history={hashHistory}>
    <Route path='/' component={App}/>
    <Route path='/:gameID' bundle={gameBundle} component={Game}/>
  </Router>
);