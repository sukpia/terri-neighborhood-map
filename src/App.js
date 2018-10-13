import React, { Component } from 'react';
import './App.css';
import GoogleMap from './component/GoogleMap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GoogleMap />
      </div>
    );
  }
}

export default App;
