import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image1 from "./testImg/1.jpg"
import image2 from "./testImg/2.jpg"
import image3 from "./testImg/3.jpg"
import './HotelPage.css';

function HotelPage() {
  //use setData as a setter for data. Will autoupdate view when state varible is modified
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');
  const [rooms, setRooms] = useState('');
  const [hotels,setHotels] = useState(
    [
      {
          "image": "https://images.trvl-media.com/lodging/40000000/39190000/39186300/39186206/533f153a.jpg?impolicy=fcrop&w=1000&h=666&quality=medium",
          "savings": "You can save $93.61",
          "discription": "Cour des Vosges is located in Paris City Center, a neighborhood in Paris, and is in a shopping district and near a metro station. Louvre Museum and Palais Garnier are cultural highlights, and some of the area's notable landmarks include Notre-Dame and Paris Catacombs. Check out an event or a game at Parc des Princes, and consider making time for Luxembourg Gardens, a top attraction not to be missed. ",
          "bookingUrl": "https://www.travelocity.com/go/hotel/info/39186206/2023-05-01/2023-05-02?tpid=80001&eapid=84080&NumAdult-Room1=2&rateplanid=274233090_24&currency=USD&mrp=0&langid=1033&NumRooms=1"
      },
      {
          "image": "https://images.trvl-media.com/lodging/1000000/90000/83100/83021/426bfe74.jpg?impolicy=fcrop&w=1000&h=666&quality=medium",
          "savings": "You can save $87.39",
          "discription": "In the entertainment district, Esprit Saint-Germain is in Paris City Center, a walkable area in Paris with good shopping. Louvre Museum and Palais Garnier are cultural highlights, and some of the area's notable landmarks include Notre-Dame and Arc de Triomphe. Check out an event or a game at Parc des Princes, and consider making time for Luxembourg Gardens, a top attraction not to be missed. Guests love the hotel's location for the sightseeing. ",
          "bookingUrl": "https://www.travelocity.com/go/hotel/info/83021/2023-05-01/2023-05-02?tpid=80001&eapid=84080&NumAdult-Room1=2&rateplanid=381229787_24&currency=USD&mrp=0&langid=1033&NumRooms=1"
      },
      {
          "image": "https://images.trvl-media.com/lodging/6000000/5580000/5576300/5576207/d0bcdca6.jpg?impolicy=fcrop&w=1000&h=666&quality=medium",
          "savings": "You can save $72.63",
          "discription": "Located in Paris City Center neighborhood, Grand Hotel du Palais Royal is connected to a rail/subway station. Louvre Museum and Palais Garnier are cultural highlights, and some of the area's notable landmarks include Palais Royal and Notre-Dame. Traveling with kids? Make time for Luxembourg Gardens, or check out an event or a game at Stade de France. Guests love the hotel's location for the sightseeing. ",
          "bookingUrl": "https://www.travelocity.com/go/hotel/info/5576207/2023-05-01/2023-05-02?tpid=80001&eapid=84080&NumAdult-Room1=2&rateplanid=382334311_24&currency=USD&mrp=0&langid=1033&NumRooms=1"
      }
  ]
  );
  const [leavingFlights,setLeavingFlights] = useState([]);
  const [returningFlights,setReturningFlights] = useState([]);
  
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handleCheckInChange = (event) => {
    setCheckIn(event.target.value);
  };
  const handleCheckOutChange = (event) => {
    setCheckOut(event.target.value);
  };
  const handleGuestsChange = (event) => {
    setGuests(event.target.value);
  };
  const handleRoomsChange = (event) => {
    setRooms(event.target.value);
  };
//url: 'https://capitaloneshopping.com/api/v1/hotels/search?location='+location+'&checkIn='+checkIn+'&checkOut='+checkOut+'&guests='+guests+'&children=0&rooms=1&searchId=8f90aef2-9d69-4f61-b89f-3810405235a4',

const useEffect = (event) => {
  const  fetchLocationData = async () => {
    await axios.post('http://localhost:3000/hotelAPI/hotels', {data:{"location":location,"checkIn":checkIn,"checkOut":checkOut, "guests":guests,"rooms":rooms}}).then((response) => {
      console.log(response);
      setHotels(response.data);

    });
  };
  fetchLocationData();

  
};


  //will update react view everytime useEffect is called


  //pass state variables as values to html components
  return (
    <body>
      <ul class="taskbar">
          <li class="taskbar"><div class="taskbar" href="">Travel One</div></li>
          <li class="taskbar"><div class="taskbar" href="about.asp">About</div></li>
      </ul>

      <div class="searchArgs">
        <div class="searchOpt">
          <div class="searchLabel">Location:</div>
          <input class="searchInput" onChange={handleLocationChange}/>
        </div>
        <div class="searchOpt">
          <div class="searchLabel">Check In:</div>
          <input class="searchInput" onChange={handleCheckInChange}/>
        </div>
        <div class="searchOpt">
          <div class="searchLabel">Check Out:</div>
          <input class="searchInput" onChange={handleCheckOutChange}/>
        </div>
        <div class="searchOpt">
          <div class="searchLabel">Guests:</div>
          <input class="searchInput" onChange={handleGuestsChange}/>
        </div>
        <div class="searchOpt">
          <div class="searchLabel">Rooms:</div>
          <input class="searchInput" onChange={handleRoomsChange}/>
        </div>
        <div class="bookButton">
          <button onClick={useEffect} >Book It!!</button>  
        </div>

      </div>
      <center>
      
      <div class="hotels">
        <br/>
        <div class="hotelBox"> 
          <img class="hotelImg" src={hotels[0].image}/> 
          <div class = "savings">{hotels[0].savings}</div>
          <div class = "disc"> {hotels[0].discription}</div>
          <a href={hotels[0].bookingUrl} class = "link">Click Here to Book!</a>
        </div>
        <br/>
        <div class="hotelBox"> 
          <img class="hotelImg" src={hotels[1].image}/> 
          <div class = "savings">{hotels[1].savings}</div>
          <div class = "disc"> {hotels[1].discription}</div>
          <a href={hotels[1].bookingUrl} class = "link">Click Here to Book!</a>
        </div>
        <br/>
        <div class="hotelBox"> 
          <img class="hotelImg" src={hotels[2].image}/> 
          <div class = "savings">{hotels[2].savings}</div>
          <div class = "disc"> {hotels[2].discription}</div>
          <a href={hotels[2].bookingUrl} class = "link">Click Here to Book!</a>
        </div>
      </div>
      <div class="leaving"></div>
      <div class="returning"></div>
      </center>
    </body>
    
    
  );
}

export default HotelPage