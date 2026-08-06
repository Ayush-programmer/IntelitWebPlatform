// let menuBtn = document.querySelector('.navbar .sidebar-btn i');
// let closeBtn = document.querySelector('.navbar .side-wrapper i');
// let sidebar = document.querySelector('.navbar .side-wrapper');

// console.log(menuBtn, closeBtn, sidebar);

// menuBtn.addEventListener('click', () => {
//     console.log('clicked');
//     sidebar.style.right = '0';
//     sidebar.style.opacity = 1;
// });

// closeBtn.addEventListener('click', () => {
//     sidebar.style.right = '-30rem';
//     sidebar.style.opacity = 0;
// });


import { useState } from 'react';
// ...existing imports...

export default function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleMenuClick = () => {
        setSidebarOpen(true);
    };

    const handleCloseClick = () => {
        setSidebarOpen(false);
    };

    return (
        <div className="navbar">
            <button className="sidebar-btn" onClick={handleMenuClick}>
                <i className="icon">☰</i>
            </button>
            <div 
                className="side-wrapper" 
                style={{
                    right: sidebarOpen ? '0' : '-30rem',
                    opacity: sidebarOpen ? 1 : 0
                }}
            >
                <button onClick={handleCloseClick}>
                    <i className="icon">✕</i>
                </button>
                {/* Sidebar content */}
            </div>
        </div>
    );
}