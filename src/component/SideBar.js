import React, { Component } from 'react'
import LocationList from './LocationList'

class SideBar extends Component {
	render() {
		return (
			<section className='sideBar'>
				<input type={'search'} id={'search'}
				placeholder={'Search Highlighted locations'}
				aria-label='search highlighted location' />
				
				<LocationList {...this.props} />
			</section>
		);
	}
}

export default SideBar;