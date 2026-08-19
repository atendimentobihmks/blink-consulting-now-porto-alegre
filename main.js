/* ==========================================================================
   MAIN JAVASCRIPT — CONSULTING NOW BLINK
   Interações, Carrossel de Metodologia com Pointer Events e Rastreamento
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Update copyright year automatically
  const yearEl = document.getElementById('copyrightYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Smooth Scroll Trigger for internal anchors
  const scrollTriggers = document.querySelectorAll('.scroll-trigger');
  scrollTriggers.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // =========================================================================
  // CARROSSEL DE METODOLOGIA (COM POINTER EVENTS & TOUCH)
  // =========================================================================
  const methodCarousel = document.getElementById('methodCarousel');
  if (methodCarousel) {
    const track = methodCarousel.querySelector('.method-carousel-track');
    const slides = Array.from(methodCarousel.querySelectorAll('.method-slide'));
    const prevBtn = document.getElementById('methodPrevBtn');
    const nextBtn = document.getElementById('methodNextBtn');
    const dots = Array.from(methodCarousel.querySelectorAll('.carousel-dot'));

    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateMethodCarousel(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;

      currentIndex = index;

      // Update track position
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update active classes
      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentIndex);
      });

      // Update indicator dots
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
        dot.setAttribute('aria-selected', idx === currentIndex ? 'true' : 'false');
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => updateMethodCarousel(currentIndex - 1));
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => updateMethodCarousel(currentIndex + 1));
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => updateMethodCarousel(idx));
    });

    // Pointer Events (Touch Swipe & Mouse Drag)
    const trackWrapper = methodCarousel.querySelector('.method-carousel-track-wrapper');
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    trackWrapper.addEventListener('pointerdown', (e) => {
      isDragging = true;
      startX = e.clientX;
      currentX = e.clientX;
      trackWrapper.setPointerCapture(e.pointerId);
    });

    trackWrapper.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      currentX = e.clientX;
    });

    trackWrapper.addEventListener('pointerup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const diffX = currentX - startX;
      const threshold = 40;

      if (diffX < -threshold) {
        updateMethodCarousel(currentIndex + 1);
      } else if (diffX > threshold) {
        updateMethodCarousel(currentIndex - 1);
      }

      try {
        trackWrapper.releasePointerCapture(e.pointerId);
      } catch (err) {}
    });

    trackWrapper.addEventListener('pointercancel', (e) => {
      isDragging = false;
      try {
        trackWrapper.releasePointerCapture(e.pointerId);
      } catch (err) {}
    });
  }

  console.log('Consulting Now Blink Initialized.');
});
