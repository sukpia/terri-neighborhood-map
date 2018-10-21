import React, { Component } from 'react';

export default class SideBarButton extends Component {
	
	render() {
		return(
			<div className="sidebar-button-container">
				<button className="sidebar-button" onClick={() => this.props.onHandleButtonClick()} aria-label='Menu'>
					{this.props.close ? '\u25b6' : '\u25c0'}
				</button>
			</div>
		);
	}
}

//arrow pointing left html-code &#9664; and unicode \u25c0
//arrow pointing right html-code &#9654; and unicode \u25b6