const express = require('express');
const meetingsRouter = express.Router();
const db = require('../db');

// GET all meetings 
meetingsRouter.get('/', (req, res) => {
	const meetings = db.getAllFromDatabase('meetings');
	res.send(meetings);
});

// POST a new meeting
meetingsRouter.post('/', (req, res) => {
	const newMeeting = db.createMeeting();
	db.addToDatabase('meetings', newMeeting);
	res.status(201).send(newMeeting);
});

// DELETE all meetings
meetingsRouter.delete('/', (req, res) => {
	db.deleteAllFromDatabase('meetings');
	res.status(204).send();
});

module.exports = meetingsRouter;