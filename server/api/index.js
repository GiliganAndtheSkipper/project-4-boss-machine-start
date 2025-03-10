console.log('✅ index.js loaded');

const express = require('express');
const apiRouter = express.Router();

const minionsRouter = require('./minions');
console.log('✅ minionsRouter required');

const ideasRouter = require('./ideas');
console.log('✅ ideasRouter required');

const meetingsRouter = require('./meetings');
console.log('✅ meetingsRouter required');

apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);

console.log('✅ apiRouter mounted');

module.exports = apiRouter;
