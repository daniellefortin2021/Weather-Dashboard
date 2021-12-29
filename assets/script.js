var apiKey = "acc613979eb69edb844178b8c2240961";
var searchButton = document.querySelector("#user-form");
var searchDiv = document.querySelector(".search-history");
var cityNameEl = document.querySelector("#city");
var currentWeatherDiv = document.querySelector("#current-weather");
var fiveDayDiv = document.querySelector("#five-day")

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
                currentWeatherDiv.removeAttribute("class", "hide");
                 currentWeatherDiv.setAttribute("class", "current");
    
                var date = moment().subtract(10, 'days').calendar();
                var cityDetails = document.createElement("div")
                // set attributes of div
                currentWeatherDiv.appendChild(cityDetails);

                var cityDate = document.createElement("h1");
                cityDate.innerHTML = data.name +" " + date;
                cityDetails.appendChild(cityDate);

                var cityTemp = document.createElement("p");
                cityTemp.innerHTML = "Temperature: " + k2f(data.main.temp) + "&#176F";
                cityDetails.appendChild(cityTemp)
                
                var cityWind = document.createElement("p");
                cityWind.innerHTML = "Wind: " + data.wind.speed+ " MPH";
                cityDetails.appendChild(cityWind);

                var cityHumidity = document.createElement("p");
                cityHumidity.innerHTML = "Humidity: " + data.main.humidity + "%";
                cityDetails.appendChild(cityHumidity);
                
                var cityUv = document.createElement("p");
                cityUv.innerHTML = "UV Index: ";
                cityDetails.appendChild(cityUv);


                console.log(data.name);
                displayCurrentWeather();
                displayWeatherForecast();
    
           });
        }
    });
};

// display current weather 
function displayCurrentWeather() {
    
};

function displayWeatherForecast(){
    fiveDayDiv.removeAttribute("class", "hide");
    fiveDayDiv.setAttribute("class", "row", "justify-content-between");

    
}

// change kelvin temp to farenheit 
function k2f(K) {
    return Math.floor((K - 273.15) * 1.8 + 32);
}

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