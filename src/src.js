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
  document.querySelector("#displaytemp").innerHTML = Math.round(
    response.data.main.temp
  );
}

let newCity = document.querySelector("#submit");
newCity.addEventListener("click", handleSubmit);

let Time = new Date();
let date = Time.getDate();
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
let minutes = Time.getMinutes();
document.querySelector("#current-time").innerHTML = `${day}, ${hours}:${minutes}`;
search("Berlin");