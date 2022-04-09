var searchFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");

var getCity = function() {
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=348c24996b383a3b194931000900af7d";

  fetch(apiUrl).then(function(response) {
    console.log(response);
    response.json().then(function(data) {
      console.log(data);
    });
  });
};

getCity();
