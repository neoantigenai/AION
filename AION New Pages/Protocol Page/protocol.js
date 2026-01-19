// Slider Functionality
const initializeSliders = () => {
    const sliders = document.querySelectorAll('[data-slider]');
    
    sliders.forEach(slider => {
        const sliderName = slider.getAttribute('data-slider');
        const wrapper = slider.closest('.slider-wrapper');
        
        if (!wrapper) return;
        
        const prevBtn = wrapper.querySelector('.prev-btn[data-slider="' + sliderName + '"]');
        const nextBtn = wrapper.querySelector('.next-btn[data-slider="' + sliderName + '"]');
        
        if (!prevBtn || !nextBtn) return;
        
        let currentIndex = 0;
        const slides = slider.querySelectorAll('.slide');
        const totalSlides = slides.length;
        const itemsPerView = 3; // Show 3 items at a time
        
        const updateSlider = () => {
            const offset = -currentIndex * (100 / itemsPerView);
            slider.style.transform = `translateX(${offset}%)`;
        };
        
        prevBtn.addEventListener('click', () => {
            currentIndex = Math.max(currentIndex - 1, 0);
            updateSlider();
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalSlides - itemsPerView) {
                currentIndex += 1;
            }
            updateSlider();
        });
    });
};

// Example: Add simple animations or dynamic content interactions
document.addEventListener('DOMContentLoaded', () => {
    // Initialize sliders first
    initializeSliders();
    
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
            const card = e.target.closest('.data-card');
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

    // 5. Slider Logic for Multiple Sliders
    const initializeSlider = (sliderName) => {
        // Robust selector: tries to find by data attribute, falls back to generic class for 'habits' if missing
        const sliderTrack = document.querySelector(`.slider-track[data-slider="${sliderName}"]`);
        
        if (!sliderTrack) return;

        const slides = Array.from(sliderTrack.children);
        // Find buttons relative to the track's container to ensure we get the correct ones
        const container = sliderTrack.closest('.slider-container');
        const wrapper = container.parentElement;
        const nextBtn = wrapper.querySelector('.next-btn');
        const prevBtn = wrapper.querySelector('.prev-btn');

        // Calculate movement distance (card width + gap)
        // Note: CSS gap is 20px.
        const getMoveAmount = () => {
            if (slides.length === 0) return 0;
            const slide = slides[0];
            const style = window.getComputedStyle(slide);
            const width = slide.offsetWidth;
            // Assuming gap is 25px from CSS .slider-track { gap: 25px }
            // We can also compute it if needed, but hardcoding for performance is fine if CSS matches
            return width + 25;
        };

        let currentPosition = 0;

        const updateSlider = () => {
            sliderTrack.style.transform = `translateX(-${currentPosition}px)`;
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const containerWidth = container.clientWidth;
                const trackWidth = getMoveAmount() * slides.length - 25; // Total width minus last gap
                const maxScroll = trackWidth - containerWidth;

                if (currentPosition < maxScroll) {
                    currentPosition += getMoveAmount();
                    if (currentPosition > maxScroll) currentPosition = maxScroll; // Clamp to end
                } else {
                    currentPosition = 0; // Loop back to start
                }
                updateSlider();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPosition > 0) {
                    currentPosition -= getMoveAmount();
                    if (currentPosition < 0) currentPosition = 0; // Clamp to start
                } else {
                    // Optional: Loop to end could go here
                }
                updateSlider();
            });
        }

        // Reset on resize to prevent alignment issues
        window.addEventListener('resize', () => {
            currentPosition = 0;
            updateSlider();
        });
    };

    // Initialize all sliders
    initializeSlider('habits'); // Existing habits slider (no data-slider attribute, so assume default)
    initializeSlider('diet');
    initializeSlider('biomarkers');

    console.log("Blueprint Protocol Page Loaded Successfully.");
});