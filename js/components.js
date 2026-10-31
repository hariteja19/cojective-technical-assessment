/**
 * TEKNIC EUCHNER — UI Components Engine (Fairway Luxury Editorial UI/UX)
 * ──────────────────────────────────────────────────────────────────────────
 * Functional component renderers that build the complete semantic DOM,
 * inspired by the Fairway luxury editorial design language:
 * - Floating pill navigation bar with glassmorphic backdrop
 * - Cinematic luxury hero with oversized serif accent typography
 * - Floating community trust cards and discovery thumbnail cards
 * - Circular arrow action buttons and pill category filters
 * - Rounded luxury cards with soft multi-layered box shadows
 * - Interactive modals (Product Quick-View, Consultation Drawer, Dealer Directory)
 */

window.TEKNIC_COMPONENTS = {

  /**
   * 1. Header / Navigation Component (Fairway Floating Pill Navbar)
   */
  renderHeader(data) {
    const navItemsHtml = data.navLinks.map(link => `
      <li>
        <a href="${link.href}" class="nav-link">
          ${link.label}
          ${link.hasDropdown ? `
            <svg class="dropdown-icon" viewBox="0 0 10 6" aria-hidden="true">
              <path d="M1 1L5 5L9 1" />
            </svg>
          ` : ''}
        </a>
      </li>
    `).join('');

    return `
      <header class="site-header fairway-pill-header" id="header">
        <div class="header-container">
          <a href="${data.logo.href}" class="header-logo" aria-label="${data.logo.alt}">
            <img src="${data.logo.src}" alt="${data.logo.alt}">
          </a>
          <nav class="main-nav" aria-label="Main Navigation">
            <ul class="nav-list">
              ${navItemsHtml}
            </ul>
          </nav>
          <div class="header-right-actions">
            <a href="${data.cta.href}" class="btn-primary header-cta-btn fairway-pill-btn" data-action="open-inquiry">${data.cta.label}</a>
            <button class="mobile-nav-toggle" id="mobileNavToggle" aria-label="Toggle navigation menu" aria-expanded="false">
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
            </button>
          </div>
        </div>
      </header>
    `;
  },

  /**
   * 2. Hero Section Component (Fairway Cinematic Framed Hero with Floating UI Cards)
   */
  renderHero(data) {
    const badgeHtml = data.badge ? `
      <div class="fairway-hero-top-pill">
        ${data.badge.pulse ? '<span class="pill-dot"></span>' : ''}
        <span>${data.badge.text}</span>
      </div>
    ` : '';

    const stampHtml = data.stamp ? `
      <div class="fairway-hero-vertical-stamp" aria-hidden="true">
        <span class="stamp-time">${data.stamp.label}</span>
        <span class="stamp-divider">|</span>
        <span class="stamp-date">${data.stamp.value}</span>
      </div>
    ` : '';

    const trustCardHtml = data.trustCard ? `
      <div class="fairway-floating-trust-card" data-action="${data.trustCard.action || 'open-inquiry'}" title="Click to talk with our engineering specialists">
        <div class="trust-card-avatars">
          ${(data.trustCard.avatars || []).map(a => `
            <span class="avatar-circle"><img src="${a.src}" alt="${a.alt}"></span>
          `).join('')}
          <span class="avatar-badge">${data.trustCard.badge}</span>
        </div>
        <div class="trust-card-copy">
          <div class="trust-card-title">${data.trustCard.title}</div>
          <div class="trust-card-subtitle">${data.trustCard.subtitle}</div>
        </div>
        <div class="trust-card-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    ` : '';

    const discoveryCardHtml = data.discoveryCard ? `
      <div class="fairway-floating-discovery-card" data-action="${data.discoveryCard.action || 'open-dealers'}" title="Click to view Pan-India dealer network">
        <div class="discovery-card-thumb">
          <img src="${data.discoveryCard.thumb}" alt="${data.discoveryCard.alt || ''}">
        </div>
        <div class="discovery-card-info">
          <h4 class="discovery-card-title">${data.discoveryCard.title}</h4>
          <p class="discovery-card-desc">${data.discoveryCard.desc}</p>
        </div>
        <div class="discovery-card-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    ` : '';

    const primaryCta = data.primaryCta || data.cta || { label: 'EXPLORE OUR PRODUCTS', href: '#products' };
    const secondaryCta = data.secondaryCta || { label: 'TALK TO AN EXPERT', action: 'open-inquiry' };

    return `
      <section class="hero-section fairway-hero-section" id="hero" aria-labelledby="hero-heading">
        <div class="fairway-hero-container">
          
          <!-- Cinematic Background Image with Luxury Vignette -->
          <div class="fairway-hero-bg">
            <img src="${data.media.src}" alt="${data.media.alt}">
            <div class="fairway-hero-overlay" aria-hidden="true"></div>
          </div>

          <!-- Top Floating Pill Badge (Fairway style) -->
          ${badgeHtml}

          <!-- Left Vertical Stamp (Fairway style) -->
          ${stampHtml}

          <!-- Main Hero Content -->
          <div class="fairway-hero-main-content">
            <h1 class="hero-title fairway-hero-title" id="hero-heading">
              ${data.titleHtml || data.heading}
            </h1>
            <p class="hero-subtitle fairway-hero-subtitle">
              ${data.subtitle}
            </p>
            <div class="fairway-hero-actions">
              <a href="${primaryCta.href || '#products'}" class="btn-primary fairway-pill-btn hero-cta-btn">
                ${primaryCta.label}
              </a>
              <button class="btn-outline fairway-pill-btn-outline" data-action="${secondaryCta.action || 'open-inquiry'}">
                ${secondaryCta.label}
              </button>
            </div>
          </div>

          <!-- Floating Trust / Experience Card -->
          ${trustCardHtml}

          <!-- Floating Discovery Card -->
          ${discoveryCardHtml}

          <!-- Circular Scroll Pill Button -->
          <a href="${data.scrollTarget || '#about'}" class="fairway-scroll-pill-btn" aria-label="Scroll down to introduction">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
          </a>

        </div>
      </section>
    `;
  },

  /**
   * 3. Introduction Section Component
   */
  renderIntro(data) {
    const paragraphsHtml = data.paragraphs.map(p => `
      <p class="intro-paragraph">${p}</p>
    `).join('');

    return `
      <section class="intro-section" id="about" aria-labelledby="intro-heading">
        <div class="intro-header-grid">
          <div class="intro-eyebrow-col">
            <span class="section-eyebrow">${data.eyebrow}</span>
          </div>
          <div class="intro-headline-col">
            <h2 class="intro-title fairway-intro-title" id="intro-heading">
              ${data.titleMain} <span class="text-red fairway-serif-italic">${data.titleAccent}</span>
            </h2>
          </div>
        </div>
        <div class="intro-content-grid">
          <div class="intro-col-sensors fairway-rounded-media">
            <img src="${data.sensorsImage.src}" alt="${data.sensorsImage.alt}">
          </div>
          <div class="intro-col-automation fairway-rounded-media">
            <img src="${data.automationImage.src}" alt="${data.automationImage.alt}">
          </div>
          <div class="intro-col-copy">
            ${paragraphsHtml}
            <a href="${data.cta.href}" class="btn-primary fairway-pill-btn intro-cta-btn">${data.cta.label}</a>
          </div>
        </div>
      </section>
    `;
  },

  /**
   * 4. Journey & Stats Section Component (Fairway Frosted Glass Box)
   */
  renderJourney(data) {
    const statsHtml = data.stats.map(stat => `
      <div class="stat-column">
        <div class="stat-icon fairway-stat-icon">
          <img src="${stat.icon}" alt="${stat.iconAlt}">
        </div>
        <div class="stat-number ${stat.isCountable ? '' : 'stat-number-title'}">${stat.number}</div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `).join('');

    return `
      <section class="journey-section fairway-journey-section" id="journey" aria-labelledby="journey-heading">
        <div class="journey-overlay" aria-hidden="true"></div>
        <div class="journey-container">
          <div class="journey-header">
            <span class="section-eyebrow eyebrow-white journey-eyebrow">${data.eyebrow}</span>
            <h2 class="journey-title fairway-journey-title" id="journey-heading">${data.titleHtml || data.title}</h2>
          </div>
          <div class="stats-frosted-card fairway-frosted-card">
            ${statsHtml}
          </div>
        </div>
      </section>
    `;
  },

  /**
   * 5. Products Showcase Section Component with Fairway Pill Filter Tabs & Circular Arrow Buttons
   */
  renderProducts(data) {
    const descriptionsHtml = data.descriptions.map(desc => `
      <p class="products-header-desc">${desc}</p>
    `).join('');

    const filterTabsHtml = data.categories.map((c, i) => `
      <button class="filter-tab fairway-filter-pill ${i === 0 ? 'active' : ''}" data-category-filter="${c.id}" role="tab" aria-selected="${i === 0}">
        ${c.label}
      </button>
    `).join('');

    const cardsHtml = data.items.map(item => {
      const specsValues = Object.entries(item.specs || {}).map(([k, v]) => `${k} ${v}`).join(' ');
      const quickSpecsStr = (item.quickSpecs || []).join(' ');
      const searchTerms = `${item.title} ${item.tagline} ${item.description} ${item.categoryLabel} ${item.category} ${quickSpecsStr} ${specsValues}`.toLowerCase();

      return `
        <article class="product-card fairway-product-card" data-product-id="${item.id}" data-category="${item.category}" data-search-terms="${searchTerms.replace(/"/g, '&quot;')}" data-action="open-product-modal" role="button" tabindex="0" aria-label="View specifications for ${item.title}">
          <div class="product-card-top">
            <span class="fairway-card-badge">${item.categoryLabel || 'PRECISION CONTROL'}</span>
            <label class="compare-toggle-label" onclick="event.stopPropagation()" title="Select to compare specs side-by-side">
              <input type="checkbox" class="compare-card-checkbox" data-product-id="${item.id}" aria-label="Compare ${item.title}">
              <span class="compare-checkbox-pill">
                <svg viewBox="0 0 24 24" class="compare-icon-add" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <svg viewBox="0 0 24 24" class="compare-icon-check" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                <span class="compare-text">Compare</span>
              </span>
            </label>
          </div>
          
          <div class="product-card-image-wrap fairway-product-visual" data-action="open-product-modal" data-product-id="${item.id}" title="Click to view full technical specifications">
            <img src="${item.image}" alt="${item.imageAlt}">
          </div>

          <div class="product-card-bottom fairway-card-bottom">
            <div class="fairway-card-info">
              <h3 class="product-card-title">${item.title}</h3>
              <p class="product-card-desc">${item.description}</p>
            </div>
            <button class="btn-circle-arrow" data-action="open-product-modal" data-product-id="${item.id}" aria-label="Explore and view technical specs for ${item.title}" title="View Technical Specs">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </article>
      `;
    }).join('');

    return `
      <section class="products-section fairway-products-section" id="products" aria-labelledby="products-heading">
        <div class="products-header-container">
          <div class="products-header-left">
            <span class="section-eyebrow">${data.eyebrow}</span>
            <h2 class="products-header-title fairway-section-title" id="products-heading">${data.title}</h2>
          </div>
          <div class="products-header-right">
            ${descriptionsHtml}
            <a href="${data.headerCta.href}" class="btn-primary fairway-pill-btn products-header-btn">${data.headerCta.label}</a>
          </div>
        </div>

        <!-- Fairway Pill Filter & Real-Time Parameter Search Bar -->
        <div class="product-filter-bar fairway-filter-bar">
          <div class="filter-controls-left">
            <div class="filter-tabs fairway-pill-tabs" role="tablist" aria-label="Filter products by industrial category">
              ${filterTabsHtml}
            </div>

            <div class="product-search-input-wrap">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input type="text" id="productSearchInput" placeholder="Search spec (e.g. IP68, M12, 230V, snap)..." aria-label="Search products by specification">
              <button class="search-clear-btn" id="productSearchClear" aria-label="Clear search" style="display: none;">&times;</button>
            </div>
          </div>

          <div class="product-filter-status fairway-filter-status" id="productFilterStatus">
            Showing <strong id="productFilterCount">${data.items.length}</strong> Precision Products
          </div>
        </div>

        <!-- Engineering Quick-Parameter Filter Chips -->
        <div class="product-spec-quicktags" role="group" aria-label="Quick filter by engineering parameters">
          <span class="quicktags-label">Quick Facets:</span>
          <button class="spec-quicktag-btn" data-tag-filter="IP67">IP67 Waterproof</button>
          <button class="spec-quicktag-btn" data-tag-filter="IP68">IP68 Submersible</button>
          <button class="spec-quicktag-btn" data-tag-filter="24V">24V DC</button>
          <button class="spec-quicktag-btn" data-tag-filter="230V">230V AC</button>
          <button class="spec-quicktag-btn" data-tag-filter="Snap">Snap-Action</button>
          <button class="spec-quicktag-btn" data-tag-filter="M12">M12 Standard</button>
        </div>

        <div class="products-grid fairway-products-grid" id="productsGrid">
          ${cardsHtml}

          <!-- Empty State -->
          <div class="products-empty-state" id="productsEmptyState" style="display: none;">
            <div class="empty-state-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <h4 class="empty-state-title">No matching control gear found</h4>
            <p class="empty-state-desc">We couldn't find any products matching "<strong id="productEmptyQuery"></strong>". Our engineering specialists custom manufacture gear to your exact parameters.</p>
            <div class="empty-state-actions">
              <button class="btn-primary fairway-pill-btn" id="resetProductFilterBtn">CLEAR SEARCH</button>
              <button class="btn-outline fairway-pill-btn-outline" data-action="open-inquiry">REQUEST CUSTOM SPEC</button>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  /**
   * 6. Why Teknic Euchner Component
   */
  renderWhy(data) {
    const featuresHtml = data.features.map(f => `
      <div class="why-feature-item fairway-why-item">
        <h3 class="why-item-title">${f.title}</h3>
        <p class="why-item-desc">${f.description}</p>
      </div>
    `).join('');

    return `
      <section class="why-section fairway-why-section" id="why" aria-labelledby="why-heading">
        <div class="why-container">
          <div class="why-left-col">
            <span class="section-eyebrow why-eyebrow">${data.eyebrow}</span>
            <h2 class="why-heading fairway-section-title" id="why-heading">${data.headingHtml || data.heading}</h2>
            <p class="why-desc">${data.description}</p>
            <div class="why-media fairway-rounded-media">
              <img src="${data.media.src}" alt="${data.media.alt}">
            </div>
          </div>
          <div class="why-right-col">
            ${featuresHtml}
          </div>
        </div>
      </section>
    `;
  },

  /**
   * 7. Applications Component
   */
  renderApplications(data) {
    const cardsHtml = data.items.map(app => `
      <article class="application-card fairway-app-card">
        <div class="application-card-media fairway-app-media">
          <img src="${app.image}" alt="${app.imageAlt}">
          <div class="fairway-app-overlay" aria-hidden="true"></div>
        </div>
        <div class="application-card-content">
          <h3 class="application-card-title">${app.title}</h3>
          <p class="application-card-desc">${app.description}</p>
        </div>
      </article>
    `).join('');

    return `
      <section class="applications-section fairway-applications-section" id="applications" aria-labelledby="applications-heading">
        <div class="applications-header">
          <div class="applications-header-left">
            <span class="section-eyebrow applications-eyebrow">${data.eyebrow}</span>
            <h2 class="applications-heading fairway-section-title" id="applications-heading">${data.heading}</h2>
          </div>
          <div class="applications-header-right">
            <p class="applications-header-desc">${data.description}</p>
          </div>
        </div>
        <div class="applications-grid fairway-app-grid">
          ${cardsHtml}
        </div>
      </section>
    `;
  },

  /**
   * 8. Quality Section Component
   */
  renderQuality(data) {
    const manifestoHtml = data.manifesto.join('<br>');
    return `
      <section class="quality-section fairway-quality-section" id="quality" aria-labelledby="quality-heading">
        <div class="quality-bg-media" aria-hidden="true">
          <img src="${data.bgImage.src}" alt="${data.bgImage.alt}">
        </div>
        <div class="quality-container">
          <div class="quality-left-col">
            <h2 class="quality-title fairway-quality-title" id="quality-heading">${data.titleHtml || data.title}</h2>
            <div class="quality-manifesto fairway-quality-manifesto">
              ${manifestoHtml}
            </div>
          </div>
          <div class="quality-right-col">
            <p class="quality-paragraph">${data.paragraphs[0]}</p>
            <div class="quality-right-bottom">
              <p class="quality-paragraph">${data.paragraphs[1]}</p>
              <a href="${data.cta.href}" class="btn-primary fairway-pill-btn quality-cta-btn">${data.cta.label}</a>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  /**
   * 9. Dealer Section Component
   */
  renderDealer(data) {
    return `
      <div id="news" class="nav-target"></div>
      <section class="dealer-section fairway-dealer-section" id="dealers" aria-labelledby="dealer-heading">
        <div class="dealer-container">
          <div class="dealer-left-col">
            <span class="section-eyebrow">DISTRIBUTION PARTNERS</span>
            <h2 class="dealer-title fairway-section-title" id="dealer-heading">${data.titleHtml || data.title}</h2>
            <p class="dealer-desc">${data.description}</p>
            
            <div class="dealer-features-pills">
              <span class="dealer-feat-pill"><span class="feat-dot"></span> 12+ Pan-India Hubs</span>
              <span class="dealer-feat-pill"><span class="feat-dot"></span> 24–48hr Dispatch</span>
              <span class="dealer-feat-pill"><span class="feat-dot"></span> Local Technical Stock</span>
            </div>

            <button class="btn-primary fairway-pill-btn dealer-cta-btn" data-action="open-dealers">${data.cta.label}</button>
          </div>
          <div class="dealer-right-col" data-action="open-dealers" title="Click to view Pan-India dealer locations">
            <div class="dealer-globe-wrap">
              <img src="${data.globeImage.src}" alt="${data.globeImage.alt}">
              <div class="dealer-globe-overlay-pill">
                <span class="pulse-ring"></span>
                <span>Click to Open Interactive Directory</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  /**
   * 10. Solution CTA Section Component
   */
  renderSolution(data) {
    return `
      <section class="solution-section fairway-solution-section" id="solution" aria-labelledby="solution-heading">
        <div class="solution-container">
          <div class="solution-card fairway-solution-card">
            <div class="solution-content">
              <span class="section-eyebrow eyebrow-white">ENGINEERING CONSULTATION</span>
              <h2 class="solution-title fairway-solution-title" id="solution-heading">${data.titleHtml || data.title}</h2>
              <p class="solution-desc">${data.description}</p>
              <div class="solution-actions">
                <button class="btn-outline fairway-pill-btn-outline solution-btn-talk" data-action="open-inquiry">${data.actions.talk.label}</button>
                <a href="${data.actions.explore.href}" class="btn-primary fairway-pill-btn solution-btn-explore">${data.actions.explore.label}</a>
              </div>
            </div>
            <div class="solution-media fairway-solution-media">
              <img src="${data.media.src}" alt="${data.media.alt}">
            </div>
          </div>
        </div>
      </section>
    `;
  },

  /**
   * 11. Giant Brand Typography Component
   */
  renderBrandTypography(data) {
    const line1 = (data && data.line1) || 'TEKNIC';
    const line2 = (data && data.line2) || 'EUCHNER';

    return `
      <section class="brand-typography-section fairway-brand-section" aria-label="Teknic Euchner Brand Showcase">
        <div class="brand-typography-container">
          <div class="brand-text-line brand-text-teknic">${line1}</div>
          <div class="brand-text-line brand-text-euchner">${line2}</div>
        </div>
      </section>
    `;
  },

  /**
   * 12. Main Site Footer Component
   */
  renderFooter(data) {
    const linkGroupsHtml = data.linkGroups.map(group => `
      <div class="footer-link-group">
        <h4 class="footer-group-title">${group.title}</h4>
        <ul class="footer-link-list">
          ${group.links.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
        </ul>
      </div>
    `).join('');

    return `
      <footer class="site-footer fairway-site-footer" id="contact">
        <div class="footer-top-grid">
          <div class="footer-col-pitch">
            <h3 class="footer-pitch-title">${data.pitch.title}</h3>
            <p class="footer-pitch-desc">${data.pitch.description}</p>
          </div>
          <div class="footer-col-links">
            ${linkGroupsHtml}
          </div>
          <div class="footer-col-contact">
            <address class="footer-address">
              ${data.contact.address}
            </address>
            <a href="mailto:${data.contact.email}" class="footer-contact-link">${data.contact.email}</a>
            <a href="tel:${data.contact.phone.replace(/[^+\d]/g, '')}" class="footer-contact-link">${data.contact.phone}</a>
            <div class="footer-social-list" aria-label="Social Media Links">
              <a href="#" class="footer-social-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" class="footer-social-btn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" />
                </svg>
              </a>
              <a href="#" class="footer-social-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="2" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" stroke-width="2" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="footer-bottom-bar">
          <p class="footer-copyright">${data.copyright}</p>
        </div>
      </footer>
    `;
  },

  /**
   * Floating Back to Top Button
   */
  renderBackToTop() {
    return `
      <button class="back-to-top-btn fairway-back-to-top" id="backToTop" aria-label="Back to top" title="Back to top">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </button>
    `;
  },

  /**
   * 13. Mobile Slide-Out Navigation Drawer
   */
  renderMobileDrawer(data) {
    const navItemsHtml = data.navLinks.map(link => `
      <li>
        <a href="${link.href}" class="mobile-drawer-link">
          ${link.label}
        </a>
      </li>
    `).join('');

    return `
      <div class="mobile-nav-drawer" id="mobileNavDrawer" aria-hidden="true">
        <div class="mobile-nav-backdrop" id="mobileNavBackdrop"></div>
        <div class="mobile-nav-panel">
          <div class="mobile-nav-header">
            <img src="${data.logo.src}" alt="${data.logo.alt}" class="mobile-drawer-logo">
            <button class="mobile-nav-close" id="mobileNavClose" aria-label="Close navigation">&times;</button>
          </div>
          <ul class="mobile-drawer-list">
            ${navItemsHtml}
          </ul>
          <div class="mobile-drawer-footer">
            <button class="btn-primary mobile-drawer-cta fairway-pill-btn" data-action="open-inquiry">TALK TO AN EXPERT</button>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * 14. Interactive Product Technical Specification Quick-View Modal
   */
  renderProductModal() {
    return `
      <div class="app-modal" id="productModal" aria-hidden="true" role="dialog" aria-labelledby="modalProductTitle">
        <div class="modal-backdrop" data-close-modal="productModal"></div>
        <div class="modal-dialog modal-product-dialog fairway-modal-dialog">
          <button class="modal-close-btn" data-close-modal="productModal" aria-label="Close modal">&times;</button>
          
          <div class="modal-product-content" id="modalProductBody">
            <!-- Dynamically populated via JS -->
          </div>
        </div>
      </div>
    `;
  },

  /**
   * 15. Talk to an Expert / Consultation Inquiry Drawer Modal
   */
  renderInquiryModal() {
    return `
      <div class="app-modal" id="inquiryModal" aria-hidden="true" role="dialog" aria-labelledby="inquiryModalTitle">
        <div class="modal-backdrop" data-close-modal="inquiryModal"></div>
        <div class="modal-dialog modal-inquiry-dialog fairway-modal-dialog">
          <button class="modal-close-btn" data-close-modal="inquiryModal" aria-label="Close modal">&times;</button>
          
          <div class="inquiry-dialog-header">
            <span class="section-eyebrow">TEKNIC EUCHNER CONSULTATION</span>
            <h2 class="inquiry-modal-title" id="inquiryModalTitle">Talk to an Application Expert</h2>
            <p class="inquiry-modal-desc">
              Discuss your machine positioning, object detection, or safety switching requirements directly with our technical engineering team.
            </p>
          </div>

          <form class="inquiry-form" id="inquiryForm" novalidate>
            <div class="form-row">
              <div class="form-group">
                <label for="inqName">Full Name *</label>
                <input type="text" id="inqName" name="fullName" required placeholder="e.g. Rajesh Sharma">
              </div>
              <div class="form-group">
                <label for="inqCompany">Company / Organization *</label>
                <input type="text" id="inqCompany" name="company" required placeholder="e.g. Precision CNC Works">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="inqEmail">Work Email *</label>
                <input type="email" id="inqEmail" name="email" required placeholder="rajesh@example.com">
              </div>
              <div class="form-group">
                <label for="inqPhone">Phone / Mobile *</label>
                <input type="tel" id="inqPhone" name="phone" required placeholder="+91 98765 43210">
              </div>
            </div>

            <div class="form-group">
              <label for="inqProduct">Product or Solution Category of Interest</label>
              <select id="inqProduct" name="productInterest">
                <option value="Inductive Proximity Switches">Inductive Proximity Switches</option>
                <option value="Single Limit Switches">Single Limit Switches</option>
                <option value="Precision Single & Multiple Limit Switches">Precision Single &amp; Multiple Limit Switches</option>
                <option value="Photoelectric Sensors">Photoelectric Sensors</option>
                <option value="NK Limit Switches">NK Limit Switches</option>
                <option value="Cable Connectors">Sensor &amp; Actuator Cable Connectors</option>
                <option value="Custom Engineering">Custom Machine Engineering Solution</option>
              </select>
            </div>

            <div class="form-group">
              <label for="inqMessage">Application Details / Equipment Specifications</label>
              <textarea id="inqMessage" name="message" rows="3" placeholder="Briefly describe your environment, temperature, sensing distance, or machine requirements..."></textarea>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn-primary fairway-pill-btn inquiry-submit-btn" id="inquirySubmitBtn">
                <span class="btn-text">SUBMIT INQUIRY</span>
                <span class="btn-spinner" aria-hidden="true"></span>
              </button>
            </div>

            <div class="form-feedback" id="inquiryFeedback" aria-live="polite"></div>
          </form>
        </div>
      </div>
    `;
  },

  /**
   * 16. Pan-India Authorized Dealer Directory Modal
   */
  renderDealerModal(dealers) {
    const dealerCardsHtml = dealers.map(d => `
      <div class="dealer-directory-card fairway-dealer-card" data-region="${d.region}" data-dealer-id="${d.id}">
        <div class="dealer-card-top">
          <div class="dealer-tags-group">
            <span class="dealer-region-tag">${d.region.toUpperCase()}</span>
            <span class="dealer-city-tag">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              ${d.city}, ${d.state}
            </span>
          </div>
          <span class="dealer-stock-badge">
            <span class="stock-live-dot"></span>
            ${d.stockAvailable}
          </span>
        </div>
        <h4 class="dealer-company-name">${d.name}</h4>
        <p class="dealer-address-line">${d.address}</p>
        <div class="dealer-contact-rows">
          <div class="dealer-links-wrap">
            <a href="tel:${d.phone.replace(/[^+\d]/g, '')}" class="dealer-link dealer-phone-link" title="Call ${d.name}">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              ${d.phone}
            </a>
            <a href="mailto:${d.email}" class="dealer-link dealer-email-link" title="Email ${d.name}">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              ${d.email}
            </a>
          </div>
          <button class="btn-outline dealer-inquire-btn" data-action="inquire-dealer" data-dealer-name="${d.name}" data-dealer-city="${d.city}">
            REQUEST STOCK DISPATCH
          </button>
        </div>
      </div>
    `).join('');

    return `
      <div class="app-modal" id="dealersModal" aria-hidden="true" role="dialog" aria-labelledby="dealersModalTitle">
        <div class="modal-backdrop" data-close-modal="dealersModal"></div>
        <div class="modal-dialog modal-dealers-dialog fairway-modal-dialog">
          <button class="modal-close-btn" data-close-modal="dealersModal" aria-label="Close modal">&times;</button>
          
          <div class="dealers-modal-header">
            <span class="section-eyebrow">PAN-INDIA NETWORK</span>
            <h2 class="dealers-modal-title" id="dealersModalTitle">Authorised Teknic Euchner Distributors</h2>
            <p class="dealers-modal-desc">
              Connect directly with our regional distribution partners across India for local stock, immediate dispatch, and on-site engineering support.
            </p>
          </div>

          <div class="dealer-search-controls">
            <div class="dealer-search-input-wrap">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="dealerSearchInput" placeholder="Search by city, state, or dealer name (e.g. Pune, Mumbai, Peenya)..." aria-label="Search dealers">
            </div>
            <div class="dealer-region-filters" role="group" aria-label="Filter dealers by region">
              <button class="region-pill fairway-filter-pill active" data-dealer-region="all">ALL REGIONS</button>
              <button class="region-pill fairway-filter-pill" data-dealer-region="north">NORTH</button>
              <button class="region-pill fairway-filter-pill" data-dealer-region="south">SOUTH</button>
              <button class="region-pill fairway-filter-pill" data-dealer-region="west">WEST</button>
              <button class="region-pill fairway-filter-pill" data-dealer-region="east">EAST</button>
            </div>
          </div>

          <div class="dealers-directory-grid" id="dealersDirectoryGrid">
            ${dealerCardsHtml}
            <div class="dealer-empty-state" id="dealerEmptyState" style="display: none;">
              <div class="empty-state-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <h4 class="empty-state-title">No authorized dealers found</h4>
              <p class="empty-state-desc">We couldn't find any distribution partners matching "<strong id="dealerEmptyQuery"></strong>". Our central engineering desk provides direct factory dispatch to your location.</p>
              <button class="btn-primary fairway-pill-btn empty-state-cta" data-action="open-inquiry">TALK TO CENTRAL ENGINEERING</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * 17. Floating Product Comparison Dock
   */
  renderCompareDock() {
    return `
      <div class="compare-floating-dock" id="compareDock" role="region" aria-label="Product comparison panel">
        <div class="compare-dock-inner">
          <div class="compare-dock-info">
            <span class="compare-count-pill" id="compareCountPill">0</span>
            <span class="compare-dock-label">Selected for Side-by-Side Review (Max 3)</span>
          </div>
          <div class="compare-dock-chips" id="compareDockChips">
            <!-- Chips rendered here -->
          </div>
          <div class="compare-dock-actions">
            <button class="btn-primary fairway-pill-btn compare-btn-submit" id="openCompareModalBtn">
              COMPARE SPECS
            </button>
            <button class="compare-clear-btn" id="clearCompareBtn" title="Clear all selections">
              Clear
            </button>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * 18. Product Comparison Modal
   */
  renderCompareModal() {
    return `
      <div class="app-modal" id="compareModal" aria-hidden="true" role="dialog" aria-labelledby="compareModalTitle">
        <div class="modal-backdrop" data-close-modal="compareModal"></div>
        <div class="modal-dialog modal-compare-dialog fairway-modal-dialog">
          <button class="modal-close-btn" data-close-modal="compareModal" aria-label="Close modal">&times;</button>
          
          <div class="compare-modal-header">
            <span class="section-eyebrow">EQUIPMENT BENCHMARK</span>
            <h2 class="compare-modal-title" id="compareModalTitle">Side-by-Side Specification Matrix</h2>
            <p class="compare-modal-desc">
              Direct technical parameter comparison for industrial machinery engineers and panel builders.
            </p>
          </div>

          <div class="compare-matrix-scroll-wrap" id="compareMatrixScrollWrap">
            <!-- Dynamic Side-by-Side Table -->
          </div>
        </div>
      </div>
    `;
  }
};
