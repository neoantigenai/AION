// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-out-quad'
    });
});

// Subscription Form Interaction
const subscribeForm = document.querySelector('.subscribe-form');

if(subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input').value;
        
        // Simple UI Feedback
        const button = e.target.querySelector('button');
        const originalText = button.innerText;
        
        button.innerText = "Welcome to AION!";
        button.style.backgroundColor = "#27ae60";
        
        setTimeout(() => {
            button.innerText = originalText;
            button.style.backgroundColor = "";
            e.target.reset();
        }, 3000);

        console.log(`Subscribed: ${email}`);
    });
}

// Subtle Parallax effect on images
window.addEventListener('scroll', () => {
    const images = document.querySelectorAll('.card-image img');
    images.forEach(img => {
        let scrollValue = window.scrollY;
        img.style.transform = `translateY(${scrollValue * 0.05}px)`;
    });
});