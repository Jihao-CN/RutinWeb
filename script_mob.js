let selectedMenuItem = -1;
const optionSound = document.getElementById('option-sound');

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

document.addEventListener("DOMContentLoaded", function () {
    const loadButton = document.getElementById('load-button');
    const backButton = document.getElementById('back-button');
    const urlFrame = document.getElementById('url-frame');
    const progress = document.getElementById('loading-progress');
    const errorDiv = document.getElementById('error-code');

    // 按钮功能
    loadButton.addEventListener('click', () => {
        errorDiv.style.display = 'none';
        progress.style.display = 'block';
        progress.value = 30;

        let timeout = setTimeout(() => {
            errorDiv.textContent = 'ERR_CONNECTION_TIMEOUT (代码: 504)';
            errorDiv.style.display = 'block';
            progress.style.display = 'none';
        }, 10000);

        urlFrame.onload = function() {
            clearTimeout(timeout);
            progress.value = 100;
            setTimeout(() => progress.style.display = 'none', 300);
        };

        urlFrame.onerror = function() {
            clearTimeout(timeout);
            errorDiv.textContent = 'ERR_CONNECTION_REFUSED (代码: 403)';
            errorDiv.style.display = 'block';
            progress.style.display = 'none';
        };
        
        urlFrame.src = urlFrame.src; // 简单刷新
    });

    backButton.addEventListener('click', function() {
        urlFrame.src = urlFrame.src;
    });
});