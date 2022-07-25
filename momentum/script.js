import playList from "./playList.js";

//1. Time and Date ==================================================//
function showTime() {
    const date = new Date();
    if (currentLanguage === 'english') {
        const currentTime = date.toLocaleTimeString('en-En');
        document.querySelector('.time').textContent = currentTime;
    } else if (currentLanguage === 'russian') {
        const currentTime = date.toLocaleTimeString('ru-Ru');
        document.querySelector('.time').textContent = currentTime;
    }
    setTimeout(showTime, 1000);
    showDate();
    showGreeting();
}

window.addEventListener('load', showTime)

function showDate() {
    const date = new Date();
    const options = {
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    }
    if (currentLanguage === 'english') {
        const currentDate = date.toLocaleDateString('en-En', options);
        document.querySelector('.date').textContent = currentDate;
    } else if (currentLanguage === 'russian') {
        const currentDate = date.toLocaleDateString('ru-Ru', options);
        document.querySelector('.date').textContent = currentDate;
    }
}

//2. Greeting ==================================================//
function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    let timeOfDay = '';
    
    if (currentLanguage === 'english') {
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
    } else if (currentLanguage === 'russian') {
        if (hours >= 0 && hours < 6) {
            timeOfDay = 'ночь';
        } else if (hours >= 6 && hours < 12) {
            timeOfDay = 'утро';
        } else if (hours >= 12 && hours < 18) {
            timeOfDay = 'день';
        } else {
            timeOfDay = 'вечер';
        }
        return timeOfDay;
    }
    
}

function showGreeting() {
    const timeOfDay = getTimeOfDay();
    let greetingText = '';
    const input = document.querySelector('.input');
    if(currentLanguage === 'english') {
        greetingText = `Good ${timeOfDay}, `;
        input.placeholder = '[Enter name]';
    } else if (currentLanguage === 'russian') {
        if (timeOfDay === 'ночь') {
            greetingText = 'Доброй ночи';
        } else if (timeOfDay === 'утро') {
            greetingText = 'Доброе утро';
        } else if (timeOfDay === 'день') {
            greetingText = 'Добрый день';
        } else if (timeOfDay === 'вечер') {
            greetingText = 'Добрый вечер';
        } input.placeholder = '[Введите имя]';
    }
    document.querySelector('.greeting').textContent = greetingText;
}

function setLocalStorage() {
    const name = document.querySelector('.input');
    const city = document.querySelector('.city');
    const backgroundImage = document.querySelector('.body');
    const hideBlock = document.querySelector('.hide_block');
    localStorage.setItem('city', city.value);
    localStorage.setItem('name', name.value);
    localStorage.setItem('backgroundImage', backgroundImage.style.backgroundImage);
    
}
window.addEventListener('beforeunload', setLocalStorage);


function getLocalStorage() {
    const name = document.querySelector('.input');
    const city = document.querySelector('.city');
    const backgroundImage = document.querySelector('.body');

    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }

    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
    if (localStorage.getItem('backgroundImage')) {
        backgroundImage.style.backgroundImage = localStorage.getItem('backgroundImage')
    }
    
}
window.addEventListener('load', getLocalStorage)

//9. API ======================================================//

let unsplashLink;
let unsplashSetOfPhotos = [];
async function getLinkToImageUnsplash() {
    const timeOfDayUpperCase = getTimeOfDay();
    const timeOfDay = timeOfDayUpperCase.toLowerCase();
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}+nature&count=30&client_id=I3eBqT9_j8CoW8DuszAU_zsxllH3odilxkh7kNZ8ETE`;
    const res = await fetch(url);
    const data = await res.json();
    unsplashSetOfPhotos = [...data];
}

window.addEventListener('load', getLinkToImageUnsplash)

let flickrLink;
let newSetOfPhotos = [];

async function getLinkToImageFlickr() {
    const timeOfDayUpperCase = getTimeOfDay();
    const timeOfDay = timeOfDayUpperCase.toLowerCase();
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1c6ab8ba7ed7bced1c3e2109248e2d6b&tags=nature%2C+${timeOfDay}&tag_mode=all&content_type=1&media=photos&extras=url_l&format=json&nojsoncallback=1`
    const res = await fetch(url);
    const data = await res.json();
    
    for (let i = 0; i < 30; i++) {
        let width = data.photos.photo[i].width_l;
        let height = data.photos.photo[i].height_l
        if (determinePhotoOrientation(width, height) === 'landscape') {
                newSetOfPhotos.push(data.photos.photo[i]);
            };
    }
}

window.addEventListener('load', getLinkToImageFlickr)

function determinePhotoOrientation(width, height) {
    if (width > height) { 
        return 'landscape';
    } else if (width < height) {
        return 'portrait';
    } else {
        return 'square';
    }
}

//3. Image slider==================================================//
let randomNum;
function getRandomNum(min, max) {
    randomNum = (Math.floor(Math.random() * (max - min + 1)) + 1);
}
window.addEventListener('load', getRandomNum(1,20));

let isGithub = true;
let isFlickr = false;
let isUnsplash = false;

function setBg() {
    const img = new Image();
    if (isGithub) {
        let timeOfDay = '';
        const date = new Date();
        const hours = date.getHours();
        
        if (hours >= 0 && hours < 6) {
            timeOfDay = 'night';
        } else if (hours >= 6 && hours < 12) {
            timeOfDay = 'morning';
        } else if (hours >= 12 && hours < 18) {
            timeOfDay = 'afternoon';
        } else {
            timeOfDay = 'evening';
        }
        let bgNum = randomNum.toString().padStart(2, '0');
        img.src = `https://raw.githubusercontent.com/vberezhnykh/momentum-images/assets/images/${timeOfDay}/${bgNum}.jpg`;
        img.onload = () => {
            document.body.style.backgroundImage = `url(https://raw.githubusercontent.com/vberezhnykh/momentum-images/assets/images/${timeOfDay}/${bgNum}.jpg)`;
         };
    } else if (isFlickr) {
        flickrLink = newSetOfPhotos[randomNum].url_l;
        img.src = `${flickrLink}`;
        img.onload = () => {
            document.body.style.backgroundImage = `url(${flickrLink})`;
         };
    } else if (isUnsplash) {
        unsplashLink = unsplashSetOfPhotos[randomNum].urls.regular;
        img.src=`${unsplashLink}`;
        img.onload = () => {
            document.body.style.backgroundImage = `url(${unsplashLink})`;
         };
         getLinkToImageUnsplash();
    }
}

window.addEventListener('load', () => {
    setTimeout(setBg, 1000)
})

const githubButton = document.querySelector('.photos__github');
const flickrButton = document.querySelector('.photos__flickr');
const unsplashButton = document.querySelector('.photos__unsplash');

function choosePhotoSource(elem) {
    if (elem.target === githubButton && !isGithub) {
        githubButton.classList.add('photos__github--active');
        flickrButton.classList.remove('photos__flickr--active');
        unsplashButton.classList.remove('photos__unsplash--active');
        isGithub = true;
        isFlickr = false;
        isUnsplash = false;
        setBg();
    } else if (elem.target === flickrButton && !isFlickr) {
        flickrButton.classList.add('photos__flickr--active');
        githubButton.classList.remove('photos__github--active');
        unsplashButton.classList.remove('photos__unsplash--active');
        isFlickr = true;
        isGithub = false;
        isUnsplash = false;
        setBg();
    } else if (elem.target === unsplashButton && !isUnsplash) {
        unsplashButton.classList.add('photos__unsplash--active');
        githubButton.classList.remove('photos__github--active');
        flickrButton.classList.remove('photos__flickr--active');
        isUnsplash = true;
        isFlickr = false;
        isGithub = false;
        setBg();
    }
}

window.addEventListener('click', choosePhotoSource);

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

//4. Weather ==================================================//
async function getWeather() {
    const weatherIcon = document.querySelector('.icon');
    const temperature = document.querySelector('.temperature');
    const weatherDescription = document.querySelector('.description');
    const wind = document.querySelector('.wind');
    const humidity = document.querySelector('.humidity');
    const city = document.querySelector('.city');
    let language = '';
    if (currentLanguage === 'english') {
        language = 'en';
    } else if (currentLanguage === 'russian') {
        language = 'ru';
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language}&appid=fab720c19713c688933ff49eb63ac915&units=metric`
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
        if (currentLanguage === 'english') {
            wind.textContent = `Wind speed: ${data.wind.speed} m/s`
            humidity.textContent = `Humidity: ${data.main.humidity} %`;
        } else if (currentLanguage === 'russian') {
            wind.textContent = `Скорость ветра: ${data.wind.speed} м/с`;
            humidity.textContent = `Влажность: ${data.main.humidity} %`;
        }
        
    /* }  */
}

addEventListener('load', getWeather)

document.querySelector('.city').addEventListener('change', getWeather);

//5. Quote ==================================================//
let randomQuoteNum;

function randomQuote(min, max) {
    randomQuoteNum = Math.floor(Math.random() * (max - min + 1)) + 1;
}

window.addEventListener('load', randomQuote(0,9));

async function getQuotes() {
    let quotes = '';
    if (currentLanguage === 'english') {
        quotes = 'quoteEn.json';
    } else if (currentLanguage === 'russian') {
        quotes = 'quoteRu.json';
    }
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

//6,7. Audio-player ==================================================//
const audio = new Audio();
let isPlay = false;
let playNum = 0;
const button = document.querySelector('.player-icon');
const buttonNext = document.querySelector('.player-next');
const buttonPrev = document.querySelector('.player-previous');
const playerNext = document.querySelector('.player-next');
const playerPrev = document.querySelector('.player-previous');
const playListContainer = document.querySelector('.play-list');
const player = document.querySelector('.player');
const timeline = player.querySelector('.timeline');
const volumeSlider = player.querySelector('.volume-slider');
let currentVolumePercantage = '';

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

/* function playSong() {
    window.addEventListener('click', function testFunc = e => {
        console.log(e.target.innerText);
    })
} */

/* songsList.addEventListener('click', playSong) */

/* window.onclick = e => {
    console.log(e.target.innerText);
} */

button.addEventListener('click', playAudio); 
audio.addEventListener('ended', playNext)

function togglePause() {
    if(isPlay) {
        button.classList.add('pause');
    } else {
        button.classList.remove('pause');
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

playerPrev.addEventListener('click', playPrev);

playList.forEach(el => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = el.title;
    playListContainer.append(li);
})

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


volumeSlider.addEventListener('click', e => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    player.querySelector('.volume-percantage').style.width = newVolume * 100 + '%';
}, false);

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

//8. Translation ==================================================//

let currentLanguage = 'english';
function changeLanguage(elem) {
    const english = document.querySelector('.language__english');
    const russian = document.querySelector('.language__russian');
    if (elem.target === russian) {
        russian.classList.add('language__russian--active');
        english.classList.remove('language__english--active');
        currentLanguage = 'russian';
        getQuotes();
        if (!isPlay) {
            document.querySelector('.songName').textContent = 'Название песни';
        };
        document.querySelector('.settings-header__header').textContent = 'НАСТРОЙКИ';
        document.querySelector('.hide_block__name').textContent = 'Спрятать';
        document.querySelector('.hide_block__player').textContent = 'Плеер';
        document.querySelector('.hide_block__weather').textContent = 'Погода';
        document.querySelector('.hide_block__time').textContent = 'Время';
        document.querySelector('.hide_block__date').textContent = 'Дата';
        document.querySelector('.hide_block__greeting').textContent = 'Приветствие';
        document.querySelector('.hide_block__quotes').textContent = 'Цитаты';
        document.querySelector('.hide_block__todo-list').textContent = 'Список дел';
        document.querySelector('.language__name').textContent = 'Язык';
        document.querySelector('.language__english').textContent = 'Английский';
        document.querySelector('.language__russian').textContent = 'Русский';
        document.querySelector('.photos__name').textContent = 'Источник фото';
        document.querySelector('.city').value = 'Москва';
        document.querySelector('.city').placeholder = 'Введите город';
        document.querySelector('.weather__provider-changable').textContent = 'По данным ';
        getWeather();
    } else if (elem.target === english) {
        english.classList.add('language__english--active');
        russian.classList.remove('language__russian--active');
        currentLanguage = 'english';
        getQuotes();
        if (!isPlay) {
            document.querySelector('.songName').textContent = 'Music Song';
        };
        document.querySelector('.settings-header__header').textContent = 'SETTINGS';
        document.querySelector('.hide_block__name').textContent = 'Hide';
        document.querySelector('.hide_block__player').textContent = 'Player';
        document.querySelector('.hide_block__weather').textContent = 'Weather';
        document.querySelector('.hide_block__time').textContent = 'Time';
        document.querySelector('.hide_block__date').textContent = 'Date';
        document.querySelector('.hide_block__greeting').textContent = 'Greeting';
        document.querySelector('.hide_block__quotes').textContent = 'Quotes';
        document.querySelector('.hide_block__todo-list').textContent = 'Todo List';
        document.querySelector('.language__name').textContent = 'Language';
        document.querySelector('.language__english').textContent = 'English';
        document.querySelector('.language__russian').textContent = 'Russian';
        document.querySelector('.photos__name').textContent = 'Photo source';
        document.querySelector('.city').value = 'London';
        document.querySelector('.city').placeholder = 'Enter city';
        document.querySelector('.weather__provider-changable').textContent = 'Provided by ';
        getWeather();
    }
}

window.addEventListener('click', changeLanguage)
//10. Setting =====================================================//

function showSettings() {
    const settings = document.querySelector('.settings__menu');
    const socialMedia = document.querySelector('.social-media-wrapper');
    settings.classList.add('settings__menu--visible');
    settingsButton.classList.add('settings__button--hidden');
    socialMedia.classList.add('social-media-wrapper--hidden')
}

const settingsButton = document.querySelector('.settings__button');
settingsButton.addEventListener('click', showSettings);

function hideSettings(e) {
    const settings = document.querySelector('.settings__menu--visible');
    const socialMedia = document.querySelector('.social-media-wrapper');
    settingsButton.classList.remove('settings__button--hidden');
    settings.classList.remove('settings__menu--visible');
    socialMedia.classList.remove('social-media-wrapper--hidden')
}

const closeSettingsButton = document.querySelector('.settings-header__button');
closeSettingsButton.addEventListener('click', hideSettings);

const hidePlayerButton = document.querySelector('.hide_block__player');
const audioPlayer = document.querySelector('.player');
let audioPlayerIsHidden = false;

const hideWeatherButton = document.querySelector('.hide_block__weather');
const weather = document.querySelector('.weather');
let weatherIsHidden = false;

const hideTimeButton = document.querySelector('.hide_block__time');
const time = document.querySelector('.time');
let timeIsHidden = false;

const hideDateButton = document.querySelector('.hide_block__date');
const date = document.querySelector('.date');
let dateIsHidden = false;

const hideGreetingButton = document.querySelector('.hide_block__greeting');
const greeting = document.querySelector('.greeting-container');
let greetingIsHidden = false;

const hideQuotesButton = document.querySelector('.hide_block__quotes');
const quotes = document.querySelector('.quote-wrapper');
let quotesIsHidden = false;

function hideBlock(block) {
    if (block.target === hidePlayerButton) {
        if (!audioPlayerIsHidden) {
            audioPlayer.classList.add('player--hidden');
            hidePlayerButton.classList.add('hide_block__player--hidden');
            audioPlayerIsHidden = true;
            isPlay = true;
            playAudio();
            togglePause();
        } else {
            audioPlayer.classList.remove('player--hidden');
            hidePlayerButton.classList.remove('hide_block__player--hidden');
            audioPlayerIsHidden = false;
        }
    } else if (block.target === hideWeatherButton) {
        if (!weatherIsHidden) {
            weather.classList.add('weather--hidden');
            hideWeatherButton.classList.add('hide_block__weather--hidden');
            weatherIsHidden = true;
        } else {
            weather.classList.remove('weather--hidden');
            hideWeatherButton.classList.remove('hide_block__weather--hidden');
            weatherIsHidden = false;
        } 
    } else if (block.target === hideTimeButton) {
        if (!timeIsHidden) {
            time.classList.add('time--hidden');
            hideTimeButton.classList.add('hide_block__time--hidden');
            timeIsHidden = true;
        } else {
            time.classList.remove('time--hidden');
            hideTimeButton.classList.remove('hide_block__time--hidden');
            timeIsHidden = false;
        }
    } else if (block.target === hideDateButton) {
        if (!dateIsHidden) {
            date.classList.add('date--hidden');
            hideDateButton.classList.add('hide_block__date--hidden');
            dateIsHidden = true;
        } else {
            date.classList.remove('date--hidden');
            hideDateButton.classList.remove('hide_block__date--hidden');
            dateIsHidden = false;
        }
    } else if (block.target === hideGreetingButton) {
        if (!greetingIsHidden) {
            greeting.classList.add('greeting-container--hidden');
            hideGreetingButton.classList.add('hide_block__greeting--hidden');
            greetingIsHidden = true;
        } else {
            greeting.classList.remove('greeting-container--hidden');
            hideGreetingButton.classList.remove('hide_block__greeting--hidden');
            greetingIsHidden = false;
        }
    } else if (block.target === hideQuotesButton) {
        if (!quotesIsHidden) {
            quotes.classList.add('quote-wrapper--hidden');
            hideQuotesButton.classList.add('hide_block__quotes--hidden');
            quotesIsHidden = true;
        } else {
            quotes.classList.remove('quote-wrapper--hidden');
            hideQuotesButton.classList.remove('hide_block__quotes--hidden');
            quotesIsHidden = false; 
        }
    }
}

window.addEventListener('click', hideBlock)