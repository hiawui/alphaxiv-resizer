// ==UserScript==
// @name         hiawui-alphaxiv-resizer
// @namespace    https://github.com/hiawui/alphaxiv-resizer
// @version      2025-09-15
// @description  resizer of alphaxiv paper assistant tool
// @author       hiawui
// @match        https://www.alphaxiv.org/abs/*
// @icon         https://assets.alphaxiv.org/communityAvatars/6838cb0214dba7047528e440/204c5012-c96b-47e0-9719-f1a93aead7aa/w100.webp
// @grant        none
// @run-at       document-idle
// ==/UserScript==

function checkAndInsertResizer() {
    'use strict';

    const viewer = document.querySelector('.Viewer');
    if (!viewer) {
        console.log('未找到 .Viewer 节点。脚本终止。');
        return;
    }

    const resizerClassName = 'hiawui-resizer'
    const existingResizer = document.querySelector(`.${resizerClassName}`);
    if (existingResizer) {
        return
    }
    const resizer = document.createElement('div');
    resizer.className = resizerClassName;
    resizer.style.cssText = `
            width: 2px;
            height: 100%;
            background: #ccc;
            cursor: ew-resize;
            float: left;
        `;

    // 3. 将 resizer 节点插入到 .Viewer 后面
    viewer.parentNode.insertBefore(resizer, viewer.nextSibling);

    // 4. 实现拖动功能
    let isResizing = false;

    resizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        // 阻止默认的拖动行为
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;

        // 获取 resizer 父元素的左侧位置
        const parentRect = viewer.parentNode.getBoundingClientRect();
        // 计算新的宽度
        const newWidth = e.clientX - parentRect.left - resizer.offsetWidth / 2;

        // 限制最小宽度
        if (newWidth > 100) {
            viewer.style.width = newWidth + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isResizing = false;
    });
}

(function() {
    'use strict';

    setInterval(()=>{
        checkAndInsertResizer()
    }, 1000);
})();
