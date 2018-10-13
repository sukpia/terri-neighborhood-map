import React, { Component } from 'react';
import './App.css';
import GoogleMap from './component/GoogleMap';
import SideBar from './component/SideBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SideBar />
        <GoogleMap />
      </div>
    );
  }
}

export default App;
