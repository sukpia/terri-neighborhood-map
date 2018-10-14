// Resource from:
// https://stackoverflow.com/questions/48493960/using-google-map-in-react-component

import React, { Component } from 'react';

class GoogleMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			IsReady: false
		};
	}

	// Add the google map script at the end of body element.
	componentDidMount() {
		const ApiKey = 'AIzaSyDLDeN27QtQJVyCa5W3D5WMRRGTWoKAjPU';
		const script = document.createElement('script');
		script.src = `https://maps.googleapis.com/maps/api/js?key=${ApiKey}&v=3`;
		script.async = true;
		script.defer = true;
		script.addEventListener('load', () => {
			this.setState({ isReady: true })
		});

		document.body.appendChild(script);
	}

	componentDidUpdate() {
		if (this.state.isReady) {
			// Display the map
			this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.7749, lng: -122.4194},
        zoom: 13,
        mapTypeId: 'roadmap'
      });
      // Add the markers on map below
      this.props.markers.filter(marker => marker.isVisible).map((marker,index) => {
      	let labelNumber = index + 1;
      	let foursquareMarker = new window.google.maps.Marker({
      		map: this.map,
      		position: {lat: marker.lat, lng: marker.lng},
      		title: marker.title,
      		animation: window.google.maps.Animation.DROP,
      		label: `${labelNumber}`,
      		// icon: marker.icon.prefix+'bg_32'+marker.icon.suffix
      	});
      });
      let hotelMarker = new window.google.maps.Marker({
      	position: {lat: 37.807660, lng: -122.420520},
      	map: this.map,
      	title: 'Argonaut Hotel'
      });
		}
	}

	render() {
		return (
			<div id='map' role='application' />
		);
	}
}

export default GoogleMap;