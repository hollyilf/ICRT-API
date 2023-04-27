// Configure dotenv
require("dotenv").config();

const path = require("path");

// Require express and set up new instance of express app:
const express = require("express");
const app = express();

// Install and configure CORS middleware to be able to call the backend from the frontend
// Options specify that CORS can accept requests from any origin
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));

// Import connection function and connect to DB:
const connectDB = require("./db");
connectDB();

// Import router:
const members = require("./routes/api/members");

// Configure express middleware for reading incoming JSON data sent using a POST or PUT request
app.use(express.json({ extended: false }));

// Set the app to use the members router for requests that start with "/api/members"
app.use("/api/members", members);

//Serve up react frontend:
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (_, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
