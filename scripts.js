function togglePlayPause() {
    var audio = document.getElementById('bgm');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

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