//left main column (search and search history containers)
var searchContainerEl = document.querySelector("#searchContainer");
var cityInputEl = document.querySelector("#cityInput");
var searchButtonEl = document.querySelector("#searchButton");
var citySearchHeaderEl = document.querySelector("#city-search-input");

var historyContainerEl = document.querySelector("#history");
var historyItemEl = document.querySelector("#historyItem");

var cities = [];

// right main column (current weather card and forecast weather cards)
// var currentCard = document.querySelector('#currentCard');

var mainIconEl = document.querySelector("#mainIcon");
var mainCardEl = document.querySelector("#mainCard");
var mainCityEl = document.querySelector("#city-search-input");
var mainTempEl = document.querySelector("#mainTemp");
var mainWindEl = document.querySelector("#mainWind");
var mainHumidityEl = document.querySelector("#mainHumidity");
var mainUVEl = document.querySelector("#mainUV");


var forecastContainerEl = document.querySelector("#forecastContainer");
var forecastCardEl = document.querySelector("#forecastCard");
var forecastDateEl = document.querySelector("#forecastDate");
var forecastIconEl = document.querySelector("#forecastIcon");
var forecastTempEl = document.querySelector("#forecastTemp");
var forecastWindEl = document.querySelector("#forecastWind");
var forecastHumidityEl = document.querySelector("#forecast");

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
    // getForecast(cityInput);

    // clear old content
    // historyItem.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a City");
  };


   saveHistory();
  // searchHistory(cityInput);
  //pastsearch(city);

};

var currentList =  document.querySelector("#currentCard");

var getCurrentWeather = function(cityInput) {

  var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + apiKey + "&units=imperial"; 

  var date = new Date();
  console.log(date.toLocaleDateString("en-US"));

  // fetch api data and then console log response
  fetch(apiUrl)
    .then(function(response) {
      console.log(response);
      //request was successful
      if (response.ok) {
        response.json().then(function(data) {
          console.log(data);

          // display current weather data in main card
          

         citySearchHeaderEl.textContent = cityInput + " - " + date.toLocaleDateString("en-US");
          
          // var currentListItem = document.createElement('li');

          var mainIconCode = data.weather[0].icon;
          var mainIconUrl = "http://openweathermap.org/img/wn/" + mainIconCode + ".png";
          console.log(mainIconUrl);
   
          mainIconEl.setAttribute('src', mainIconUrl);
        
          mainTempEl.textContent = "Temp: " + data.main.temp + " °F";
          // currentList.appendChild(currentListItem);

          mainWindEl.textContent = "Wind: " + data.wind.speed + " mph";
          // currentList.appendChild(currentListItem);

          mainHumidityEl.textContent = "Humidity: " + data.main.humidity + "%";
          // currentList.appendChild(currentListItem);

          var lat = data.coord.lat;
          console.log(lat);
          var lon = data.coord.lon;
          console.log(lon);
          
          var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

          fetch(oneCallUrl)
            .then(function(response) {
              console.log(response);
              //request was successful
              if (response.ok) {
                response.json().then(function(data) {
                  console.log(data);

                  

                  mainUVEl.textContent = "UV Index: " + data.current.uvi;

                  var forecast1 = document.createElement('div');
                  forecast1.className = 'col-span-1 p-3 m-3 h-64 w-40 bg-sky-900 text-white';
                  

                  


                  


                  
                  // forecastDateEl.textContent = 

                 

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
    
    

  

  // getForecast(cityInput);
  // console.log(getForecast);
  

  };


  // save search history to local storage
  var saveHistory = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
  };


// get forecast data
// var getForecast = function(cityInput) {
//   var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=" + apiKey; 

//   // fetch api data and then console log response
//   fetch(apiUrl)
//     .then(function(response) {
//       //request was successful
//       if (response.ok) {
//         response.json().then(function(data) {
//           console.log(data);
//           //  displayWeather(data);
//         });
//       } else {
//         alert("Error: " + response.statusText);
//       }
//     })
//     .catch(function(error) {
//       alert("Unable to connect to OpenWeather")
//     });
// };








  // citySearchedInputEl.textContent= citySearch;

  // create heading

  // create date

  //create icon
  // var currentTemp = document.createElement("ul");
  // currentTemp.textContent =  


  // create temp data
  // var newMainTemp = mainTempEl.textContent = "Temperature: " + weather.main.temp + " F";
  // mainTempEl.append(newMainTemp);
  

  // create div/span to hold humidity

  // create div/span to hold Wind

  // append to card/container (temp)

  // append to card/container (hum)

  // append to card/container (wind)




  


// display history
// var displayHistory = function(event){
//   var city = event.target.getAttribute("");
//   if(city){
//     getCity
//   }
// }




// var loadHistory = function(){

//   var searchedHistory = localStorage.getItem("cities");
//   cities = JSON.parse(searchedHistory ?? '[]');

   // if nothing in localStorage, end function
  //   if (!searchedHistory) {
  //    return
  //  };

//   for (let i = 0; i < cities.length; i++){

   
// };
// }; 




searchButtonEl.addEventListener("click", searchSubmitHandler);