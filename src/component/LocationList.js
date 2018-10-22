import React from 'react';

function LocationList (props) {
	return (
		<ol className='locationList' aria-label='Location List'>
			{props.locations && props.locations.map((location,index) => (
				<li key={index} className='listItem' onClick={() => props.handleListItemClick(location)} tabIndex='0' >
					{/*< img src={location.venue.categories[0].icon.prefix+"32"+location.venue.categories[0].icon.suffix} alt={location.venue.categories[0].name} /> */}
					<img src={location.venue ? location.venue.categories[0].icon.prefix+"32"+location.venue.categories[0].icon.suffix : location.categories[0].icon.prefix+"32"+location.categories[0].icon.suffix} alt={location.venue ? location.venue.categories[0].name : location.name} />
					{location.venue ? location.venue.name : location.name}
				</li>
			))}
		</ol>
	);
}

export default LocationList;