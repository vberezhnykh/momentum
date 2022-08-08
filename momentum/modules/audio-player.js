import playList from "./playList.js";

const audio = new Audio();
let isPlay = false;
let playNum = 0;
const button = document.querySelector('.player-icon');

function playAudio() {
    if(!isPlay) {
        audio.src = playList[playNum].src;
        audio.currentTime = 0;
        document.querySelector('.songName').textContent = playList[playNum].title;
        document.querySelector('.volume-percantage').style.width = '75%';
        audio.play();
        const playItem = document.querySelector(`.play-item:nth-child(${playNum + 1})`)
        playItem.classList.add('play-item__active');
        const markers = document.querySelectorAll('.marker');
        markers[playNum].src = 'assets/svg/pause.svg';
        isPlay = true;
        console.log(audio.volume);
    } else {
        audio.pause();
        const playItem = document.querySelector(`.play-item:nth-child(${playNum + 1})`)
        playItem.classList.remove('play-item__active');
        isPlay = false;
        console.log(audio.volume);
    }
    
}

let previousTrackNum;
function playSong(e) {
    const markers = document.querySelectorAll('.marker');
    const playItems = document.querySelectorAll('.play-item');
    if (e.target === markers[0]) {
        playNum = 0;
    } else if (e.target === markers[1]) {
        playNum = 1;
    } else if (e.target === markers[2]) {
        playNum = 2;
    } else if (e.target === markers[3]) {
        playNum = 3;
    }
    if (isPlay && previousTrackNum === playNum || isPlay && previousTrackNum === undefined) {
        playAudio();
        markers[playNum].src = 'assets/svg/play.svg';
        button.classList.remove('pause');
    } else if (isPlay && previousTrackNum !== playNum) {
        markers[previousTrackNum].src = 'assets/svg/play.svg';
        playItems[previousTrackNum].classList.remove('play-item__active');
        playAudio();
        playAudio();
    } else {
        playAudio();
        button.classList.add('pause');
    };
    previousTrackNum = playNum;
}

function togglePause() {
    if(isPlay) {
        button.classList.add('pause');
    } else {
        button.classList.remove('pause');
        const markers = document.querySelectorAll('.marker');
        markers[playNum].src = 'assets/svg/play.svg';
    }
}

function togglePauseArrow() {
    isPlay = true;
    togglePause();
}

function playNext() {
    const playItem = document.querySelector(`.play-item:nth-child(${playNum + 1})`);
    playItem.classList.remove('play-item__active');
    const markers = document.querySelectorAll('.marker');
    markers[playNum].src = 'assets/svg/play.svg';

    if (playNum < 3) {
        playNum += 1;
    } else {
        playNum = 0;
    } 
    isPlay = false;
    playAudio();
}

function playPrev() {
    const playItem = document.querySelector(`.play-item:nth-child(${playNum + 1})`);
    playItem.classList.remove('play-item__active');
    const markers = document.querySelectorAll('.marker');
    markers[playNum].src = 'assets/svg/play.svg';
    
    if (playNum > 0) {
        playNum -= 1;
    } else {
        playNum = 3;
    }
    isPlay = false;
    playAudio();
}

export { playAudio, togglePause, togglePauseArrow, playNext, playPrev, audio, playNum, isPlay, button, playSong }