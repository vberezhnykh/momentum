/* import { currentLanguage } from './translation.js' */
import { currentLanguage } from "./local_storage.js";

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
            greetingText = 'Доброй ночи,';
        } else if (timeOfDay === 'утро') {
            greetingText = 'Доброе утро,';
        } else if (timeOfDay === 'день') {
            greetingText = 'Добрый день,';
        } else if (timeOfDay === 'вечер') {
            greetingText = 'Добрый вечер,';
        } input.placeholder = '[Введите имя]';
    }
    document.querySelector('.greeting').textContent = greetingText;
}

export { getTimeOfDay, showGreeting }