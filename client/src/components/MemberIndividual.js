import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const MemberIndividual = () => {
	const [member, setMember] = useState({
		name: "",
		country: "",
		region: "",
		membership: "",
		_id: "",
	});

	// useParams hook to extract id from the url
	const { id } = useParams();
	const navigate = useNavigate();

	// Get request to api via axios to retireve the member with the id in the parameter
	useEffect(() => {
		axios
			.get(`/api/members/${id}`)
			.then((res) => {
				setMember({
					name: res.data.name,
					country: res.data.country,
					region: res.data.region,
					membership: res.data.membership,
					_id: res.data._id,
				});
			})
			.catch((err) => {
				console.log("Error showing member details");
			});
		// Id as dependency to re-run hook when id changes
	}, [id]);

	// Make delete request to api via axios when the delete button is clicked. Find member to be deleted using id from parameter
	const onDeleteClick = (id) => {
		axios
			.delete(`/api/members/${id}`)
			.then((res) => {
				// Navigte to the homepage on successful deletion
				navigate("/");
			})
			.catch((err) => {
				console.log("Error deleting member");
			});
	};

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-lg-4 col-md-6 col-sm-8 col-10">
					<div>
						<h5 className="text-center lead">{member.name}</h5>
					</div>
					<div>
						{/* Table of member details  */}
						<table className="table table-hover">
							<tbody>
								<tr>
									<td>Country:</td>
									<td>{member.country}</td>
								</tr>
								<tr>
									<td>Region:</td>
									<td>{member.region}</td>
								</tr>
								<tr>
									<td>Membership type:</td>
									<td>{member.membership}</td>
								</tr>
							</tbody>
						</table>
					</div>{" "}
					<div className="text-center">
						{/* Button to delete member  */}
						<button
							type="button"
							className="btn btn-outline-danger m-2"
							onClick={() => {
								onDeleteClick(member._id);
							}}
						>
							Delete
						</button>
						{/* Button to edit member  */}
						<Link
							to={`/edit-member/${member._id}`}
							className="btn btn-primary m-2"
						>
							Edit
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MemberIndividual;
