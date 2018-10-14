import React, { Component } from 'react';
import './App.css';
import GoogleMap from './component/GoogleMap';
import SideBar from './component/SideBar';
import SquareAPI from './api/';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      markers: [],
      center: {
        lat: 37.7749,
        lng: -122.4194
      },
      zoom: 13
    };
  }

  componentDidMount() {
    SquareAPI.explore({
      near: 'San Francisco, CA',
      section: 'sights',
      limit: 20
    }).then(results => {
      const locations = results.response.groups[0].items;
      const { center } = results.response.geocode.center;
      const markers = locations.map(location => {
        return {
          lat: location.venue.location.lat,
          lng: location.venue.location.lng,
          id: location.venue.id,
          title: location.venue.name,
          icon: location.venue.categories[0].icon
        };
      })
      this.setState({locations, center, markers});
      console.log(results);
    }).catch(error => alert(`SquareAPI Explore Error: ${error}`));
  }

  render() {
    return (
      <div className="App">
        <SideBar {...this.state} />
        <GoogleMap {...this.state}
        />
      </div>
    );
  }
}

export default App;
