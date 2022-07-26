import {newSetOfPhotos, unsplashSetOfPhotos, getLinkToImageUnsplash} from './flickr_unsplashAPI.js'

let randomNum;
let isGithub = true;
let isFlickr = false;
let isUnsplash = false;
const githubButton = document.querySelector('.photos__github');
const flickrButton = document.querySelector('.photos__flickr');
const unsplashButton = document.querySelector('.photos__unsplash');
let flickrLink;
let unsplashLink;

function getRandomNum(min, max) {
    randomNum = (Math.floor(Math.random() * (max - min + 1)) + 1);
}

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

function getSlideNext() {
    if (randomNum < 20) {
        randomNum += 1;
    } else randomNum = 1;
    setBg();
}

function getSlidePrev() {
    if (randomNum > 1) {
        randomNum -= 1;
    } else randomNum = 20;
    setBg();
}

export {randomNum, isGithub, isFlickr, isUnsplash, githubButton, flickrButton,unsplashButton, getRandomNum, setBg, choosePhotoSource, getSlideNext, getSlidePrev}