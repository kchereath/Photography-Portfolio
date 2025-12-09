# Photo Portfolio - Copilot Instructions

## Project Overview
Minimalist photography portfolio website showcasing both film and digital work. Designed with a dark aesthetic, smooth interactions, and responsive mobile support. Multi-page architecture:
- **`index.html`** - Home/landing page with navigation
- **`film.html`** - Film gallery with Color/B&W toggle
- **`digital.html`** - Digital gallery
- **`style.css`** - Design system (shared across all pages)
- **`carousel.js`** - Image carousel controller
- **`film-toggle.js`** - Film subsection toggle controller

## Architecture & Key Patterns

### Color System
Uses CSS custom properties (`:root` variables) for theming:
- `--bg-color: #0f0f0f` - Deep dark background
- `--text-color: #e0e0e0` - Off-white primary text
- `--text-muted: #888888` - Secondary/muted text
- `--accent-color: #ffffff` - Pure white for highlights/hover

**Pattern**: Always update colors in `:root` variables, not inline hex values.

### Typography & Spacing
- Font stack: System fonts (`-apple-system`, `BlinkMacSystemFont`, etc.)
- Heading hierarchy: `.super-header` (4rem, category titles) → `.sub-header` (1.5rem, subcategories)
- Letter-spacing: 2px for all uppercase text (navigation, headers, section titles)
- Consistent padding: 4% horizontal padding on `.container`

### Gallery Grid System
- Auto-fill responsive grid: `grid-template-columns: repeat(auto-fill, minmax(350px, 1fr))`
- Fixed height for uniformity: `height: 400px` on `.gallery-img`
- `.portrait` class doubles height on desktop (`grid-row: span 2; height: 820px`)
- Mobile fallback: Single column (1fr) with `height: auto` capped at 500px

### Image Effects
- Default: 20% grayscale filter for subtle desaturation
- Hover state: Full color (0% grayscale) + 1.02x scale transform
- Transition: Consistent `all 0.4s ease` timing

### Navigation & Scroll Behavior
- Sticky header: `position: sticky; top: 0; z-index: 100` with subtle 1px border separator
- Smooth scrolling: `scroll-behavior: smooth` on `html`
- Nav links transform to uppercase with 1px letter-spacing
- Mobile nav: Switches to column flex wrap with centered content

## Content Organization

### Page Sections
1. **`index.html`** - Home page with navigation links to Film and Digital galleries
2. **`film.html`** - Film page with toggle buttons for:
   - **Colored** (4 images in carousel)
   - **Black & White** (3 images in carousel)
3. **`digital.html`** - Digital gallery (5 images in carousel)
4. **About/Contact** - Footer present on all pages with bio and email link

**Pattern**: Each subsection is a `<div class="film-subsection">` that toggles visibility based on active button. Only one subsection is visible at a time.

## Critical Implementation Details

### Carousel JavaScript Pattern (`carousel.js`)
- **Class-based architecture**: `Carousel` class manages state and DOM updates for each film roll
- **Auto-initialization**: On `DOMContentLoaded`, script finds all `.carousel` elements and instantiates one `Carousel` per element
- **Navigation methods**: `next()`, `prev()`, `goToSlide(index)` update `currentIndex` and call `updateCarousel()`
- **Keyboard support**: Arrow keys (Left/Right) navigate between images; focus is maintained via `tabindex="0"` on carousel
- **Indicator sync**: Active indicator always reflects `currentIndex`; clicking indicators jumps to that slide

**HTML Structure Example:**
```html
<div class="carousel" tabindex="0">
    <div class="carousel-container">
        <img src="..." alt="Photo 1" class="carousel-img active">
        <img src="..." alt="Photo 2" class="carousel-img">
    </div>
    <button class="carousel-prev">‹</button>
    <button class="carousel-next">›</button>
    <div class="carousel-indicators">
        <span class="indicator active"></span>
        <span class="indicator"></span>
    </div>
</div>
```

### Film Toggle JavaScript Pattern (`film-toggle.js`)
- **Lightweight module**: Attaches click handlers to `.toggle-btn` buttons
- **Toggle logic**: Clicking a button removes `.active` from all buttons/subsections, then adds `.active` to clicked button and corresponding `#section`
- **Section IDs**: Each subsection uses `id="colored"` and `id="bw"` matching the `data-section` attribute on buttons
- **Visual feedback**: `.active` button shows filled style; `.active` subsection displays with fade-in animation

**HTML Structure Example:**
```html
<div class="film-toggle">
    <button class="toggle-btn active" data-section="colored">Colored</button>
    <button class="toggle-btn" data-section="bw">Black & White</button>
</div>

<div id="colored" class="film-subsection active">
    <!-- carousel here -->
</div>
<div id="bw" class="film-subsection">
    <!-- carousel here -->
</div>
```

### Image URLs (Placeholder Strategy)
All images use Unsplash URLs with query parameters:
- `q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3`
- **Replace all URLs with actual portfolio images** - maintain same dimensions
- Alt text must describe image (e.g., "Film Photo 1", "BW Photo 2")

### Mobile Responsiveness Breakpoint
- **Breakpoint**: `768px` (tablet and down switches to mobile layout)
- Mobile adjustments: navbar flexes to column, nav-links wrap, super-header reduces to 3rem, grid becomes 1 column
- Gallery images on mobile: auto height up to 500px max

### Customization Placeholders
- `YOUR NAME` appears in `<title>`, `.logo`, and `footer .copyright` - replace consistently
- `[Location]` in about bio
- `your@email.com` in contact link

## Development Workflow

### Local Viewing
Open `index.html` in browser (no build step required - vanilla HTML/CSS).

### Common Modifications
1. **Update colors**: Edit `:root` variables in `style.css`
2. **Add/remove carousel images**: Add/remove `<img>` elements in `.carousel-container`; add matching `<span class="indicator">` in `.carousel-indicators`
3. **Adjust carousel dimensions**: Change `.carousel-container` height (currently 400px desktop, 300px mobile)
4. **Modify transition speed**: Change `transition` duration in `.carousel-img` (currently 0.5s) or `.carousel-prev/next` (currently 0.3s)
5. **Mobile fine-tuning**: Adjust breakpoint or media query values for specific devices

### Hover/Interaction Testing
Test hover states on `.gallery-img`, `.nav-links a`, and `.contact-link` across desktop and touch devices (hover states should degrade gracefully on mobile).

## Avoid Common Pitfalls

- **Don't hardcode colors**: Use CSS variables for consistency
- **Don't remove grayscale filter**: It's intentional for the aesthetic - adjust opacity, don't remove
- **Don't break the sticky header**: Preserve `position: sticky` and `z-index: 100` on navbar
- **Don't remove `.active` classes**: These drive the carousel visibility; always include `.carousel-img.active` on first image and `.indicator.active` on first indicator
- **Don't modify carousel container heights arbitrarily**: Current 400px height (desktop) / 300px (mobile) is intentional; changes affect visual hierarchy
- **Don't nest carousel containers**: Only one `.carousel-container` per `.carousel`
- **Index/indicator mismatch**: Always keep indicator count equal to image count; the JavaScript uses array indices
