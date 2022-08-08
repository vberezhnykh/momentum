import { showTime } from "./modules/time_and_date.js";
import { setLocalStorage, getLocalStorage, currentLanguage } from "./modules/local_storage.js";
import { getWeather } from "./modules/weather.js";
import { getQuotes, changeQuote, randomQuote } from "./modules/get_quote.js";
import { playAudio, togglePause, togglePauseArrow, playNext, playPrev, audio, button, playSong } from "./modules/audio-player.js";
import {addPlaylistItem, showCurrentTime, animateProgressBar, setDurationAndVolume, animateVolumeSlider, muteAudio} from './modules/audio-player_advanced.js';
import playList from "./modules/playList.js";
import { getLinkToImageUnsplash, getLinkToImageFlickr } from './modules/flickr_unsplashAPI.js'
import { getRandomNum, setBg, choosePhotoSource, getSlideNext, getSlidePrev} from './modules/background-slider.js'
import { changeLanguage, setInitialLanguage } from './modules/translation.js';
import {hideSettings, showSettings, hideBlock, isHidden} from './modules/settings.js';
import {openTodoList,addTask, closeToDoList} from './modules/todo.js';

/* window.onload = isHidden; */

// Local storage ==========
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

// Time and Date ==========
window.addEventListener('load', showTime)

// Image API ==========

window.addEventListener('load', getLinkToImageUnsplash)
window.addEventListener('load', getLinkToImageFlickr)

// Image slider ==========

window.addEventListener('load', getRandomNum(1,20));
window.addEventListener('load', () => {
    setTimeout(setBg, 1000)
})

window.addEventListener('click', choosePhotoSource);
document.querySelector('.nextSlide').addEventListener('click', getSlideNext);
document.querySelector('.previousSlide').addEventListener('click', getSlidePrev);

// Weather ==========

addEventListener('load', getWeather)
document.querySelector('.city').addEventListener('change', getWeather);

// Quote ==========
window.addEventListener('load', randomQuote(0,9));
window.addEventListener('load', getQuotes);
document.querySelector('.change_quote').addEventListener('click', changeQuote);

// Audio-player ==========
const buttonNext = document.querySelector('.player-next');
const buttonPrev = document.querySelector('.player-previous');
const playerNext = document.querySelector('.player-next');
const playerPrev = document.querySelector('.player-previous');
const player = document.querySelector('.player');
const timeline = player.querySelector('.timeline');
const volumeSlider = player.querySelector('.volume-slider');

button.addEventListener('click', playAudio); 
audio.addEventListener('ended', playNext)
button.addEventListener('click', togglePause)
buttonNext.addEventListener('click', togglePauseArrow)
buttonPrev.addEventListener('click', togglePauseArrow)
playerNext.addEventListener('click', playNext)
playerPrev.addEventListener('click', playPrev);

// Advanced audio-player ==========
playList.forEach(addPlaylistItem);
timeline.addEventListener('click', showCurrentTime);
setInterval(animateProgressBar, 500);
audio.addEventListener('loadeddata', setDurationAndVolume, false);
volumeSlider.addEventListener('click', animateVolumeSlider, false);
player.querySelector('.volume-button').addEventListener('click', muteAudio)

const markers = document.querySelectorAll('.marker');
markers.forEach(element => {
    element.addEventListener('click', playSong);
})

// Translation ==========
window.addEventListener('load', setInitialLanguage);
window.addEventListener('click', changeLanguage);

// Settings ==========

const settingsButton = document.querySelector('.settings__button');
const closeSettingsButton = document.querySelector('.settings-header__button');

settingsButton.addEventListener('click', showSettings);
closeSettingsButton.addEventListener('click', hideSettings);
window.addEventListener('click', hideBlock)

// Todo list ==========
const openBtn = document.querySelector('.todo__open-btn');
openBtn.addEventListener('click', openTodoList)
const addTaskButton = document.querySelector('.todo-input__add-btn');
addTaskButton.addEventListener('click', addTask);
const input = document.querySelector('.todo-input__text');
input.addEventListener('keypress', (event) => {
    event.key === 'Enter' ? addTaskButton.click() : false;
    event.key === 'Enter' ? input.value = '' : false;
})
const closeToDoListBtn = document.querySelector('.todo-header__close-btn');
closeToDoListBtn.addEventListener('click', closeToDoList);

//==========
/* console.log(
`1. Часы и календарь + 15;
2. Приветствие + 10;
3. Смена фонового изображения +20;
4. Виджет погоды. +15;
5. Виджет цитата дня. + 10;
6. Аудиопдеер + 15;
7. Продвинутый аудиоплеер +17. (не реализован функционал проигрывания трека кликом по кнопке Play/Pause рядом с ним в плейлисте);
8. Перевод приложения на два языка (en/ru) + 15.
9. Получение фонового изображения от API. +10;
10. Настройки приложения +12. (1) не реализовано указание тега для которых API присылает фото; 2) настройки не сохраняются при перезагрузке страницы);
11. Дополнительный функционал + 10;

Итого: 149 балла.`
) */

