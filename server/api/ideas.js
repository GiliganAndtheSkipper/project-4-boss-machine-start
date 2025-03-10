const express = require('express');
const ideasRouter = express.Router();
const db = require('../db');
const checkMillionDollarIdea = require('../checkMillionDollarIdea');

// ✅ GET all ideas
ideasRouter.get('/', (req, res) => {
  const ideas = db.getAllFromDatabase('ideas');
  res.status(200).send(ideas);
});

// ✅ POST create a new idea
ideasRouter.post('/', checkMillionDollarIdea, (req, res) => {
  const newIdea = db.addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
});

// ✅ GET single idea by ID
ideasRouter.get('/:ideaId', (req, res) => {
  const idea = db.getFromDatabaseById('ideas', req.params.ideaId);
  if (idea) {
	res.status(200).send(idea);
  } else {
	res.status(404).send();
  }
});

// ✅ PUT update an idea by ID
ideasRouter.put('/:ideaId', (req, res, next) => {
  const ideaId = req.params.ideaId;

  const existingIdea = db.getFromDatabaseById('ideas', ideaId);
  if (!existingIdea) {
	return res.status(404).send('Idea not found');
  }

  next();
}, checkMillionDollarIdea, (req, res) => {
  const ideaId = req.params.ideaId;

  const updatedIdea = req.body;
  updatedIdea.id = ideaId;

  const updated = db.updateInstanceInDatabase('ideas', updatedIdea);
  res.status(200).send(updated);
});


// ✅ DELETE an idea by ID
ideasRouter.delete('/:ideaId', (req, res) => {
  const deleted = db.deleteFromDatabasebyId('ideas', req.params.ideaId);
  if (deleted) {
	res.status(204).send();
  } else {
	res.status(404).send();
  }
});

module.exports = ideasRouter;
