const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

router.get('/csvdata', (req, res) => {
    const results = [];
    const csvFilePath = path.join(__dirname, '../media/csvfiles/Global_Landslide_Catalog_Export.csv');

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => results.push(row))
        .on('end', () => {
            res.json(results);
        });
});

module.exports = router;
