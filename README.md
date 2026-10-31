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

3. **Products Showcase with Pill Filters, Live Search & Quick Facets**:
   - Rounded luxury product cards (`border-radius: 24px`) with soft layered drop shadows
   - Pill category badges (`INDUCTIVE SENSING`, `MECHANICAL SWITCHING`, `MACHINE POSITIONING`)
   - Circular arrow action buttons (`.btn-circle-arrow`) with 45-degree hover rotation
   - Interactive pill filter tabs (`.fairway-filter-pill`) for instant category switching without page reloads
   - **Real-Time Parameter & Keyword Search**: Zero-latency searching across titles, categories, tags, voltages, IP ratings, and pin configurations with an animated clear button and empty-state fallback
   - **Quick-Facet Engineering Parameter Chips**: Instant filter pills (`IP67 Waterproof`, `IP68 Submersible`, `24V DC`, `230V AC`, `Snap-Action`, `M12 Standard`)
   - Interactive zero-latency 3D perspective mouse tilt on product cards
   - Full keyboard accessibility (`Enter` / `Space` triggers modal with accessible `:focus-visible` indicators)

4. **Advanced Engineering Modal & CAD Suite**:
   - **Interactive 4-Tab Engineering Portal in Quick-View**:
     * **Parameters**: Complete engineering specifications matrix
     * **Wiring & Schematics**: Vector-drawn electrical contact circuit diagram (IEC 60947-5-1 standard, NC 11-12 & NO 13-14 snap-action forced opening schematic, terminal torque, and wire cross-section notes)
     * **CAD & Mounting**: DIN EN 50041/50047 standard dimensions, 30×60mm mounting centers, M20 conduit entry, and one-click "Request 3D STEP Model" action
     * **Compliance & Approvals**: IEC/EN 60947-5-1, CE Machinery Directive, RoHS 3 lead-free certification, and ISO 9001:2015 audit details
   - **Printable Engineering Datasheet**: "PRINT DATASHEET" modal button paired with custom `@media print` styles that output crisp A4 spec sheets stripping non-print UI
   - **Side-by-Side Equipment Comparison Matrix**: Pill checkbox on cards (`+ Compare` / `✓ Compare`), persistent floating bottom comparison dock (up to 3 items), and benchmark matrix modal with direct quote actions
   - **Engineering Consultation Drawer**: Interactive consultation form with real-time field validation, pre-filled product/dealer queries, and success feedback
   - **Pan-India Dealer Directory & Interactive Map Pins**: Searchable directory of 12 authorized distributors across major industrial hubs with pulsing geographic map pins on the distribution globe that open the directory pre-filtered to the chosen region

5. **Technical Knowledge Base & Reference Suite**:
   - **Technical FAQ Accordion**: Categorized answers (`STANDARDS`, `INTEGRATION`, `MECHANICAL`, `LOGISTICS`) addressing European retrofitting, coolant resilience, Annex K safety interlocks, and custom multi-switch configs
   - **Ingress Protection (IP Code) Reference Tool**: Interactive selector for `IP65`, `IP67`, `IP68`, and `IP69K` detailing dust/fluid protection standards, operating machine environments, and recommended TEKNIC series

6. **Industrial Blueprint Dark Theme Switcher**:
   - Luxury pill toggle in header and mobile drawer (`[ ☾ Blueprint ]` / `[ ☀ Editorial ]`)
   - High-contrast CAD aesthetic with obsidian background (`#080C14`), slate surfaces (`#0E1422`), warm brass accents (`#C5A059`), and persistent `localStorage` preference memory

7. **Editorial Rounded Cards Across All Sections**:
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
