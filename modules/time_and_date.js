import { showGreeting } from './greeting.js';
/* import { currentLanguage } from './translation.js' */
import { currentLanguage } from "./local_storage.js";

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

export { showTime, showDate };