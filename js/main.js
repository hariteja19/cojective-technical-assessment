/**
 * TEKNIC EUCHNER — Main Application Controller
 * ──────────────────────────────────────────────────────────────────────────
 * Core application orchestrator.
 * 1. Dynamically mounts the UI into #app using data models & component renderers
 * 2. Manages interactive modal system (Product Quick-View, Inquiry Drawer, Dealer Directory)
 * 3. Manages real-time product category filtering
 * 4. Manages Pan-India dealer search and regional filtering
 * 5. Handles interactive consultation form validation and feedback
 * 6. Coordinates responsive mobile navigation drawer
 * 7. Drives all animations, 3D perspective tilt, parallax, stat counters, and observers
 */

document.addEventListener('DOMContentLoaded', () => {
  // Step 1: Dynamically render all page sections in JavaScript
  renderApp();

  // Step 2: Initialize UI/UX interactive features
  initModalSystem();
  initProductQuickView();
  initProductFiltering();
  initInquiryForm();
  initDealerSearch();
  initMobileNav();

  // Step 3: Initialize animations, micro-interactions, and observers
  initSmoothScroll();
  initStickyHeader();
  initScrollReveal();
  initStatCounter();
  initActiveNav();
  initScrollProgress();
  initBackToTop();
  initProductCardTilt();
  initHeroParallax();
});


/* =========================================================================
   0. Dynamic Application Mounting & Rendering
   ========================================================================= */

function renderApp() {
  const app = document.getElementById('app');
  if (!app) {
    console.error('Teknic Euchner: Root container #app not found.');
    return;
  }

  const data = window.TEKNIC_DATA;
  const comp = window.TEKNIC_COMPONENTS;

  if (!data || !comp) {
    console.error('Teknic Euchner: Required TEKNIC_DATA or TEKNIC_COMPONENTS not loaded.');
    return;
  }

  // Assemble full document tree + interactive modals & drawer
  const markup = [
    comp.renderHeader(data.header),
    '<main>',
    comp.renderHero(data.hero),
    comp.renderIntro(data.intro),
    comp.renderJourney(data.journey),
    comp.renderProducts(data.products),
    comp.renderWhy(data.why),
    comp.renderApplications(data.applications),
    comp.renderQuality(data.quality),
    comp.renderDealer(data.dealer),
    comp.renderSolution(data.solution),
    comp.renderBrandTypography(data.brand),
    '</main>',
    comp.renderFooter(data.footer),
    comp.renderBackToTop(),
    comp.renderMobileDrawer(data.header),
    comp.renderProductModal(),
    comp.renderInquiryModal(),
    comp.renderDealerModal(data.dealersList)
  ].join('');

  app.innerHTML = markup;
}


/* =========================================================================
   1. Modal System (Open / Close / Focus Management)
   ========================================================================= */

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  // Focus trap / initial focus on first focusable element
  const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable) focusable.focus();
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');

  // Remove body lock only if no other modal is open
  if (!document.querySelector('.app-modal.is-open')) {
    document.body.classList.remove('modal-open');
  }
}

function initModalSystem() {
  // Global close trigger delegation
  document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('[data-close-modal]');
    if (closeBtn) {
      const modalId = closeBtn.getAttribute('data-close-modal');
      closeModal(modalId);
    }

    // Inquiry trigger delegation
    const inqTrigger = e.target.closest('[data-action="open-inquiry"]');
    if (inqTrigger) {
      e.preventDefault();
      openModal('inquiryModal');
    }

    // Dealer directory trigger delegation
    const dealerTrigger = e.target.closest('[data-action="open-dealers"]');
    if (dealerTrigger) {
      e.preventDefault();
      openModal('dealersModal');
    }
  });

  // ESC key closes any open modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModalEl = document.querySelector('.app-modal.is-open');
      if (openModalEl) {
        closeModal(openModalEl.id);
      }
      const mobileDrawer = document.getElementById('mobileNavDrawer');
      if (mobileDrawer && mobileDrawer.classList.contains('is-open')) {
        toggleMobileNav(false);
      }
    }
  });
}


/* =========================================================================
   2. Product Technical Specification Quick-View
   ========================================================================= */

function initProductQuickView() {
  const modalBody = document.getElementById('modalProductBody');
  if (!modalBody) return;

  // Keyboard accessibility for product cards
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement) {
      if (document.activeElement.classList.contains('fairway-product-card')) {
        e.preventDefault();
        document.activeElement.click();
      }
    }
  });

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-action="open-product-modal"]');
    if (!trigger) return;

    e.preventDefault();
    const productId = trigger.getAttribute('data-product-id');
    const product = window.TEKNIC_DATA.products.items.find(p => p.id === productId);

    if (!product) return;

    // Generate specs rows HTML
    const specsRowsHtml = Object.entries(product.specs || {}).map(([key, val]) => `
      <tr>
        <th scope="row">${key}</th>
        <td>${val}</td>
      </tr>
    `).join('');

    const quickSpecsHtml = (product.quickSpecs && product.quickSpecs.length > 0)
      ? product.quickSpecs.map(s => `<div class="quick-spec-pill">${s}</div>`).join('')
      : `
        <div class="quick-spec-pill">German Engineering</div>
        <div class="quick-spec-pill">Made for Indian Industry</div>
        <div class="quick-spec-pill">High Reliability</div>
      `;

    modalBody.innerHTML = `
      <div class="modal-product-layout">
        <div class="modal-product-visual">
          <div class="modal-product-badge">${product.categoryLabel || 'Industrial Control Gear'}</div>
          <div class="modal-product-img-wrap">
            <img src="${product.image}" alt="${product.imageAlt}">
          </div>
          <div class="modal-product-quick-specs">
            ${quickSpecsHtml}
          </div>
        </div>

        <div class="modal-product-details">
          <span class="section-eyebrow">TECHNICAL SPECIFICATIONS</span>
          <h2 class="modal-product-title" id="modalProductTitle">${product.title}</h2>
          <p class="modal-product-tagline">${product.tagline}</p>
          <p class="modal-product-desc">${product.description}</p>

          <div class="modal-specs-table-wrap">
            <h4 class="specs-table-title">Engineering Parameters</h4>
            <table class="modal-specs-table">
              <tbody>
                ${specsRowsHtml}
              </tbody>
            </table>
          </div>

          <div class="modal-product-actions">
            <button class="btn-primary modal-inquire-btn" id="modalInquireBtn" data-product-name="${product.title}">
              INQUIRE ABOUT THIS PRODUCT
            </button>
            <button class="btn-outline modal-secondary-btn" data-close-modal="productModal">
              CLOSE SPECIFICATION
            </button>
          </div>
        </div>
      </div>
    `;

    // Hook product-specific inquiry button
    const inqBtn = document.getElementById('modalInquireBtn');
    if (inqBtn) {
      inqBtn.addEventListener('click', () => {
        closeModal('productModal');
        openModal('inquiryModal');

        // Pre-select the product in inquiry dropdown
        const select = document.getElementById('inqProduct');
        if (select) {
          for (let i = 0; i < select.options.length; i++) {
            if (product.title.toLowerCase().includes(select.options[i].text.toLowerCase()) ||
                select.options[i].text.toLowerCase().includes(product.title.toLowerCase())) {
              select.selectedIndex = i;
              break;
            }
          }
        }
      });
    }

    openModal('productModal');
  });
}


/* =========================================================================
   3. Real-Time Product Category Filtering
   ========================================================================= */

function initProductFiltering() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.product-card');
  const countEl = document.getElementById('productFilterCount');

  if (filterTabs.length === 0 || cards.length === 0) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Set active tab state
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filterValue = tab.getAttribute('data-category-filter');
      let visibleCount = 0;

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('is-hidden');
          card.style.display = '';
          visibleCount++;
        } else {
          card.classList.add('is-hidden');
          // Wait for transition before hiding completely
          setTimeout(() => {
            if (card.classList.contains('is-hidden')) {
              card.style.display = 'none';
            }
          }, 250);
        }
      });

      if (countEl) {
        countEl.textContent = visibleCount;
      }
    });
  });
}


/* =========================================================================
   4. Consultation / Inquiry Form Validation & Submission
   ========================================================================= */

function initInquiryForm() {
  const form = document.getElementById('inquiryForm');
  const feedback = document.getElementById('inquiryFeedback');
  const submitBtn = document.getElementById('inquirySubmitBtn');
  if (!form || !feedback || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.fullName.value.trim();
    const company = form.company.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const product = form.productInterest.value;

    // Basic Validation
    if (!name || !company || !email || !phone) {
      feedback.className = 'form-feedback is-error';
      feedback.textContent = 'Please complete all required fields marked with an asterisk (*).';
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      feedback.className = 'form-feedback is-error';
      feedback.textContent = 'Please provide a valid work email address.';
      return;
    }

    // Simulate sending state
    submitBtn.classList.add('is-submitting');
    submitBtn.disabled = true;
    feedback.className = 'form-feedback';
    feedback.textContent = '';

    setTimeout(() => {
      submitBtn.classList.remove('is-submitting');
      submitBtn.disabled = false;
      feedback.className = 'form-feedback is-success';
      feedback.innerHTML = `
        <strong>Thank you, ${name}!</strong><br>
        Your consultation request for <em>${product}</em> has been logged. Our engineering specialist will contact you at <strong>${email}</strong> within 1 business day.
      `;
      form.reset();
    }, 900);
  });
}


/* =========================================================================
   5. Pan-India Dealer Directory Live Search & Filter
   ========================================================================= */

function initDealerSearch() {
  const searchInput = document.getElementById('dealerSearchInput');
  const regionPills = document.querySelectorAll('.region-pill');
  const dealerCards = document.querySelectorAll('.dealer-directory-card');
  const emptyState = document.getElementById('dealerEmptyState');
  const emptyQuery = document.getElementById('dealerEmptyQuery');

  if (dealerCards.length === 0) return;

  let activeRegion = 'all';
  let searchTerm = '';

  function filterDealers() {
    let visibleCount = 0;
    dealerCards.forEach(card => {
      const cardRegion = card.getAttribute('data-region');
      const textContent = card.textContent.toLowerCase();

      const matchesRegion = (activeRegion === 'all' || cardRegion === activeRegion);
      const matchesSearch = (!searchTerm || textContent.includes(searchTerm));

      if (matchesRegion && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.style.display = 'flex';
        if (emptyQuery) {
          emptyQuery.textContent = searchTerm ? `"${searchTerm}"` : `${activeRegion.toUpperCase()} region`;
        }
      } else {
        emptyState.style.display = 'none';
      }
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      filterDealers();
    });
  }

  regionPills.forEach(pill => {
    pill.addEventListener('click', () => {
      regionPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeRegion = pill.getAttribute('data-dealer-region');
      filterDealers();
    });
  });

  // Handle direct inquiry from a specific dealer card
  document.addEventListener('click', (e) => {
    const dealerBtn = e.target.closest('[data-action="inquire-dealer"]');
    if (!dealerBtn) return;
    e.preventDefault();

    const dealerName = dealerBtn.getAttribute('data-dealer-name') || '';
    const dealerCity = dealerBtn.getAttribute('data-dealer-city') || '';

    closeModal('dealersModal');
    openModal('inquiryModal');

    const messageField = document.getElementById('inqMessage');
    if (messageField) {
      messageField.value = `Inquiry for immediate local stock and dispatch via authorized partner: ${dealerName} (${dealerCity}). Please verify current on-shelf inventory and technical specifications.`;
      messageField.focus();
    }
  });
}


/* =========================================================================
   6. Responsive Mobile Navigation Drawer
   ========================================================================= */

function toggleMobileNav(open) {
  const drawer = document.getElementById('mobileNavDrawer');
  const toggleBtn = document.getElementById('mobileNavToggle');
  if (!drawer) return;

  const isOpen = typeof open === 'boolean' ? open : !drawer.classList.contains('is-open');

  if (isOpen) {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('drawer-open');
  } else {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('drawer-open');
  }
}

function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const closeBtn = document.getElementById('mobileNavClose');
  const backdrop = document.getElementById('mobileNavBackdrop');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-link');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => toggleMobileNav());
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => toggleMobileNav(false));
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => toggleMobileNav(false));
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileNav(false));
  });
}


/* =========================================================================
   7. Smooth Scrolling
   ========================================================================= */

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


/* =========================================================================
   8. Sticky Header — Shadow & Style Change on Scroll
   ========================================================================= */

function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const SCROLL_THRESHOLD = 50;

  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}


/* =========================================================================
   9. Directional Scroll-Triggered Reveal Animations
   ========================================================================= */

function initScrollReveal() {
  const fadeLeftSelectors = ['.brand-text-teknic'];
  const fadeRightSelectors = ['.brand-text-euchner', '.why-feature-item'];
  const scaleInSelectors = [
    '.intro-col-sensors',
    '.intro-col-automation',
    '.why-media',
    '.dealer-right-col',
    '.solution-media'
  ];

  const standardFadeUpSelectors = [
    '.section-eyebrow',
    '.intro-title',
    '.intro-paragraph',
    '.intro-cta-btn',
    '.journey-title',
    '.products-header-title',
    '.products-header-desc',
    '.products-header-btn',
    '.product-filter-bar',
    '.product-card',
    '.why-heading',
    '.why-desc',
    '.applications-heading',
    '.applications-header-desc',
    '.application-card',
    '.quality-title',
    '.quality-manifesto',
    '.quality-paragraph',
    '.quality-cta-btn',
    '.dealer-title',
    '.dealer-desc',
    '.dealer-cta-btn',
    '.solution-title',
    '.solution-desc',
    '.solution-actions',
    '.footer-col-pitch',
    '.footer-col-links',
    '.footer-col-contact'
  ];

  const allSelectors = [
    ...fadeLeftSelectors,
    ...fadeRightSelectors,
    ...scaleInSelectors,
    ...standardFadeUpSelectors
  ];

  const elements = document.querySelectorAll(allSelectors.join(', '));
  if (elements.length === 0) return;

  const sectionDelays = new Map();

  elements.forEach(el => {
    el.classList.add('reveal-hidden');

    if (fadeLeftSelectors.some(sel => el.matches(sel))) {
      el.classList.add('reveal-fade-left');
    } else if (fadeRightSelectors.some(sel => el.matches(sel))) {
      el.classList.add('reveal-fade-right');
    } else if (scaleInSelectors.some(sel => el.matches(sel))) {
      el.classList.add('reveal-scale-in');
    } else {
      el.classList.add('reveal-fade-up');
    }

    const section = el.closest('section') || el.closest('footer') || el.closest('.site-wrapper');
    const sectionKey = section ? (section.id || section.className) : 'root';

    if (!sectionDelays.has(sectionKey)) {
      sectionDelays.set(sectionKey, 0);
    }
    const index = sectionDelays.get(sectionKey);

    let delay = 0;
    if (el.classList.contains('product-card')) {
      delay = (index % 2) * 0.12;
    } else if (el.classList.contains('application-card')) {
      delay = (index % 3) * 0.1;
    } else if (el.classList.contains('why-feature-item')) {
      delay = (index % 5) * 0.08;
    } else {
      delay = Math.min(index * 0.07, 0.3);
    }

    el.style.setProperty('--reveal-delay', `${delay.toFixed(2)}s`);
    sectionDelays.set(sectionKey, index + 1);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  elements.forEach(el => observer.observe(el));
}


/* =========================================================================
   10. Stat Counter Animation
   ========================================================================= */

function initStatCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  const statsData = [];
  statNumbers.forEach(el => {
    if (el.classList.contains('stat-number-title')) return;

    const text = el.textContent.trim();
    const match = text.match(/^(\d+)(.*)$/);
    if (match) {
      statsData.push({
        element: el,
        target: parseInt(match[1], 10),
        suffix: match[2],
        started: false
      });
    }
  });

  if (statsData.length === 0) return;

  function animateCount(el, target, suffix, duration) {
    const start = target > 100 ? target - 40 : 0;
    const range = target - start;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + range * eased);

      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.classList.add('count-finished');
      }
    }

    requestAnimationFrame(step);
  }

  const statsCard = document.querySelector('.stats-frosted-card');
  if (!statsCard) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statsData.forEach((data, i) => {
          if (!data.started) {
            data.started = true;
            setTimeout(() => {
              animateCount(data.element, data.target, data.suffix, 1600);
            }, i * 180);
          }
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.25
  });

  observer.observe(statsCard);
}


/* =========================================================================
   11. Active Navigation Link Highlighting
   ========================================================================= */

function initActiveNav() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], .nav-target[id]');
  if (navLinks.length === 0 || sections.length === 0) return;

  const linkMap = new Map();
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      linkMap.set(href.substring(1), link);
    }
  });

  let activeId = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        if (id !== activeId) {
          activeId = id;
          navLinks.forEach(link => link.classList.remove('nav-link--active'));
          const matchedLink = linkMap.get(id);
          if (matchedLink) {
            matchedLink.classList.add('nav-link--active');
          }
        }
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));
}


/* =========================================================================
   12. Scroll Progress Indicator Bar
   ========================================================================= */

function initScrollProgress() {
  let progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBar.setAttribute('aria-hidden', 'true');
    document.body.prepend(progressBar);
  }

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (docHeight <= 0) {
      progressBar.style.width = '0%';
      return;
    }

    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  }

  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
}


/* =========================================================================
   13. Back-to-Top Floating Button
   ========================================================================= */

function initBackToTop() {
  const backBtn = document.getElementById('backToTop');
  if (!backBtn) return;

  function onScroll() {
    if (window.scrollY > 400) {
      backBtn.classList.add('is-visible');
    } else {
      backBtn.classList.remove('is-visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


/* =========================================================================
   14. Interactive 3D Tilt Effect on Product Cards
   ========================================================================= */

function initProductCardTilt() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.08s ease-out, box-shadow 0.35s ease, border-color 0.35s ease';
    });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotX = ((centerY - y) / centerY) * 4.5;
      const rotY = ((x - centerX) / centerX) * 4.5;

      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease';
      card.style.transform = '';
    });
  });
}


/* =========================================================================
   15. Hero Spatial Depth Parallax on Mousemove
   ========================================================================= */

function initHeroParallax() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const hero = document.getElementById('hero');
  const heroMedia = document.querySelector('.fairway-hero-bg img, .hero-media img');
  const trustCard = document.querySelector('.fairway-floating-trust-card');
  const discoveryCard = document.querySelector('.fairway-floating-discovery-card');
  if (!hero) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;

    if (heroMedia) {
      const moveX = xRatio * 15;
      const moveY = yRatio * 15;
      heroMedia.style.transform = `scale(1.04) translate(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px)`;
    }

    if (trustCard) {
      const tX = xRatio * -12;
      const tY = yRatio * -12;
      trustCard.style.transform = `translate(${tX.toFixed(1)}px, ${tY.toFixed(1)}px)`;
    }

    if (discoveryCard) {
      const dX = xRatio * -16;
      const dY = yRatio * -16;
      discoveryCard.style.transform = `translate(${dX.toFixed(1)}px, ${dY.toFixed(1)}px)`;
    }
  });

  hero.addEventListener('mouseleave', () => {
    if (heroMedia) heroMedia.style.transform = '';
    if (trustCard) trustCard.style.transform = '';
    if (discoveryCard) discoveryCard.style.transform = '';
  });
}
