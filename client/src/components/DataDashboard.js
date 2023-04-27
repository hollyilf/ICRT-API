import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, XAxis, YAxis, Tooltip, Bar, Cell, Legend } from "recharts";

const DataDashboard = () => {
	const [members, setMembers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// useEffect hook to hook data from api via axios when the component mounts
	useEffect(() => {
		axios
			.get("/api/members")
			.then((res) => {
				// Reduce the results to create a new object with membership types as keys and regions as subkeys
				// Set the values as the number of members with that membership type and region
				const data = res.data.reduce((acc, member) => {
					const membership = member.membership;
					const region = member.region;
					if (!acc[membership]) {
						acc[membership] = { membership };
					}
					if (!acc[membership][region]) {
						acc[membership][region] = 0;
					}
					acc[membership][region]++;
					return acc;
				}, {});
				// Convert the new object into an array of values and set as the members object
				setMembers(Object.values(data));
				setIsLoading(false);
			})
			.catch((err) => {
				console.log("Error retrieving data for dashboard");
			});
	}, []);

	// Define colours for bar chart
	const COLORS = {
		Asia: "#1f77b4",
		Europe: "#9467bd",
		Americas: "#d62728",
		Oceania: "#2ca02c",
		Nordic: "#ff7f0e",
	};

	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="col">
						{/* Render chart using recharts library once data has loaded  */}
						{!isLoading && (
							// Pass in members data as a prop
							<div className="mx-auto" style={{ width: 600 }}>
								<BarChart width={600} height={400} data={members}>
									{/* set the x-axis to display the membership data key */}
									<XAxis dataKey="membership" />
									<YAxis />
									<Tooltip />
									<Legend />
									{/* Bar component maps over the Object.keys(COLORS) array to create a separate bar for each region. */}
									{Object.keys(COLORS).map((region, index) => (
										<Bar
											dataKey={region}
											stackId="a"
											key={`bar-${index}`}
											fill={COLORS[region]}
										>
											{members.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={COLORS[region]} />
											))}
										</Bar>
									))}
								</BarChart>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DataDashboard;
