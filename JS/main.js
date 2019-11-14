const url = "http://api.openweathermap.org/data/2.5/weather?q=Belgrade,rs&APPID=557cdf838b3a8ea73632410bf5a1913d";

(async () => {
    let response = await fetch(url);
    let body = await response.json();

    console.log(body);

    // Initializing object
    const obj = {
        name: body.name,
        coord: body.coord['lon'],
        coord_one: body.coord['lat'],
        main: body.main['temp'],
        main_temp_max: body.main['temp_max'],
        main_temp_min: body.main['temp_min'],
        main_humidity: body.main['humidity'],
        wind: body.wind['speed'],
        weather: body.weather[0]['description'],
        weather_icon: body.weather[0]['icon']
    };

// Display data on table
    function displayOnScreen() {
        $("#icon").append(
            "<span>"+
            "<img src =http://openweathermap.org/img/wn/"+obj.weather_icon+".png />"+
            "</span>"
        );

        $("#listData").append(
            "<tr class=tableRow>"+
            "<td>"+obj.name+"</td>"+
            "<td>"+"<table>"+
            "<td>"+obj.coord+"</td>"+
            "<td>"+obj.coord_one+"</td>"+
            "</table>"+"</td>"+
            "<td>"+"<table class=main>"+
            "<td>"+obj.main+"</td>"+
            "<td>"+obj.main_temp_min+"</td>"+
            "<td>"+obj.main_temp_max+"</td>"+
            "<td>"+obj.wind+"</td>"+
            "<td>"+obj.main_humidity+"</td>"+
            "</table>"+"</td>"+
            "<td>"+obj.weather.charAt(0).toUpperCase() + obj.weather.slice(1)+"</td>"+
            "</tr>"
        );

    }
    displayOnScreen();
     
}).apply();





