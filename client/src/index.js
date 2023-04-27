// index.js -- react app entry point

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

// Render App component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
