let selectedMenuItem = -1;
const audio = document.getElementById('bgm');
const audioControl = document.getElementById('audio-control');
const clickSound = document.getElementById('click-sound');

audio.volume = 0.2;

audio.addEventListener('ended', () => {
    audioControl.classList.add('paused');
});

function selectMenuItem(index) {
    playClickSound();

    if (selectedMenuItem !== -1) {
        document.querySelectorAll('.menu-item')[selectedMenuItem].classList.remove('selected');
        document.querySelectorAll('.content-item')[selectedMenuItem].classList.remove('active');
    }

    selectedMenuItem = index;

    document.querySelectorAll('.menu-item')[index].classList.add('selected');
    document.querySelectorAll('.content-item')[index].classList.add('active');
}

function togglePlayPause(audioId) {
    const audioElement = document.getElementById(audioId);
    if (audioElement.paused) {
        audioElement.play();
        audioControl.classList.remove('paused');
    } else {
        audioElement.pause();
        audioControl.classList.add('paused');
    }
}

function playClickSound() {
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(error => console.error('播放点击声音时出错:', error));
    } else {
        console.error('clickSound 元素未找到');
    }
}

const username = 'Jihao-CN';
const repo = 'JihaoPage';
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
            const link = document.createElement('a');
            link.href = file.html_url;
            link.textContent = file.name;

            if (file.type === 'dir') {
                listItem.classList.add('folder');
            } else {
                listItem.classList.add('file');
            }

            listItem.appendChild(link);
            fileList.appendChild(listItem);
        });
    } catch (error) {
        console.error('获取文件列表时出错:', error);
    }
}

fetchFiles();