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

function hideBlock(block) {
    if (block.target === hidePlayerButton) {
        if (!audioPlayerIsHidden) {
            audioPlayer.classList.add('player--hidden');
            hidePlayerButton.classList.add('hide_block__player--hidden');
            audioPlayerIsHidden = true;
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




export {hideSettings, showSettings, hideBlock}