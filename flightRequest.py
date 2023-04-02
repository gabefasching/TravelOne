import json

import requests
from amadeus import Client, ResponseError


amadeus = Client(
   client_id='2AoK8VGoA4o75yWQ71RijY2gkecIUkKz',
   client_secret=AMADEUS_API_KEY
)


arr = {"AM": "AeroMexico", "AF": "Air France KLM", "AC": "Air Canada", "CX": "Asia miles", "AV": "Avianca Lifemiles", "BA": "British Airwars", "EK": "Emirates Skywards", "EY": "Etihad Airways", "BR": "EVA Air", "AY": "Finnair", "QF": "Qantas", "SQ": "Singapore Airlines", "TP": "Tap Air Portugal", "TK": "Turkish Airlines", "VS": "Virgin Red"}


def getFlights(originLocation, destinationLocation, departureDate, adults):
   num = 0
   iterative = 0
  
   origin = originLocation.split(",")
   destination = destinationLocation.split(",")


   api_url = 'https://api.api-ninjas.com/v1/geocoding?city={}&country={}'.format(origin[0], origin[1])
   response = requests.get(api_url + originLocation, headers={'X-Api-Key': GEO_API_KEY})
   response = json.loads(response.text)[0]


   originLocationLat = response["latitude"]
   originLocationLong = response["longitude"]


   api_url = 'https://api.api-ninjas.com/v1/geocoding?city={}&country={}'.format(destination[0], destination[1])
   response = requests.get(api_url + destinationLocation, headers={'X-Api-Key': GEO_API_KEY})
   response = json.loads(response.text)[0]


   destinationLocationLat = response["latitude"]
   destinationLocationLong = response["longitude"]


   responseOne = amadeus.reference_data.locations.airports.get(longitude=originLocationLong, latitude=originLocationLat)
   responseTwo = amadeus.reference_data.locations.airports.get(longitude=destinationLocationLong, latitude=destinationLocationLat)


   originLocationCode = responseOne.data[0]["iataCode"]
   destinationLocationCode = responseTwo.data[0]["iataCode"]


   body = amadeus.shopping.flight_offers_search.get(
           originLocationCode=originLocationCode, # ex: MAD
           destinationLocationCode=destinationLocationCode, # ex: ATH
           departureDate=departureDate, # ex: 2023-11-01
           adults=adults).result # ex: 1


   response = amadeus.shopping.flight_offers.prediction.post(body)
   retArr = [{}, {}, {}]
   while num < 3 and iterative < len(response.data)-2:
       if response.data[iterative]["itineraries"][0]["segments"][0]["carrierCode"] in arr:
           x = response.data[iterative]["itineraries"][0]["segments"][0]["carrierCode"]
          
           retArr[num] = {"airline": arr[x],
                           "price": response.data[iterative]["price"]["grandTotal"],
                           "currency": response.data[iterative]["price"]["currency"],
                           "origin": originLocationCode,
                           "destination": destinationLocationCode,
                           "departureDate": departureDate,
                           "adults": adults,
                           "departureTime": response.data[iterative]["itineraries"][0]["segments"][0]["departure"]["at"],
                           "arrivalTime": response.data[iterative]["itineraries"][0]["segments"][0]["arrival"]["at"]
                           }
           num += 1
       iterative += 1
   return retArr


# print(getFlights("London, England", "Paris, France", "2023-11-01", 1))
