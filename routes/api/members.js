// Require express and set up instance of express router
const express = require("express");
const router = express.Router();

// Import model
const Member = require("../../models/Member");

// Create member using the data in the body of the HTTP request
router.post("/", async (req, res) => {
	try {
		const member = await Member.create(req.body);
		// Responds with a JSON object if successful
		res.json({ "DB Updated": "Member added successfully" });
	} catch (err) {
		// Logs error if unsuccessful
		console.error(err);
		res.status(500).json({ Error: "Unable to add member" });
	}
});

// Read all
router.get("/", async (req, res) => {
	try {
		const members = await Member.find();
		// Sends back data as JSON if successful
		res.json(members);
	} catch (err) {
		console.error(err);
		res.status(404).json({ Error: "No members found" });
	}
});

// Read individual
router.get("/:id", async (req, res) => {
	try {
		const member = await Member.findById(req.params.id);
		// Sends data as JSON if the member exists
		if (member) {
			res.json(member);
		} else {
			res.status(404).json({ Error: "No Member found" });
		}
	} catch (err) {
		console.error(err);
	}
});

// Update member using the data in the body of the HTTP request (locate member using the id from the URL parameter)
router.put("/:id", async (req, res) => {
	try {
		await Member.findByIdAndUpdate(req.params.id, req.body);
		res.json({ "DB Updated": "Member updated successfully" });
	} catch (err) {
		console.error(err);
		res.status(400).json({ Error: "Unable to update member" });
	}
});

// Delete member using id from the URL parameter
router.delete("/:id", async (req, res) => {
	try {
		await Member.findByIdAndRemove(req.params.id, req.body);
		res.json({ "DB Updated": "Member deleted successfully" });
	} catch (err) {
		console.error(err);
		res.status(404).json({ Error: "Unable to delete member" });
	}
});

// Export router to configure in app.js
module.exports = router;
