import React, { Component } from 'react'

class SideBar extends Component {
	render() {
		return (
			<section className='sideBar'>
				<input type={'search'} id={'search'}
				placeholder={'Search Highlighted locations'}
				aria-label='search highlighted location' />
				
			</section>
		);
	}
}

export default SideBar;