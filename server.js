
const express = require('express');
const cors = require('cors');
const bParse = require('body-parser');
const axios = require('axios')
const app = express();

app.use(cors());
app.use(bParse.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Running Server on ${PORT}`);
});

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://catfact.ninja/fact');
        const data = response.data;
        console.log('Data sent from backend:', data);
        res.json(data);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      }
  });