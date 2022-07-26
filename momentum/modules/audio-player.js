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
        isPlay = true;
    } else {
        audio.pause();
        const playItem = document.querySelector(`.play-item:nth-child(${playNum + 1})`)
        playItem.classList.remove('play-item__active');
        isPlay = false;
    }
}

function togglePause() {
    if(isPlay) {
        button.classList.add('pause');
    } else {
        button.classList.remove('pause');
    }
}

function togglePauseArrow() {
    isPlay = true;
    togglePause();
}

function playNext() {
    const playItem = document.querySelector(`.play-item:nth-child(${playNum + 1})`);
    playItem.classList.remove('play-item__active')

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
    playItem.classList.remove('play-item__active')
    
    if (playNum > 0) {
        playNum -= 1;
    } else {
        playNum = 3;
    }
    isPlay = false;
    playAudio();
}

export { playAudio, togglePause, togglePauseArrow, playNext, playPrev, audio, playNum, isPlay, button }