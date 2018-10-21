// Resource:
// https://medium.com/@kkomaz/react-responsive-its-pretty-cool-d61e5ed56d95

import React from 'react';
import BreakPoint from './BreakPoint';

export default function PhoneBreakPoint(props) {
	return (
		<BreakPoint name="phone">
			{props.children}
		</BreakPoint>
	);
}