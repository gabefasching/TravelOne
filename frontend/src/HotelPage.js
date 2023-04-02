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

  const handleClick = () => {
    // 👇 "message" stores input field value
    axios({
      method: 'get',
      url:'https://capitaloneshopping.com/api/v1/hotels/search?location=Madrid%2C+Spain&checkIn=2023-04-11&checkOut=2023-04-12&guests=2&children=0&rooms=1&searchId=8f90aef2-9d69-4f61-b89f-3810405235a4',
      headers: {
          'Content-Type': 'application/json',
          'cookie' : 'wb_session=WB qyHBLlBjgvnF9sR6O66FXMntFoKbdf3XzF7XXsYjtqYtOKoD81XkuNALH1XOrR+BzyLcypIjPW8Oq8Z52b4/nqfVlLPYrf1KHaVGX4AOuW4f0AaVxXIdTHNUAwVug8vgxYV731V36HKThnAjxHxa+qvg+hM2SmjkwAfB7bPJl6vOjvaiyV2qJcDJGQDHGDOz4lAQcMfB7djDlu43foWYtKKQMRiDwdi2/3RQdcre5c7//IK684Trxl9XOh4uTXBYKQtWrIcYPiJYrwtZzN2Xtr68N5ECLTJbQB5R; __cf_bm=BfoMf4XsqyGF2.RIiyRVu2OfOS3IdXyYlYNV0uIlZGA-1680402551-0-AfwcO4Be7IOz65MUNvPwbbaGhKTOgY+c2tutL7r+HRL5ad9KKhx3b+/cD4jrO08hDpv/9xD1xFK4i1pksOuMA5w=; w82S5kL1=ALUTzD-HAQAAAlgLxgYznJgUVG5W8RVFNfxDajQkglLl6j4oGkkfqf4fncb8|1|0|d3adc96e91af3489456c302c6a397e4adfdc2121; ajs_group_id=null; ajs_user_id="f8bedbf1-2ea7-5ace-80a5-7783de7da8a0"; ajs_anonymous_id="dacc6005-b669-4b62-82b1-2cc8301d7449"; _dd_s=rum=0&expire=1680403755161'
      },

  })
      .then((response) => {
          console.log(response.data.hotels[0]);
      })
      .catch((error) => {
          console.error(error);
      });
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
      <button onClick={handleClick}>button</button>
    </body>
    
    
  );
}

export default HotelPage