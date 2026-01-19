$(document).ready(function () {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', function () {
        const header = document.querySelector('.header_section');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Optional: Tech Globe Animation Logic (if needed for interactivity)
    // Currently handled nicely by CSS animations in research.css

    // Interactive Body Visual (Simple Hover Effect for Omics List)
    // Multi-Omics Button Interaction
    // Multi-Omics Button Interaction
    $('.omics_btn').on('click', function () {
        // Remove active class from all buttons
        $('.omics_btn').removeClass('active');
        // Reset all icons to plus
        $('.omics_btn .omics_toggle i').removeClass('fa-minus').addClass('fa-plus');

        // Add active class to clicked button
        $(this).addClass('active');
        // Set clicked button icon to minus
        $(this).find('.omics_toggle i').removeClass('fa-plus').addClass('fa-minus');
    });

    // Stacked Cards Animation (Scaling Effect)
    window.addEventListener('scroll', function () {
        const cards = document.querySelectorAll('.stack_card');
        const screenHeight = window.innerHeight;

        cards.forEach((card, index) => {
            // Get position relative to viewport
            const rect = card.getBoundingClientRect();

            // Logic: As a card moves up (sticky), it stays at top: 15vh (approx 15% of screenHeight)
            // The NEXT card coming up covers it.
            // We want the CURRENT card to scale down slightly as the NEXT card overlaps it.

            // But sticky positioning makes getBoundingClientRect constant once it sticks.
            // We need to check the parent or strict scroll position?
            // Actually, sticky elements' rect.top stays constant while sticking.
            // We can't easily detect "how much overlap" purely from rect.top of the sticky element itself.

            // ALTERNATIVE: Use IntersectionObserver or simple distance check if we knew the scroll layout.
            // Simpler approach for "Dimming/Scaling":
            // Check the top of the NEXT card.

            if (index < cards.length - 1) {
                const nextCard = cards[index + 1];
                const nextRect = nextCard.getBoundingClientRect();

                // Distance of next card from top of screen
                const dist = nextRect.top;

                // If next card is approaching the "stick point" (approx 15vh), start transforming current card
                // Let's say stick point is 15vh ~ 150px
                const stickPoint = screenHeight * 0.15;

                if (dist < screenHeight && dist > stickPoint) {
                    // Calculate 0 to 1 progress as next card moves from bottom to stick point
                    // dist goes from 100vh -> 15vh
                    const range = screenHeight - stickPoint;
                    const progress = 1 - ((dist - stickPoint) / range);
                    // progress goes 0 -> 1

                    // Scale down current card from 1 to 0.9
                    const scale = 1 - (progress * 0.1);
                    // Fade out slightly
                    const opacity = 1 - (progress * 0.5);
                    // Blur?
                    const blur = progress * 5;

                    const content = card.querySelector('.card_content');
                    if (content) {
                        content.style.transform = `scale(${scale})`;
                        content.style.opacity = `${opacity}`;
                        content.style.filter = `blur(${blur}px)`;
                    }
                } else if (dist <= stickPoint) {
                    // Fully covered/stuck state (optional, usually fully covered by next card anyway)
                    const content = card.querySelector('.card_content');
                    if (content) {
                        content.style.transform = `scale(0.9)`;
                        content.style.opacity = `0`; // Fully fade out if we want it gone
                    }
                } else {
                    // Reset
                    const content = card.querySelector('.card_content');
                    if (content) {
                        content.style.transform = `scale(1)`;
                        content.style.opacity = `1`;
                        content.style.filter = `blur(0px)`;
                    }
                }
            }
        });
    });
});

// Smooth Scroll for Anchor Links
$('a[href^="#"]').on('click', function (event) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top - 80
        }, 1000);
    }
});
