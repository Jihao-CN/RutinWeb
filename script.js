let selectedMenuItem = -1;
const audio = document.getElementById('bgm');
const audioControl = document.getElementById('audio-control');
const playbackStatus = document.getElementById('playback-status');
const optionSound = document.getElementById('option-sound');
let rotation = 0;

audio.volume = 0.5;

function cloneAndAnimate(event, index) {
    selectMenuItem(index); // 立即切换内容
    
    const btn = event.target;
    const clone = btn.cloneNode(true);
    
    const rect = btn.getBoundingClientRect();
    const centerX = window.innerWidth/2 - rect.width/2;
    const centerY = window.innerHeight/2 - rect.height/2;
    
    clone.style.position = 'fixed';
    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;
    clone.className = 'menu-item-clone';
    
    document.body.appendChild(clone);

    setTimeout(() => {
        clone.style.transform = `translate(${centerX - rect.left}px, ${centerY - rect.top}px) scale(3)`;
        clone.style.filter = 'blur(10px)';
        clone.style.opacity = '0';
    }, 10);

    setTimeout(() => {
        clone.remove(); // 仅清理克隆元素
    }, 800);
}

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
    }
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        audioControl.classList.add('playing');
        audioControl.classList.remove('paused');
        audioControl.style.animationPlayState = 'running';
        showPlaybackStatus('正在播放星露谷物语-姜岛');
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
