---
name: BookWorm
colors:
  surface: '#fafaf4'
  surface-dim: '#dadad5'
  surface-bright: '#fafaf4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4ee'
  surface-container: '#eeeee9'
  surface-container-high: '#e8e8e3'
  surface-container-highest: '#e3e3de'
  on-surface: '#1a1c19'
  on-surface-variant: '#414844'
  inverse-surface: '#2f312e'
  inverse-on-surface: '#f1f1ec'
  outline: '#717973'
  outline-variant: '#c1c8c2'
  surface-tint: '#3f6653'
  primary: '#012d1d'
  on-primary: '#ffffff'
  primary-container: '#1b4332'
  on-primary-container: '#86af99'
  inverse-primary: '#a5d0b9'
  secondary: '#53634e'
  on-secondary: '#ffffff'
  secondary-container: '#d3e5cb'
  on-secondary-container: '#576752'
  tertiary: '#401b1b'
  on-tertiary: '#ffffff'
  tertiary-container: '#5a302f'
  on-tertiary-container: '#d29895'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1ecd4'
  primary-fixed-dim: '#a5d0b9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#274e3d'
  secondary-fixed: '#d6e8ce'
  secondary-fixed-dim: '#baccb3'
  on-secondary-fixed: '#111f0f'
  on-secondary-fixed-variant: '#3b4b38'
  tertiary-fixed: '#ffdad8'
  tertiary-fixed-dim: '#f5b7b4'
  on-tertiary-fixed: '#331111'
  on-tertiary-fixed-variant: '#673a39'
  background: '#fafaf4'
  on-background: '#1a1c19'
  surface-variant: '#e3e3de'
typography:
  display-lg:
    fontFamily: Source Serif 4
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Source Serif 4
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 24px
  gutter: 16px
  shelf-gap: 32px
---

## Brand & Style
The design system for this product is centered on the concept of "Digital Sanctuary." It targets thoughtful readers who value focus and high-utility tools. The aesthetic blends **Corporate Modern** structure with **Minimalist** clarity, ensuring the interface recedes to let the content lead. 

The emotional response should be one of calm intelligence. By utilizing generous whitespace and a sophisticated "bookshelf" logic, the UI avoids the cluttered, utility-first look of traditional file managers in favor of a premium, editorial experience.

## Colors
The palette is rooted in a "Forest & Parchment" theme to reduce eye strain and evoke a sense of quality.
- **Primary (Forest Green):** Used for key actions, progress indicators, and active navigation states. It represents stability and focus.
- **Secondary (Soft Sage):** Used for subtle backgrounds, chip components, and secondary highlights. It provides a soft contrast to the primary green.
- **Background (Off-White):** A meticulously chosen soft white to prevent screen glare during long reading sessions.
- **Neutral (Charcoal):** Used for primary text. Avoid pure black to maintain a softer, more premium "ink on paper" feel.

## Typography
This system employs a dual-font strategy:
- **Source Serif 4:** Chosen for the "Reading Mode" and major headlines. Its traditional, authoritative character mimics high-end publishing.
- **Inter:** Used for the functional UI (navigation, settings, metadata). Its systematic and neutral nature ensures clear communication without distracting from the book content.

**Usage Note:** All book titles and long-form reading content must use the Serif face. All functional labels, counters, and buttons must use the Sans-Serif face.

## Layout & Spacing
The layout follows a **Fluid Grid** model optimized for the verticality of reading. 
- **The Bookshelf Grid:** On mobile, use a 2-column layout for book covers. On tablet/desktop, scale to a 4 or 6-column grid.
- **Margins:** 24px horizontal margins are maintained on mobile to provide "breathing room" for the thumbs.
- **Rhythm:** An 8px base unit governs all spacing. Vertical spacing between book categories should be triple the base unit (24px) to create clear content clusters.

## Elevation & Depth
Depth is communicated through **Tonal Layers** and extremely soft **Ambient Shadows**.
- **Level 0 (Base):** Off-white background.
- **Level 1 (Cards):** Pure white surface with a 2px blur, 4% opacity charcoal shadow. This makes book covers feel like they are resting lightly on a surface.
- **Level 2 (Floating Action Buttons/Bottom Sheets):** These use a slightly more pronounced shadow (8px blur, 8% opacity) to indicate they are "hovering" over the content for quick access.
- **Backdrop:** Use a soft 4px background blur for the "Library" view when a book detail bottom sheet is active.

## Shapes
The shape language is **Rounded**, reflecting the soft edges of a physical book. 
- **Cards:** Use `rounded-lg` (16px) for book covers and container cards.
- **Buttons:** Use `rounded-xl` (24px) or full pill-shape for the Floating Action Button to distinguish it from the content grid.
- **Input Fields:** Use `rounded-lg` with a subtle 1px border in the secondary color.

## Components
- **The Digital Bookshelf (Card):** A vertical card with a 16px corner radius. The cover image should have a subtle inner-glow to mimic the spine of a book. Metadata (title, author) sits below the card in Inter 14px.
- **Floating Action Button (FAB):** A large, Forest Green circle containing a "Plus" or "Camera" icon. It should be positioned in the bottom right with significant padding from the screen edge.
- **Bottom Sheets:** Used for book details and settings. They feature a top centered "handle" and `rounded-xl` top corners.
- **Progress Chips:** Small, Sage Green pills that show "75% Read" inside the bookshelf view.
- **Reading Toolbar:** A minimal, translucent bottom bar that appears on tap. It should contain "Table of Contents," "Search," "Annotations," and "Appearance" icons.
- **Navigation:** Use a bottom navigation bar for the primary destinations (Library, Discover, Profile) with subtle haptic feedback on selection.