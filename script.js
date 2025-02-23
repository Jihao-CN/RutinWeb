document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.querySelectorAll(".menu-item");
    const contentItems = document.querySelectorAll(".content-item");

    function selectMenuItem(index) {
        // 移除所有内容项的活动状态
        contentItems.forEach(item => {
            item.classList.remove("active");
        });

        // 给选中的内容项添加活动状态
        const selectedItem = contentItems[index];
        if (selectedItem) {
            selectedItem.classList.add("active");
        } else {
            console.error("No content item found for index:", index);
        }
    }

    // 设置初始活动内容项
    selectMenuItem(0);

    // 添加菜单项点击事件监听器
    menuItems.forEach((item, index) => {
        item.addEventListener("click", () => selectMenuItem(index));
    });
});