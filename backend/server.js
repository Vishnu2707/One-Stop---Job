const express = require('express');
const https = require('https');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const getJobs = (req, res) => {
  const jobTitle = req.query.jobTitle || "Cloud Administrator";
  const location = req.query.location || "United Kingdom";
  const num_pages = req.query.num_pages || "20";
  const date_posted = req.query.date_posted || "all";
  
  const query = `${jobTitle} in ${location}`; // Construct the full query for API

  const options = {
    method: 'GET',
    hostname: 'jsearch.p.rapidapi.com',
    port: null,
    path: `/search?query=${encodeURIComponent(query)}&num_pages=${encodeURIComponent(num_pages)}&date_posted=${encodeURIComponent(date_posted)}`,
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'jsearch.p.rapidapi.com'
    }
  };

  const request = https.request(options, function (response) {
    const chunks = [];
    response.on('data', function (chunk) {
      chunks.push(chunk);
    });

    response.on('end', function () {
      const body = Buffer.concat(chunks);
      const parsedBody = JSON.parse(body.toString());
      console.log("Full API response:", parsedBody); // Logs the full response body to the terminal
      res.json(parsedBody); // Send the full response body to the frontend
    });
  });

  request.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
    res.status(500).send(`Server error: ${e.message}`);
  });

  request.end();
};

app.get('/api/jobs', getJobs);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
