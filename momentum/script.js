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
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    const name = document.querySelector('.input');
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
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
    const city = document.querySelector('.city');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=eт&appid=fab720c19713c688933ff49eb63ac915&units=metric`
    const res = await fetch (url);
    const data = await res.json();
    
    weatherIcon.className = 'icon owf'; //придумать как выводить ошибку, если город не введен
    /* if (city === undefined) {
        weatherIcon.textContent = 'Error';
    } else { */
        weatherIcon.classList.add(`owf-${data.weather[0].id}`)
        temperature.textContent = `${data.main.temp}°C`;
        weatherDescription.textContent = data.weather[0].description;
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
        audio.play();
        const playItem = document.querySelector(`.play-item:nth-child(${playNum + 1})`)
        /* console.log(playItem) */
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
button.addEventListener('click', playAudio); 
audio.addEventListener('ended', playNext)

function togglePause() {
    if(isPlay) {
        button.classList.add('pause');
    } else {
        button.classList.remove('pause');
    }
}

button.addEventListener('click', togglePause)


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