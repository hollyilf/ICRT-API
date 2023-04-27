import React from "react";
import { Link } from "react-router-dom";

// Header containing link to homepage and link to dashboard
const Header = () => {
	return (
		<div>
			<div className="row m-3 mt-5">
				<div className="text-center">
					<Link to="/">
						<h1 className="display-3">ICRT Members</h1>
					</Link>
					<Link to="/data">
						<p className="lead btn btn-outline-primary">View Data Dashboard</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Header;
