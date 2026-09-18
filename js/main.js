/**
 * TEKNIC EUCHNER - Main JavaScript
 * Minimal, clean vanilla JavaScript for essential UX behaviors
 */

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
});

/**
 * Enables smooth scrolling for on-page navigation anchors
 */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}
