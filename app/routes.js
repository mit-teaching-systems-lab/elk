import React from 'react';
import { Router, Route, hashHistory} from 'react-router';
import Game from './Components/Game/index.js';
import rational from './GameBundles/rational.json';
import App from './Components/App';

// var gameBundle = {};
// gameBundle["teacher"] = rational.teacher;
// gameBundle["student"] = rational.students;
// var questions = [];
// for (var i = 0; i < rational.questions.length; i++) {
//   var q = {};
//   q["answer"] = rational.questions[i].answer["0"];
//   q["question"] = rational.questions[i].question;
//   questions.push(q);
// }
// gameBundle["questions"] = questions;

export default (
  <Router history={hashHistory}>
    <Route path='/' component={App}/>
    <Route path='/:gameID' bundle={rational} component={Game}/>
  </Router>
);