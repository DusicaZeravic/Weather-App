const key = "557cdf838b3a8ea73632410bf5a1913d";
function getURL(city) {
  return `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}&units=metric`;
}

function getURLFiveDays (city) {
  return `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric`;
}

// Fetch API
function reload(city) {
  (async () => {
    let response = await fetch(getURL(city));
    let body = await response.json();

    console.log(body);
    // Init object
    const obj = new Weather(body);
    displayOnScreen(obj);
  }).apply();
}

reload("Belgrade");

// Weather constructor
function Weather(body) {
  this.city = body.name;
  this.lon = body.coord["lon"];
  this.lat = body.coord["lat"];
  this.temp = Math.floor(body.main["temp"]);
  this.tempMax = Math.floor(body.main["temp_max"]);
  this.tempMin = Math.floor(body.main["temp_min"]);
  this.humidity = body.main["humidity"];
  this.wind = Math.floor(body.wind["speed"] * 1.609344);
  this.description = body.weather[0]["description"];
  this.weatherIcon = body.weather[0]["icon"];
}

// Display data 
function displayOnScreen(weather) {
  document.getElementById("icon").innerHTML += `<span class='icon'>
       <img src = http://openweathermap.org/img/wn/${weather.weatherIcon}.png>
       </span>`;

  document.getElementById("listData").innerHTML += `<tr class=tableRow> 
    <td>${weather.city}</td>
    <td><table class=coord>
    <td>${weather.lon}</td>
    <td>${weather.lat}</td>
    </table></td>
    <td><table class=main>
    <td>${weather.temp}</td>
    <td>${weather.tempMin}</td>
    <td>${weather.tempMax}</td>
    <td>${weather.wind}</td>
    <td>${weather.humidity}</td>
    </table></td>
    <td>${
      weather.description.charAt(0).toUpperCase() + weather.description.slice(1)
    }</td> 
    </tr>`;
}

// Return a value of city input
function getLocationInput() {
  return (cityValue = document.getElementById("city").value);
}

// Display changed data on screen
let changeBtn = document.getElementById("w-change-btn");
changeBtn.addEventListener("click", changeCity);
function changeCity() {
  $(".tableRow").empty();
  $(".icon").empty();
  reload(getLocationInput());
  if (getLocationInput()) {
    $("#locModal").modal("hide");
    $("#city").val("");
  }
}

// Get weather data for next 5 days
async function getDataFiveDays(city) {
    let response = await fetch(getURLFiveDays(city));
    let data = await response.json();
    console.log(data);

    const fiveDays = [data.list[7], data.list[15], data.list[23], data.list[31], data.list[39]]; 
    console.log(fiveDays);
  
};



getDataFiveDays("Belgrade");
    

