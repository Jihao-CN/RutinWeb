let selectedMenuItem = -1;
const audio = document.getElementById('bgm');
const audioControl = document.getElementById('audio-control');
const playbackStatus = document.getElementById('playback-status');
const optionSound = document.getElementById('option-sound');
let rotation = 0;

audio.volume = 0.2; // 设置默认音量

// 音频播放结束事件处理
audio.addEventListener('ended', () => {
    audioControl.classList.remove('playing');
    audioControl.classList.add('paused');
    showPlaybackStatus('已暂停');
});

// 选择菜单项的函数
function selectMenuItem(index) {
    // 移除之前选中的菜单项的样式
    if (selectedMenuItem !== -1) {
        document.querySelectorAll('.menu-item')[selectedMenuItem].classList.remove('selected');
        document.querySelectorAll('.content-item')[selectedMenuItem].classList.remove('active');
    }

    // 更新选中的菜单项索引
    selectedMenuItem = index;

    // 添加当前选中的菜单项的样式
    document.querySelectorAll('.menu-item')[index].classList.add('selected');
    document.querySelectorAll('.content-item')[index].classList.add('active');

    // 播放选项选中的音效
    if (optionSound) {
        optionSound.currentTime = 0; // 确保从头开始播放
        optionSound.play();
    } else {
        console.error('option-sound 元素未找到');
    }
}

// 切换播放/暂停的函数
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

// 调整音量的函数
function adjustVolume(value) {
    audio.volume = value;
}

// 显示播放状态的函数
function showPlaybackStatus(message) {
    playbackStatus.textContent = message;
    playbackStatus.classList.add('show');
    setTimeout(() => {
        playbackStatus.classList.remove('show');
    }, 2000); // 显示 2 秒后隐藏
}