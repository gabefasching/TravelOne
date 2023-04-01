import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image1 from "./testImg/1.jpg"
import image2 from "./testImg/2.jpg"
import image3 from "./testImg/3.jpg"

function App() {
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
    <body >
            <ul class="taskbar">
                <li class="taskbar"><div class="taskbar" href="">Travel One</div></li>
                <li class="taskbar"><div class="taskbar" href="about.asp">About</div></li>
            </ul>

            <div class = "hotDests">
                <img class="hotImg" src={image1}/>
                <img class="hotImg" src={image2}/>
                <img class="hotImg" src={image2}/>
            </div>
         <div>
            <h1>{data == null ? "Data not  yet loaded" : data.fact}</h1>
          </div>
            <div class = "idInput">
                <div class="idLabel">Start Your Adventure!!</div>
                <div class="rightHalf">
                    <input class="idFeild" type="text" id="name" name="name" required minlength="4" maxlength="8" size="10"/>
                    <button class="idButton">Go!</button>
                </div>
            </div>
    </body>
    
    
  );
}

export default App;
