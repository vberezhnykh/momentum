import { currentLanguage } from "./local_storage.js";

async function getWeather() {
    const weatherIcon = document.querySelector('.icon');
    const temperature = document.querySelector('.temperature');
    const weatherDescription = document.querySelector('.description');
    const wind = document.querySelector('.wind');
    const humidity = document.querySelector('.humidity');
    const city = document.querySelector('.city');
    const weatherBlock = document.querySelector('.weather__main-info');
    let language = '';
    if (currentLanguage === 'english') {
        language = 'en';
    } else if (currentLanguage === 'russian') {
        language = 'ru';
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language}&appid=fab720c19713c688933ff49eb63ac915&units=metric`
    const res = await fetch (url);
    const data = await res.json();
    
    if (data.cod === 200) {
        weatherIcon.className = 'icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`)
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        if (currentLanguage === 'english') {
            wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`
            humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)} %`;
        } else if (currentLanguage === 'russian') {
            wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} м/с`;
            humidity.textContent = `Влажность: ${Math.floor(data.main.humidity)} %`;
        }
        weatherBlock.classList.remove('weather__main-info--errored');
    } else if (data.cod === '404' || city.value === '') {
        if (currentLanguage === 'english') {
            temperature.textContent = `${data.message}`;
            weatherBlock.classList.add('weather__main-info--errored');
            weatherIcon.className = 'icon owf';
            weatherDescription.textContent = '';
            wind.textContent = '';
            humidity.textContent = '';
        } else if (currentLanguage === 'russian' || city.value === '') {
            temperature.textContent = 'Неверно указан город';
            weatherBlock.classList.add('weather__main-info--errored');
            weatherIcon.className = 'icon owf';
            weatherDescription.textContent = '';
            wind.textContent = '';
            humidity.textContent = ''
        }
    }    
}

export { getWeather };