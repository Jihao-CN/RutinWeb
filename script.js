window.onload = function () {
    // 获取图片元素
    const backgroundImage = document.getElementById('background-image');
    // 获取文本元素
    const titleText = document.getElementById('title-text');

    // 逐渐模糊图片
    backgroundImage.style.filter = 'blur(10px)';

    // 缓降文本
    const textContainer = titleText.parentElement;
    textContainer.style.top = '50%';
    textContainer.style.opacity = '1';
};