from amadeus import Client, ResponseError

amadeus = Client(
    client_id='2AoK8VGoA4o75yWQ71RijY2gkecIUkKz',
    client_secret='fwO2iYSvtEbI8jTN'
)

arr = {"AM": "AeroMexico", "AF": "Air France KLM", "AC": "Air Canada", "CX": "Asia miles", "AV": "Avianca Lifemiles", "BA": "British Airwars", "EK": "Emirates Skywards", "EY": "Etihad Airways", "BR": "EVA Air", "AY": "Finnair", "QF": "Qantas", "SQ": "Singapore Airlines", "TP": "Tap Air Portugal", "TK": "Turkish Airlines", "VS": "Virgin Red"}

def getFlights(originLocationCode, destinationLocationCode, departureDate, adults):
    num = 0
    iterative = 0

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

# print(getFlights("MAD", "ATH", "2023-11-01", 1))