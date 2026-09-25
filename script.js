  const fixedNav = document.getElementById('fixedNav');
  const heroEl = document.getElementById('home');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
    /*fixedNav.classList.toggle('visible', !e.isIntersecting);*/
});
    }, { threshold: 0.15 });
    io.observe(heroEl);

    // nav actions (home / map / rsvp)
    document.querySelectorAll('[data-nav]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.nav;
          if (target === 'home') {
            document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
          } else if (target === 'map') {
            openModal('modal-map');
          } else if (target === 'rsvp') {
            openModal('modal-rsvp');
        }
      });
    });

    // stamp cards open their matching modal 
    const stampToModal = { dress: 'modal-dress', map: 'modal-map', rsvp: 'modal-rsvp' };
    document.querySelectorAll('.stamp-card').forEach(card => {
      const go = () => openModal(stampToModal[card.dataset.open]);
      card.addEventListener('click', go);
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });

    // modal open/close
    let lastFocused = null;
    function openModal(id) {
      const overlay = document.getElementById(id);
      if (!overlay) return;
      lastFocused = document.activeElement;
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const closeBtn = overlay.querySelector('.modal-close');
      if (closeBtn) closeBtn.focus();
    }

    function closeModal(overlay) {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(overlay); });
      overlay.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => closeModal(overlay)));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(closeModal);
      }
    });

    // map tabs
    document.querySelectorAll('.tab-btn').forEach(tab => {
      tab.addEventListener('click', () => {
        const container = tab.closest('.modal-card');
        container.querySelectorAll('.tab-btn').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
        container.querySelectorAll('.map-pane').forEach(p => p.classList.remove('active'));
        tab.classList.add('active'); tab.setAttribute('aria-selected','true');
        container.querySelector(`.map-pane[data-pane="${tab.dataset.pane}"]`).classList.add('active');
      });
    });

  /* stamp track arrows 
  const track = document.getElementById('stampTrack');
  document.getElementById('prevBtn').addEventListener('click', () => track.scrollBy({ left: -280, behavior: 'smooth' }));
  document.getElementById('nextBtn').addEventListener('click', () => track.scrollBy({ left: 280, behavior: 'smooth' }));


  // resvp submit 
  const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw_JWnf078a3iN_aPiOdV_GrerXcGy8Raxvsh9XwFGOQb996B4f96_3FFP7kP-VgPnl-g/exec';
 
  document.getElementById('rsvpForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById('rsvpStatus');
    const data = {
      fullName: form.fullName.value,
      attending: form.attending.value,
      guestCount: form.guestCount.value,
      notes: form.notes.value,
      submittedAt: new Date().toISOString()
    };
 
    status.textContent = 'Sending…';
    status.classList.add('show');
 
    try {
      // no-cors: apps script web apps don't return a readable response cross-origin, like message so mano mano pa nyay
      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      status.textContent = 'Thank you — your RSVP has been received.';
      form.reset();
    } catch (err) {
      status.textContent = 'Something went wrong. Please try again.';
    }
  }); */

  // stamp track arrows 
  const track = document.getElementById('stampTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (track) {
    prevBtn?.addEventListener('click', () => track.scrollBy({ left: -280, behavior: 'smooth' }));
    nextBtn?.addEventListener('click', () => track.scrollBy({ left: 280, behavior: 'smooth' }));
  }

  // rsvp submit 
  const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw_JWnf078a3iN_aPiOdV_GrerXcGy8Raxvsh9XwFGOQb996B4f96_3FFP7kP-VgPnl-g/exec';
  const rsvpForm = document.getElementById('rsvpForm');

  rsvpForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById('rsvpStatus');
    const data = {
      fullName: form.fullName.value,
      attending: form.attending.value,
      guestCount: form.guestCount.value,
      notes: form.notes.value,
      submittedAt: new Date().toISOString()
    };

    if (status) {
      status.textContent = 'Sending…';
      status.classList.add('show');
    }

    try {
      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (status) status.textContent = 'Thank you — your RSVP has been received.';
      form.reset();
    } catch (err) {
      if (status) status.textContent = 'Something went wrong. Please try again.';
    }
  });
