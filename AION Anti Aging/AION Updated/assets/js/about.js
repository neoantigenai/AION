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

    // 4. India Context Slider (Owl Carousel)
    $('.india-slider').owlCarousel({
        center: true,
        items: 1,
        loop: true,
        margin: 30,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        smartSpeed: 1000,
        navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>'],
        responsive: {
            0: { items: 1 },
            768: { items: 1.5 },
            1000: { items: 2.2 }
        }
    });

    // 5. Initialize Healthspan Graph
    const chartElement = document.getElementById('healthspanChart');
    if (chartElement) {
        const ctx = chartElement.getContext('2d');
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(138, 43, 226, 0.5)');
        gradient.addColorStop(1, 'rgba(138, 43, 226, 0.0)');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['20s', '30s', '40s', '50s', '60s', '70s', '80s+'],
                datasets: [{
                    label: 'Standard Biological Aging',
                    data: [100, 90, 75, 55, 35, 15, 5],
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    borderDash: [5, 5],
                    pointBackgroundColor: 'rgba(255, 255, 255, 0.3)',
                    pointBorderColor: 'transparent',
                    fill: false
                }, {
                    label: 'Aion Optimized Healthspan',
                    data: [100, 98, 92, 85, 78, 65, 50],
                    borderColor: '#8a2be2',
                    backgroundColor: gradient,
                    pointBackgroundColor: '#8a2be2',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { 
                        labels: { 
                            color: '#ffffff',
                            font: { family: "'Inter', sans-serif", size: 12 }
                        },
                        position: 'top',
                        align: 'end'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(10, 10, 15, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#ccc',
                        borderColor: 'rgba(138, 43, 226, 0.3)',
                        borderWidth: 1,
                        padding: 10,
                        displayColors: true
                    }
                },
                scales: {
                    y: { 
                        display: true,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#666', font: { size: 10 } }
                    },
                    x: { 
                        grid: { display: false },
                        ticks: { color: '#999', font: { size: 11 } }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
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