let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];

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
  "December",
];
let currentMonth = months[now.getMonth()];

let day = document.querySelector("#date");
day.innerHTML = `${currentDay}, ${currentMonth} ${now.getDate()}`;

let currentHour = now.getHours();

let currentMinutes = now.getMinutes();

let timeFormat = "";
if (currentHour >= 12) {
  timeFormat = "PM";
  currentHour = currentHour - 12;
} else {
  timeFormat = "AM";
}
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let time = document.querySelector("#time");
time.innerHTML = `${currentHour}:${currentMinutes} ${timeFormat}`;

let citySearchButton = document.querySelector("#city-form");
citySearchButton.addEventListener("submit", cityDisplay);

let citySearch;
let apiKey = "be60748992fab0f5da8162563fb21245";
let temperature;

function cityDisplay(event) {
  event.preventDefault();
  citySearch = document.querySelector("#city-search");
  let city = document.querySelector("h1");
  city.innerHTML = citySearch.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCity);
}
function showCity(response) {
  let temperatureValue = Math.round(response.data.main.temp);
  temperature.innerHTML = temperatureValue;
  console.log(temperature);
}

let celsiusButton = document.querySelector(".celsius");
celsiusButton.addEventListener("click", onclickCelsius);
temperature = document.querySelector(".temperature");
let temperatureValue = temperature.innerHTML;
function onclickCelsius() {
  temperature.innerHTML = Math.round(temperatureValue * 1.8) + 32;
}

let fahrenheitButton = document.querySelector(".fahrenheit");
fahrenheitButton.addEventListener("click", onclickFahrenheit);

function onclickFahrenheit() {
  temperature.innerHTML = temperatureValue;
}
function currentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentPosition);

let lat = 0;
let lon = 0;

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function showWeather(response) {
  let temperatureValue = Math.round(response.data.main.temp);
  let location = response.data.name;
  let city = document.querySelector("h1");
  let tempDisplay = document.querySelector(".temperature");
  tempDisplay.innerHTML = `${temperatureValue}`;
  city.innerHTML = location;
}
