import React from "react";
import {Link} from "react-router-dom";

const NotFound = function (props) {
	return (
		<div>
			<p>Sorry, page not found!</p>
			<p>
				<Link to="/">Go Home</Link>
			</p>
		</div>
	);
};

export default NotFound;
