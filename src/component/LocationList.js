import React from 'react';

function LocationList (props) {
	console.log('LocationList');
	console.log(props);
	return (
		<ol className='locationList' aria-label='Location List'>
			{props.locations && props.locations.map((location,index) => (
				<li key={index} className='listItem'>
					<img src={location.venue.categories[0].icon.prefix+"32"+location.venue.categories[0].icon.suffix} alt={location.venue.categories[0].name} />
					{location.venue.name}
				</li>
			))}
		</ol>
	);
}

export default LocationList;