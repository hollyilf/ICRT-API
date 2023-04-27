const mongoose = require("mongoose");

//Define Schema
const memberSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name required"],
	},
	country: {
		type: String,
		required: [true, "Country required"],
	},
	region: {
		type: String,
		required: [true, "Region required"],
	},
	membership: {
		type: String,
		required: [true, "Membership type required"],
	},
});

//Compile schema into Model
const Member = mongoose.model("Member", memberSchema);

// Export model to use in api
module.exports = Member;
