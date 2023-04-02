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


const messages = [{ "role": "user", "content": "Provide an array of size 3 with popular tourist cities JSON format with the format of city, popular_attractions, city_description" }];
//const messages = [{ "role": "user", "content": "hi" }];
//GPT-3 and DALL-E API Key
const GPTApiKey = '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';
const model = 'gpt-3.5-turbo';


const GPTTouristData = {
    "messages": messages,
    "model": model
};


app.get('/GPTLocationInfo', async (req, res) => {
  console.log("------- GPT IS BEING USED RIGHT NOW -------")
  const response = await axios({
    method: 'post',
    url: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + GPTApiKey
    },
    data: GPTTouristData,
  })
  const data = JSON.parse('{ "locations" : ' + String(response.data.choices[0].message.content) + '}');
    console.log(data);
    res.json(data);
});

// //given the prompt for the tourist destinations it provides an array of three good tourist destinations
// function getTouristPlaces() {
//   axios({
//     method: 'post',
//     url: 'https://api.openai.com/v1/chat/completions',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + GPTApiKey
//     },
//     data: GPTTouristData,
//   })
//     .then((response) => {
//       console.log(response.data.choices[0].message);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }
  
  
  
  
  
  