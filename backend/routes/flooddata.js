const express = require('express');
const router = express.Router();
const csv = require('csv-parser');
const fs = require('fs');

// Endpoint to serve flood data
router.get('/flood-data', (req, res) => {
  const results = [];
  fs.createReadStream('media/csvfiles/Flood_data_clean.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    });
});

module.exports = router;
