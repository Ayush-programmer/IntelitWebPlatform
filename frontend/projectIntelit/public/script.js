let menuBtn = document.querySelector('.navbar .sidebar-btn i');
let closeBtn = document.querySelector('.navbar .side-wrapper i');
let sidebar = document.querySelector('.navbar .side-wrapper');

menuBtn.addEventListener('click', () => {
    console.log('clicked');
    sidebar.style.right = '0';
    sidebar.style.opacity = 1;
});

closeBtn.addEventListener('click', () => {
    sidebar.style.right = '-30rem';
    sidebar.style.opacity = 0;
});