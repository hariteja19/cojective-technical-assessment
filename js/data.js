/**
 * TEKNIC EUCHNER — Data Layer
 * ──────────────────────────────────────────────────────────────────────────
 * Centralized data models for all webpage sections, technical specifications,
 * product catalogs, and dealer directories.
 */

window.TEKNIC_DATA = {
  // Navigation & Brand Header
  header: {
    logo: {
      src: 'assets/images/logo.png',
      alt: 'TEKNIC EUCHNER Logo',
      href: '#header'
    },
    navLinks: [
      { label: 'ABOUT US', href: '#about', hasDropdown: true },
      { label: 'PRODUCTS', href: '#products', hasDropdown: false },
      { label: 'DEALERS', href: '#dealers', hasDropdown: false },
      { label: 'NEWS & EVENTS', href: '#news', hasDropdown: false },
      { label: 'CONTACT US', href: '#contact', hasDropdown: false }
    ],
    cta: {
      label: 'TALK TO AN EXPERT',
      href: '#contact',
      action: 'open-inquiry'
    }
  },

  // Hero Section (Luxury Editorial)
  hero: {
    badge: {
      text: 'Since 1989 • German Engineering Heritage',
      pulse: true
    },
    stamp: {
      label: 'PRECISION',
      value: 'ISO 9001:2015 CERTIFIED'
    },
    titleHtml: 'Precision That Keeps<br><span class="fairway-serif-italic">Industry</span> Moving.',
    heading: 'Precision That Keeps Industry Moving.',
    subtitle: 'Engineered sensing, switching and control solutions for high-precision machinery that demands uncompromising reliability.',
    primaryCta: {
      label: 'EXPLORE OUR PRODUCTS',
      href: '#products'
    },
    secondaryCta: {
      label: 'TALK TO AN EXPERT',
      action: 'open-inquiry'
    },
    media: {
      src: 'assets/images/hero-cinematic.jpg?v=1',
      alt: 'Precision 5-axis CNC machining center milling aerospace components'
    },
    trustCard: {
      avatars: [
        { src: 'assets/icons/icon-gears.png', alt: 'Engineering' },
        { src: 'assets/icons/icon-cubes.png', alt: 'Products' },
        { src: 'assets/icons/icon-building.png', alt: 'Established' }
      ],
      badge: '+500',
      title: '35+ Years Industry Trust',
      subtitle: 'Serving 500+ Machine Builders',
      action: 'open-inquiry'
    },
    discoveryCard: {
      thumb: 'assets/images/why-machinery-modern.jpg?v=1',
      alt: 'Modern automated precision machinery',
      title: 'Pan-India Dealer Access',
      desc: 'Find local stock and immediate engineering dispatch across India.',
      action: 'open-dealers'
    },
    scrollTarget: '#about'
  },

  // Introduction Section
  intro: {
    eyebrow: 'INTRODUCTION',
    titleMain: 'Engineering You Can Rely On.',
    titleAccent: 'Experience You Can Trust.',
    sensorsImage: {
      src: 'assets/images/intro-sensors-modern.jpg?v=1',
      alt: 'High-precision industrial inductive proximity sensors with active status LED indicators'
    },
    automationImage: {
      src: 'assets/images/intro-robotics-modern.jpg?v=1',
      alt: 'Advanced articulated robotic arm performing precision electronic component assembly'
    },
    paragraphs: [
      'Since 1989, Teknic Euchner has been building its expertise around one simple principle: <span class="intro-highlight">industrial components should perform reliably, every time they are called upon.</span>',
      'With the engineering know-how of Euchner Germany and decades of manufacturing experience in India, we develop control gear and sensing solutions for demanding industrial applications.',
      'From machine positioning and object detection to switching and safety-related applications, our products are built to deliver consistent performance where it matters most.'
    ],
    cta: {
      label: 'DISCOVER TEKNIC EUCHNER',
      href: '#about'
    }
  },

  // Journey & Statistics Section
  journey: {
    eyebrow: 'OUR JOURNEY',
    title: 'Decades of Engineering. Built for Industry.',
    titleHtml: 'Decades of Engineering.<br>Built for <span class="fairway-serif-italic">Industry</span>.',
    stats: [
      {
        id: 'experience',
        icon: 'assets/icons/icon-gears.png',
        iconAlt: 'Experience icon',
        number: '35+ Years',
        target: 35,
        suffix: '+ Years',
        isCountable: true,
        label: 'Of industrial manufacturing experience'
      },
      {
        id: 'established',
        icon: 'assets/icons/icon-building.png',
        iconAlt: 'Established year icon',
        number: '1989',
        target: 1989,
        suffix: '',
        isCountable: true,
        label: 'Year Teknic Euchner was established'
      },
      {
        id: 'categories',
        icon: 'assets/icons/icon-cubes.png',
        iconAlt: 'Product categories icon',
        number: 'Multiple Product Categories',
        target: null,
        suffix: '',
        isCountable: false,
        label: 'Solutions across sensing, switching and machine control'
      },
      {
        id: 'dealers',
        icon: 'assets/icons/icon-india-map.png',
        iconAlt: 'Pan-India dealer network icon',
        number: 'Pan-India Dealer Network',
        target: null,
        suffix: '',
        isCountable: false,
        label: 'Product access and support across India'
      }
    ]
  },

  // Product Showcase Section
  products: {
    eyebrow: 'OUR PRODUCTS',
    title: 'The Right Control Gear for Every Application.',
    descriptions: [
      'Industrial machines depend on components that can sense movement, detect position, control processes and respond when it matters.',
      'Teknic Euchner offers a focused range of industrial products engineered for reliable operation across demanding applications.'
    ],
    headerCta: {
      label: 'EXPLORE OUR PRODUCTS',
      href: '#products'
    },
    categories: [
      { id: 'all', label: 'ALL PRODUCTS' },
      { id: 'proximity', label: 'PROXIMITY SWITCHES' },
      { id: 'limit', label: 'LIMIT SWITCHES' },
      { id: 'sensors', label: 'SENSORS & CABLES' }
    ],
    items: [
      {
        id: 'inductive-switches',
        category: 'proximity',
        categoryLabel: 'Inductive Sensing',
        title: 'INDUCTIVE PROXIMITY SWITCHES',
        tagline: 'Reliable non-contact detection for automated machines.',
        image: 'assets/products/prod-inductive.png?v=3',
        imageAlt: 'Inductive proximity switches',
        description: 'Inductive proximity switches enable precise, contactless object detection for control and positioning.',
        link: '#products',
        quickSpecs: ['IP67 / IP68 Rated', '1.5 – 15 mm Sensing', 'Up to 2,000 Hz'],
        specs: {
          'Operating Voltage': '10 – 30 V DC (3-wire / 4-wire)',
          'Sensing Distance': '1.5 mm to 15 mm (Flush / Non-flush)',
          'Output Function': 'PNP / NPN Normally Open / Closed',
          'Protection Rating': 'IP67 / IP68 (Oil & Coolant Proof)',
          'Housing Material': 'Nickel-plated brass / Stainless steel M8, M12, M18, M30',
          'Switching Frequency': 'Up to 2,000 Hz'
        }
      },
      {
        id: 'single-limit-switches',
        category: 'limit',
        categoryLabel: 'Mechanical Switching',
        title: 'SINGLE LIMIT SWITCHES',
        tagline: 'Precision switching for dependable machine control.',
        image: 'assets/products/prod-single-limit.png?v=3',
        imageAlt: 'Single limit switches',
        description: 'Robust, corrosion-resistant limit switches built for demanding industrial environments.',
        link: '#products',
        quickSpecs: ['10M Mechanical Cycles', 'Die-cast Heavy Duty IP67', 'Silver Snap-action Contacts'],
        specs: {
          'Contact Type': 'Snap-action / Slow-action silver contacts',
          'Rated Operational Voltage': '230 V AC / 10 A, 24 V DC / 6 A',
          'Actuator Types': 'Plunger, Roller lever, Adjustable rod, Wobble stick',
          'Protection Rating': 'IP67 Heavy-duty Die-cast Enclosure',
          'Mechanical Life': '10 million operating cycles',
          'Conduit Entry': 'M20 x 1.5 / PG 13.5'
        }
      },
      {
        id: 'precision-limit-switches',
        category: 'limit',
        categoryLabel: 'Machine Positioning',
        title: 'PRECISION SINGLE &amp; MULTIPLE LIMIT SWITCHES',
        tagline: 'Engineered for accurate machine positioning.',
        image: 'assets/products/prod-precision-limit.png?v=3',
        imageAlt: 'Precision single and multiple limit switches',
        description: 'Reliable control and positioning solutions built for industrial machinery.',
        link: '#products',
        quickSpecs: ['± 0.002 mm Repeat Accuracy', '1 to 16 Plunger Stations', 'CNC & Tooling Grade'],
        specs: {
          'Number of Stations': '1 to 16 plunger stations',
          'Repeat Accuracy': '± 0.002 mm (High Precision Series)',
          'Plunger Pitch': '8 mm, 12 mm, 16 mm spacing',
          'Protection Rating': 'IP67 / NEMA 4, 12',
          'Ambient Temperature': '-25°C to +85°C',
          'Application': 'CNC machine tools, transfer lines, indexing tables'
        }
      },
      {
        id: 'photoelectric-sensors',
        category: 'sensors',
        categoryLabel: 'Optical Detection',
        title: 'PHOTOELECTRIC SENSORS',
        tagline: 'Detect with precision. Respond with confidence.',
        image: 'assets/products/prod-photoelectric.png?v=3',
        imageAlt: 'Photoelectric sensors',
        description: 'Light-based sensors for reliable object detection and industrial automation.',
        link: '#products',
        quickSpecs: ['Up to 20 m Sensing Range', '< 0.5 ms Fast Response', 'Washdown IP67 Rated'],
        specs: {
          'Sensing Principles': 'Through-beam, Retro-reflective, Diffuse with background suppression',
          'Sensing Range': 'Up to 20 m (Through-beam), 4 m (Polarized retro-reflective)',
          'Light Source': 'Visible red LED / Infrared (660 nm / 880 nm)',
          'Response Time': '< 0.5 ms',
          'Protection Rating': 'IP67 Washdown resistant',
          'Sensitivity Adjustment': 'Precision teach-in button / potentiometer'
        }
      },
      {
        id: 'nk-switches',
        category: 'limit',
        categoryLabel: 'Compact Safety Switching',
        title: 'NK LIMIT SWITCHES',
        tagline: 'Compact. Robust. Built for dependable switching.',
        image: 'assets/products/prod-nk-switch.png?v=3',
        imageAlt: 'NK limit switches',
        description: 'Flexible, robust limit switches designed for demanding industrial and safety applications.',
        link: '#products',
        quickSpecs: ['EN 50047 Compact Standard', 'Positive Opening Contacts', 'UL, CE, CSA Certified'],
        specs: {
          'Design Standard': 'EN 50047 compact design',
          'Contact Configuration': '1 NO + 1 NC / 2 NC Positive Opening',
          'Housing': 'Glass-fiber reinforced thermoplastic / Zinc die-cast',
          'Protection Rating': 'IP65 / IP66 according to IEC 60529',
          'Switching Rate': 'Max 6,000 cycles per hour',
          'Approvals': 'UL, CSA, CE, CCC'
        }
      },
      {
        id: 'cable-connectors',
        category: 'sensors',
        categoryLabel: 'Connectivity',
        title: 'CABLE CONNECTORS',
        tagline: 'Reliable connections for industrial sensing and control.',
        image: 'assets/products/prod-cables.png?v=3',
        imageAlt: 'Cable connectors',
        description: 'Sensor and actuator cables built for demanding installations and energy-chain applications.',
        link: '#products',
        quickSpecs: ['M8 & M12 PUR / PVC', '> 5M Drag Chain Cycles', 'IP68 / IP69K High Pressure'],
        specs: {
          'Connector Sizes': 'M8 (3-pin, 4-pin) / M12 (4-pin, 5-pin, 8-pin A-coded)',
          'Cable Jacket Material': 'PUR (halogen-free, drag chain suitable) / PVC',
          'Bending Cycles': '> 5 million bending cycles in drag chains',
          'Coupling Nut': 'Die-cast zinc / Stainless steel (V4A)',
          'Operating Temperature': '-40°C to +90°C (Fixed), -25°C to +80°C (Moving)',
          'IP Rating': 'IP68 / IP69K high-pressure washdown'
        }
      }
    ]
  },

  // Why Teknic Euchner Section
  why: {
    eyebrow: 'WHY TEKNIC EUCHNER',
    heading: 'Built Around What Industry Needs.',
    headingHtml: 'Built Around What <span class="fairway-serif-italic">Industry</span> Needs.',
    description: 'Industrial environments leave little room for uncertainty. That\'s why our approach combines engineering expertise, robust materials and manufacturing experience to create products designed for dependable performance.',
    media: {
      src: 'assets/images/why-machinery-modern.jpg?v=1',
      alt: 'High-tech automated manufacturing and CNC transfer machinery'
    },
    features: [
      {
        title: 'Engineering<br>Expertise',
        description: 'Built on decades of experience and strengthened by Euchner Germany\'s engineering heritage.'
      },
      {
        title: 'Reliable<br>Performance',
        description: 'Products designed to deliver consistent operation in demanding industrial environments.'
      },
      {
        title: 'Robust<br>Construction',
        description: 'Quality materials, precision manufacturing and application-focused design for long-term performance.'
      },
      {
        title: 'Industry-Focused<br>Solutions',
        description: 'Products developed around the practical requirements of machines, automation systems and industrial equipment.'
      },
      {
        title: 'Quality as a<br>Standard',
        description: 'Our commitment to quality extends from product development and manufacturing to customer service.'
      }
    ]
  },

  // Applications Section
  applications: {
    eyebrow: 'OUR APPLICATIONS',
    heading: 'Designed for Machines.<br>Trusted Across Industries.',
    description: 'Our products support the machines and systems that keep modern manufacturing moving.',
    items: [
      {
        id: 'machine-tools',
        title: 'Machine Tools',
        description: 'Precision sensing and positioning for machine-tool applications.',
        image: 'assets/applications/app-machine-tools-modern.jpg',
        imageAlt: 'High-precision CNC machine tooling workshop'
      },
      {
        id: 'industrial-automation',
        title: 'Industrial Automation',
        description: 'Reliable detection and switching for automated processes.',
        image: 'assets/applications/app-industrial-automation-modern.jpg',
        imageAlt: 'Modern automated industrial robotics assembly line'
      },
      {
        id: 'manufacturing-equipment',
        title: 'Manufacturing Equipment',
        description: 'Components designed for demanding production environments.',
        image: 'assets/applications/app-manufacturing-equipment-modern.jpg',
        imageAlt: 'Automated factory vehicle production line machinery'
      },
      {
        id: 'material-handling',
        title: 'Material Handling',
        description: 'Sensing and switching solutions for movement, positioning and control.',
        image: 'assets/applications/app-material-handling-modern.jpg',
        imageAlt: 'Automated roller conveyor and package sorting system'
      },
      {
        id: 'safety-applications',
        title: 'Safety Applications',
        description: 'Products designed to support machine safety and reliable control.',
        image: 'assets/applications/app-safety-applications-modern.jpg',
        imageAlt: 'Industrial safety electrical switchboard and breaker control panel'
      },
      {
        id: 'custom-applications',
        title: 'Custom Industrial Applications',
        description: 'Solutions selected around the specific requirements of your equipment.',
        image: 'assets/applications/app-custom-applications-modern.jpg',
        imageAlt: 'Precision electronics engineering testing and calibration laboratory'
      }
    ]
  },

  // Quality Section
  quality: {
    bgImage: {
      src: 'assets/images/quality-cables-modern.jpg?v=1',
      alt: 'High-density structured industrial cabling and sensor interconnects'
    },
    title: 'Quality Isn\'t an Inspection. It\'s a Commitment.',
    titleHtml: 'Quality Isn\'t an Inspection.<br>It\'s a <span class="fairway-serif-italic">Commitment</span>.',
    manifesto: [
      'IT\'S ABOUT CONSISTENT PERFORMANCE.',
      'IT\'S ABOUT DEPENDABLE OPERATION.',
      'IT\'S ABOUT BUILDING COMPONENTS THAT CUSTOMERS',
      'CAN SPECIFY WITH CONFIDENCE.'
    ],
    paragraphs: [
      'Teknic Euchner quality is built into every step of design, sourcing and manufacturing.',
      'Products are engineered for high operational reliability, long service life and dependable functionality in real-world industrial environments.'
    ],
    cta: {
      label: 'VIEW OUR QUALITY POLICY',
      href: '#quality'
    }
  },

  // Dealer Section
  dealer: {
    title: 'Looking for Teknic Euchner Products?',
    titleHtml: 'Looking for Teknic<br>Euchner <span class="fairway-serif-italic">Products?</span>',
    description: 'Find an authorised dealer near you and get connected with the right product for your application.',
    cta: {
      label: 'FIND A DEALER',
      href: '#dealers',
      action: 'open-dealers'
    },
    globeImage: {
      src: 'assets/images/dealer-globe-modern.png?v=1',
      alt: 'Teknic Euchner illuminated digital network distribution hub'
    }
  },

  // Pan-India Authorized Dealer Network Directory
  dealersList: [
    {
      id: 'd-1',
      name: 'Techno Controls & Automation Pvt. Ltd.',
      region: 'west',
      city: 'Mumbai',
      state: 'Maharashtra',
      address: 'Plot 42, Western Industrial Estate, Goregaon East, Mumbai 400063',
      phone: '+91 22 2685 4100',
      email: 'mumbai@technocontrols.in',
      stockAvailable: 'Full Range In-Stock'
    },
    {
      id: 'd-2',
      name: 'Precision Machine & Gear Co.',
      region: 'west',
      city: 'Pune',
      state: 'Maharashtra',
      address: 'Sector 7, Bhosari MIDC, Pune 411026',
      phone: '+91 20 2712 8830',
      email: 'pune.sales@precisiongear.co.in',
      stockAvailable: 'Sensors & Limit Switches'
    },
    {
      id: 'd-3',
      name: 'Southern Switchgear & Controls',
      region: 'south',
      city: 'Bengaluru',
      state: 'Karnataka',
      address: '2nd Cross, Peenya 1st Stage, Industrial Area, Bengaluru 560058',
      phone: '+91 80 2839 5512',
      email: 'bangalore@southernswitch.in',
      stockAvailable: 'Full Range In-Stock'
    },
    {
      id: 'd-4',
      name: 'Industrial Sensing Systems LLP',
      region: 'south',
      city: 'Chennai',
      state: 'Tamil Nadu',
      address: 'Ambattur Industrial Estate, 3rd Main Road, Chennai 600058',
      phone: '+91 44 2625 7790',
      email: 'chennai.support@industrialsensing.com',
      stockAvailable: 'Full Range In-Stock'
    },
    {
      id: 'd-5',
      name: 'Teknic North Regional Distribution',
      region: 'north',
      city: 'New Delhi',
      state: 'Delhi NCR',
      address: 'D-84, Okhla Industrial Area Phase-III, New Delhi 110020',
      phone: '+91 11 4161 3320',
      email: 'delhi@teknicdistributors.com',
      stockAvailable: 'Full Range In-Stock'
    },
    {
      id: 'd-6',
      name: 'Apex Automation & Machine Spares',
      region: 'south',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      address: 'Avarampalayam Road, Ganapathy, Coimbatore 641006',
      phone: '+91 422 253 9081',
      email: 'coimbatore@apexmachinery.co.in',
      stockAvailable: 'Limit Switches & Cables'
    },
    {
      id: 'd-7',
      name: 'Gujarat Industrial Controls',
      region: 'west',
      city: 'Ahmedabad',
      state: 'Gujarat',
      address: 'Phase IV, GIDC Vatva Industrial Zone, Ahmedabad 382445',
      phone: '+91 79 2583 1144',
      email: 'sales@gujaratcontrols.com',
      stockAvailable: 'Full Range In-Stock'
    },
    {
      id: 'd-8',
      name: 'Eastern Engineering & Sensing Co.',
      region: 'east',
      city: 'Kolkata',
      state: 'West Bengal',
      address: 'Netaji Subhash Road, Howrah Industrial Area, Kolkata 711101',
      phone: '+91 33 2666 4590',
      email: 'kolkata@easternengineering.co.in',
      stockAvailable: 'Full Range In-Stock'
    },
    {
      id: 'd-9',
      name: 'Deccan Automation & Switchgear Hub',
      region: 'south',
      city: 'Hyderabad',
      state: 'Telangana',
      address: 'Balanagar Industrial Area, Phase-I, Hyderabad 500037',
      phone: '+91 40 2377 6510',
      email: 'hyderabad@deccanautomation.in',
      stockAvailable: 'Full Range In-Stock'
    },
    {
      id: 'd-10',
      name: 'NCR Industrial Systems & Sensors',
      region: 'north',
      city: 'Faridabad',
      state: 'Haryana',
      address: 'Sector 24, Industrial Area, Faridabad 121005',
      phone: '+91 129 405 8820',
      email: 'faridabad@ncrsensors.com',
      stockAvailable: 'Proximity & Limit Switches'
    },
    {
      id: 'd-11',
      name: 'Baroda Control Gear Solutions',
      region: 'west',
      city: 'Vadodara',
      state: 'Gujarat',
      address: 'Makarpura GIDC Estate, Road No. 4, Vadodara 390010',
      phone: '+91 265 264 3390',
      email: 'vadodara@barodacontrols.com',
      stockAvailable: 'Full Range In-Stock'
    },
    {
      id: 'd-12',
      name: 'Punjab Tooling & Precision Sensors',
      region: 'north',
      city: 'Ludhiana',
      state: 'Punjab',
      address: 'Focal Point, Phase-V, Ludhiana 141010',
      phone: '+91 161 502 4470',
      email: 'ludhiana@punjabtooling.in',
      stockAvailable: 'Full Range In-Stock'
    }
  ],

  // Solution CTA Section
  solution: {
    title: 'Let\'s Find the Right Solution for Your Application.',
    titleHtml: 'Let\'s Find the Right <span class="fairway-serif-italic">Solution</span><br>for Your Application.',
    description: 'Whether you\'re designing a new machine, upgrading an existing system or looking for a reliable replacement, our team can help you identify the right control gear for your requirements.',
    actions: {
      talk: {
        label: 'TALK TO OUR TEAM',
        href: '#contact',
        action: 'open-inquiry'
      },
      explore: {
        label: 'EXPLORE OUR PRODUCTS',
        href: '#products'
      }
    },
    media: {
      src: 'assets/products/prod-nk-switch.png?v=3',
      alt: 'Teknic Euchner NK limit switch control gear'
    }
  },

  // Giant Brand Typography
  brand: {
    line1: 'TEKNIC',
    line2: 'EUCHNER'
  },

  // Footer
  footer: {
    pitch: {
      title: 'Discover our range of<br>industrial equipment.',
      description: 'Crafting durable machinery for reliable<br>performance in tough environments.'
    },
    linkGroups: [
      {
        title: 'COMPANY',
        links: [
          { label: 'About', href: '#about' },
          { label: 'Leadership', href: '#about' },
          { label: 'Clients', href: '#about' },
          { label: 'Pricing', href: '#about' }
        ]
      },
      {
        title: 'EQUIPMENT',
        links: [
          { label: 'Forklifts', href: '#products' },
          { label: 'Loader Systems', href: '#products' },
          { label: 'Industrial Cranes', href: '#products' },
          { label: 'Pallet Handling', href: '#products' }
        ]
      },
      {
        title: 'INFO',
        links: [
          { label: 'Leasing', href: '#about' },
          { label: 'Industries', href: '#applications' },
          { label: 'Projects', href: '#about' },
          { label: 'FAQ', href: '#about' }
        ]
      },
      {
        title: 'SERVICES',
        links: [
          { label: 'Engineering & Design', href: '#why' },
          { label: 'Maintenance & Support', href: '#why' },
          { label: 'Custom Engineering', href: '#why' },
          { label: 'System Design', href: '#why' }
        ]
      }
    ],
    contact: {
      address: '584 4th St, San Francisco,<br>CA 94107, United States',
      email: 'info@example.com',
      phone: '+1 (555) 123-4567'
    },
    copyright: '© 2026 TEKNIC EUCHNER. All Rights Reserved'
  }
};
