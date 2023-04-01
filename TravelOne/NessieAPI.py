# This is written for PYTHON 3
# Don't forget to install requests package

import json
import requests

customerId = 'your customerId here'
apiKey = api.env.NESSIE_API_KEY

url = 'http://api.reimaginebanking.com/customers/{}/accounts?key={}'.format(customerId,apiKey)
payload = {
  "type": "Savings",
  "nickname": "test",
  "rewards": 10000,
  "balance": 10000,	
}
# Create a Savings Account
response = requests.post( 
	url, 
	data=json.dumps(payload),
	headers={'content-type':'application/json'},
	)

if response.status_code == 201:
	print('account created')

#  JAVASCRIPT ON NODE

var request = require('superagent');
request.get('http://api.reimaginebanking.com/atms?key=your_key').end(function(res){
    foo(res.status);
    bar(res.body); //do something
});
# 
