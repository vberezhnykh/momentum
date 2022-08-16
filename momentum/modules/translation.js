import {getWeather} from './weather.js';
import {getQuotes} from './get_quote.js';
import {isPlay} from './audio-player.js';

let currentLanguage = '';
if (localStorage.language !== '' && window.localStorage.length !== 0) {
    currentLanguage = localStorage.language;
} else {
    currentLanguage = 'english';
}

function setLanguage(value) {
    currentLanguage = value;
}

function setInitialLanguage(language) {
    const english = document.querySelector('.language__english');
    const russian = document.querySelector('.language__russian');
    language = localStorage.language;
    if (language === 'russian') {
        changeLanguage(russian);
    } else if (language === 'english') {
        changeLanguage(english)
    }
}

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
        document.querySelector('.photos__input').placeholder = 'Найти...';
        document.querySelector('.search-button').textContent = 'Найти';
        document.querySelector('.todo-header__caption').textContent = 'Список дел';
        document.querySelector('.todo-input__text').placeholder = 'Напомнить мне...';
        document.querySelector('.todo-input__add-btn').textContent = '+';
        document.querySelector('.inbox__header') !== null ? document.querySelector('.inbox__header').textContent = 'Невыполненные' : false;
        document.querySelector('.completed__header') !== null ? document.querySelector('.completed__header').textContent = 'Завершенные' : false;
        
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
        document.querySelector('.photos__input').placeholder = 'Search for...';
        document.querySelector('.search-button').textContent = 'Search';
        document.querySelector('.todo-header__caption').textContent = 'To-Do List';
        document.querySelector('.todo-input__text').placeholder = 'Task...';
        document.querySelector('.todo-input__add-btn').textContent = 'Add';
        document.querySelector('.inbox__header') !== null ? document.querySelector('.inbox__header').textContent = 'Inbox' : false;
        document.querySelector('.completed__header') !== null ? document.querySelector('.completed__header').textContent = 'Completed' : false;
    }
}

export {currentLanguage, changeLanguage, setLanguage, setInitialLanguage}