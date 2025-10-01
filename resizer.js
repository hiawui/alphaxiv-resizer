// ==UserScript==
// @name         hiawui-alphaxiv-resizer
// @namespace    https://github.com/hiawui/alphaxiv-resizer
// @version      2025-09-15
// @description  resizer of alphaxiv paper assistant tool
// @author       hiawui
// @match        https://www.alphaxiv.org/abs/*
// @match        https://www.alphaxiv.org/pdf/*
// @match        https://www.alphaxiv.org/private/*
// @icon         https://assets.alphaxiv.org/communityAvatars/6838cb0214dba7047528e440/204c5012-c96b-47e0-9719-f1a93aead7aa/w100.webp
// @grant        none
// @run-at       document-idle
// ==/UserScript==

function checkAndInsertResizer() {
    'use strict';

    const viewer = document.querySelector('.Viewer');
    if (!viewer) {
        console.log('Viewer element not found. Script terminated.');
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
            width: 4px;
            height: 100%;
            background: #ccc;
            cursor: ew-resize;
            float: left;
        `;

    // Insert resizer element after .Viewer
    viewer.parentNode.insertBefore(resizer, viewer.nextSibling);

    // Implement drag functionality
    let isResizing = false;

    resizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        // Prevent default drag behavior
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;

        // Get the left position of resizer's parent element
        const parentRect = viewer.parentNode.getBoundingClientRect();
        // Calculate new width
        const newWidth = e.clientX - parentRect.left - resizer.offsetWidth / 2;

        // Limit minimum width
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
