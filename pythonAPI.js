//router for hotelAPI requests
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const bParse = require('body-parser')
const { PythonShell } = require('python-shell');
const router = express.Router()

router.post("/airlines", async (req, res) => {

});

router.post("/capInfo", async (req, res) => {
    const Id = req.body.Id;
    const endpoint = 'http://api.nessieisreal.com/customers?key=6aad83d07cf9e01164f8cfb5a02eb362';
    const api_key = '6aad83d07cf9e01164f8cfb5a02eb362';
    const getEndpoint = 'http://api.nessieisreal.com/customers/'+Id+'?key='+api_key;
    const response = await axios.get(getEndpoint);
    res.json(response.text)
});
module.exports = router;