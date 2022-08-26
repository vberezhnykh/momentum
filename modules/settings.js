const settingsButton = document.querySelector('.settings__button');

function showSettings() {
    const settings = document.querySelector('.settings__menu');
    const socialMedia = document.querySelector('.social-media-wrapper');
    settings.classList.add('settings__menu--visible');
    settingsButton.classList.add('settings__button--hidden');
    socialMedia.classList.add('social-media-wrapper--hidden')
}

function hideSettings(e) {
    const settings = document.querySelector('.settings__menu--visible');
    const socialMedia = document.querySelector('.social-media-wrapper');
    settingsButton.classList.remove('settings__button--hidden');
    settings.classList.remove('settings__menu--visible');
    socialMedia.classList.remove('social-media-wrapper--hidden')
}

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

const hideTodoButton = document.querySelector('.hide_block__todo-list');
const todoOpenButton = document.querySelector('.todo__open-btn');
const todo = document.querySelector('.todo');
let todoIsHidden = false;

function hideBlock(block) {
    if (block.target === hidePlayerButton) {
        if (!audioPlayerIsHidden) {
            audioPlayer.classList.add('player--hidden');
            hidePlayerButton.classList.add('hide_block__player--hidden');
            audioPlayerIsHidden = true;
            /* localStorage.setItem('isHidden', JSON.stringify([...JSON.parse(localStorage.getItem('isHidden') || '[]'), { name: 'audioPlayer', isHidden: true}])); */
        } else {
            audioPlayer.classList.remove('player--hidden');
            hidePlayerButton.classList.remove('hide_block__player--hidden');
            audioPlayerIsHidden = false;
            /* localStorage.setItem('isHidden', JSON.stringify([...JSON.parse(localStorage.getItem('isHidden') || '[]'), { name: 'audioPlayer', isHidden: false}])); */
        }
    } else if (block.target === hideWeatherButton) {
        if (!weatherIsHidden) {
            weather.classList.add('weather--hidden');
            hideWeatherButton.classList.add('hide_block__weather--hidden');
            weatherIsHidden = true;
            /* localStorage.setItem('isHidden', JSON.stringify([...JSON.parse(localStorage.getItem('isHidden') || '[]'), { name: 'weather', isHidden: true }])); */
        } else {
            weather.classList.remove('weather--hidden');
            hideWeatherButton.classList.remove('hide_block__weather--hidden');
            weatherIsHidden = false;
            /* localStorage.setItem('isHidden', JSON.stringify([...JSON.parse(localStorage.getItem('isHidden') || '[]'), { name: 'weather', isHidden: false }])); */
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
    } else if (block.target === hideTodoButton) {
        if (!todoIsHidden) {
            todo.classList.remove('todo--visible');
            todoOpenButton.classList.add('todo__open-btn--hidden');
            hideTodoButton.classList.add('hide_block__todo-list--hidden');
            todoIsHidden = true;
        } else {
            todoOpenButton.classList.remove('todo__open-btn--hidden');
            hideTodoButton.classList.remove('hide_block__todo-list--hidden');
            todoIsHidden = false;
        }
    }
}

function isHidden() {
    console.log(audioPlayerIsHidden, weatherIsHidden, timeIsHidden, dateIsHidden, greetingIsHidden, quotesIsHidden, todoIsHidden)
}

export {hideSettings, showSettings, hideBlock, isHidden}