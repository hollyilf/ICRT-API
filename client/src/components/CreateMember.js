import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateMember = () => {
	const navigate = useNavigate();

	// Set initial state of member to empty member object
	const [member, setMember] = useState({
		name: "",
		country: "",
		region: "",
		membership: "",
	});

	// Capture the changes in the inputs and update the corresponding fields of the member state
	const onChange = (e) => {
		setMember({ ...member, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		// Prevent page from refreshing on submit
		e.preventDefault();

		// Make post request to the api in the backend using axios and send over the member object
		axios
			.post("/api/members", member)
			.then((res) => {
				// Reset the member object to empty object
				setMember({
					name: "",
					country: "",
					region: "",
					membership: "",
				});
				// Naviage to home page once new member is added to DB
				navigate("/");
			})
			.catch((err) => {
				console.log("Error creating new member");
			});
	};

	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="col-lg-4 col-md-6 col-sm-8 m-auto text-center">
						<p className="lead">Insert new member details</p>
						{/* Form to input new member  */}
						{/* Each input has onChange listener and form has onSubmit listener */}
						<form onSubmit={onSubmit}>
							<div className="form-group m-2">
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
								<input
									type="text"
									placeholder="Membership type"
									name="membership"
									className="form-control"
									value={member.membership}
									onChange={onChange}
								/>
							</div>
							{/* Button to submit form  */}
							<button type="submit" className="btn btn-primary btn-block">
								Add new member
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateMember;
