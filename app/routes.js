import React from 'react';
import { Router, Route, hashHistory} from 'react-router';
import Game from './Components/Game/index.js';
import chromosomes from '../GameBundles/chromosomes.json';
import App from './Components/App';

// var gameBundle = {};
// gameBundle["teacher"] = chromosomes.teacher;
// gameBundle["student"] = chromosomes.students;
// var questions = [];
// for (var i = 0; i < chromosomes.questions.length; i++) {
//   var q = {};
//   q["answer"] = chromosomes.questions[i].answer["0"];
//   q["question"] = chromosomes.questions[i].question;
//   questions.push(q);
// }
// gameBundle["questions"] = questions;

export default (
  <Router history={hashHistory}>
    <Route path='/' component={App}/>
    <Route path='/:gameID' bundle={chromosomes} component={Game}/>
  </Router>
);