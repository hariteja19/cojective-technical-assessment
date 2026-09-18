# TEKNIC EUCHNER — Desktop Webpage Technical Assessment

A high-fidelity desktop webpage reproduction of the **TEKNIC EUCHNER** website based on the provided Figma design specification.

## Tech Stack
* **HTML5**: Semantic document structure
* **CSS3**: Vanilla CSS design system, CSS variables, flexbox & CSS grid
* **JavaScript**: Pure Vanilla JavaScript for minimal, clean interactions

## Project Structure
```
Cojective-Technical-Assessment/
├── index.html               # Main HTML entry point
├── css/
│   ├── reset.css            # Modern CSS reset
│   └── style.css            # Layout, typography tokens, component styles
├── js/
│   └── main.js              # Vanilla JS entry point
├── assets/
│   ├── images/              # Hero, intro, and brand image assets
│   ├── products/            # Product showcase images
│   ├── applications/        # Industrial application photography
│   └── icons/               # SVG vectors and interface icons
└── README.md                # Project documentation and local running guide
```

## Running Locally

### Option 1: Direct Browser Launch
Open `index.html` directly in any modern desktop web browser (e.g., Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (Python)
Run a lightweight local server from the project directory:
```bash
python -m http.server 3000
```
Then visit [http://localhost:3000](http://localhost:3000) in your browser.

### Option 3: Node.js / npx `serve`
```bash
npx serve .
```
