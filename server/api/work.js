const express = require('express');
const workRouter = express.Router({ mergeParams: true });
const db = require('../db');

workRouter.use((req, res, next) => {
  const minion = db.getFromDatabaseById('minions', req.params.minionId);
  if (!minion) {
	return res.status(404).send({ error: 'Minion not found' });
  }
  next();
});

workRouter.param('workId', (req, res, next, workId) => {
  const work = db.getFromDatabaseById('work', workId);
  if (!work) {
	return res.status(404).send({ error: 'Work not found' });
  }
  req.work = work;
  next();
});

workRouter.get('/', (req, res) => {
  const minionWork = db.getAllFromDatabase('work')
	.filter(work => work.minionId === req.params.minionId);
  res.status(200).send(minionWork);
});

workRouter.post('/', (req, res) => {
  const { title, hours } = req.body;
  if (!title || typeof hours !== 'number' || hours < 0) {
	return res.status(400).send({ error: 'Invalid work data' });
  }

  const newWork = {
	...req.body,
	minionId: req.params.minionId
  };

  const created = db.addToDatabase('work', newWork);
  res.status(201).send(created);
});

workRouter.put('/:workId', (req, res) => {
  const { title, hours, minionId } = req.body;

  if (minionId && minionId !== req.params.minionId) {
	return res.status(400).send({ error: 'Minion ID mismatch' });
  }

  if (!title || typeof hours !== 'number' || hours < 0) {
	return res.status(400).send({ error: 'Invalid work data' });
  }

  const updatedWork = {
	...req.body,
	id: req.params.workId,
	minionId: req.params.minionId
  };

  const updated = db.updateInstanceInDatabase('work', updatedWork);

  if (updated) {
	res.status(200).send(updated);
  } else {
	res.status(404).send({ error: 'Work not found' });
  }
});

workRouter.delete('/:workId', (req, res) => {
  const deleted = db.deleteFromDatabasebyId('work', req.params.workId);
  if (deleted) {
	res.status(204).send();
  } else {
	res.status(404).send({ error: 'Work not found' });
  }
});

module.exports = workRouter;
