var apiKey = "acc613979eb69edb844178b8c2240961";
var searchButton = document.querySelector("#user-form");
var searchDiv = document.querySelector(".search-history");
var cityNameEl = document.querySelector("#city");
var currentWeatherDiv = document.querySelector("#current-weather");
var fiveDayDiv = document.querySelector("#five-day")
var forecastEl = document.querySelectorAll(".forecast");

var forecastOne = document.querySelector(".forecast-one");
var forecastTwo = document.querySelector(".forecast-two");
var forecastThree = document.querySelector(".forecast-three");
var forecastFour = document.querySelector(".forecast-four");
var forecastFive = document.querySelector(".forecast-five");

var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

// sets current date format
var today = new Date();
var date = today.getMonth()+1+'/'+today.getDate()+'/'+today.getFullYear();

var month = today.getMonth()+1;
var day = today.getDate();
var year = today.getFullYear();

console.log(month + "/" + day + "/" + year);

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

                console.log(response);

                currentWeatherDiv.removeAttribute("class", "hide");
                currentWeatherDiv.setAttribute("class", "current");

                var cityDetails = document.createElement("div")
                // set attributes of div
                currentWeatherDiv.appendChild(cityDetails);


                var cityDate = document.createElement("h1");
                cityDate.innerHTML = data.name +" " + date;
                cityDetails.appendChild(cityDate);

                // add in icon
                var cityIcon = document.createElement("img");
                cityIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
                cityIcon.setAttribute("alt", data.weather[0].description);
                cityDate.appendChild(cityIcon);

                var cityTemp = document.createElement("p");
                cityTemp.innerHTML = "Temperature: " + k2f(data.main.temp) + "&#176F";
                cityDetails.appendChild(cityTemp)
                
                var cityWind = document.createElement("p");
                cityWind.innerHTML = "Wind: " + data.wind.speed+ " MPH";
                cityDetails.appendChild(cityWind);

                var cityHumidity = document.createElement("p");
                cityHumidity.innerHTML = "Humidity: " + data.main.humidity + "%";
                cityDetails.appendChild(cityHumidity);

                // 5 day forecast for weather
                var cityId = data.id;
                var forecastApi = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&appid=" + apiKey;

                fiveDayDiv.removeAttribute("class", "hide");
                fiveDayDiv.setAttribute("class", "row", "justify-content-between");

                fetch(forecastApi).then(function(response){
                    if(response.ok){
                        response.json().then(function(data){

                            //day one forecast

                            // day one date
                            var dayOne = document.createElement("h3");
                            var dayOneDate = new Date(); // get today date
                            dayOneDate.setDate(dayOneDate.getDate() + 1); // add one days
                            var finalDayOneDate = ((dayOneDate.getMonth() + 1)) + "/" + dayOneDate.getDate() +"/" + dayOneDate.getFullYear();
                        
                            dayOne.innerHTML = finalDayOneDate
                            forecastOne.appendChild(dayOne);

                            // add in icon - 
                            console.log(data.list[1].weather[0].icon);

                            var dayOneIcon = document.createElement("img");
                            dayOneIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[1].weather[0].icon + "@2x.png");
                            dayOneIcon.setAttribute("alt", data.list[1].weather[0].description);
                            forecastOne.appendChild(dayOneIcon);

                            var dayOneTemp = document.createElement("p");
                            dayOneTemp.innerHTML = "Temp: " + k2f(data.list[1].main.temp) + "&#176F";
                            forecastOne.appendChild(dayOneTemp)

                            var dayOneWind = document.createElement("p");
                            dayOneWind.innerHTML = "Wind: " + data.list[1].wind.speed+ " MPH";
                            forecastOne.appendChild(dayOneWind);

                            var dayOneHumidity = document.createElement("p");
                            dayOneHumidity.innerHTML = "Humidity: " + data.list[1].main.humidity + "%";
                            forecastOne.appendChild(dayOneHumidity);

                            
                            //day two forecast
                            var dayTwo = document.createElement("h3");
                            var dayTwoDate = new Date(); // get today date
                            dayTwoDate.setDate(dayTwoDate.getDate() + 2); // add one days
                            var finalDayTwoDate = ((dayTwoDate.getMonth() + 1)) + "/" + dayTwoDate.getDate() +"/" + dayTwoDate.getFullYear();
                        
                            dayTwo.innerHTML = finalDayTwoDate

                            forecastTwo.appendChild(dayTwo);

                            // add in icon
                            var dayTwoIcon = document.createElement("img");
                            dayTwoIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[2].weather[0].icon + "@2x.png");
                            dayTwoIcon.setAttribute("alt", data.list[3].weather[0].description);
                            forecastTwo.appendChild(dayTwoIcon);

                            var dayTwoTemp = document.createElement("p");
                            dayTwoTemp.innerHTML = "Temp: " + k2f(data.list[2].main.temp) + "&#176F";
                            forecastTwo.appendChild(dayTwoTemp)

                            var dayTwoWind = document.createElement("p");
                            dayTwoWind.innerHTML = "Wind: " + data.list[2].wind.speed+ " MPH";
                            forecastTwo.appendChild(dayTwoWind);

                            var dayTwoHumidity = document.createElement("p");
                            dayTwoHumidity.innerHTML = "Humidity: " + data.list[2].main.humidity + "%";
                            forecastTwo.appendChild(dayTwoHumidity);

                            // day three forecast
                            var dayThree = document.createElement("h3");
                            var dayThreeDate = new Date(); // get today date
                            dayThreeDate.setDate(dayThreeDate.getDate() + 3); // add one days
                            var finalDayThreeDate = ((dayThreeDate.getMonth() + 1)) + "/" + dayThreeDate.getDate() +"/" + dayThreeDate.getFullYear();
                        
                            dayThree.innerHTML = finalDayThreeDate
                            
                            forecastThree.appendChild(dayThree);

                            // add in forecast day three icon
                            var dayThreeIcon = document.createElement("img");
                            dayThreeIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[3].weather[0].icon + "@2x.png");
                            dayThreeIcon.setAttribute("alt", data.list[3].weather[0].description);
                            forecastThree.appendChild(dayThreeIcon);

                            var dayThreeTemp = document.createElement("p");
                            dayThreeTemp.innerHTML = "Temp: " + k2f(data.list[3].main.temp) + "&#176F";
                            forecastThree.appendChild(dayThreeTemp)

                            var dayThreeWind = document.createElement("p");
                            dayThreeWind.innerHTML = "Wind: " + data.list[3].wind.speed+ " MPH";
                            forecastThree.appendChild(dayThreeWind);

                            var dayThreeHumidity = document.createElement("p");
                            dayThreeHumidity.innerHTML = "Humidity: " + data.list[3].main.humidity + "%";
                            forecastThree.appendChild(dayThreeHumidity);

                            // day four forecast
                            var dayFour = document.createElement("h3");
                            
                            var dayFourDate = new Date(); // get today date
                            dayFourDate.setDate(dayFourDate.getDate() + 4); // add one days
                            var finalDayFourDate = ((dayFourDate.getMonth() + 1)) + "/" + dayFourDate.getDate() +"/" + dayFourDate.getFullYear();
                        
                            dayFour.innerHTML = finalDayFourDate

                            forecastFour.appendChild(dayFour);

                            // add in icon
                            var dayFourIcon = document.createElement("img");
                            dayFourIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[4].weather[0].icon + "@2x.png");
                            dayFourIcon.setAttribute("alt", data.list[4].weather[0].description);
                            forecastFour.appendChild(dayFourIcon);

                            var dayFourTemp = document.createElement("p");
                            dayFourTemp.innerHTML = "Temp: " + k2f(data.list[4].main.temp) + "&#176F";
                            forecastFour.appendChild(dayFourTemp)

                            var dayFourWind = document.createElement("p");
                            dayFourWind.innerHTML = "Wind: " + data.list[4].wind.speed+ " MPH";
                            forecastFour.appendChild(dayFourWind);

                            var dayFourHumidity = document.createElement("p");
                            dayFourHumidity.innerHTML = "Humidity: " + data.list[4].main.humidity + "%";
                            forecastFour.appendChild(dayFourHumidity);

                            // day five forecast
                            var dayFive = document.createElement("h3");
                            var dayFiveDate = new Date(); // get today date
                            dayFiveDate.setDate(dayFiveDate.getDate() + 5); // add one days
                            var finalDayFiveDate = ((dayFiveDate.getMonth() + 1)) + "/" + dayFiveDate.getDate() +"/" + dayFiveDate.getFullYear();
                        
                            dayFive.innerHTML = finalDayFiveDate

                            forecastFive.appendChild(dayFive);

                            // add in icon
                            var dayFiveIcon = document.createElement("img");
                            dayFiveIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[5].weather[0].icon + "@2x.png");
                            dayFiveIcon.setAttribute("alt", data.list[5].weather[0].description);
                            forecastFive.appendChild(dayFiveIcon);

                            var dayFiveTemp = document.createElement("p");
                            dayFiveTemp.innerHTML = "Temp: " + k2f(data.list[5].main.temp) + "&#176F";
                            forecastFive.appendChild(dayFiveTemp)

                            var dayFiveWind = document.createElement("p");
                            dayFiveWind.innerHTML = "Wind: " + data.list[5].wind.speed+ " MPH";
                            forecastFive.appendChild(dayFiveWind);

                            var dayFiveHumidity = document.createElement("p");
                            dayFiveHumidity.innerHTML = "Humidity: " + data.list[5].main.humidity + "%";
                            forecastFive.appendChild(dayFiveHumidity);


                            //for (i = 0; i > forecastEl.length; i++){
                                //remove current text - not working
                                //forecastEl[i].innerHTML = "";
                                //var forecastDateEl = document.createElement("h3");
                              //  forecastDateEl.innerHTML = data.list[0].dt_txt;
                               // fiveDayDiv.appendChild(forecastDateEl);

                                
                           // }
                        });
                    }
                })
                 // date
                 //icon
                 //temp
                 //wind
                //humidity
    
           });
           
        }
    });
    
};
    

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