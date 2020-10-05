const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logic = require('./logic')

var multer  = require('multer')

const app = express();
const port = process.env.PORT || 5001;
// app.use(bodyParser.json());
var upload = multer({ dest: 'uploads/' })
app.use(bodyParser.urlencoded({ extended: true }));

// API calls

app.post('/api/world', upload.single('file'), logic.generate);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
