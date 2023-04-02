import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

function RouteButton() {
  function handleClick() {
    window.location.href = '/hotels';
  }

  return (
    <button type="button" class="btn btn-primary float-start mx-3 px-5 my-3 py-3" onClick={handleClick}>Go to Hotels</button>
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
      <div class="taskbar" href=""><h1 class="text-black text-center display-1">Travel One</h1></div>

      <div class="hotDests">
        <div class="hotImg"><img class="hI" src={image1 == null ? '' : image1.url} /> <div class="middle">
          <h1 class="text-white">{firstCity == null ? "Data not yet loaded" :firstCity.city}</h1>
          <br></br>
          <h4 class="text-white">{firstCity == null ? "Data not yet loaded" : firstCity.city_description}</h4>
        </div></div>
        <div class="hotImg"><img class="hI" src={image2 == null ? '' : image2.url} /><div class="middle">
          <h1 class="text-white">{firstCity  == null ? "Data not yet loaded" : secondCity.city}</h1>
          <br></br>
          <h4 class="text-white">{secondCity == null ? "Data not yet loaded" : secondCity.city_description}</h4>
        </div></div>
        <div class="hotImg"><img class="hI" src={image3 == null ? '' : image3.url} /><div class="middle">
          <h1 class="text-white">{thirdCity  == null ? "Data not yet loaded" : thirdCity.city}</h1>
          <br></br>
          <h4 class="text-white">{thirdCity  == null ? "Data not yet loaded" : thirdCity.city_description}</h4>
        </div></div>
      </div>

      <div>
      </div>
      <div class="idInput">
        <div class="idLabel">Start Your Adventure!!</div>
        <div class="rightHalf">
        <div class="input-group">
        <span class="input-group-text ms-3 my-3">Enter Account ID</span>
        <textarea class="form-control me-3 my-3" aria-label="With textarea"></textarea>
        </div>
        <div class="flex">
        <button type="button" class="btn btn-primary float-start mx-3 px-5 my-3 py-3">Sign In</button>
        </div>
        <RouteButton />
        </div>
      </div>
    </body>
  
    
  );
}

export default HomePage;
