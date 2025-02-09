let selectedMenuItem = -1;
const audio = document.getElementById('bgm');
const audioControl = document.getElementById('audio-control');
const optionSound = document.getElementById('option-sound');

audio.volume = 0.2; // 设置默认音量

audio.addEventListener('ended', () => {
    audioControl.classList.add('paused');
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
        audioControl.classList.remove('paused');
    } else {
        audio.pause();
        audioControl.classList.add('paused');
    }
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