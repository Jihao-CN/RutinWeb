// 异步获取文件列表的函数
function fetchFiles() {
    const username = 'Jihao-CN';
    const repo = 'JihaoPage';
    const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(files => {
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
        })
      .catch(error => console.error('网络响应失败', error));
}

fetchFiles();

// 选择菜单项的函数
function selectMenuItem(index) {
    const menuItems = document.querySelectorAll('.menu-item');
    const contentItems = document.querySelectorAll('.content-item');

    menuItems.forEach(item => item.classList.remove('selected'));
    contentItems.forEach(item => item.classList.remove('active'));

    menuItems[index].classList.add('selected');
    contentItems[index].classList.add('active');

    const optionSound = document.getElementById('option-sound');
    optionSound.currentTime = 0;
    optionSound.play();
}

// 初始化第一个菜单项为选中状态
selectMenuItem(0);

// 音频控制变量
const audio = document.getElementById('bgm');
const audioControl = document.getElementById('audio-control');
const innerCircle = document.getElementById('inner-circle');
const playbackStatus = document.getElementById('playback-status');

// 切换播放和暂停状态
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        audioControl.classList.add('playing');
        innerCircle.style.backgroundColor = 'green';
        showPlaybackStatus('正在播放三角度');
    } else {
        audio.pause();
        audioControl.classList.remove('playing');
        innerCircle.style.backgroundColor = 'red';
        showPlaybackStatus('已暂停');
    }
}

// 显示播放状态信息
function showPlaybackStatus(message) {
    playbackStatus.textContent = message;
    playbackStatus.classList.add('show');
    setTimeout(() => {
        playbackStatus.classList.remove('show');
    }, 2000);
}

// 调整音量
function adjustVolume(volume) {
    audio.volume = volume;
}