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
			console.log('Map is Ready');
			// Display the map
			this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.7749, lng: -122.4194},
        zoom: 10,
        mapTypeId: 'roadmap'
      });
      // Add the markers on map below
		}
	}

	render() {
		return (
			<div id='map' />
		);
	}
}

export default GoogleMap;