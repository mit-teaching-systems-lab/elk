import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import App from './Components/App';
import Counter from './Components/Counter';
import ChatApp from './Components/ChatApp';

console.log("routes being called!")

const Home = () => <h1>Hello from Home!</h1>
const Address = () => <h1>We are located at 555 Jackson St.</h1>

export default (
  <Router history={hashHistory}>
    <Route path='/' component={Home} />
    <Route path='/address' component={Address} />
    <Route path='/chatapp' component={ChatApp}/>
    <Route path='/counter' component={Counter}/>  
  </Router>
);