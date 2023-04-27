import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateMember = () => {
	const [member, setMember] = useState({
		name: "",
		country: "",
		region: "",
		membership: "",
	});

	// useParams hook to extract id from the url
	const { id } = useParams();
	const navigate = useNavigate();

	// Make get request to api via axios using id from parameter
	useEffect(() => {
		axios
			.get(`/api/members/${id}`)
			.then((res) => {
				//  Set member object to the current verion of the member data in the DB
				setMember({
					name: res.data.name,
					country: res.data.country,
					region: res.data.region,
					membership: res.data.membership,
				});
			})
			.catch((err) => {
				console.log("Error updating member");
			});
		// Id added as dependency to re-run the hook when the id in the url changes
	}, [id]);

	// Capture the changes in the inputs and update the values of the member object that correspond to the input that was changed
	const onChange = (e) => {
		setMember({ ...member, [e.target.name]: e.target.value });
	};

	// Executed when the form is submitted, i.e. when the member data is updated
	const onSubmit = (e) => {
		// Prevent page from refreshing when form is submitted
		e.preventDefault();

		// Capture the updated stateful member object
		const data = {
			name: member.name,
			country: member.country,
			region: member.region,
			membership: member.membership,
		};

		// Send the updated data to the api using a put request via axios
		axios
			.put(`/api/members/${id}`, data)
			.then((res) => {
				// Navigate to the individual member page to see the updated details
				navigate(`/${id}`);
			})
			.catch((err) => {
				console.log("Error updating member");
			});
	};

	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="col-lg-4 col-md-6 col-sm-8 m-auto">
						<p className="text-center lead">Edit Member</p>
					</div>
				</div>
				{/* Form inputs for Name, Country, Region, Memberhsip type  */}
				<div className="col-lg-4 col-md-6 col-sm-8 m-auto">
					<form noValidate onSubmit={onSubmit}>
						<div className="form-group m-2">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								placeholder="Name"
								name="name"
								className="form-control"
								value={member.name}
								onChange={onChange}
							/>
						</div>
						<div className="form-group m-2">
							<label htmlFor="country">Country</label>
							<input
								type="text"
								placeholder="Country"
								name="country"
								className="form-control"
								value={member.country}
								onChange={onChange}
							/>
						</div>
						<div className="form-group m-2">
							<label htmlFor="region">Region</label>
							<input
								type="text"
								placeholder="Region"
								name="region"
								className="form-control"
								value={member.region}
								onChange={onChange}
							/>
						</div>
						<div className="form-group m-2">
							<label htmlFor="membership">Membership type</label>
							<input
								type="text"
								placeholder="Membership"
								name="membership"
								className="form-control"
								value={member.membership}
								onChange={onChange}
							/>
						</div>
						{/* Button to submit form  */}
						<div className="text-center">
							<button type="submit" className="btn btn-primary m-4">
								Update Member
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UpdateMember;
