import { audio } from "./audio-player.js";

const playListContainer = document.querySelector('.play-list');
const player = document.querySelector('.player');
const timeline = player.querySelector('.timeline');
const volumeSlider = player.querySelector('.volume-slider');
let currentVolumePercantage = '';

function addPlaylistItem(el) {
    const li = document.createElement('li');
    const img = new Image;
    li.classList.add('play-item');
    li.textContent = el.title;
    img.src = '../assets/svg/play.svg';
    img.classList.add('marker');
    playListContainer.append(li);
    li.prepend(img);
}

function showCurrentTime(e) {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
}

function animateProgressBar() {
    const progressBar = player.querySelector('.progress');
    progressBar.style.width = audio.currentTime / audio.duration * 100 + '%';
    player.querySelector('.timeBar .current').textContent = getTimeCodeFromNum(
        audio.currentTime
    );
}

function getTimeCodeFromNum (num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

function setDurationAndVolume () {
    player.querySelector('.timeBar .length').textContent = getTimeCodeFromNum(audio.duration);
    audio.volume = .75;
}

function animateVolumeSlider (e) {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    player.querySelector('.volume-percantage').style.width = newVolume * 100 + '%';
}

function muteAudio() {
    const volumeEl = player.querySelector('.volume-button');
    audio.muted = !audio.muted;
    if (audio.muted) {
        volumeEl.classList.add('volume-button_mute');
        currentVolumePercantage = player.querySelector('.volume-percantage').style.width;
        player.querySelector('.volume-percantage').style.width = '0%';
    } else {
        volumeEl.classList.remove('volume-button_mute');
        player.querySelector('.volume-percantage').style.width = `${currentVolumePercantage}`;
    }
}

export {addPlaylistItem, showCurrentTime, animateProgressBar, getTimeCodeFromNum, setDurationAndVolume, animateVolumeSlider, muteAudio}