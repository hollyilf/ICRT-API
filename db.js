// db.js -- connect to MongoDB Atlas database using Node and Mongoose

const mongoose = require("mongoose");

// Define uri and set recommended options for connecting to MongoDB using a uri string
const uri = process.env.ATLAS_URI;
const options = {
	useNewUrlParser: true,
};

// Define asynchronous function to connect to the DB
// async/await needed to handle error as mongoose.connect no longer supports a callback
const connectDB = async () => {
	try {
		// Connect to MongoDB using Mongoose and confirm connection if successful
		await mongoose.connect(uri, options);
		console.log("MongoDB is Connected");
	} catch (err) {
		// Log error if connection unsuccessful and terminate the Node process (exit code 1 indicates that an error occurred)
		console.error(err.message);
		process.exit(1);
	}
};

// Export the connection function so it can be called in app.js
module.exports = connectDB;
