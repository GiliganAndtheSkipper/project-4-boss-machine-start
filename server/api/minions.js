console.log('✅ minions.js loaded');

const express = require('express');
const minionsRouter = express.Router();
const db = require('../db');
const workRouter = require('./work');

const validateMinion = (minion) => {
  const { name, title, salary } = minion;
  return (
    typeof name === 'string' &&
    typeof title === 'string' &&
    typeof salary === 'number'
  );
};

// GET all minions
minionsRouter.get('/', (req, res) => {
  console.log('✅ GET /api/minions route hit');
  const minions = db.getAllFromDatabase('minions');
  res.status(200).send(minions);
});

// POST create new minion
minionsRouter.post('/', (req, res) => {
  const newMinion = req.body;

  if (!validateMinion(newMinion)) {
    return res.status(400).send({ error: 'Invalid minion data' });
  }

  const createdMinion = db.addToDatabase('minions', newMinion);
  res.status(201).send(createdMinion);
});

// GET minion by ID
minionsRouter.get('/:minionId', (req, res) => {
  const minion = db.getFromDatabaseById('minions', req.params.minionId);

  if (!minion) {
    return res.status(404).send({ error: 'Minion not found' });
  }

  res.status(200).send(minion);
});

// PUT update minion by ID
minionsRouter.put('/:minionId', (req, res) => {
  const minionId = req.params.minionId;

  const existingMinion = db.getFromDatabaseById('minions', minionId);
  if (!existingMinion) {
    return res.status(404).send({ error: 'Minion not found' });
  }

  const updatedMinion = req.body;

  if (!validateMinion(updatedMinion)) {
    return res.status(400).send({ error: 'Invalid minion data' });
  }

  updatedMinion.id = minionId;

  const updated = db.updateInstanceInDatabase('minions', updatedMinion);

  res.status(200).send(updated);
});

// DELETE minion by ID
minionsRouter.delete('/:minionId', (req, res) => {
  const deleted = db.deleteFromDatabasebyId('minions', req.params.minionId);

  if (!deleted) {
    return res.status(404).send({ error: 'Minion not found' });
  }

  res.status(204).send();
});

// Mount workRouter
minionsRouter.use('/:minionId/work', workRouter);

module.exports = minionsRouter;
