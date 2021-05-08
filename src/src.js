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
}
function showTemperatureInFahrenheit(event) {
event.preventDefault();
celsiusLink.classList.remove("unit-link-active");
fahrenheitLink.classList.add("unit-link-active");
let fahrenheitTemp = ( celsiusTemperature*9/5) + 32;
let displayedTemp = document.querySelector("#displaytemp");
displayedTemp.innerHTML = Math.round(fahrenheitTemp);
}

function showTemperatureInCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("unit-link-active");
  celsiusLink.classList.add("unit-link-active");
  document.querySelector("#displaytemp").innerHTML= Math.round(celsiusTemperature);

}

function displayForecast() {
  let forecastElement = document.querySelector(`#weather-forecast`);
  
let forecastHTML = `<div class="row">`;
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
days.forEach(function(day){
forecastHTML =  forecastHTML + `
              <div class="col-2">
                <p class="day-forecast">${day}</p>
                <img
                  class="forecast-icon"
                  src="/Users/Elisa/Desktop/SheCodes/SheCodes-Plus-Week7/WetterApplikation/src/media/cloud.png"
                  alt="weather-icon"
                />
                <p class="forecasttemp">
                  <span class="tempmin">12</span>°
                  <span class="tempmax">20</span>°
                </p>
              </div>`;
})
            forecastHTML=  forecastHTML +`</div>`;
            forecastElement.innerHTML = forecastHTML;
}
let celsiusTemperature = null;
let celsiusLink = document.querySelector("#tempcelsius");
let fahrenheitLink = document.querySelector("#tempfahrenheit");

document.querySelector("#tempfahrenheit").addEventListener("click", showTemperatureInFahrenheit);
document.querySelector("#tempcelsius").addEventListener("click", showTemperatureInCelsius);


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
displayForecast();