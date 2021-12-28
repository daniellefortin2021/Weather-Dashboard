var apiKey = "acc613979eb69edb844178b8c2240961";
var searchButton = document.querySelector("#user-form");
var searchDiv = document.querySelector(".search-history");
var cityNameEl = document.querySelector("#city");
var currentWeatherEl = document.querySelector("#current-weather");
var fiveDayEl = document.querySelector("#five-day")

var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

// grab city name from search
var searchHandler = function(event){
    //prevent page from refreshing
    event.preventDefault();

    var cityName = cityNameEl.value.trim();

    searchHistory.push(cityName);
    localStorage.setItem("search", JSON.stringify(searchHistory));

    console.log(searchHistory);

    if (cityName) {
        searchWeather(cityName);

        // clear old content
        cityNameEl.value = "";
    } else {
        alert("Please enter a city name");
    };
};

//search api for city weather
var searchWeather = function (city){

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;    

    
    fetch(apiUrl).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                console.log(data,city);
    
           });
        }
    });
};


function displayCurrentWeather() {

};


function displaySearchHistory (){

    for (let i = 0; i < searchHistory.length; i++) {
        var searchHistoryEl = document.createElement("input");
        searchHistoryEl.setAttribute("type", "text");
        searchHistoryEl.setAttribute("readonly", true);
        searchHistoryEl.setAttribute("class", "form-control d-block text-light bg-secondary");
        searchHistoryEl.setAttribute("value",searchHistory[i]);
        searchDiv.appendChild(searchHistoryEl);
        //add event listener when clicked run get weather function
    };
};

displaySearchHistory();

searchButton.addEventListener("submit", searchHandler);