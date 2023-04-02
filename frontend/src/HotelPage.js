import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image1 from "./testImg/1.jpg"
import image2 from "./testImg/2.jpg"
import image3 from "./testImg/3.jpg"
import './App.css';

function HotelPage() {
  //use setData as a setter for data. Will autoupdate view when state varible is modified
  const [data, setData] = useState({});
  

  //will update react view everytime useEffect is called
  useEffect(() => {
    axios.get('http://localhost:3000/').then((response) => {
      console.log(response)
      setData(response.data)
    });
  }, []);

  //pass state variables as values to html components
  return (
    <div>
      <h1>Add what you want on this page</h1>
    </div>
    
    
  );
}

export default HotelPage