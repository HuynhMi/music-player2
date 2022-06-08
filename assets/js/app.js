const $ = document.querySelector.bind(document);
const cd = $('.player__cd-thumb-wrap');
const dashboard = $('.player__dashboard');
document.onscroll = function() {
    const scrollY = window.scrollY;
    let newSize = 250 - scrollY;
    if (newSize < 0) {
        newSize = 0;
    } 
    cd.style.width = newSize + 'px';
    cd.style.height = newSize + 'px';
    cd.style.opacity = newSize / 250;
    if (scrollY > 380) {
        scrollY = 380;
    }
    dashboard.style.height = `calc(100vh - ${scrollY}px)`;
}