//router for hotelAPI requests
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const bParse = require('body-parser')

const router = express.Router()

router.post("/hotels", async (req, res) => {
    console.log(req.body.data.location);
    const response = await axios({
      method: "get",
      url:
        "https://capitaloneshopping.com/api/v1/hotels/search?location=" +
        req.body.data.location +
        "&checkIn=" +
        req.body.data.checkIn +
        "&checkOut=" +
        req.body.data.checkOut +
        "&guests=" +
        req.body.data.guests +
        "&children=0&rooms=" +
        req.body.data.rooms +
        "&searchId=8f90aef2-9d69-4f61-b89f-3810405235a4",
  
      headers: {
        "Content-Type": "application/json",
        cookie:
          'wb_session=WB qyHBLlBjgvnF9sR6O66FXMntFoKbdf3XzF7XXsYjtqYtOKoD81XkuNALH1XOrR+BzyLcypIjPW8Oq8Z52b4/nqfVlLPYrf1KHaVGX4AOuW4f0AaVxXIdTHNUAwVug8vgxYV731V36HKThnAjxHxa+qvg+hM2SmjkwAfB7bPJl6vOjvaiyV2qJcDJGQDHGDOz4lAQcMfB7djDlu43foWYtKKQMRiDwdi2/3RQdcre5c7//IK684Trxl9XOh4uTXBYKQtWrIcYPiJYrwtZzN2Xtr68N5ECLTJbQB5R; __cf_bm=BfoMf4XsqyGF2.RIiyRVu2OfOS3IdXyYlYNV0uIlZGA-1680402551-0-AfwcO4Be7IOz65MUNvPwbbaGhKTOgY+c2tutL7r+HRL5ad9KKhx3b+/cD4jrO08hDpv/9xD1xFK4i1pksOuMA5w=; w82S5kL1=ALUTzD-HAQAAAlgLxgYznJgUVG5W8RVFNfxDajQkglLl6j4oGkkfqf4fncb8|1|0|d3adc96e91af3489456c302c6a397e4adfdc2121; ajs_group_id=null; ajs_user_id="f8bedbf1-2ea7-5ace-80a5-7783de7da8a0"; ajs_anonymous_id="dacc6005-b669-4b62-82b1-2cc8301d7449"; _dd_s=rum=0&expire=1680403755161',
      },
    });
    console.log(response);
    let diff = 0;
    var savingList = [];
    var offersList = [];
    var j = 0;
    for (let i = 0; i < response.data.hotels.length; i++) {
      for (j = 0; j < response.data.hotels[i].offers.length; j++) {
        diff =
          response.data.hotels[i].offers[j].pricing.averageNightlyPrice -
          response.data.hotels[i].offers[j].pricing
            .averageNightlyPriceAfterRewards;
        offersList[j] = diff;
      }
      offersList.sort((a, b) => b - a);
  
      savingList[i] = [i, offersList[0], j - 1];
    }
    savingList.sort((a, b) => a[1] - b[1]);
    let len = savingList.length;
  
    var list1 = savingList[len - 1];
    var hotel1 = response.data.hotels[list1[0]];
    var list2 = savingList[len - 2];
    var hotel2 = response.data.hotels[list2[0]];
    var list3 = savingList[len - 3];
    var hotel3 = response.data.hotels[list3[0]];
  
    hotels = [
      {
        'image': hotel1.mainImages[0],
        'savings': "You can save $" + parseFloat(list1[1]).toFixed(2),
        'discription': hotel1.areaDescription,
        'bookingUrl': hotel1.offers[list1[2]].bookingUrl,
      },
      {
        'image': hotel2.mainImages[0],
        'savings': "You can save $" + parseFloat(list2[1]).toFixed(2),
        'discription': hotel2.areaDescription,
        'bookingUrl': hotel2.offers[list2[2]].bookingUrl,
      },
      {
        'image': hotel3.mainImages[0],
        'savings': "You can save $" + parseFloat(list3[1]).toFixed(2),
        'discription': hotel3.areaDescription,
        'bookingUrl': hotel3.offers[list3[2]].bookingUrl,
      },
    ];
  
    res.json(hotels);
  });

  module.exports = router;
