document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    // Function to animate numbers
    const animateCounter = (el) => {
        const target = parseFloat(el.getAttribute('data-target'));
        const duration = 1500; // ms
        const start = 0;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out quart
            const ease = 1 - Math.pow(1 - progress, 5); // Smoother easing (Quint)
            
            const current = start + (target - start) * ease;
            el.innerText = Number.isInteger(target) ? Math.round(current) : current.toFixed(2); // Keep decimals if needed

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.innerText = target; // Ensure final value is exact
            }
        };
        requestAnimationFrame(update);
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for smoother reveals
                setTimeout(() => {
                    entry.target.classList.add('active');

                    // Trigger counters inside this section
                    const counters = entry.target.querySelectorAll('.counter');
                    counters.forEach(counter => {
                        // Only animate if not already animated
                        if (!counter.classList.contains('animated')) {
                            animateCounter(counter);
                            counter.classList.add('animated');
                        }
                    });

                    // Trigger progress bars
                    const progressBars = entry.target.querySelectorAll('.progress-fill');
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                    });

                    // Add fade-in to images
                    const images = entry.target.querySelectorAll('.meal-img');
                    images.forEach(img => {
                        img.classList.add('fade-in');
                    });
                }, index * 100); // Stagger by 100ms
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 4. Copy to Clipboard Functionality
    const copyBtns = document.querySelectorAll('.copy-btn');
    
    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.data-card') || e.target.closest('.supplement-card');
            const list = card.querySelector('ul');
            const textToCopy = list.innerText;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = e.target.innerText;
                e.target.innerText = 'Copied!';
                setTimeout(() => {
                    e.target.innerText = originalText;
                }, 2000);
            });
        });
    });

    // 5. Initialize Owl Carousel for Sliders
    if (typeof $ !== 'undefined' && $.fn.owlCarousel) {
        $('.protocol-slider').owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            smartSpeed: 1000,
            navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
            responsive: {
                0: { items: 1 },
                768: { items: 2, margin: 20 },
                1000: { items: 3 },
                1200: { items: 3 }
            }
        });
    }

    console.log("Blueprint Protocol Page Loaded Successfully.");
});