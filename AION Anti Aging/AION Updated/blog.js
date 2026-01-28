// Client-side filters, search and pagination with animations
(function(){
  const postsPerPage = 6;
  // Select the wrapper columns instead of just the cards to maintain grid layout
  const posts = Array.from(document.querySelectorAll('.post-card-wrapper'));
  const grid = document.getElementById('postsGrid');
  const pagination = document.getElementById('pagination');
  const filters = document.querySelectorAll('.filter');
  const searchInput = document.getElementById('searchInput');

  function render(page=1, filtered=posts){
    // hide all
    posts.forEach(p=>p.style.display='none');
    const start=(page-1)*postsPerPage, end=start+postsPerPage;
    
    const toShow = filtered.slice(start,end);
    toShow.forEach(p => {
      p.style.display = 'block';
      // Trigger animation
      p.style.animation = 'none';
      p.offsetHeight; /* trigger reflow */
      p.style.animation = 'fadeInUp 0.5s ease forwards';
    });

    // build pagination
    const pages = Math.ceil(filtered.length/postsPerPage)||1;
    pagination.innerHTML='';
    for(let i=1;i<=pages;i++){
      const li=document.createElement('li'); li.className='page-item'+(i===page?' active':'');
      const a=document.createElement('a'); a.className='page-link'; a.href='#'; a.textContent=i;
      a.addEventListener('click', (e)=>{ 
        e.preventDefault(); 
        render(i, filtered);
        // Scroll to top of grid smoothly
        const gridTop = document.querySelector('.blog-hero').getBoundingClientRect().bottom + window.scrollY - 50;
        window.scrollTo({top: gridTop, behavior: 'smooth'});
      });
      li.appendChild(a); pagination.appendChild(li);
    }
  }

  function applyFilter(tag='all', search=''){
    const term = search.trim().toLowerCase();
    const filtered = posts.filter(p=>{
      const tags = p.dataset.tags||'';
      // Search in title and text
      const title = p.querySelector('.card-title')?.textContent?.toLowerCase()||'';
      const text = p.querySelector('.card-text')?.textContent?.toLowerCase()||'';
      
      const matchesTag = (tag==='all') ? true : tags.split(',').includes(tag);
      const matchesSearch = term ? (title.includes(term) || tags.includes(term) || text.includes(term)) : true;
      return matchesTag && matchesSearch;
    });
    render(1, filtered);
  }

  // init
  render();

  filters.forEach(f=>f.addEventListener('click', ()=>{
    filters.forEach(b=>b.classList.remove('active')); f.classList.add('active');
    applyFilter(f.dataset.filter, searchInput.value);
  }));

  searchInput.addEventListener('input', ()=>{
    const active = document.querySelector('.filter.active');
    applyFilter(active?.dataset.filter||'all', searchInput.value);
  });
})();
