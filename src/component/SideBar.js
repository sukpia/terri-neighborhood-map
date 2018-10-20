import React, { Component } from 'react'
import LocationList from './LocationList'

class SideBar extends Component {
	constructor() {
		super();
		this.state = {
			query: "",
			locations: []
		};
	}

	//Update the Location list with filtered locations
	handleFilterLocation = () => {
		if(this.state.query) {
			const locations = this.props.locations.filter(location => location.venue.name.toLowerCase().includes(this.state.query.toLowerCase()));
			return locations;
		}
		return this.props.locations;
	}

	// Find the markers that matched the filtered locations
	handleChange = (event) => {
		this.setState({ query: event.target.value });
		const markers = this.props.locations.map(location => {
			const matched = location.venue.name.toLowerCase().includes(event.target.value.toLowerCase());
			const marker = this.props.markers.find(marker => marker.id === location.venue.id);
			if(matched) {
				marker.isVisible = true;
			} else {
				marker.isVisible = false;
			}
			return marker;
		});
		// Update the state in the App.js
		this.props.mapLoad(true);
		this.props.updateSuperState({markers});
	}

	render() {
		// console.log(this.props);
		return (
			<section className='sideBar'>
				<input type={'search'} id={'search'}
					placeholder={'Search Highlighted locations'}
					aria-label='search highlighted location'
					onChange={this.handleChange} autoFocus
				/>
				
				<LocationList {...this.props} locations={this.handleFilterLocation()} handleListItemClick={this.props.handleListItemClick} />
			</section>
		);
	}
}

export default SideBar;