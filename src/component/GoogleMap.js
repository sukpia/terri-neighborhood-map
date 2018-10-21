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
			map: {},
			markers: []
		};
	}

	// Close the infowindows that are opened
	closeInfoWindow = () => {
		this.props.markers.forEach(marker => {
			if (marker.hasOwnProperty('infowindow')) {
				marker.infowindow.close();
			}
		})
	}

	clearAllMarkers = () => {
		if (this.state.markers) {
  		console.log('clear markers');
  		this.state.markers.forEach(marker => {
  			marker.setMap(null);
  		});
  	}
	}

	clearMarkersAnimation = () => {
		if (this.state.markers) {
			console.log('clear animation');
			this.state.markers.forEach(marker => {
				marker.setAnimation(null);
			})
		}
	}

  	// Add location detail information to google map infowindow and display it
	populateInfoWindow = (marker, map) => {
		if((this.props.locationDetails.name === marker.title) && marker.isOpen) {
			// Set the content for infowindow based on info from Foursquare getVenueDetails 
			let contentString = '<section class="infowindow" tabIndex=0 aria-label="location details">' +
				'<img src=' + this.props.locationDetails.bestPhoto.prefix +'200x200' + this.props.locationDetails.bestPhoto.suffix + ' alt="' + marker.title + '" tabIndex=0 />' +
				'<h3>' + this.props.locationDetails.name + '</h3>' +
				'<p tabIndex=0>' + this.props.locationDetails.location.formattedAddress + '</p>' +
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

  // This function will clear all markers and infowindows then create new markers and infowindow
  addMarkers = (map) => {
  	this.closeInfoWindow();
  	// Clear all markers on the map
  	this.clearAllMarkers();
  	// Create the markers that are set to visible
  	const foursquareMarkers = this.props.markers.filter(marker => marker.isVisible).map((marker, index) => {
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

  		// If marker is clicked, open infowindow
      foursquareMarker.addListener('click', (evt) => {
      	this.clearMarkersAnimation();
      	foursquareMarker.setAnimation(window.google.maps.Animation.BOUNCE);
      	this.state.map.setCenter({lat: marker.lat, lng: marker.lng});
      	// function for handling marker click
    		this.props.handleMarkerClick(marker);
      	// Open the infowindow for clicked marker
  			this.populateInfoWindow(marker, map);
      });

      return foursquareMarker;
  	});

  	this.setState({ markers: foursquareMarkers });
  	
  }

	// This function display the infowindow of a clicked list item.
  onMapLoad = (map) => {
  	// close all opend infowindow
  	this.closeInfoWindow();
    // clear all markers animation
    this.clearMarkersAnimation();
    // loop thru each marker and only open the infowindow for the clicked list item.
    this.props.markers.forEach((marker) => {
      // If list item on the sidebar is clicked, open infowindow
      if (marker.isOpen) {
      	// reset the map center location
      	this.state.map.setCenter({lat: marker.lat, lng: marker.lng});
      	// animate the marker
      	const m = this.state.markers.find(m => m.title === marker.title)
      	m.setAnimation(window.google.maps.Animation.BOUNCE);
      	// open the infowindow
      	this.populateInfoWindow(marker, map);
      } 
    });
    
    this.props.updateSuperState({listItemClicked: false});
    // let hotelMarker = new window.google.maps.Marker({
    //  position: {lat: 37.807660, lng: -122.420520},
    //  map: map,
    //  title: 'Argonaut Hotel'
    // });
  }

  // Create map
	onScriptLoad() {
		// create google map
		const map = new window.google.maps.Map(
      document.getElementById('map'),
      this.props.options);

		map.addListener('click', () => {
			console.log('mapclick');
		})

		map.addListener('tilesloaded', () => {
			console.log('tilesloaded');
		})
		this.setState({ map: map });
		// create the markers and infowindows
		// this.onMapLoad(this.state.map);
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
		if (this.state.isReady && (this.props.markers !== prevProps.markers)) {
			console.log('update markers');
			// this.onScriptLoad();
			this.addMarkers(this.state.map);
			// this.onMapLoad(this.state.map);
		} else if (this.props.listItemClicked !== prevProps.listItemClicked) {
			console.log('list item click');
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