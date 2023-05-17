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
console.log(currentDay);

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
let time = document.querySelector("#time");
time.innerHTML = `${currentHour}:${currentMinutes} ${timeFormat}`;
