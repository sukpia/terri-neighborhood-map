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
      zoom: 13,
      locationDetails: {},
      reloadMarkers: true,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }

  markersReload = (reload) => {
    if (reload) {
      this.setState({ reloadMarkers: true });
    } else {
      this.setState({ reloadMarkers: false });
    }
  }

  componentDidMount() {
    // Use Foursquare API 'explore' endpoint to search for venue recommendations
    // https://developer.foursquare.com/docs/api/venues/explore
    SquareAPI.explore({
      near: 'San Francisco, CA',
      section: 'sights',
      limit: 20
    }).then(results => {
      // Save searched location to locactions array
      const locations = results.response.groups[0].items;
      // Set the center for current search location
      const { center } = results.response.geocode.center;
      // Set all the marker locations obtained from Foursquare
      const markers = locations.map(location => {
        return {
          lat: location.venue.location.lat,
          lng: location.venue.location.lng,
          id: location.venue.id,
          title: location.venue.name,
          icon: location.venue.categories[0].icon,
          isVisible: true
        };
      })
      // update the states for this component
      this.setState({locations, center, markers});
    }).catch(error => alert(`SquareAPI Explore Error: ${error}`));
  }

  render() {
    return (
      <div className="App">
        
        <SideBar {...this.state} markersReload={this.markersReload} />
        
        <GoogleMap
          //handleMarkerClick={this.handleMarkerClick}
          // set the map center at San Francisco
          {...this.state}
          options={{
            center: {lat: 37.7749, lng: -122.4194},
            zoom: 13
          }}
          markersReload = {this.markersReload}
        />

      </div>
    );
  }
}

export default App;
