function search(city) {
  let apiKey = "ddf91e7f98ae542cfe124eef0bb0b9fb";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let celsiusUnit = "metric";
  let apiUrl = `${apiEndpoint}${city}&units=${celsiusUnit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-input").value;
  search(city);
}

function getforecast(coordinates) {
let apiKey = "ddf91e7f98ae542cfe124eef0bb0b9fb";
let apiEndpoint="https://api.openweathermap.org/data/2.5/onecall?";
let exclude ="hourly,minutely,current,alerts"
let unit = "metric";
let apiURL =`${apiEndpoint}lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=${exclude}&units=${unit}&appid=${apiKey}`;
axios.get(apiURL).then(displayForecast);
}
function showTemp(response) {
  document.querySelector("#searched-city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-condition").innerHTML = response.data.weather[0].description;
  document.querySelector("#weathericon").setAttribute( "src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#weathericon").setAttribute("alt",response.data.weather[0].description );
 document.querySelector("#displaytemp").innerHTML = Math.round(
    response.data.main.temp
  );

  celsiusTemperature = response.data.main.temp;
  getforecast(response.data.coord);

}


function formatDay(timestamp) {
  let date = new Date(timestamp* 1000);
  let day = date.getDay();

  let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];

  return days[day];
}

function displayForecast(response) {
 let  forecastDaily = response.data.daily;
  let forecastElement = document.querySelector(`#weather-forecast`);
  
let forecastHTML = `<div class="row">`;
forecastDaily.forEach(function(forecastDay, index){
  if (index < 6) {
forecastHTML =  forecastHTML + `
              <div class="col-2">
                <p class="day-forecast">${formatDay(forecastDay.dt)}</p>
                <img
                  class="forecast-icon"
                  src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                  alt="weather-icon"
                />
                <p class="forecasttemp">
                  <span class="tempmin">${Math.round(forecastDay.temp.min)}</span>°
                  <span class="tempmax">${Math.round(forecastDay.temp.max)}</span>°
                </p>
              </div>`;
  }
});
            forecastHTML=  forecastHTML +`</div>`;
            forecastElement.innerHTML = forecastHTML;
}
let celsiusTemperature = null;
let celsiusLink = document.querySelector("#tempcelsius");


let newCity = document.querySelector("#submit");
newCity.addEventListener("click", handleSubmit);

let Time = new Date();
let date = Time.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[Time.getMonth()];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[Time.getDay()];
let hours = Time.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = Time.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}


document.querySelector("#current-date").innerHTML = `${day}, ${month} ${date}`;
document.querySelector("#current-time").innerHTML = `${hours}:${minutes}`;

search("Berlin");
