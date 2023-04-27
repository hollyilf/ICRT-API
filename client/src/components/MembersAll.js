import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MemberCard from "./MemberCard";

const MembersAll = () => {
	// Set initial state of members list to an emptry array
	const [members, setMembers] = useState([]);
	// isLoading to keep track of when the data has been received from the api
	const [isLoading, setIsLoading] = useState(true);

	// Make get request to api via axios
	useEffect(() => {
		axios
			.get("/api/members")
			.then((res) => {
				// Sort the received data in alphabetical order by member
				const sortedMembers = res.data.sort((a, b) =>
					a.name.localeCompare(b.name)
				);
				// Set members array to sorted data
				setMembers(sortedMembers);
				// No longer loading
				setIsLoading(false);
			})
			.catch((err) => {
				console.log("Error showing all members");
			});
		// Empty array as dependency so the hook only runs once
	}, []);

	const memberList =
		members.length === 0 ? (
			// Render text instead of list of members if there are no members
			<p className="lead">No members</p>
		) : (
			// If there are members map through the array and create a card for each member
			// Pass the member details as a prop to the child MemberCard component
			members.map((member, k) => <MemberCard member={member} key={k} />)
		);

	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="col-md-12 text-center">
						{/* Button to add new member  */}
						<Link to="/add-member" className="btn btn-info ">
							Add New Member
						</Link>
					</div>
				</div>
				{/* Render the list of member (or text) once the data has been retrieved from the api  */}
				<div className=" text-center">{!isLoading && memberList}</div>
			</div>
		</div>
	);
};

export default MembersAll;
