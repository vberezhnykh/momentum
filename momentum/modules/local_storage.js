function setLocalStorage() {
    const name = document.querySelector('.input');
    const city = document.querySelector('.city');
    const backgroundImage = document.querySelector('.body');
    localStorage.setItem('city', city.value);
    localStorage.setItem('name', name.value);
    localStorage.setItem('backgroundImage', backgroundImage.style.backgroundImage);
    
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
}

export { setLocalStorage, getLocalStorage }