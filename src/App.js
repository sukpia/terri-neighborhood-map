import React, { Component } from 'react';
import './App.css';
import GoogleMap from './component/GoogleMap';
import SideBar from './component/SideBar';
import SquareAPI from './api/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      markers: [],
      center: {
        lat: 37.7749,
        lng: -122.4194
      },
      zoom: 13,
      locationDetails: {},
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }

  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    })
    this.setState({markers: Object.assign(this.state.markers, markers)});
  }

  // If marker is clicked, access foursquare api to get the location detail information
  // Then add the information to google map infowindow and display it
  handleMarkerClick = (marker) => {
    // close all the markers that's already open
    this.closeAllMarkers();
    // only open the marker that is clicked.
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers,marker),
      center: { lat: marker.lat, lng: marker.lng } })
    
    // Find the venue details using Foursquare API for the clicked marker, and update the location with detail info
    // https://developer.foursquare.com/docs/api/venues/details
    SquareAPI.getVenueDetails(marker.id)
    .then(res => {
      if(res.meta.code >= 400) {
        alert("ERROR: " + res.meta.errorDetail);
      } else {
        const locationDetails = res.response.venue;
        this.setState({ locationDetails: Object.assign(this.state.locationDetails, locationDetails) });
        // this.populateInfoWindow(marker, map);
      }
    }).catch(error => alert(`SquareAPI getVenueDetails error: ${error}`));
  }

  handleListItemClick = (location) => {
    const marker = this.state.markers.find(marker => marker.id === location.venue.id);
    this.handleMarkerClick(marker);
  }

  componentDidMount() {
    // Use Foursquare API 'explore' endpoint to search for venue recommendations
    // https://developer.foursquare.com/docs/api/venues/explore
    SquareAPI.explore({
      near: 'San Francisco, CA',
      section: 'sights',
      limit: 3
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
          isVisible: true,
          isOpen: false
        };
      })
      // update the states for this component
      this.setState({locations, center, markers});
    }).catch(error => alert(`SquareAPI Explore Error: ${error}`));
  }

  render() {
    return (
      <div className="App">
        
        <SideBar {...this.state} mapLoad={this.mapLoad}
          handleListItemClick={this.handleListItemClick}
        />
        
        <GoogleMap
          // set the map center at San Francisco
          {...this.state}
          options={{
            center: this.state.center,
            zoom: 13
          }}
          handleMarkerClick={this.handleMarkerClick}
          li
        />

      </div>
    );
  }
}

export default App;
