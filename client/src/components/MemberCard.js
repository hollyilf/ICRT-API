import React from "react";
import { Link } from "react-router-dom";

// Card showing member name (link to more details and options to edit/delete) and country
const MemberCard = (props) => {
	const member = props.member;

	return (
		<div className="card m-4">
			<h5 className="card-header">
				<Link to={`/${member._id}`}>{member.name}</Link>
			</h5>
			<div className="card-body">
				<p className="card-text">{member.country}</p>
			</div>
		</div>
	);
};

export default MemberCard;
