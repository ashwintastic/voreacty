import React, { Component } from 'react';
import './assets/css/bootstrap.min.css';
import './assets/css/theme.min.css';
import './assets/css/defaults.css';
import './assets/css/layout.css';
import './assets/css/rubick_pres.css';
import './assets/js/bootstrap.min.js'
import './assets/css/media.css';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './assets/css/media-dashboard.css';
import './assets/css/layout-dashboard.css';
import { Provider } from 'react-redux'
import './drawer.css'
import configureStore from './store/configureStore';
import RouterComponent from './router/RouterComponent'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import LoadingBar from './containers/LoadingBar';
import LandingPage from './components/LandingPage';


const store = configureStore();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router >
          <div>
            <Route exact path="/" component={LandingPage} />
            <Route path="/:component" component={RouterComponent}  />
            <LoadingBar/>
          </div>
        </Router>
      </Provider>
    )
  }
}
export default App;
