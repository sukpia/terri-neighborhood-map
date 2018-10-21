// Using react-responsive package.
// Resources:
// https://github.com/contra/react-responsive
// https://medium.com/@kkomaz/react-responsive-its-pretty-cool-d61e5ed56d95

import React from 'react';
// import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';

const breakpoints = {
	desktop: '(min-width: 1025px)',
	tablet: '(min-width: 768px) and (max-width: 1024px)',
	phone: '(max-width: 767px)'
};

export default function BreakPoint(props) {
	const breakpoint = breakpoints[props.name] || breakpoints.desktop;

	return (
		<MediaQuery {...props} query={breakpoint} >
			{props.children}
		</MediaQuery>
	);
}

// BreakPoint.propTypes = {
// 	name: PropTypes.string.isRequired,
// 	children: PropTypes.object.isRequired
// }

//&#9776;