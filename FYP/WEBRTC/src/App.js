// If we want to use this software publically
//Use stun server
// use your local IP when creating socket.io


import React, { Component } from 'react';
import Join from './components/Join/Join';
import Room from './components/Room';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EndCall from './components/EndCall';
class App extends Component {
  constructor(props) {
    super(props)
    
  }

  

  render() {
    return (
      <div>
        
        <Router>
        <Switch>
          
           <Route path="/" exact component={Join} />
           <Route path="/chat" component={Room} />
           <Route path="/endCall" component={EndCall} />
          
        </Switch>
      </Router>         
      </div>
    )
  }
}

export default App;