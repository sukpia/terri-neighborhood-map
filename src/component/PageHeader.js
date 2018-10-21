import React from 'react';

function PageHeader(props) {
	return (
		<header className="pageHeader">
			Neighborhood: {props.name}
		</header>
	);
}

export default PageHeader;