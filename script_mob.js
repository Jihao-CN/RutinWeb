document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.querySelectorAll(".menu-item");
    const contentItems = document.querySelectorAll(".content-item");
    const loadButton = document.getElementById('load-button');
    const refreshButton = document.getElementById('refresh-button');
    const urlInput = document.getElementById('url-input');
    const urlFrame = document.getElementById('url-frame');

    function selectMenuItem(index) {
        const audio = new Audio('s.wav');
        audio.play().catch(error => {
            console.error('Audio play failed: ', error);
        });
        contentItems.forEach(item => {
            item.classList.remove("active");
        });
        const selectedItem = contentItems[index];
        if (selectedItem) {
            selectedItem.classList.add("active");
        } else {
            console.error("No content item found for index:", index);
        }
    }

    selectMenuItem(0);

    menuItems.forEach((item, index) => {
        item.addEventListener("click", () => selectMenuItem(index));
    });

    document.getElementById('menu-item-0').onclick = () => selectMenuItem(0);
    document.getElementById('menu-item-1').onclick = () => selectMenuItem(1);
    document.getElementById('menu-item-2').onclick = () => selectMenuItem(2);
    document.getElementById('menu-item-3').onclick = () => selectMenuItem(3);

    loadButton.addEventListener('click', () => {
        const url = urlInput.value;
        urlFrame.src = url;
    });

    refreshButton.addEventListener('click', () => {
        urlFrame.src = urlFrame.src;
    });
});