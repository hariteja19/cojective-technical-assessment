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
  initProductComparison();
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
    comp.renderDealerModal(data.dealersList),
    comp.renderCompareDock(),
    comp.renderCompareModal()
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

          <!-- Interactive Engineering Sub-Tabs -->
          <div class="modal-spec-tabs" role="tablist" aria-label="Product Engineering Details">
            <button class="modal-tab-pill active" data-spec-tab="params" role="tab" aria-selected="true">Parameters</button>
            <button class="modal-tab-pill" data-spec-tab="wiring" role="tab" aria-selected="false">Wiring &amp; Pinout</button>
            <button class="modal-tab-pill" data-spec-tab="dimensions" role="tab" aria-selected="false">CAD &amp; Mounting</button>
            <button class="modal-tab-pill" data-spec-tab="standards" role="tab" aria-selected="false">Compliance</button>
          </div>

          <!-- Tab Pane 1: Parameters Table -->
          <div class="modal-tab-pane active" id="pane-params">
            <div class="modal-specs-table-wrap">
              <table class="modal-specs-table">
                <tbody>
                  ${specsRowsHtml}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Tab Pane 2: Wiring Schematic -->
          <div class="modal-tab-pane" id="pane-wiring" style="display: none;">
            <div class="schematic-diagram-card">
              <div class="schematic-header">
                <span class="schematic-badge">ELECTRICAL CONTACT SCHEMATIC</span>
                <span class="schematic-standard">IEC 60947-5-1</span>
              </div>
              <div class="schematic-graphic">
                <svg viewBox="0 0 380 120" class="schematic-svg" aria-label="Electrical wiring diagram">
                  <!-- Terminals 11-12 NC -->
                  <line x1="30" y1="36" x2="100" y2="36" stroke="#C5A059" stroke-width="2.5" />
                  <circle cx="100" cy="36" r="4.5" fill="#111111" stroke="#C5A059" stroke-width="2" />
                  <line x1="100" y1="32" x2="160" y2="18" stroke="#C5A059" stroke-width="2.5" />
                  <circle cx="160" cy="36" r="4.5" fill="#111111" stroke="#C5A059" stroke-width="2" />
                  <line x1="160" y1="36" x2="230" y2="36" stroke="#C5A059" stroke-width="2.5" />
                  <text x="25" y="24" fill="#888" font-size="11" font-family="monospace">11 (NC)</text>
                  <text x="235" y="24" fill="#888" font-size="11" font-family="monospace">12 (NC)</text>

                  <!-- Terminals 13-14 NO -->
                  <line x1="30" y1="84" x2="100" y2="84" stroke="#C5A059" stroke-width="2.5" />
                  <circle cx="100" cy="84" r="4.5" fill="#111111" stroke="#C5A059" stroke-width="2" />
                  <line x1="100" y1="84" x2="160" y2="66" stroke="#C5A059" stroke-width="2.5" />
                  <circle cx="160" cy="84" r="4.5" fill="#111111" stroke="#C5A059" stroke-width="2" />
                  <line x1="160" y1="84" x2="230" y2="84" stroke="#C5A059" stroke-width="2.5" />
                  <text x="25" y="104" fill="#888" font-size="11" font-family="monospace">13 (NO)</text>
                  <text x="235" y="104" fill="#888" font-size="11" font-family="monospace">14 (NO)</text>

                  <!-- Actuator Link -->
                  <line x1="130" y1="24" x2="130" y2="76" stroke="#C50100" stroke-width="2" stroke-dasharray="3,3" />
                  <polygon points="130,20 126,28 134,28" fill="#C50100" />
                  <text x="270" y="58" fill="#C50100" font-size="10.5" font-weight="700">POSITIVE OPENING</text>
                  <text x="270" y="74" fill="#777" font-size="10">Snap-Action Galv. Isolated</text>
                </svg>
              </div>
              <div class="schematic-notes">
                <div class="schematic-note-item">
                  <strong>Terminal Torque:</strong> 0.8 Nm (M3.5 captive clamping screws)
                </div>
                <div class="schematic-note-item">
                  <strong>Conductor Size:</strong> 0.5 mm² – 1.5 mm² solid or finely stranded copper
                </div>
              </div>
            </div>
          </div>

          <!-- Tab Pane 3: CAD & Mounting -->
          <div class="modal-tab-pane" id="pane-dimensions" style="display: none;">
            <div class="blueprint-card">
              <div class="blueprint-spec-grid">
                <div class="blueprint-item">
                  <span class="bp-label">Enclosure Standard:</span>
                  <strong class="bp-val">DIN EN 50041 / DIN EN 50047</strong>
                </div>
                <div class="blueprint-item">
                  <span class="bp-label">Mounting Centers:</span>
                  <strong class="bp-val">30 mm × 60 mm (M5 standard)</strong>
                </div>
                <div class="blueprint-item">
                  <span class="bp-label">Conduit Entry:</span>
                  <strong class="bp-val">M20 × 1.5 / Pg 13.5 Industrial</strong>
                </div>
                <div class="blueprint-item">
                  <span class="bp-label">Actuator Head:</span>
                  <strong class="bp-val">4 × 90° user-repositionable</strong>
                </div>
                <div class="blueprint-item">
                  <span class="bp-label">Operating Travel:</span>
                  <strong class="bp-val">Pre-travel: 1.8 mm | Total: 5.5 mm</strong>
                </div>
                <div class="blueprint-item">
                  <span class="bp-label">Actuation Force:</span>
                  <strong class="bp-val">Min. 15 N (Direct contact separation)</strong>
                </div>
              </div>
              <div class="blueprint-download-row">
                <span class="cad-ready-badge">CAD 2D / 3D STEP Models Available</span>
                <button class="btn-outline cad-request-btn" data-action="open-inquiry">REQUEST 3D STEP MODEL</button>
              </div>
            </div>
          </div>

          <!-- Tab Pane 4: Compliance & Approvals -->
          <div class="modal-tab-pane" id="pane-standards" style="display: none;">
            <div class="compliance-cards-grid">
              <div class="compliance-card">
                <div class="comp-icon">✓</div>
                <h5>IEC / EN 60947-5-1</h5>
                <p>Certified low-voltage electromechanical control circuit devices &amp; switching elements.</p>
              </div>
              <div class="compliance-card">
                <div class="comp-icon">✓</div>
                <h5>CE Machinery Directive</h5>
                <p>Full compliance with Machinery Directive 2006/42/EC &amp; Low Voltage 2014/35/EU.</p>
              </div>
              <div class="compliance-card">
                <div class="comp-icon">✓</div>
                <h5>RoHS 3 (2015/863/EU)</h5>
                <p>100% lead-free, environmentally sustainable materials and components.</p>
              </div>
              <div class="compliance-card">
                <div class="comp-icon">✓</div>
                <h5>ISO 9001:2015 Certified</h5>
                <p>Manufactured under audited precision engineering quality management systems.</p>
              </div>
            </div>
          </div>

          <div class="modal-product-actions">
            <button class="btn-primary modal-inquire-btn" id="modalInquireBtn" data-product-name="${product.title}">
              INQUIRE ABOUT THIS PRODUCT
            </button>
            <button class="btn-outline modal-print-btn" id="modalPrintBtn" title="Print or save PDF engineering datasheet">
              <svg viewBox="0 0 24 24" aria-hidden="true" style="width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:2;vertical-align:middle;margin-right:6px;"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg> PRINT DATASHEET
            </button>
            <button class="btn-outline modal-secondary-btn" data-close-modal="productModal">
              CLOSE SPECIFICATION
            </button>
          </div>
        </div>
      </div>
    `;

    // Hook print datasheet button
    const printBtn = document.getElementById('modalPrintBtn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // Hook engineering sub-tab switching
    const tabPills = modalBody.querySelectorAll('.modal-tab-pill');
    const tabPanes = modalBody.querySelectorAll('.modal-tab-pane');
    tabPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const target = pill.getAttribute('data-spec-tab');
        tabPills.forEach(p => {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-selected', 'true');

        tabPanes.forEach(pane => {
          pane.style.display = (pane.id === `pane-${target}`) ? 'block' : 'none';
        });
      });
    });

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
  const searchInput = document.getElementById('productSearchInput');
  const searchClear = document.getElementById('productSearchClear');
  const emptyState = document.getElementById('productsEmptyState');
  const emptyQueryEl = document.getElementById('productEmptyQuery');
  const resetBtn = document.getElementById('resetProductFilterBtn');

  if (cards.length === 0) return;

  let activeCategory = 'all';
  let searchQuery = '';

  function applyFilters() {
    const terms = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
    let visibleCount = 0;

    cards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const searchData = (card.getAttribute('data-search-terms') || '').toLowerCase();

      const matchesCategory = (activeCategory === 'all' || category === activeCategory);
      const matchesSearch = terms.length === 0 || terms.every(term => searchData.includes(term));

      if (matchesCategory && matchesSearch) {
        card.classList.remove('is-hidden');
        card.style.display = '';
        visibleCount++;
      } else {
        card.classList.add('is-hidden');
        card.style.display = 'none';
      }
    });

    if (countEl) {
      countEl.textContent = visibleCount;
    }

    if (searchClear) {
      searchClear.style.display = searchQuery ? 'flex' : 'none';
    }

    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.style.display = 'flex';
        if (emptyQueryEl) {
          emptyQueryEl.textContent = searchQuery || (activeCategory !== 'all' ? activeCategory : 'selected filters');
        }
      } else {
        emptyState.style.display = 'none';
      }
    }
  }

  // Category Tab Selection
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      activeCategory = tab.getAttribute('data-category-filter') || 'all';
      applyFilters();
    });
  });

  // Real-Time Keyword & Parameter Search
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      applyFilters();
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      searchQuery = '';
      applyFilters();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';

      document.querySelectorAll('.spec-quicktag-btn').forEach(b => b.classList.remove('active'));

      activeCategory = 'all';
      filterTabs.forEach(t => {
        const isAll = t.getAttribute('data-category-filter') === 'all';
        t.classList.toggle('active', isAll);
        t.setAttribute('aria-selected', isAll ? 'true' : 'false');
      });

      applyFilters();
    });
  }

  // Quick Facet Filter Chips
  const quicktagBtns = document.querySelectorAll('.spec-quicktag-btn');
  quicktagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.getAttribute('data-tag-filter');
      const isAlreadyActive = btn.classList.contains('active');

      quicktagBtns.forEach(b => b.classList.remove('active'));

      if (isAlreadyActive) {
        if (searchInput) searchInput.value = '';
        searchQuery = '';
      } else {
        btn.classList.add('active');
        if (searchInput) searchInput.value = tag;
        searchQuery = tag;
      }
      applyFilters();
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


/* =========================================================================
   16. Interactive Product Side-by-Side Comparison Matrix
   ========================================================================= */

function initProductComparison() {
  const dock = document.getElementById('compareDock');
  const countPill = document.getElementById('compareCountPill');
  const chipsContainer = document.getElementById('compareDockChips');
  const openBtn = document.getElementById('openCompareModalBtn');
  const clearBtn = document.getElementById('clearCompareBtn');
  const matrixWrap = document.getElementById('compareMatrixScrollWrap');

  if (!dock) return;

  const comparedIds = new Set();
  const products = (window.TEKNIC_DATA && window.TEKNIC_DATA.products && window.TEKNIC_DATA.products.items) || [];

  function updateDock() {
    const count = comparedIds.size;
    if (countPill) countPill.textContent = count;

    if (count > 0) {
      dock.classList.add('is-visible');
    } else {
      dock.classList.remove('is-visible');
    }

    if (chipsContainer) {
      const selectedProducts = products.filter(p => comparedIds.has(p.id));
      chipsContainer.innerHTML = selectedProducts.map(p => `
        <div class="compare-dock-chip">
          <img src="${p.image}" alt="${p.title}" class="compare-chip-thumb">
          <span class="compare-chip-title">${p.title}</span>
          <button type="button" class="compare-chip-remove" data-remove-compare="${p.id}" aria-label="Remove ${p.title}">&times;</button>
        </div>
      `).join('');
    }

    // Sync card checkboxes
    document.querySelectorAll('.compare-card-checkbox').forEach(cb => {
      const id = cb.getAttribute('data-product-id');
      cb.checked = comparedIds.has(id);
    });
  }

  // Card checkbox change event delegation
  document.addEventListener('change', (e) => {
    if (e.target && e.target.classList.contains('compare-card-checkbox')) {
      const id = e.target.getAttribute('data-product-id');
      if (e.target.checked) {
        if (comparedIds.size >= 3) {
          alert('You can compare a maximum of 3 products side-by-side.');
          e.target.checked = false;
          return;
        }
        comparedIds.add(id);
      } else {
        comparedIds.delete(id);
      }
      updateDock();
    }
  });

  // Remove chip click
  if (chipsContainer) {
    chipsContainer.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('[data-remove-compare]');
      if (removeBtn) {
        const id = removeBtn.getAttribute('data-remove-compare');
        comparedIds.delete(id);
        updateDock();
      }
    });
  }

  // Clear all
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      comparedIds.clear();
      updateDock();
    });
  }

  // Open comparison modal
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      if (comparedIds.size === 0) return;
      renderComparisonMatrix();
      openModal('compareModal');
    });
  }

  function renderComparisonMatrix() {
    if (!matrixWrap) return;
    const selected = products.filter(p => comparedIds.has(p.id));

    if (selected.length === 0) {
      closeModal('compareModal');
      return;
    }

    // Extract all unique spec keys across selected products
    const allSpecKeys = [];
    selected.forEach(p => {
      if (p.specs) {
        Object.keys(p.specs).forEach(k => {
          if (!allSpecKeys.includes(k)) allSpecKeys.push(k);
        });
      }
    });

    const headerHtml = `
      <tr>
        <th class="matrix-spec-name-col">Parameter / Specification</th>
        ${selected.map(p => `
          <th class="matrix-product-col">
            <div class="matrix-card-header">
              <button class="matrix-remove-item" data-matrix-remove="${p.id}" title="Remove from comparison">&times;</button>
              <div class="matrix-thumb-wrap">
                <img src="${p.image}" alt="${p.title}">
              </div>
              <span class="matrix-category-badge">${p.categoryLabel || 'Control Gear'}</span>
              <h4 class="matrix-prod-title">${p.title}</h4>
              <p class="matrix-prod-tagline">${p.tagline}</p>
            </div>
          </th>
        `).join('')}
      </tr>
    `;

    // Highlights row
    const highlightsRowHtml = `
      <tr class="matrix-row-highlight">
        <td class="matrix-spec-name">Key Engineering Highlights</td>
        ${selected.map(p => `
          <td>
            <div class="matrix-specs-pills">
              ${(p.quickSpecs || ['German Engineering', 'IP67', 'Long Life']).map(qs => `<span class="quick-spec-pill">${qs}</span>`).join('')}
            </div>
          </td>
        `).join('')}
      </tr>
    `;

    // Dynamic specs rows
    const specsRowsHtml = allSpecKeys.map(key => `
      <tr>
        <td class="matrix-spec-name">${key}</td>
        ${selected.map(p => `
          <td class="matrix-spec-val">${(p.specs && p.specs[key]) ? p.specs[key] : '<span class="matrix-na">—</span>'}</td>
        `).join('')}
      </tr>
    `).join('');

    // Action button row
    const actionRowHtml = `
      <tr class="matrix-row-actions">
        <td class="matrix-spec-name">Next Step</td>
        ${selected.map(p => `
          <td>
            <button class="btn-primary fairway-pill-btn matrix-inquire-btn" data-inquire-product="${p.title}">
              REQUEST QUOTE
            </button>
          </td>
        `).join('')}
      </tr>
    `;

    matrixWrap.innerHTML = `
      <table class="compare-matrix-table">
        <thead>
          ${headerHtml}
        </thead>
        <tbody>
          ${highlightsRowHtml}
          ${specsRowsHtml}
          ${actionRowHtml}
        </tbody>
      </table>
    `;

    // Hook matrix remove buttons
    matrixWrap.querySelectorAll('[data-matrix-remove]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-matrix-remove');
        comparedIds.delete(id);
        updateDock();
        renderComparisonMatrix();
      });
    });

    // Hook quote buttons
    matrixWrap.querySelectorAll('[data-inquire-product]').forEach(btn => {
      btn.addEventListener('click', () => {
        const title = btn.getAttribute('data-inquire-product');
        closeModal('compareModal');
        openModal('inquiryModal');

        const select = document.getElementById('inqProduct');
        if (select) {
          for (let i = 0; i < select.options.length; i++) {
            if (title.toLowerCase().includes(select.options[i].text.toLowerCase()) ||
                select.options[i].text.toLowerCase().includes(title.toLowerCase())) {
              select.selectedIndex = i;
              break;
            }
          }
        }
      });
    });
  }
}

