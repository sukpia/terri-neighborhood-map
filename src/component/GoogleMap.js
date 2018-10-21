// Resources from:
// https://stackoverflow.com/questions/48493960/using-google-map-in-react-component
// http://cuneyt.aliustaoglu.biz/en/using-google-maps-in-react-without-custom-libraries/
// https://stackoverflow.com/questions/2946165/google-map-api-v3-simply-close-an-infowindow

import React, { Component } from 'react';

class GoogleMap extends Component {
	constructor(props) {
		super(props);
		this.onScriptLoad = this.onScriptLoad.bind(this);
		this.state = {
			IsReady: false,
			map: {}
		};
	}

	// Close all the markers and infowindows that are opened
	closeInfoWindow = () => {
		this.props.markers.forEach(marker => {
			if (marker.hasOwnProperty('infowindow')) {
				marker.infowindow.close();
			}
		})
	}

  // Create infowindow
	populateInfoWindow = (marker, map) => {
		if((this.props.locationDetails.name === marker.title) && marker.isOpen) {
			// Set the content for infowindow based on info from Foursquare getVenueDetails 
			let contentString = '<section class="infowindow">' +
				'<img src=' + this.props.locationDetails.bestPhoto.prefix +'200x200' + this.props.locationDetails.bestPhoto.suffix + ' alt=' + this.props.locationDetails.name + ' />' +
				'<h3>' + this.props.locationDetails.name + '</h3>' +
				'<p>' + this.props.locationDetails.location.formattedAddress + '</p>' +
				'</section>';
			// Create the infowindow with required information and add the infowindow object as a property to the marker
			marker.infowindow = new window.google.maps.InfoWindow({
	      content: contentString,
	      position: { lat: marker.lat, lng: marker.lng },
	      pixelOffset: new window.google.maps.Size(0, -40)
	    });
	    // Open the infowindow
    	marker.infowindow.open(map);
		}
  }

	// This function is where I create the markers and infowindow
  onMapLoad = (map) => {
  	this.closeInfoWindow();
    // Only display the markers that are set to Visible
    const foursquareMarkers = this.props.markers.filter(marker => marker.isVisible).map((marker,index) => {
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

      // If list item on the sidebar is clicked, open infowindow
      if (marker.isOpen) {
      	this.state.map.setCenter({lat: marker.lat, lng: marker.lng});
      	// animate the marker
      	foursquareMarker.setAnimation(window.google.maps.Animation.DROP);
      	this.populateInfoWindow(marker, map);
      } else {
      	foursquareMarker.setAnimation(null);
      	console.log(foursquareMarker.title + ' is null');
      }
      
      // If marker is clicked, open infowindow
      foursquareMarker.addListener('click', (evt) => {
      	this.state.map.setCenter({lat: marker.lat, lng: marker.lng});
      	// function for handling marker click
    		this.props.handleMarkerClick(marker);
      	// Open the infowindow for clicked marker
  			this.populateInfoWindow(marker, map);
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
		// if (this.props.loadMap) {
			const map = new window.google.maps.Map(
	      document.getElementById('map'),
	      this.props.options);
			this.setState({ map: map });
		// }
		
		this.onMapLoad(this.state.map);
		
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
		if (this.state.isReady) {
			// this.onScriptLoad();
			this.onMapLoad(this.state.map);
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