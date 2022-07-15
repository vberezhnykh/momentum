import playList from "./playList.js";

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString('ru-Ru');
    document.querySelector('.time').textContent = currentTime;
    setTimeout(showTime, 1000);
    showDate();
    showGreeting();
}

window.addEventListener('load', showTime)

function showDate() {
    const date = new Date()
    const options = {
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    }
    const currentDate = date.toLocaleDateString('en-En', options);
    document.querySelector('.date').textContent = currentDate;
}

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    let timeOfDay = '';
    
    if (hours >= 0 && hours < 6) {
        timeOfDay = 'Night';
    } else if (hours >= 6 && hours < 12) {
        timeOfDay = 'Morning';
    } else if (hours >= 12 && hours < 18) {
        timeOfDay = 'Afternoon';
    } else {
        timeOfDay = 'Evening';
    }
    return timeOfDay;
}

function showGreeting() {
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay}, `;
    document.querySelector('.greeting').textContent = greetingText;
}

/* const greetingTranslation = {
    russian: 'Доброе Утро',
    english: 'Good Morning'
} */

function setLocalStorage() {
    const name = document.querySelector('.input');
    const city = document.querySelector('.city');
    localStorage.setItem('city', city.value);
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    const name = document.querySelector('.input');
    const city = document.querySelector('.city');

    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }

    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
}
window.addEventListener('load', getLocalStorage)

let randomNum;

function getRandomNum(min, max) {
    randomNum = (Math.floor(Math.random() * (max - min + 1)) + 1);
}

window.addEventListener('load', getRandomNum(1,20));

function setBg() {
    const timeOfDayUpperCase = getTimeOfDay();
    const timeOfDay = timeOfDayUpperCase.toLowerCase();
    let bgNum = randomNum.toString().padStart(2, '0');
    const img = new Image();
    
    img.src = `https://raw.githubusercontent.com/vberezhnykh/momentum-images/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
       document.body.style.backgroundImage = `url(https://raw.githubusercontent.com/vberezhnykh/momentum-images/assets/images/${timeOfDay}/${bgNum}.jpg)`;
    };
}

window.addEventListener('load', setBg);

function getSlideNext() {
    if (randomNum < 20) {
        randomNum += 1;
    } else randomNum = 1;
    setBg();
}

document.querySelector('.nextSlide').addEventListener('click', getSlideNext);

function getSlidePrev() {
    if (randomNum > 1) {
        randomNum -= 1;
    } else randomNum = 20;
    setBg();
}

document.querySelector('.previousSlide').addEventListener('click', getSlidePrev);

async function getWeather() {
    const weatherIcon = document.querySelector('.icon');
    const temperature = document.querySelector('.temperature');
    const weatherDescription = document.querySelector('.description');
    const wind = document.querySelector('.wind');
    const humidity = document.querySelector('.humidity');
    const city = document.querySelector('.city');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=eт&appid=fab720c19713c688933ff49eb63ac915&units=metric`
    const res = await fetch (url);
    const data = await res.json();
    
    weatherIcon.className = 'icon owf'; //придумать как выводить ошибку, если город не введен
   /* if (city === '') {
        weatherIcon.textContent = 'Error';
        temperature.textContent = 'Error'
    } else { */
        weatherIcon.classList.add(`owf-${data.weather[0].id}`)
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${data.wind.speed} m/s`
        humidity.textContent = `Humidity: ${data.main.humidity} %`;
    /* }  */
}

addEventListener('load', getWeather)

document.querySelector('.city').addEventListener('change', getWeather);

let randomQuoteNum;

function randomQuote(min, max) {
    randomQuoteNum = Math.floor(Math.random() * (max - min + 1)) + 1;
}

window.addEventListener('load', randomQuote(0,9));

async function getQuotes() {
    const quotes = 'quote.json';
    const res = await fetch(quotes);
    const data = await res.json();
    
    document.querySelector('.quote').textContent = data[`${randomQuoteNum}`].text;
    document.querySelector('.author').textContent = data[`${randomQuoteNum}`].author;
}

window.addEventListener('load', getQuotes);

function changeQuote() {
    let dataLength = 9;
    randomQuoteNum === dataLength ? randomQuoteNum = 0 : randomQuoteNum += 1;
    getQuotes();
}

document.querySelector('.change_quote').addEventListener('click', changeQuote);

const audio = new Audio();
let isPlay = false;
let playNum = 0;


function playAudio() {
    if(!isPlay) {
        audio.src = playList[playNum].src;
        audio.currentTime = 0;
        document.querySelector('.songName').textContent = playList[playNum].title;
        document.querySelector('.volume-percantage').style.width = '75%';
        audio.play();
        const playItem = document.querySelector(`.play-item:nth-child(${playNum + 1})`)
        playItem.classList.add('play-item__active');
        isPlay = true;
    } else {
        audio.pause();
        const playItem = document.querySelector(`.play-item:nth-child(${playNum + 1})`)
        playItem.classList.remove('play-item__active');
        isPlay = false;
    }
}

const button = document.querySelector('.player-icon');
const buttonNext = document.querySelector('.player-next');
const buttonPrev = document.querySelector('.player-previous')
button.addEventListener('click', playAudio); 
audio.addEventListener('ended', playNext)

function togglePause() {
    if(isPlay) {
        button.classList.add('pause');
    } else {
        button.classList.remove('pause');
        /* player.querySelector('.timeBar .length').textContent = '0:00';
        player.querySelector('.timeBar .current').textContent = '0:00' */
    }
}

function togglePauseArrow() {
    isPlay = true;
    togglePause();
}

button.addEventListener('click', togglePause)
buttonNext.addEventListener('click', togglePauseArrow)
buttonPrev.addEventListener('click', togglePauseArrow)


function playNext() {
    const playItem = document.querySelector(`.play-item:nth-child(${playNum + 1})`);
    playItem.classList.remove('play-item__active')

    if (playNum < 3) {
        playNum += 1;
    } else {
        playNum = 0;
    } 
    isPlay = false;
    playAudio();
}

const playerNext = document.querySelector('.player-next');
playerNext.addEventListener('click', playNext)

function playPrev() {
    const playItem = document.querySelector(`.play-item:nth-child(${playNum + 1})`);
    playItem.classList.remove('play-item__active')
    
    if (playNum > 0) {
        playNum -= 1;
    } else {
        playNum = 3;
    }
    isPlay = false;
    playAudio();
}

const playerPrev = document.querySelector('.player-previous');
playerPrev.addEventListener('click', playPrev);


const playListContainer = document.querySelector('.play-list');
playList.forEach(el => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = el.title;
    playListContainer.append(li);
})

const player = document.querySelector('.player');
const timeline = player.querySelector('.timeline');
timeline.addEventListener('click', e => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
}, false);

setInterval(() => {
    const progressBar = player.querySelector('.progress');
    progressBar.style.width = audio.currentTime / audio.duration * 100 + '%';
    player.querySelector('.timeBar .current').textContent = getTimeCodeFromNum(
        audio.currentTime
    );
}, 500);

function getTimeCodeFromNum (num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

audio.addEventListener('loadeddata', () => {
    player.querySelector('.timeBar .length').textContent = getTimeCodeFromNum(
        audio.duration);
        audio.volume = .75;
}, false)

const volumeSlider = player.querySelector('.volume-slider');
volumeSlider.addEventListener('click', e => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    player.querySelector('.volume-percantage').style.width = newVolume * 100 + '%';
}, false);

let currentVolumePercantage = '';
player.querySelector('.volume-button').addEventListener('click', () => {
    const volumeEl = player.querySelector('.volume-button');
    audio.muted = !audio.muted;
    if (audio.muted) {
        volumeEl.classList.add('volume-button_mute');
        currentVolumePercantage = player.querySelector('.volume-percantage').style.width;
        player.querySelector('.volume-percantage').style.width = '0%';
    } else {
        volumeEl.classList.remove('volume-button_mute');
        player.querySelector('.volume-percantage').style.width = `${currentVolumePercantage}`;
    }
})