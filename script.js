async function fetchFiles() {
    const apiUrl = 'https://api.github.com/repos/Jihao-CN/RutinWeb/contents';
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

let isPlaying = false;
const audio = document.getElementById('bgm');
const audioControl = document.getElementById('audio-control');
const statusMessage = document.getElementById('status-message');

function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        audioControl.classList.add('paused');
        showStatusMessage('已暂停');
    } else {
        audio.play();
        audioControl.classList.remove('paused');
        showStatusMessage('正在播放');
    }
    isPlaying = !isPlaying;
}

function showStatusMessage(message) {
    statusMessage.textContent = message;
    statusMessage.classList.add('show');
    setTimeout(() => {
        statusMessage.classList.remove('show');
    }, 2000);
}

audioControl.addEventListener('click', togglePlayPause);

function playOptionSound() {
    const optionSound = document.getElementById('option-sound');
    optionSound.play();
}