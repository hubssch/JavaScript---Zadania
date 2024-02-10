const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=e1df93e0e8453a9d253ec01b10f0377d';
const API_UNITS = '&units=metric';

button.addEventListener('click', getWeather);
input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});

function getWeather() {
    const city = input.value;
    const URL = API_LINK + city + API_KEY + API_UNITS;

    fetch(URL)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(() => {
            warning.textContent = 'Wpisz poprawną nazwę miasta';
        });
}

function displayWeather(data) {
    const temp = data.main.temp;
    const hum = data.main.humidity;
    const status = data.weather[0].main;

    setWeatherIcon(status);

    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(temp)}°C`;
    humidity.textContent = `${hum}%`;
    weather.textContent = status;

    input.value = '';
}

function setWeatherIcon(status) {
    let iconSrc = './img/unknown.png';

    if (status.includes('Thunderstorm')) {
        iconSrc = './img/thunderstorm.png';
    } else if (status.includes('Drizzle')) {
        iconSrc = './img/drizzle.png';
    } else if (status.includes('Rain')) {
        iconSrc = './img/rain.png';
    } else if (status.includes('Snow')) {
        iconSrc = './img/ice.png';
    } else if (status.includes('Mist') || status.includes('Fog')) {
        iconSrc = './img/fog.png';
    } else if (status === 'Clear') {
        iconSrc = './img/sun.png';
    } else if (status.includes('Clouds')) {
        iconSrc = './img/cloud.png';
    }

    photo.setAttribute('src', iconSrc);
}
