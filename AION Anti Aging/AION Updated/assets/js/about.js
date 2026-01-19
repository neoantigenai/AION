$(document).ready(function() {
    // 1. Initialize AOS Animations
    AOS.init({ duration: 1000, once: true });

    // 2. Interactive Pillar Slider (IISc Style)
    $('.acc-item').on('click', function() {
        if($(this).hasClass('active')) return;
        $('.acc-item').removeClass('active');
        $(this).addClass('active');
        const newImgSrc = $(this).attr('data-img');
        $('#display-image').fadeOut(300, function() {
            $(this).attr('src', newImgSrc).fadeIn(300);
        });
    });

    // 3. Navbar Scroll Effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.header_section').addClass('scrolled');
        } else {
            $('.header_section').removeClass('scrolled');
        }
    });

    // 4. India Context Slider Logic
    let currentIdx = 0;
    const cards = $('.slider-card');
    const dots = $('.dot');

    function updateSlider(index) {
        cards.removeClass('active');
        dots.removeClass('active');
        
        cards.eq(index).addClass('active');
        dots.eq(index).addClass('active');
        
        // Re-order for visual centering
        const wrapper = $('.slider-wrapper');
        if (index === 0) wrapper.css('transform', 'translateX(10%)');
        else if (index === 2) wrapper.css('transform', 'translateX(-10%)');
        else wrapper.css('transform', 'translateX(0)');
    }

    $('.next').click(function() {
        currentIdx = (currentIdx + 1) % cards.length;
        updateSlider(currentIdx);
    });

    $('.prev').click(function() {
        currentIdx = (currentIdx - 1 + cards.length) % cards.length;
        updateSlider(currentIdx);
    });

    $('.dot').click(function() {
        currentIdx = $(this).index();
        updateSlider(currentIdx);
    });

    // Initialize slider state
    updateSlider(0);

    // 5. Initialize Healthspan Graph
    const chartElement = document.getElementById('healthspanChart');
    if (chartElement) {
        const ctx = chartElement.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['20s', '30s', '40s', '50s', '60s', '70s', '80s+'],
                datasets: [{
                    label: 'Standard Biological Aging',
                    data: [100, 90, 75, 55, 35, 15, 5],
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    borderDash: [5, 5],
                    fill: false
                }, {
                    label: 'Aion Optimized Healthspan',
                    data: [100, 98, 92, 85, 78, 65, 50],
                    borderColor: '#8a2be2',
                    backgroundColor: 'rgba(138, 43, 226, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: '#ffffff' } }
                },
                scales: {
                    y: { display: false },
                    x: { ticks: { color: '#cccccc' } }
                }
            }
        });
    }

    // Navbar: highlight current page link and collapse on click (mobile)
    (function() {
        const path = window.location.pathname.split('/').pop();
        $('.navbar-nav .nav-link').each(function() {
            const href = $(this).attr('href');
            if (href === path || (href && path.indexOf(href.split('.').shift()) === 0)) {
                $(this).addClass('active');
                $(this).css('color','blueviolet');
            }
        });

        $('.navbar-nav .nav-link').on('click', function() {
            $('.navbar-collapse').collapse('hide');
        });
    })();

});