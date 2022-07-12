function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString('ru-Ru');
    document.querySelector('.time').textContent = currentTime;
    setTimeout(showTime, 1000);
    showDate();
    showGreeting();
}

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
    randomNum = Math.floor(Math.random() * (max - min + 1)) + 1;
    return randomNum;
}

function setBg() {
    const timeOfDayUpperCase = getTimeOfDay();
    const timeOfDay = timeOfDayUpperCase.toLowerCase();
    const bgNum = getRandomNum(1, 20).toString().padStart(2, '0');
    const img = new Image();
    
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
       document.body.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg)`;
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