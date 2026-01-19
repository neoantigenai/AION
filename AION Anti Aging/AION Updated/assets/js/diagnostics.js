(function(){
  // header padding same pattern used on contact page
  const header = document.querySelector('.header_section');
  const main = document.querySelector('.diagnostics-page');
  function updateMainPadding(){
    if(!header || !main) return;
    const h = header.offsetHeight;
    main.style.paddingTop = (h + 12) + 'px';
  }
  window.addEventListener('load', updateMainPadding);
  window.addEventListener('resize', updateMainPadding);

  // Smooth scroll for diagnostic items
  document.querySelectorAll('.diag-link').forEach(link => {
    link.addEventListener('click', function(e) {
      // Allow normal link behavior (external links)
      // Just add a subtle animation
      this.style.opacity = '0.8';
      setTimeout(() => {
        this.style.opacity = '1';
      }, 150);
    });
  });

  // AOS initialization for animations
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    });
  }

  // collapse navbar listener to update padding when mobile menu toggles
  const navCollapse = document.getElementById('navbarSupportedContent');
  if(navCollapse){
    navCollapse.addEventListener('shown.bs.collapse', updateMainPadding);
    navCollapse.addEventListener('hidden.bs.collapse', updateMainPadding);
  }

  // Navbar scroll effect
  window.addEventListener('scroll', function () {
      const header = document.querySelector('.header_section');
      if (window.scrollY > 50) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });
})();