(function() {
    const newsCards = Array.from(document.querySelectorAll('.news-card-wrapper'));
    const filters = document.querySelectorAll('.filter');
    const searchInput = document.getElementById('newsSearchInput');
    const newsGrid = document.getElementById('newsGrid');
    const noResultsMessage = document.getElementById('noResultsMessage');
  
    function applyFilters() {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const activeFilter = document.querySelector('.filter.active').dataset.filter;
      let itemsFound = 0;
  
      newsCards.forEach(card => {
        const category = (card.dataset.category || '').toLowerCase();
        const title = (card.querySelector('.news-title')?.textContent || '').toLowerCase();
        const excerpt = (card.querySelector('.news-excerpt')?.textContent || '').toLowerCase();
  
        const matchesCategory = (activeFilter === 'all') || category.includes(activeFilter);
        const matchesSearch = searchTerm === '' || title.includes(searchTerm) || excerpt.includes(searchTerm);
  
        if (matchesCategory && matchesSearch) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.5s ease forwards';
          itemsFound++;
        } else {
          card.style.display = 'none';
          card.style.animation = 'none';
        }
      });
  
      if (noResultsMessage) {
          noResultsMessage.style.display = itemsFound === 0 ? 'block' : 'none';
      }
    }
  
    filters.forEach(filter => {
      filter.addEventListener('click', function() {
        filters.forEach(f => f.classList.remove('active'));
        this.classList.add('active');
        applyFilters();
      });
    });
  
    searchInput.addEventListener('input', applyFilters);
  })();