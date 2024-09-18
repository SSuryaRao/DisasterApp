const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const floodDataRoute = require('./routes/floodData'); 
const app = express();
app.use(cors());
app.use(express.json());
const csvRoutes = require('./scripts/csv');

app.use('/api', floodDataRoute); 
app.use('/api/csv', csvRoutes);


app.post('/run-script', (req, res) => {
  exec('python ../scripts/generate_map.py', (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(`Error: ${stderr}`);
    }
    res.send(`Output: ${stdout}`);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
