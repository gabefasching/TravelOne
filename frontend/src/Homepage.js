import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function RouteButton() {
  function handleClick() {
    window.location.href = '/hotels';
  }

  return (
    <button onClick={handleClick}>Go to Hotels</button>
  );
}

function HomePage() {
  //use setData as a setter for data. Will autoupdate view when state variable is modified
  const [firstCity, setFirstCity] = useState({});
  const [secondCity, setSecondCity] = useState({});
  const [thirdCity, setThirdCity] = useState({});

  const [image1, setImage1] = useState({});
  const [image2, setImage2] = useState({});
  const [image3, setImage3] = useState({});

  //will update react view everytime useEffect is called
  useEffect(() => {
    const  fetchLocationData = async () => {
      await axios.get('http://localhost:3000/GPTLocationInfo', {timeout : 20000000}).then((response) => {
        console.log(response);
        setFirstCity(response.data.locations[0]);
        setSecondCity(response.data.locations[1]);
        setThirdCity(response.data.locations[2]);
      });
    };
    fetchLocationData();
  }, []);

  useEffect(() => {
      const fetchCity1Pic = async () => {
        await axios.post('http://localhost:3000/DALLEPicture', {data: {place: firstCity.city} }, {timeout : 20000000}).then((response) => {
          setImage1(response.data);
        });
      };
      fetchCity1Pic();
  }, [firstCity]);

  useEffect(() => {
    const fetchCity2Pic = async () => {
      await axios.post('http://localhost:3000/DALLEPicture', {data: {place: secondCity.city} }, {timeout : 20000000}).then((response) => {
        setImage2(response.data);
      });
    };
    fetchCity2Pic();
  }, [secondCity]);

  useEffect(() => {
    const fetchCity3Pic = async () => {
      await axios.post('http://localhost:3000/DALLEPicture', {data: {place: thirdCity.city} }, {timeout : 20000000}).then((response) => {
        setImage3(response.data);
      });
    };
    fetchCity3Pic();
  }, [thirdCity]);

  //pass state variables as values to html components
  return (
    <body>
      <ul class="taskbar">
        <li class="taskbar"><div class="taskbar" href="">Travel One</div></li>
        <li class="taskbar"><div class="taskbar" href="about.asp">About</div></li>
      </ul>

      <div class="hotDests">
        <div class="hotImg"><img class="hI" src={image1 == null ? '' : image1.url} /> <div class="middle">
          <h1>{firstCity == null ? "Data not yet loaded" :firstCity.city}</h1>
          <br></br>
          <h4>{firstCity == null ? "Data not yet loaded" : firstCity.city_description}</h4>
        </div></div>
        <div class="hotImg"><img class="hI" src={image2 == null ? '' : image2.url} /><div class="middle">
          <h1>{firstCity  == null ? "Data not yet loaded" : secondCity.city}</h1>
          <br></br>
          <h4>{secondCity == null ? "Data not yet loaded" : secondCity.city_description}</h4>
        </div></div>
        <div class="hotImg"><img class="hI" src={image3 == null ? '' : image3.url} /><div class="middle">
          <h1>{thirdCity  == null ? "Data not yet loaded" : thirdCity.city}</h1>
          <br></br>
          <h4>{thirdCity  == null ? "Data not yet loaded" : thirdCity.city_description}</h4>
        </div></div>
      </div>

      <div>
      </div>
      <div class="idInput">
        <div class="idLabel">Start Your Adventure!!</div>
        <div class="rightHalf">
          <input class="idFeild" type="text" id="name" name="name" required minlength="4" maxlength="8" size="10" />
          <button class="idButton">Go!</button>
        </div>
        <RouteButton />

      </div>
    </body>
  
    
  );
}

export default HomePage;
