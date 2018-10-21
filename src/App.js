import React, { Component } from 'react';
import './App.css';
import GoogleMap from './component/GoogleMap';
import SideBar from './component/SideBar';
import SquareAPI from './api/';
import DesktopBreakPoint from './component/responsive/DesktopBreakPoint';
import TabletBreakPoint from './component/responsive/TabletBreakPoint';
import PhoneBreakPoint from './component/responsive/PhoneBreakPoint';

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
      // deviceType: '',
      closeSidebar: false,
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
    this.handleCloseSidebar();
    const marker = this.state.markers.find(marker => marker.id === location.venue.id);
    this.handleMarkerClick(marker);
  }

  handleCloseSidebar = () => {
    this.setState(state => ({
      closeSidebar: !state.closeSidebar
    }));
  }

  componentDidMount() {
    // Use Foursquare API 'explore' endpoint to search for venue recommendations
    // https://developer.foursquare.com/docs/api/venues/explore
    SquareAPI.explore({
      near: 'San Francisco, CA',
      section: 'sights',
      limit: 10
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

    // if(document.querySelector('.sidebar-phone') !== null) {
    //   console.log('It is a PHONE');
    //   this.setState({deviceType: 'phone' });
    // }
  }

  render() {
    return (
      <div className="App">
        <DesktopBreakPoint>
          <div className = 'sidebar-desktop'>
            <SideBar {...this.state}
              device={'desktop'}
              handleListItemClick={this.handleListItemClick}
              handleCloseSidebar = {this.handleCloseSidebar}
            />
          </div>
        </DesktopBreakPoint>
        <TabletBreakPoint>
          <div className = 'sidebar-tablet'>
            <SideBar {...this.state}
              device={'tablet'}
              handleListItemClick={this.handleListItemClick}
              handleCloseSidebar = {this.handleCloseSidebar}
            />
          </div>
        </TabletBreakPoint>
        <PhoneBreakPoint>
          <div className = 'sidebar-phone'>
            <SideBar {...this.state}
            device={'phone'}
              handleListItemClick={this.handleListItemClick}
              handleCloseSidebar = {this.handleCloseSidebar}
            />
          </div>
        </PhoneBreakPoint>
        
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
