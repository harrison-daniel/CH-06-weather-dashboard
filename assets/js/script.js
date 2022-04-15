//left main column (search and search history containers)
var searchContainer = document.querySelector("#searchContainer");
var cityInputEl = document.querySelector("#cityInput");
var searchButton = document.querySelector("#searchButton");

var historyContainer = document.querySelector("#history");
var historyItem = document.querySelector("#historyItem");

// right main column (current weather card and forecast weather cards)
var mainCard = document.querySelector("#mainCard");
var mainCity = document.querySelector("#mainCity");
var mainIcon = document.querySelector("#mainIcon");
var mainTemp = document.querySelector("#mainTemp");
var mainWind = document.querySelector("#mainWind");
var mainHumidity = document.querySelector("#mainHumidity");
var mainUV = document.querySelector("#mainUV");


var forecastContainer = document.querySelector("#forecastC");
var forecastCard = document.querySelector("#forecastCard");
var forecastDate = document.querySelector("#forecastDate");
var forecastIcon = document.querySelector("#forecastIcon");
var forecastTemp = document.querySelector("#forecastTemp");
var forecastWind = document.querySelector("#forecastWind");
var forecastHumidity = document.querySelector("#forecast");

// API Key Variable
var apiKey = "348c24996b383a3b194931000900af7d";


var searchSubmitHandler = function(event) {

  // prevent page refresh
  event.preventDefault();

  // get city value from user input
  var cityInput = cityInputEl.value.trim();

  if (cityInput) {
    console.log(cityInput);
    getCurrentWeather(cityInput);
    getForecast(cityInput);

    // clear old content
    historyItem.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
};

var getCurrentWeather = function(cityInput) {

  var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + apiKey; 

  // fetch api data and then console log response
  fetch(apiUrl)
    .then(function(response) {
      //request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          // searchCity(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to OpenWeather")
    });
};

// get forecast data
var getForecast = function(cityInput) {

  // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

  var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=" + apiKey; 

  // fetch api data and then console log response
  fetch(apiUrl)
    .then(function(response) {
      //request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          // searchCity(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to OpenWeather")
    });
};



searchButton.addEventListener("click", searchSubmitHandler);