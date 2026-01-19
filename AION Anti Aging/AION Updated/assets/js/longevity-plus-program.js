// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000, // Animation ki speed
    once: true,     // Kya animation sirf ek baar honi chahiye
    offset: 100     // Kitni door se animation start ho
});

// Smooth Scrolling for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Simple Navbar change on scroll (Optional)
window.onscroll = function() {
    // Aap yahan navigation bar ka color change karne ka logic daal sakte hain
};