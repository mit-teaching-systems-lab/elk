import React from 'react';
import { Router, Route, hashHistory} from 'react-router';
import Game from './Components/Game/index.js';

import App from './Components/App';

// Import game bundle json file here 
import rational from './GameBundles/rational.json';
import evolution2 from './GameBundles/evolution2.json';
import chromosomes from './GameBundles/chromosomes.json';
import cell1 from './GameBundles/cell1.json';
import circles from './GameBundles/circles.json';
import negative from './GameBundles/negative.json';
import algebra from './GameBundles/algebra.json';

// Insert game bundle into bundles dictionary
var bundles = {
  'rational': rational, 
  'evolution2': evolution2,
  'chromosomes': chromosomes,
  'cell1': cell1,
  'circles': circles,
  'negative': negative,
  'algebra': algebra
};

export default (
  <Router history={hashHistory}>
    <Route path='/' component={App}/>
    <Route path='/:bundleID/:gameID' bundle={bundles} component={Game}/>
  </Router>
);