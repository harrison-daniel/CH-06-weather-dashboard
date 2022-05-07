//left main column (search and search history containers)
var searchContainerEl = document.querySelector("#searchContainer");
var cityInputEl = document.querySelector("#cityInput");
var searchButtonEl = document.querySelector("#searchButton");
var citySearchHeaderEl = document.querySelector("#city-search-input");
var historyContainerEl = document.querySelector("#history");
var historyItemEl = document.querySelector("#historyItem");

var cities = [];

// Current Weather column
var mainIconEl = document.querySelector("#mainIcon");
var mainCardEl = document.querySelector("#mainCard");
var mainCityEl = document.querySelector("#city-search-input");
var mainTempEl = document.querySelector("#mainTemp");
var mainWindEl = document.querySelector("#mainWind");
var mainHumidityEl = document.querySelector("#mainHumidity");
var mainUVEl = document.querySelector("#mainUV");


// Forecast Card 1
// var forecastContainerEl = document.querySelector("#forecastContainer");
// var forecastCardEl = document.querySelector("#forecastCard");
// var forecastDateEl = document.querySelector("#forecastDate");
// var forecastIconEl = document.querySelector("#forecastIcon");
// var forecastTempEl = document.querySelector("#forecastTemp");
// var forecastWindEl = document.querySelector("#forecastWind");
// var forecastHumidityEl = document.querySelector("#forecast");


// Forecast Card Dates
var fDate1 = document.querySelector('#forecastDate1');
var fDate2 = document.querySelector('#forecastDate2');
var fDate3 = document.querySelector('#forecastDate3');
var fDate4 = document.querySelector('#forecastDate4');
var fDate5 = document.querySelector('#forecastDate5');


// Forecast Card Weather Images
var fIcon1 = document.querySelector('#fIcon1');
var fIcon2 = document.querySelector('#fIcon2');
var fIcon3 = document.querySelector('#fIcon3');
var fIcon4 = document.querySelector('#fIcon4');
var fIcon5 = document.querySelector('#fIcon5');


// Forecast Card Temps
var fTemp1 = document.querySelector('#forecastTemp1');
var fTemp2 = document.querySelector('#forecastTemp2');
var fTemp3 = document.querySelector('#forecastTemp3');
var fTemp4 = document.querySelector('#forecastTemp4');
var fTemp5 = document.querySelector('#forecastTemp5');

// Forecast Card Wind
var fWind1 = document.querySelector('#forecastWind1');
var fWind2 = document.querySelector('#forecastWind2');
var fWind3 = document.querySelector('#forecastWind3');
var fWind4 = document.querySelector('#forecastWind4');
var fWind5 = document.querySelector('#forecastWind5');

// Forecast Card Humidity
var fHum1 = document.querySelector('#forecastHumidity1');
var fHum2 = document.querySelector('#forecastHumidity2');
var fHum3 = document.querySelector('#forecastHumidity3');
var fHum4 = document.querySelector('#forecastHumidity4');
var fHum5 = document.querySelector('#forecastHumidity5');



// API Key Variable
var apiKey = "348c24996b383a3b194931000900af7d";


// Search button handler
var searchSubmitHandler = function(event) {

  // prevent page refresh
  event.preventDefault();

  // get city value from user input
  var cityInput = cityInputEl.value.trim();

  if (cityInput) {
    console.log(cityInput);
    getWeather(cityInput);
    // getForecast(cityInput);

    // clear old content
    // historyItem.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a City");
  };


   saveHistory();
   searchedHistory(cityInput);
   pastsearch(city);

};


var getWeather = function(cityInput) {

  var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + apiKey + "&units=imperial"; 

  // get date
  var date = new Date().toLocaleDateString("en-US"); 
   
  var date1 = new Date(date);
      date1.setDate(date1.getDate()+ 1);

  var date2 = new Date(date);
      date2.setDate(date2.getDate()+ 2);

  var date3 = new Date(date);
      date3.setDate(date3.getDate()+ 3);

  var date4 = new Date(date);
      date4.setDate(date4.getDate()+ 4);

  var date5 = new Date(date);
      date5.setDate(date5.getDate()+ 5);


  // set date to mm/dd/yyyy
  console.log(date);

  var uppercase = cityInput.split('')[0].toUpperCase();
  console.log(uppercase)
  
  // fetch api data and then console log response
  fetch(apiUrl)
    .then(function(response) {
      console.log(response);
      //request was successful
      if (response.ok) {
        response.json().then(function(data) {
          console.log(data);

         // display current weather data in main card
         citySearchHeaderEl.textContent = "Showing Weather for: " + cityInput + " on " + date;
          var mainIconCode = data.weather[0].icon;
          var mainIconUrl = "http://openweathermap.org/img/wn/" + mainIconCode + ".png";
          console.log(mainIconUrl);
          mainIconEl.setAttribute('src', mainIconUrl);
        
          mainTempEl.textContent = "Temp: " + data.main.temp + " °F";
          mainWindEl.textContent = "Wind: " + data.wind.speed + " mph";
          mainHumidityEl.textContent = "Humidity: " + data.main.humidity + "%";

         // create Lat and Lon variables for Forecast API 
          var lat = data.coord.lat;
          console.log(lat);
          var lon = data.coord.lon;
          console.log(lon);
          
          var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";

          fetch(oneCallUrl)
            .then(function(response) {
              console.log(response);
              //request was successful
              if (response.ok) {
                response.json().then(function(fData) {
                  console.log(fData);

                  // for (var i = 0; i < fData.daily.length; i++) {
                  //   console.log(fData[i].clouds);
                  // }

                  // Current Card UV Index
                  mainUVEl.textContent = "UV Index: " + fData.daily[0].uvi;
                  
                  // Forecast Card Dates
                  fDate1.textContent = date1.toLocaleDateString("en-US");
                  fDate2.textContent = date2.toLocaleDateString("en-US");
                  fDate3.textContent = date3.toLocaleDateString("en-US");
                  fDate4.textContent = date4.toLocaleDateString("en-US");
                  fDate5.textContent = date5.toLocaleDateString("en-US");

                  // Forecast Icon 1 
                  iconCode1 = fData.daily[1].weather[0].icon;
                  var iconURL1 = "http://openweathermap.org/img/wn/" + iconCode1 + ".png";
                  fIcon1.setAttribute('src', iconURL1);

                  // Forecast Icon 2
                  iconCode2 = fData.daily[2].weather[0].icon;
                  var iconURL2 = "http://openweathermap.org/img/wn/" + iconCode2 + ".png";
                  fIcon2.setAttribute('src', iconURL2);

                  // Forecast Icon 3
                  iconCode3 = fData.daily[3].weather[0].icon;
                  var iconURL3 = "http://openweathermap.org/img/wn/" + iconCode3 + ".png";
                  fIcon3.setAttribute('src', iconURL3);

                  // Forecast Icon 4
                  iconCode4 = fData.daily[4].weather[0].icon;
                  var iconURL4 = "http://openweathermap.org/img/wn/" + iconCode4 + ".png";
                  fIcon4.setAttribute('src', iconURL4);

                  // Forecast Icon 5
                  iconCode5 = fData.daily[5].weather[0].icon;
                  var iconURL5 = "http://openweathermap.org/img/wn/" + iconCode5 + ".png";
                  fIcon5.setAttribute('src', iconURL5);

                  // Forecast Temp for Cards 1 -5
                  fTemp1.textContent = "Temp: " + fData.daily[1].temp.day + " °F";
                  fTemp2.textContent = "Temp: " + fData.daily[2].temp.day + " °F";
                  fTemp3.textContent = "Temp: " + fData.daily[3].temp.day + " °F";
                  fTemp4.textContent = "Temp: " + fData.daily[4].temp.day + " °F";
                  fTemp5.textContent = "Temp: " + fData.daily[5].temp.day + " °F";
                 
                  // Forecast Wind for Cards 1 -5
                  fWind1.textContent = "Wind: " + fData.daily[1].wind_speed + " mph";
                  fWind2.textContent = "Wind: " + fData.daily[2].wind_speed + " mph";
                  fWind3.textContent = "Wind: " + fData.daily[3].wind_speed + " mph";
                  fWind4.textContent = "Wind: " + fData.daily[4].wind_speed + " mph";
                  fWind5.textContent = "Wind: " + fData.daily[5].wind_speed + " mph";

                  // Forecast Humidity for Cards 1 -5
                  fHum1.textContent = "Humidity: " + fData.daily[1].humidity;
                  fHum2.textContent = "Humidity: " + fData.daily[2].humidity;
                  fHum3.textContent = "Humidity: " + fData.daily[3].humidity;
                  fHum4.textContent = "Humidity: " + fData.daily[4].humidity;
                  fHum5.textContent = "Humidity: " + fData.daily[5].humidity;
                  

              

            

                });
              } else {
                alert("Error: " + response.statusText);
              }
            })
            .catch(function(error) {
              alert("Unable to connect to OpenWeather")
            });
      


        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to OpenWeather")
    });
    
  
  // console.log(getForecast);
  

  };





  // save search history to local storage
  var saveHistory = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
  };


// display history
// var displayHistory = function(event){
//   var city = event.target.getAttribute("");
//   if(city){
//     getCity
//   }
// }


// var loadHistory = function(){

   var searchedHistory = localStorage.getItem("cities");
   cities = JSON.parse(searchedHistory ?? '[]');

   // if nothing in localStorage, end function
    //  if (!searchedHistory) {
    //   return;
    // };

//   for (let i = 0; i < cities.length; i++){

   
// };
// }; 


searchButtonEl.addEventListener("click", searchSubmitHandler);