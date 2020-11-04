const key = "557cdf838b3a8ea73632410bf5a1913d";
function getURL(city) {
  return `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}&units=metric`;
}

function getURLFiveDays(city) {
  return `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric`;
}

// Select elements
let input = document.getElementById("city");
let degree = "&#8451";

// Fetch API
function reload(city) {
  (async () => {
    let response = await fetch(getURL(city));
    let body = await response.json();
    console.log(body);
    // Init object
    const obj = new Weather(body);
    displayOnScreen(obj);

    // Get weather data for 5 days
    let res = await fetch(getURLFiveDays(city));
    let data = await res.json();
    console.log(data);

    const fiveDays = [
      data.list[7],
      data.list[15],
      data.list[23],
      data.list[31],
      data.list[39],
    ];

    fiveDays.forEach((data) => {
      // Show day instead of date
      var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      var d = new Date(data.dt * 1000);
      var dayName = days[d.getDay()];

      // Display weather data for dive days
      function displayFiveDays(d) {
        document.getElementById("five-days").innerHTML += `
         <div class="one-day">
          <p>${dayName}</p>
          <img src = http://openweathermap.org/img/wn/${d.weather[0]["icon"]
          }.png>
          <h5>${parseInt(d.main.temp)}${degree}</h5>
          
         </div>
        `;
      }
      displayFiveDays(data);
    });
  }).apply();
}

reload("Belgrade");

// Weather constructor
function Weather(body) {
  this.city = body.name;
  this.country = body.sys["country"];
  this.temp = Math.floor(body.main["temp"]);
  this.pressure = body.main["pressure"];
  this.humidity = body.main["humidity"];
  this.wind = Math.floor(body.wind["speed"] * 1.609344);
  this.description = body.weather[0]["description"];
  this.weatherIcon = body.weather[0]["icon"];
}

// Display data
function displayOnScreen(weather) {
  document.getElementById("left").innerHTML += `
    <h2>${weather.city}, ${weather.country}</h2>
    <h5>${weather.description.charAt(0).toUpperCase() + weather.description.slice(1)
    }</h5>
    <img src = http://openweathermap.org/img/wn/${weather.weatherIcon}.png>
    <h1 id="temp">${weather.temp}${degree}</h1>`;
  document.getElementById("right").innerHTML += `
    <p>Wind: ${weather.wind} km/h</p>
    <p>Humidity: ${weather.humidity}%</p>
    <p>Pressure: ${weather.pressure} hPa</p>
  `;
}

// Return a value of city input
function getLocationInput() {
  return (inputValue = document.getElementById("city").value);
}

// Display changed data on the screen
let changeBtn = document.getElementById("change-btn");
changeBtn.addEventListener("click", changeCity);
function changeCity() {
  $(".left").empty();
  $(".right").empty();
  $("#five-days").empty();
  reload(getLocationInput());
  if (getLocationInput()) {
    $("#locModal").modal("hide");
    $("#city").val("");
  }
}

// Disable search button if input is empty

function validate() {
  if (input.value != "" || input.value != null) {
    changeBtn.disabled = false;
  }
}


