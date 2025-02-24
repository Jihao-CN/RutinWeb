let selectedMenuItem = -1;
const audio = document.getElementById('bgm');
const audioControl = document.getElementById('audio-control');
const playbackStatus = document.getElementById('playback-status');
const optionSound = document.getElementById('option-sound');
let rotation = 0;

audio.volume = 0.2;

audio.addEventListener('ended', () => {
    audioControl.classList.remove('playing');
    audioControl.classList.add('paused');
    showPlaybackStatus('已暂停');
});

function selectMenuItem(index) {
    if (selectedMenuItem!== -1) {
        document.querySelectorAll('.menu-item')[selectedMenuItem].classList.remove('selected');
        document.querySelectorAll('.content-item')[selectedMenuItem].classList.remove('active');
    }
    selectedMenuItem = index;
    document.querySelectorAll('.menu-item')[index].classList.add('selected');
    document.querySelectorAll('.content-item')[index].classList.add('active');
    if (optionSound) {
        optionSound.currentTime = 0;
        optionSound.play();
    } else {
        console.error('option-sound元素未找到');
    }
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        audioControl.classList.add('playing');
        audioControl.classList.remove('paused');
        audioControl.style.animationPlayState = 'running';
        showPlaybackStatus('正在播放三角度');
    } else {
        audio.pause();
        audioControl.classList.remove('playing');
        audioControl.classList.add('paused');
        audioControl.style.animationPlayState = 'paused';
        showPlaybackStatus('已暂停');
    }
}

function adjustVolume(value) {
    audio.volume = value;
}

function showPlaybackStatus(message) {
    playbackStatus.textContent = message;
    playbackStatus.classList.add('show');
    setTimeout(() => {
        playbackStatus.classList.remove('show');
    }, 2000);
}

// 添加加载和刷新功能
document.addEventListener("DOMContentLoaded", function () {
    const loadButton = document.getElementById('load-button');
    const refreshButton = document.getElementById('refresh-button');
    const urlInput = document.getElementById('url-input');
    const urlFrame = document.getElementById('url-frame');

    loadButton.addEventListener('click', () => {
        const url = urlInput.value;
        urlFrame.src = url;
    });

    refreshButton.addEventListener('click', () => {
        urlFrame.src = urlFrame.src;
    });
});