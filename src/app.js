let city = document.querySelector("#cityName");
let weatherIcon = document.getElementById("weatherIcon");
let weather = document.querySelector("#weather");
let temperature = document.querySelector(".temperature");
let wind = document.querySelector("#wind");
let humidity = document.querySelector("#humidity");
let pressure = document.querySelector("#pressure");
let citySearchButton = document.querySelector("#city-form");
let celsiusButton = document.querySelector("#celsius");
let fahrenheitButton = document.querySelector("#fahrenheit");
let locationButton = document.querySelector("#currentLocation");
let searchIcon = document.querySelector("#searchButton");
let temperatureValue;
let apiKey = "3eaf5c78aec50ffodbc4044f2tb60e9e";

currentPosition();

searchIcon.addEventListener("click", handleSubmit);
citySearchButton.addEventListener("submit", handleSubmit);
celsiusButton.addEventListener("click", onclickCelsius);
fahrenheitButton.addEventListener("click", onclickFahrenheit);
locationButton.addEventListener("click", currentPosition);

displayWeather();

function searchCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
}

function displayWeather() {
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
  if (currentHour > 12) {
    timeFormat = "PM";
    currentHour = currentHour - 12;
  } else if (currentHour == 12) {
    timeFormat = "PM";
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
  navigator.geolocation.getCurrentPosition(getForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-search");
  searchCity(cityInputElement.value);
}

function displayTemperature(response) {
  temperatureValue = Math.round(response.data.temperature.current);
  city.innerHTML = `${response.data.city}, ${response.data.country}`;
  weatherIcon.src = response.data.condition.icon_url;
  weather.innerHTML = response.data.condition.description;
  wind.innerHTML = `${Math.round(response.data.wind.speed * 3.6)} km/h`;
  humidity.innerHTML = response.data.temperature.humidity;
  pressure.innerHTML = response.data.temperature.pressure;
  onclickCelsius();
  console.log(response);
  getSearchForecast(
    response.data.coordinates.latitude,
    response.data.coordinates.longitude
  );
}

function onclickCelsius() {
  document.getElementById("celsius-label").classList.add("active");
  document.getElementById("fahrenheit-label").classList.remove("active");
  temperature.innerHTML = temperatureValue;
}

function onclickFahrenheit() {
  document.getElementById("celsius-label").classList.remove("active");
  document.getElementById("fahrenheit-label").classList.add("active");
  temperature.innerHTML = Math.round(temperatureValue * 1.8) + 32;
}

function getSearchForecast(lat, lon) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayForecast);
}

function getForecast(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let dailyForecast = response.data.daily;
  dailyForecast.forEach(function (day, index) {
    if (index !== 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
      <div class="center">${formatDate(day.time)}</div>
      <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
        day.condition.icon
      }.png"
       alt="${day.condition.icon}">
       <div class="center">${Math.round(day.temperature.day)}°C/
       <span class="active">
       ${Math.round(day.temperature.day * 1.8) + 32}°F</span></div>
       </div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
