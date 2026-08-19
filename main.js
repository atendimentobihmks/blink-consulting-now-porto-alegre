/* ==========================================================================
   MAIN JAVASCRIPT — CONSULTING NOW BLINK
   Interações, Carrossel com Pointer Events e Rastreamento de Conversão
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
  // CARROSSEL DE ESPECIALISTAS (COM POINTER EVENTS & TOUCH)
  // =========================================================================
  const carouselContainer = document.getElementById('specialistsCarousel');
  if (!carouselContainer) return;

  const track = carouselContainer.querySelector('.carousel-track');
  const slides = Array.from(carouselContainer.querySelectorAll('.carousel-card'));
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');
  const dots = Array.from(document.querySelectorAll('.carousel-dot'));
  const counterNum = document.getElementById('carouselCurrentNum');

  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateCarousel(index) {
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

    // Update counter
    if (counterNum) {
      counterNum.textContent = String(currentIndex + 1).padStart(2, '0');
    }
  }

  // Button Listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => updateCarousel(currentIndex - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => updateCarousel(currentIndex + 1));
  }

  // Dots Listeners
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => updateCarousel(idx));
  });

  // =========================================================================
  // POINTER EVENTS (SWIPE TOUCH & MOUSE DRAG UNIFICADO)
  // =========================================================================
  const trackWrapper = carouselContainer.querySelector('.carousel-track-wrapper');
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
    const threshold = 45; // Minimum px distance for swipe trigger

    if (diffX < -threshold) {
      // Swiped left -> Next slide
      updateCarousel(currentIndex + 1);
    } else if (diffX > threshold) {
      // Swiped right -> Previous slide
      updateCarousel(currentIndex - 1);
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

  // Keyboard navigation for accessibility
  carouselContainer.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      updateCarousel(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      updateCarousel(currentIndex + 1);
    }
  });

  console.log('Consulting Now Blink initialized successfully.');
});
