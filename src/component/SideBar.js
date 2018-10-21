import React, { Component } from 'react';
import LocationList from './LocationList';
import SideBarButton from './SideBarButton';

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: "",
			locations: [],
			close: false
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
		this.props.updateSuperState({markers});
	}

	handleButtonClick = () => {
		this.setState(state => ({
			close: !state.close,
		}));
	}

	componentDidMount() {
		if(this.props.device === 'phone' || this.props.device === 'tablet') {
			this.setState({ close: true });
		}
	}

	render() {
		return (
			<section className={ ((this.state.close || this.props.closeSidebar) && !(this.state.close && this.props.closeSidebar)) ? 'sidebarContainer close' : 'sidebarContainer'} >
				<div className='sideBar' aria-label='Sidebar'>
					<input type={'search'} id={'search'}
						placeholder={'Search Highlighted locations'}
						aria-label='search highlighted location'
						onChange={this.handleChange} autoFocus
					/>
					
					<LocationList {...this.props} 
						locations={this.handleFilterLocation()} 
						handleListItemClick={this.props.handleListItemClick}
					/>
				</div>
				<SideBarButton close={this.state.close} onHandleButtonClick={this.handleButtonClick} />
			</section>
		);
	}
}

export default SideBar;