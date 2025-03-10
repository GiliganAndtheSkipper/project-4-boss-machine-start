const express = require('express');
const cors = require('cors');
const path = require('path');

console.log('✅ server.js loaded');

const app = express();
module.exports = app; // for testing, leave this here

const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json()); // replaces body-parser

// ✅ Mount the api router
const apiRouter = require('./server/api');
app.use('/api', apiRouter);

// ✅ Serve static frontend assets
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Serve index.html as fallback
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Optional test route
app.get('/test', (req, res) => {
  res.send('✅ Test route works!');
});

// ✅ Start the server
if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`✅ Server is listening on port ${PORT}`);
  });
}
