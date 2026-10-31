# TEKNIC EUCHNER — Precision Sensing & Control Gear
## Luxury Editorial UI/UX Redesign (Fairway Reference) & Dynamic JavaScript Architecture

A modern, high-fidelity web application reproduction and luxury editorial redesign for **TEKNIC EUCHNER**, combining German engineering precision with the award-winning **Fairway Luxury Editorial UI/UX** design aesthetic (referenced from Nickelfox Studio on Dribbble).

---

## 🎨 UI/UX Design System (Inspired by Fairway Dribbble Reference)

The entire user experience and visual language has been upgraded to a luxury editorial standard:

1. **Floating Pill Navigation Bar**:
   - Floating frosted glassmorphic pill header (`backdrop-filter: blur(24px)`)
   - Sticky scroll tracking with subtle elevation and border luminescence
   - Responsive slide-out navigation drawer for mobile/tablet viewports

2. **Framed Cinematic Hero Section**:
   - Distinct rounded framing (`border-radius: 28px`) with box shadow depth
   - Deep cinematic vignette overlay with slow zoom animation
   - **Heritage Top Pill Badge**: Frosted pill with live pulsing green status dot (*"Since 1989 • German Engineering Heritage"*)
   - **Vertical Stamp**: Rotated precision stamp (*"PRECISION | ISO 9001:2015 CERTIFIED"*)
   - **Display Typography**: Oversized sans headline paired with elegant italic serif accent in `'Playfair Display'` (*"Industry"*)
   - **Floating Trust Card**: Bottom-left card featuring avatar stack, `+500` badge, and circular arrow action button
   - **Floating Discovery Card**: Bottom-right card with thumbnail preview for Pan-India dealer access
   - **Floating Scroll Button**: Centered downward scroll pill button with bouncy micro-animation

3. **Products Showcase with Pill Filters & Circular Action Buttons**:
   - Rounded luxury product cards (`border-radius: 24px`) with soft layered drop shadows
   - Pill category badges (`INDUCTIVE SENSING`, `MECHANICAL SWITCHING`, `MACHINE POSITIONING`)
   - Circular arrow action buttons (`.btn-circle-arrow`) with 45-degree hover rotation
   - Interactive pill filter tabs (`.fairway-filter-pill`) for instant category switching without page reloads
   - Interactive zero-latency 3D perspective mouse tilt on product cards
   - Full keyboard accessibility (`Enter` / `Space` triggers modal with accessible `:focus-visible` indicators)

4. **Interactive Modals Engine**:
   - **Product Specification Quick-View**: High-res visual, dynamic per-product engineering parameter pills, full technical specifications table, and direct inquiry CTA
   - **Engineering Consultation Drawer**: Interactive consultation form with real-time field validation, pre-filled product/dealer queries, and success feedback
   - **Pan-India Dealer Directory**: Searchable directory of 12 authorized distributors across major industrial hubs (Mumbai, Pune, Bengaluru, Chennai, Hyderabad, Delhi NCR, Faridabad, Ludhiana, Ahmedabad, Vadodara, Coimbatore, Kolkata) with live search input, regional filters, and one-click dispatch inquiry

5. **Editorial Rounded Cards Across All Sections**:
   - Journey & stats frosted card with live counter animation (`35+ Years`, `1989 Established`, `500+ Clients`)
   - Rounded media layouts for About, Why Teknic Euchner, Applications, and Quality sections
   - Context-aware *Playfair Display* editorial italic serif accents across all major section headlines
   - Responsive multi-tier layout scaling from desktop 1440px to tablet and compact 320px mobile viewports
   - Floating scroll-to-top button and top scroll progress indicator bar

---

## 💻 Pure Vanilla JavaScript & CSS Architecture

Built to strict industry standards with **zero external frameworks or libraries**:

* **Core Logic**: Pure Vanilla ES6+ JavaScript
* **Structure**: Clean HTML5 shell mounting dynamically to `<div id="app"></div>`
* **Styling**: Vanilla CSS3 with CSS custom properties (tokens), CSS Grid, Flexbox, and GPU-accelerated keyframe animations
* **Fonts**: Google Fonts (`Playfair Display`, `Plus Jakarta Sans`, `Inter`)

```
Cojective-Technical-Assessment/
├── index.html               # Semantic HTML5 entry point mounting #app
├── css/
│   ├── reset.css            # Modern CSS reset
│   └── style.css            # Complete design system, Fairway tokens, animations & modals
├── js/
│   ├── data.js              # Centralized data models (products, specs, dealers, copy)
│   ├── components.js        # Functional component renderers (Header, Hero, Modals, etc.)
│   └── main.js              # App controller, event delegation, 3D tilt, parallax & observers
├── assets/
│   ├── images/              # Hero, intro, and brand photography
│   ├── products/            # High-resolution product imagery
│   ├── applications/        # Industrial application photography
│   └── icons/               # Technical gear, building, and cube iconography
└── README.md                # Documentation and running guide
```

---

## 🚀 Running Locally

### Option 1: Direct Browser Launch
Open [index.html](file:///c:/Users/harie/OneDrive/Documents/Cojective-Technical-Assessment/index.html) directly in any modern desktop web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (Python)
```bash
python -m http.server 3000
```
Then visit [http://localhost:3000](http://localhost:3000) in your browser.

### Option 3: Node.js / npx `serve`
```bash
npx serve .
```
