// 音乐播放器相关功能
let selectedMenuItem = -1;
const audio = document.getElementById('bgm');
const audioControl = document.getElementById('audio-control');
const playbackStatus = document.getElementById('playback-status');
const optionSound = document.getElementById('option-sound');
let lyricsData = [];
let lastLyric = "";
let hideTimeout = null;

audio.volume = 0.5;

// 获取歌词数据
async function fetchLyrics() {
    try {
        const response = await fetch('https://apis.netstart.cn/music//lyric?id=2619968667');
        const data = await response.json();
        parseLyrics(data.lrc.lyric);
    } catch (error) {
        console.error('获取歌词失败:', error);
    }
}

// 解析歌词
function parseLyrics(lrcText) {
    const lines = lrcText.split('\n');
    lyricsData = [];
    
    lines.forEach(line => {
        const timeMatch = line.match(/\[(\d+):(\d+)\.(\d+)\]/);
        if (timeMatch) {
            const minutes = parseInt(timeMatch[1]);
            const seconds = parseInt(timeMatch[2]);
            const milliseconds = parseInt(timeMatch[3]);
            const time = minutes * 60 + seconds + milliseconds / 1000;
            
            const text = line.replace(/\[\d+:\d+\.\d+\]/g, '').trim();
            if (text) {
                lyricsData.push({ time, text });
            }
        }
    });
    
    // 按时间排序
    lyricsData.sort((a, b) => a.time - b.time);
}

// 更新歌词显示
function updateLyrics() {
    if (audio.paused) return;
    
    const currentTime = audio.currentTime;
    let currentLyric = "";
    
    // 找到当前应该显示的歌词
    for (let i = 0; i < lyricsData.length; i++) {
        if (currentTime >= lyricsData[i].time) {
            currentLyric = lyricsData[i].text;
        } else {
            break;
        }
    }
    
    // 只有当歌词变化且不为空时才触发弹出效果
    if (currentLyric && currentLyric !== lastLyric) {
        lastLyric = currentLyric;
        showPlaybackStatus("♪ 正在播放 ♪", currentLyric);
    }
}

// 显示播放状态和歌词
function showPlaybackStatus(message, lyric = "") {
    const statusText = document.getElementById('status-text');
    const lyricText = document.getElementById('lyric-text');
    
    statusText.textContent = message;
    lyricText.textContent = lyric;
    
    clearTimeout(hideTimeout);
    playbackStatus.classList.remove('show');
    void playbackStatus.offsetWidth;
    playbackStatus.classList.add('show');
    
    hideTimeout = setTimeout(() => {
        playbackStatus.classList.remove('show');
    }, 2000);
}

// 菜单项动画
function cloneAndAnimate(event, index) {
    selectMenuItem(index);
    
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
        clone.remove();
    }, 800);
}

// 选择菜单项
function selectMenuItem(index) {
    if (selectedMenuItem !== -1) {
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

// 播放/暂停控制
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        audioControl.classList.add('playing');
        audioControl.classList.remove('paused');
        audioControl.style.animationPlayState = 'running';
        showPlaybackStatus('♪ 正在播放 ♪');
        
        if (lyricsData.length === 0) {
            fetchLyrics();
        }
    } else {
        audio.pause();
        audioControl.classList.remove('playing');
        audioControl.classList.add('paused');
        audioControl.style.animationPlayState = 'paused';
        showPlaybackStatus('已暂停');
        lastLyric = "";
    }
}

// 音量控制
function adjustVolume(value) {
    audio.volume = value;
}

// 小工具相关功能
const toolData = [
    {
        id: "numconvert",
        title: "数字转换器",
        description: "阿拉伯数字与罗马数字相互转换",
        url: "numconvert.html"
    },
    {
        id: "colorpicker",
        title: "颜色选择器",
        description: "RGB/HEX颜色代码转换",
        url: "colorpicker.html"
    },
    {
        id: "minesweeper",
        title: "扫雷",
        description: "简单版，10*10方格10个雷",
        url: "minesweeper.html"
    },
    {
        id: "titlegenerator",
        title: "称号生成器",
        description: "奇葩搞笑的称号，230个",
        url: "titlegenerator.html"
    }
];

// 初始化工具列表
function initTools() {
    const container = document.getElementById('tools-container');
    
    toolData.forEach(tool => {
        const card = document.createElement('div');
        card.className = 'tool-card';
        card.dataset.toolId = tool.id;

        card.innerHTML = `
            <div class="tool-title">${tool.title}</div>
            <div class="tool-description">${tool.description}</div>
            <div class="tool-link">点击使用 →</div>
        `;

        card.addEventListener('click', () => loadTool(tool));
        container.appendChild(card);
    });
}

// 加载工具到iframe
function loadTool(tool) {
    const iframeContainer = document.getElementById('iframe-container');
    const toolIframe = document.getElementById('tool-iframe');
    const iframeTitle = document.getElementById('iframe-title');
    
    // 更新标题
    iframeTitle.textContent = tool.title;
    
    // 显示iframe容器
    document.getElementById('tools-container').style.display = 'none';
    iframeContainer.classList.add('active');
    
    // 设置iframe源
    toolIframe.src = tool.url;
}

// 返回工具列表
function backToTools() {
    document.getElementById('iframe-container').classList.remove('active');
    document.getElementById('tools-container').style.display = 'grid';
    document.getElementById('tool-iframe').src = 'about:blank';
}

// 事件监听
document.getElementById('back-button').addEventListener('click', backToTools);

// 页面初始化
document.addEventListener('DOMContentLoaded', () => {
    audio.addEventListener('timeupdate', updateLyrics);
    initTools();
});