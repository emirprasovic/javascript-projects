//https://api.openweathermap.org/data/2.5/weather?q=sarajevo&units=metric&appid=0c2f7a3cb36bb64bca1efc1609bb5978

const apiKey = "0c2f7a3cb36bb64bca1efc1609bb5978";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const temperature = document.querySelector(".temperature");
const city = document.querySelector(".city");
const humidityValue = document.querySelector(".humidity_value");
const windSpeed = document.querySelector(".wind_speed");
const weatherIcon = document.querySelector(".weather_icon__image");
const error = document.querySelector(".error");

const cityName = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const checkWeather = async (cityInput) => {
    const response = await fetch(apiUrl + cityInput + `&appid=${apiKey}`);

    if(response.status == 404) {
        error.style.display = "block";
    }else {
        error.style.display = "none";
    }

    var data = await response.json();

    console.log(data);

    temperature.innerHTML = Math.round(data.main.temp) + "°C";
    city.innerHTML = data.name;
    humidityValue.innerHTML = data.main.humidity + "%";
    windSpeed.innerHTML = Math.round(data.wind.speed) + "km/h";
    weatherIcon.src = `weather-app-img/images/${(data.weather[0].main).toLowerCase()}.png`;

}

searchBtn.addEventListener("click", () => {
    checkWeather(cityName.value);
})