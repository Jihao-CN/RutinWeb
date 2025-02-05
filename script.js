window.onload = function () {
    // 获取图片元素
    const backgroundImage = document.getElementById('background-image');
    // 获取文本元素
    const titleText = document.getElementById('title-text');
    // 获取菜单栏元素
    const menuContainer = document.getElementById('menu-container');

    // 逐渐模糊图片
    backgroundImage.style.filter = 'blur(10px)';

    // 缓降文本
    const textContainer = titleText.parentElement;
    textContainer.style.top = '50%';
    textContainer.style.opacity = '1';

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 0) {
            menuContainer.style.bottom = '0';
        } else {
            menuContainer.style.bottom = '-100px';
        }
    });
};