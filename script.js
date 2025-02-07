async function getWeatherDataAt(location = "London,UK") {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=GSL6W4Q5NSNQWXYQWXK6EPNZZ`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    processJSON(json);
  } catch (error) {
    console.log(error.message);
  }
}

function processJSON(json) {
  const address = json.address;
  const temperatureInF = json.currentConditions.temp;

  displayAddress(address);
  displayTemperature(temperatureInF);
}

function displayAddress(address) {
  const span = document.querySelector("span");
  span.innerText = address;
}

function displayTemperature(temperatureInF) {
  const p = document.querySelector("p");
  p.innerText += ` ${temperatureInF}\u00B0F/${calculateC(
    temperatureInF
  )}\u00B0C`;
}

function calculateC(F) {
  return Math.floor(((F - 32) * 5) / 9);
}

// getWeatherDataAt();
// getWeatherDataAt("Dallas, TX")

/*
{queryCost: 1, latitude: 51.5064, longitude: -0.12721, resolvedAddress: 'London, England, United Kingdom', address: 'London,UK', …}
address
: 
"London,UK"
alerts
: 
[]
currentConditions
: 
{datetime: '20:46:00', datetimeEpoch: 1738961160, temp: 38.7, feelslike: 34.1, humidity: 85.3, …}
days
: 
(15) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
description
: 
"Similar temperatures continuing with a chance of rain multiple days."
latitude
: 
51.5064
longitude
: 
-0.12721
queryCost
: 
1
resolvedAddress
: 
"London, England, United Kingdom"
stations
: 
{EGWU: {…}, EGLC: {…}, EGLL: {…}, D5621: {…}, F6665: {…}, …}
timezone
: 
"Europe/London"
tzoffset
: 
0
*/
