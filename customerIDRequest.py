import json

import requests

# set the API endpoint and key
endpoint = 'http://api.nessieisreal.com/customers?key=6aad83d07cf9e01164f8cfb5a02eb362'
api_key = '6aad83d07cf9e01164f8cfb5a02eb362'

def returnCustomerData(customer_id):
    # two sample customer IDs
    # 6428e1d09683f20dd5187737 - JOHN DOE
    # 6428e6d99683f20dd518773c - GABRIEL FASCHING

    get_endpoint = f'http://api.nessieisreal.com/customers/{customer_id}?key={api_key}'
    get_response = requests.get(get_endpoint)
    print(get_endpoint)

    getLOL = f'http://api.nessieisreal.com/customers/{customer_id}/accounts?key={api_key}'
    getResponseLOL = requests.get(getLOL)
    getResponseLOLJSON = json.loads(getResponseLOL.text)

    get_response_json = json.loads(get_response.text)

    retDict = {"Customer ID": get_response_json["_id"],
                "First Name": get_response_json["first_name"],
                "Last Name": get_response_json["last_name"],
                "Address": get_response_json["address"],
                "Account ID": getResponseLOLJSON[0]["_id"],
                "Type": getResponseLOLJSON[0]["type"],
                "Balance": getResponseLOLJSON[0]["balance"],
                "Rewards": getResponseLOLJSON[0]["rewards"],
                "Nickname": getResponseLOLJSON[0]["nickname"]}

    return retDict

# print(returnCustomerData("6428e1d09683f20dd5187737"))