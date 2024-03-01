const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=e1df93e0e8453a9d253ec01b10f0377d';
const API_UNITS = '&units=metric';
let weathers = [];
const weathersElements = document.querySelector('#weathers')

const input = document.querySelector('#cityInput')

async function getWeather(city) {
    const URL = API_LINK + city + API_KEY + API_UNITS;
    const response = await fetch(URL)
    const responseJSON = await response.json(); 
    return responseJSON;
}

document.querySelector('#submitBtn').addEventListener('click', async () => {
    if(input.value === '') return alert('Please enter a city name');
    else if (weathers.length >= 10) return alert('You can only check 10 cities at once');

    addWeather();
});

async function addWeather() {
    const value = input.value;
    const response = await getWeather(value);

    weathers.push(response);

    saveToStorage();
    renderWeathers();
}

const deleteWeather = (index) => {
    weathers.splice(index, 1);
    saveToStorage();
    renderWeathers();
}

function renderWeathers ()
{
    weathersElements.innerHTML = '';

    for (let i = 0; i < weathers.length; i++) {
        weathersElements.insertAdjacentHTML("beforeend", 
        `<div class="weather-info">
            <p class="weather">
                <img src="http://openweathermap.org/img/wn/${weathers[i].weather[0]?.icon}.png" alt="weather icon">
            </p>
            <p class="temperature">${weathers[i].main.temp}</p>
            <p class="humidity">${weathers[i].main.humidity}</p>
            <p class="city">${weathers[i].name}</p>
            <button type="button" onclick="deleteWeather(${i})">Remove</button>
        </div>`)
    } 
} 

function getFromStorage() {
    const weathers = localStorage.getItem('weathers');
    return JSON.parse(weathers);
}

function saveToStorage() {
    localStorage.setItem('weathers', JSON.stringify(weathers));
}

function init() {
    const weathersFromStorage = getFromStorage();

    if(weathersFromStorage) {
        weathers = weathersFromStorage;
        renderWeathers();
    }
}


init();