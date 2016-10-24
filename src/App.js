import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// import Player from './components/VideoPlayer/Player';
import Pinger from './components/pinger'
import Socker from './components/socket';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Video POC</h2>
        </div>
        <Socker />
        <br />
        <Pinger />
      </div>
    );
  }
}

export default App;
