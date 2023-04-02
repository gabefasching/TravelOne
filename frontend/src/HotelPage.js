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
  const [hotels,setHotels] = useState([
    {
      'image': '',
      'savings': '',
      'discription': '',
      'bookingUrl': '',
    },
    {
      'image': '',
      'savings': '',
      'discription': '',
      'bookingUrl': '',
    },
    {
      'image': '',
      'savings': '',
      'discription': '',
      'bookingUrl': '',
    }
  ]);
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

      </div>
      <button onClick={useEffect}>button</button>
      <div class="hotels">

        <div class="hotelBox"> 
          <img class="hotelImg" src={hotels[0].image}/> 
          <div class = "savings">{hotels[0].savings}</div>
          <div class = "disc"> {hotels[0].discription}</div>
          <a href={hotels[0].bookingUrl} class = "link">Click Here to Book!</a>
        </div>

        <div class="hotelBox"> 
          <img class="hotelImg" src={hotels[1].image}/> 
          <div class = "savings">{hotels[1].savings}</div>
          <div class = "disc"> {hotels[1].discription}</div>
          <a href={hotels[1].bookingUrl} class = "link">Click Here to Book!</a>
        </div>

        <div class="hotelBox"> 
          <img class="hotelImg" src={hotels[2].image}/> 
          <div class = "savings">{hotels[2].savings}</div>
          <div class = "disc"> {hotels[2].discription}</div>
          <a href={hotels[2].bookingUrl} class = "link">Click Here to Book!</a>
        </div>
      </div>

        
        

      <div class="leaving"></div>
      <div class="returning"></div>
    </body>
    
    
  );
}

export default HotelPage