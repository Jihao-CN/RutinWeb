let selectedMenuItem = -1;

function selectMenuItem(index) {
    if (selectedMenuItem !== -1) {
        document.querySelectorAll('.menu-item')[selectedMenuItem].classList.remove('selected');
    }
    selectedMenuItem = index;
    const selectedItem = document.querySelectorAll('.menu-item')[index];
    selectedItem.classList.add('selected');
    document.getElementById('content-text').textContent = `您选择了菜单项 ${index + 1}`;

    // 添加 macOS dock 栏打开窗口的动画效果
    selectedItem.classList.add('dock-open');
}