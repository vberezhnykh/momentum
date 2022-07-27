import { currentLanguage, setLanguage } from "./translation.js";

function setLocalStorage() {
    const name = document.querySelector('.input');
    const city = document.querySelector('.city');
    const backgroundImage = document.querySelector('.body');
    localStorage.setItem('city', city.value);
    localStorage.setItem('name', name.value);
    localStorage.setItem('backgroundImage', backgroundImage.style.backgroundImage);
    localStorage.setItem('language', currentLanguage);
}

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
    if (localStorage.getItem('language')) {
        let value = localStorage.getItem('language');
        setLanguage(value);
    }  
}

export { setLocalStorage, getLocalStorage, currentLanguage }
console.log(currentLanguage);