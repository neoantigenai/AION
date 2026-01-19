$(document).ready(function () {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Milind Soman Hero Slider
    $(".hero_slider").owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut', // Same as video cross-fade
        animateIn: 'fadeIn',
        items: 1,
        smartSpeed: 1000
    });

    // Testimonial Slider
    $(".testimonial_slider").owlCarousel({
        loop: true,
        margin: 20,
        autoplay: true,
        responsive: {
            0: { items: 1 },
            768: { items: 2 }
        }
    });

    // Video Slider
    $(".video_slider").owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        dots: true,
        center: true,
        items: 1,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        autoplay: false,
        smartSpeed: 1000,
        responsive: {
            0: { items: 1 },
            768: { items: 1 }
        }
    });

    // Practitioners Slider
    $('.practitioners_slider').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        smartSpeed: 800,
        items: 1,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        responsive: {
            0: { items: 1 },
            768: { items: 1 },
            1000: { items: 1 }
        }
    });

    // Smooth Scroll
    $('a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });
});