/**
 * ==========================================================================
 * CONSULTING NOW — BLINK OFICIAL (CORE ENGINE)
 * Padrão BMK (Bmarket Go)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initCopyrightYear();
  initMethodCarousel();
  initSmoothScroll();
});

/**
 * 1. Ano de Copyright Dinâmico
 */
function initCopyrightYear() {
  const yearEl = document.getElementById('copyrightYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }
}

/**
 * 2. Carrossel de Metodologia em 3 Passos (Touch, Drag & Keyboard)
 */
function initMethodCarousel() {
  const container = document.getElementById('methodCarousel');
  if (!container) return;

  const track = container.querySelector('.method-carousel-track');
  const slides = container.querySelectorAll('.method-slide');
  const prevBtn = document.getElementById('methodPrevBtn');
  const nextBtn = document.getElementById('methodNextBtn');
  const dots = container.querySelectorAll('.carousel-dot');
  const wrapper = container.querySelector('.method-carousel-track-wrapper');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let isDragging = false;

  function updateCarousel(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    currentIndex = index;

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
      const isActive = i === currentIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    if (prevBtn) prevBtn.style.opacity = currentIndex === 0 ? '0.45' : '1';
    if (nextBtn) nextBtn.style.opacity = currentIndex === totalSlides - 1 ? '0.45' : '1';
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) updateCarousel(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentIndex < totalSlides - 1) updateCarousel(currentIndex + 1);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => updateCarousel(index));
  });

  // Suporte a Touch e Drag
  if (wrapper) {
    wrapper.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      if (diffX > 40 && currentIndex < totalSlides - 1) {
        updateCarousel(currentIndex + 1);
      } else if (diffX < -40 && currentIndex > 0) {
        updateCarousel(currentIndex - 1);
      }
    });

    wrapper.addEventListener('mousedown', (e) => {
      startX = e.clientX;
      isDragging = true;
    });

    window.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const diffX = startX - e.clientX;
      if (diffX > 50 && currentIndex < totalSlides - 1) {
        updateCarousel(currentIndex + 1);
      } else if (diffX < -50 && currentIndex > 0) {
        updateCarousel(currentIndex - 1);
      }
    });
  }

  updateCarousel(0);
}

/**
 * 3. Rolagem Suave com Offset para Âncoras
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
