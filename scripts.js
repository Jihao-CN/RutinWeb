let selectedMenuItem = -1;
const audio = document.getElementById('bgm');
const audioControl = document.getElementById('audio-control');
const playbackStatus = document.getElementById('playback-status');
const optionSound = document.getElementById('option-sound');
let rotation = 0;

audio.volume = 0.2; // 设置默认音量

audio.addEventListener('ended', () => {
    audioControl.classList.remove('playing');
    showPlaybackStatus('已暂停');
});

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

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        audioControl.classList.add('playing');
        audioControl.style.animationPlayState = 'running';
        showPlaybackStatus('正在播放《town》Microsoft Windows');
    } else {
        audio.pause();
        audioControl.classList.remove('playing');
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
    }, 2000); // 显示 2 秒后隐藏
}

const username = 'Jihao-CN';
const repo = 'JihaoPage'; // 这里声明 repo 变量
const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents`;

async function fetchFiles() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('网络响应失败');
        }
        const files = await response.json();
        const fileList = document.getElementById('file-list');

        files.forEach(file => {
            const listItem = document.createElement('li');
            listItem.classList.add('file-list-item');
            
            const icon = document.createElement('img');
            if (file.type === 'dir') {
                icon.src = 'folder.jpg';
                listItem.classList.add('folder');
            } else {
                icon.src = 'file.jpg';
                listItem.classList.add('file');
            }
            
            const link = document.createElement('a');
            link.href = file.html_url;
            link.textContent = file.name;
            
            listItem.appendChild(icon);
            listItem.appendChild(link);
            fileList.appendChild(listItem);
        });
    } catch (error) {
        console.error('获取文件列表时出错:', error);
    }
}

fetchFiles();