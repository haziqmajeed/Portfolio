
export function getScrollbarWidth() {
    return window.innerWidth - document.body.clientWidth;
}

export function checkForScrollbar() {
    return document.body.scrollHeight > window.innerHeight;
}
