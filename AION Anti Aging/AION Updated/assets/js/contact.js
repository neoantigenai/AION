// document.addEventListener('DOMContentLoaded', function(){
//   // footer year
//   const yearEl = document.getElementById('year'); if(yearEl) yearEl.textContent = new Date().getFullYear();

//   // --- Header: set main padding to header height and toggle scrolled class ---
//   const header = document.querySelector('.header_section');
//   const main = document.querySelector('main');
//   function updateMainPadding(){ if(header && main) main.style.paddingTop = header.offsetHeight + 'px'; }
//   function updateScrolled(){ if(!header) return; if(window.scrollY > 40) header.classList.add('scrolled'); else header.classList.remove('scrolled'); }
//   updateMainPadding(); updateScrolled();
//   window.addEventListener('resize', updateMainPadding);
//   window.addEventListener('orientationchange', updateMainPadding);
//   window.addEventListener('scroll', updateScrolled);
//   if (window.jQuery) { try { $('#navbarSupportedContent').on('shown.bs.collapse hidden.bs.collapse', updateMainPadding); } catch (e) {} }

//   // --- Form & validation ---
//   const form = document.getElementById('contactForm');
//   const submitBtn = document.getElementById('submitBtn');
//   const statusEl = document.getElementById('formStatus');

//   function setError(el, message){ el.classList.add('is-invalid'); const id = 'error-' + el.id; const msg = document.getElementById(id); if(msg) msg.textContent = message; }
//   function clearError(el){ el.classList.remove('is-invalid'); const id = 'error-' + el.id; const msg = document.getElementById(id); if(msg) msg.textContent = ''; }

//   function validate(){ let valid = true; const name = document.getElementById('name'); const email = document.getElementById('email'); const phone = document.getElementById('phone'); const message = document.getElementById('message');
//     if(!name.value.trim()){ setError(name,'Please enter your name'); valid=false; } else clearError(name);
//     if(!email.value.trim()){ setError(email,'Please enter email'); valid=false; } else if(!/^\S+@\S+\.\S+$/.test(email.value)){ setError(email,'Please enter a valid email'); valid=false; } else clearError(email);
    
//     // Validate phone if it has a value
//     if(phone.value.trim() && !/^\+?[0-9\s-()]{10,15}$/.test(phone.value.trim())){ 
//       setError(phone, 'Please enter a valid phone number'); 
//       valid=false; 
//     } else { 
//       clearError(phone); 
//     }

//     if(!message.value.trim() || message.value.trim().length < 10){ setError(message,'Message must be at least 10 characters'); valid=false; } else clearError(message);
//     return valid;
//   }

//   if (form) {
//     form.addEventListener('submit', function (e) {
//       if (statusEl) statusEl.textContent = '';
//       if (!validate()) {
//         e.preventDefault(); // Prevent submission only if validation fails
//         if (statusEl) statusEl.textContent = 'Please fix the highlighted fields.';
//         return;
//       }
//     });
//   }

// });

document.addEventListener('DOMContentLoaded', function(){
  // --- Footer & UI Setup ---
  const yearEl = document.getElementById('year'); 
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  const header = document.querySelector('.header_section');
  const main = document.querySelector('main');
  function updateMainPadding(){ if(header && main) main.style.paddingTop = header.offsetHeight + 'px'; }
  function updateScrolled(){ if(!header) return; if(window.scrollY > 40) header.classList.add('scrolled'); else header.classList.remove('scrolled'); }
  updateMainPadding(); updateScrolled();
  window.addEventListener('resize', updateMainPadding);
  window.addEventListener('scroll', updateScrolled);

  // --- Form Logic ---
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzyYb9a7HW233NbTfDPr-0cN9JI9ZGP7IncVHnz8Vf7YFNVN2eS4OcSzr0V3dcS3wqd/exec'; // Replace with your URL
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const statusEl = document.getElementById('formStatus');

  function setError(el, message){ 
    el.classList.add('is-invalid'); 
    const id = 'error-' + el.id; 
    const msg = document.getElementById(id); 
    if(msg) msg.textContent = message; 
  }

  function clearError(el){ 
    el.classList.remove('is-invalid'); 
    const id = 'error-' + el.id; 
    const msg = document.getElementById(id); 
    if(msg) msg.textContent = ''; 
  }

  function validate(){ 
    let valid = true; 
    const name = document.getElementById('name'); 
    const email = document.getElementById('email'); 
    const phone = document.getElementById('phone'); 
    const message = document.getElementById('message');

    if(!name.value.trim()){ setError(name,'Please enter your name'); valid=false; } else clearError(name);
    if(!email.value.trim()){ setError(email,'Please enter email'); valid=false; } 
    else if(!/^\S+@\S+\.\S+$/.test(email.value)){ setError(email,'Please enter a valid email'); valid=false; } 
    else clearError(email);
    
    if(phone.value.trim() && !/^\+?[0-9\s-()]{10,15}$/.test(phone.value.trim())){ 
      setError(phone, 'Please enter a valid phone number'); 
      valid=false; 
    } else { 
      clearError(phone); 
    }

    if(!message.value.trim() || message.value.trim().length < 10){ 
      setError(message,'Message must be at least 10 characters'); 
      valid=false; 
    } else clearError(message);

    return valid;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Always prevent default to handle via AJAX
      
      if (statusEl) statusEl.textContent = '';

      if (!validate()) {
        if (statusEl) statusEl.textContent = 'Please fix the highlighted fields.';
        return;
      }

      // Start submission
      submitBtn.disabled = true;
      statusEl.textContent = 'Sending your message...';

      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
          statusEl.textContent = 'Success! Your message has been saved.';
          statusEl.style.color = 'green';
          form.reset();
        })
        .catch(error => {
          console.error('Error!', error.message);
          statusEl.textContent = 'Error: Could not save your message.';
          statusEl.style.color = 'red';
        })
        .finally(() => {
          submitBtn.disabled = false;
        });
    });
  }
});