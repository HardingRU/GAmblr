//Lillian
import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import './App.css';

import Login from './Login'
import SignUp from './Signup'
import Feed from './Feed'
import Likes from './Likes'
import Userpage from './Userpage'
//import Following from './Following'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path='/' component={Login} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <Route path='/feed' component={Feed} />
          {/*<Route path='/post/:id' component={} />*/}
          <Route path='/:username' component={Userpage} />
          <Route path='/favs' component={Likes} />
          {/*<Route path='/following' component={Following} />*/}
        </div>
      </Router>
    )
  }
}

export default App;
