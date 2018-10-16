// Resources from:
// https://stackoverflow.com/questions/48493960/using-google-map-in-react-component
// http://cuneyt.aliustaoglu.biz/en/using-google-maps-in-react-without-custom-libraries/
// https://stackoverflow.com/questions/2946165/google-map-api-v3-simply-close-an-infowindow

import React, { Component } from 'react';
import SquareAPI from '../api/';

class GoogleMap extends Component {
	constructor(props) {
		super(props);
		this.onScriptLoad = this.onScriptLoad.bind(this);
		this.state = {
			IsReady: false,
		};
	}

	// Close all the markers and infowindows that are opened
	closeInfoWindow = () => {
		this.props.markers.forEach(marker => {
			if(marker.infowindow) {
				marker.infowindow.close();
			}
		})
	}

	// If marker is clicked, access foursquare api to get the location detail information
	// Then add the information to google map infowindow and display it
	handleMarkerClick = (marker, map) => {
		// don't refresh the markers when open infowindow
		this.props.markersReload(false);
    // Find the venue details using Foursquare API for the clicked marker, and update the location with detail info
    // https://developer.foursquare.com/docs/api/venues/details
    SquareAPI.getVenueDetails(marker.id)
    .then(res => {
      if(res.meta.code >= 400) {
        alert("ERROR: " + res.meta.errorDetail);
      } else {
      	const locationDetails = res.response.venue;
        this.props.updateSuperState({ locationDetails });
        this.populateInfoWindow(marker,map);
      }
    }).catch(error => alert(`SquareAPI getVenueDetails error: ${error}`));
  }

  // Create infowindow
	populateInfoWindow = (marker, map) => {
		if(this.props.locationDetails) {
			// Set the content for infowindow based on info from Foursquare getVenueDetails 
			let contentString = '<section class="infowindow">' +
				'<img src=' + this.props.locationDetails.bestPhoto.prefix +'200x200' + this.props.locationDetails.bestPhoto.suffix + ' alt=' + this.props.locationDetails.name + ' />' +
				'<h3>' + this.props.locationDetails.name + '</h3>' +
				'<p>' + this.props.locationDetails.location.formattedAddress + '</p>' +
				'</section>';
			
			// Create the infowindow with required information and add the infowindow object as a property to the marker
			marker.infowindow = new window.google.maps.InfoWindow({
	      content: contentString,
	      position: { lat: marker.lat, lng: marker.lng }
	    });
	    // Open the infowindow
    	marker.infowindow.open(map);
		} else {
			console.log('No information for this location');
		}
  }

	// This function is where I create the markers and infowindow
  onMapLoad = (map) => {
    // Only display the markers that are set to Visible
    this.props.markers.filter(marker => marker.isVisible).map((marker,index) => {
      // label number for the marker
      let labelNumber = index + 1;
      // create a marker per location, set the marker location, title, animation, and label
      let foursquareMarker = new window.google.maps.Marker({
        map: map,
        position: {lat: marker.lat, lng: marker.lng},
        title: marker.title,
        animation: window.google.maps.Animation.DROP,
        label: `${labelNumber}`,
        // icon: marker.icon.prefix+'bg_32'+marker.icon.suffix
      });
      // Add event listener for each marker
      foursquareMarker.addListener('click', (evt) => {
      	// close the opened infoWindow
      	this.closeInfoWindow();
      	// function for handling marker click
    		this.handleMarkerClick(marker, map);
      });

      return foursquareMarker;
    });

    let hotelMarker = new window.google.maps.Marker({
     position: {lat: 37.807660, lng: -122.420520},
     map: map,
     title: 'Argonaut Hotel'
    });
  }

  // Create map
	onScriptLoad() {
		const map = new window.google.maps.Map(
      document.getElementById('map'),
      this.props.options);
    this.onMapLoad(map);
	}

	// Add the google map script at the end of body element after the map div is mounted.
	componentDidMount() {
		if(!window.google) {
			const ApiKey = 'AIzaSyDLDeN27QtQJVyCa5W3D5WMRRGTWoKAjPU';
			const script = document.createElement('script');
			script.src = `https://maps.googleapis.com/maps/api/js?key=${ApiKey}&v=3`;
			script.async = true;
			script.defer = true;
			let x = document.getElementsByTagName('script')[0];
			x.parentNode.insertBefore(script, x);
			script.addEventListener('load', e => {
				this.onScriptLoad();
				this.setState({ isReady: true });
			});
		} else {
			this.onScriptLoad();
		}
	}

	// Update the markers location from Foursquare after finish updating the componenents
	componentDidUpdate(prevProps, prevState) {
		if (this.state.isReady && this.props.reloadMarkers) {
			this.onScriptLoad();
		}
	}

	render() {
		return (
			// The container for map
			<div id='map' role='application' />
		);
	}
}

export default GoogleMap;