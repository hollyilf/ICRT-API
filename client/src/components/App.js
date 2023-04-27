// Import components and css styling
import "../App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateMember from "./CreateMember";
import MembersAll from "./MembersAll";
import MemberIndividual from "./MemberIndividual";
import UpdateMember from "./UpdateMember";
import Header from "./Header";
import DataDashboard from "./DataDashboard";

// Define App using react-router-dom
const App = () => {
	return (
		// Router compponent wraps the entire app to enable client-side routing
		<Router>
			<div>
				<Header />
				{/* Define the routes for the app */}
				<Routes>
					<Route exact path="/" element={<MembersAll />} />
					{/* Dynamic route for MemberIndividual based on member id */}
					<Route path="/:id" element={<MemberIndividual />} />
					<Route path="/add-member" element={<CreateMember />} />
					<Route path="/edit-member/:id" element={<UpdateMember />} />
					<Route path="/data" element={<DataDashboard />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
