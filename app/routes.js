import React from 'react';
import _ from 'lodash';
import { Router, Route, hashHistory} from 'react-router';
import Game from './Components/Game/index.js';
import BundleRegistry from './BundleRegistry.js';
import App from './Components/App';


export default (
  <Router history={hashHistory}>
    <Route path='/' component={App} bundleIds={_.keys(BundleRegistry)}/>
    <Route path='/:bundleID/:gameID' component={Game} bundleRegistry={BundleRegistry} />
  </Router>
);