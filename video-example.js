
const apiKey = "a800e12812f1bf8b6f40b5a1de425658"
const weatherDataDiv = document.getElementById("weatherDataDiv")
const currentLocationButton = document.getElementById("currentLocationButton")
const cityLocationButton = document.getElementById("cityLocationButton")
const citySearchBox = document.getElementById('citySearchBox')
const stateSearchBox = document.getElementById('stateSearchBox')

// weather via location
currentLocationButton.addEventListener('click', function (){

    if(!navigator.geolocation) {
        console.log('Geolocation not supported')
    } else{
        navigator.geolocation.getCurrentPosition(function(position) {
            let lat = position.coords.latitude
            let lon = position.coords.longitude
            weatherViaLocation(lat, lon)
        }, function (){
            // error
            console.log('Unable to find location...')
        })
    }
})

function weatherViaLocation(lat, lon) {
    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    getWeatherInfo(url)
}


// weather via city
cityLocationButton.addEventListener('click', weatherViaCity)

function weatherViaCity() {
    let city = citySearchBox.value
    let state = stateSearchBox.value
    
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${state},US&appid=${apiKey}&units=imperial`
    getWeatherInfo(url)
}


// reusable functions

function getWeatherInfo(searchMethod) {
    fetch(searchMethod)
    .then(response => {
        return response.json()
    }).then(result => {
        displayWeather(result)
    })
}

function displayWeather(weatherData) {

    let weatherItem = `<div class='weatherContainer'>
                        <div class='weather-temp'>${weatherData.main.temp} &#176F</div>
                        <div class='weather-description'>${weatherData.weather[0].description}</div>
                        <div class='city-name'>City: ${weatherData.name}</div>
                        </div>
                        `
    weatherDataDiv.innerHTML = weatherItem
}
