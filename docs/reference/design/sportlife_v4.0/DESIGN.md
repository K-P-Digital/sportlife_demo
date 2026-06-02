---
name: SPORTLIFE v4.0
colors:
  surface: '#141218'
  surface-dim: '#141218'
  surface-bright: '#3b383e'
  surface-container-lowest: '#0f0d13'
  surface-container-low: '#1d1b20'
  surface-container: '#211f24'
  surface-container-high: '#2b292f'
  surface-container-highest: '#36343a'
  on-surface: '#e6e0e9'
  on-surface-variant: '#cbc4d2'
  inverse-surface: '#e6e0e9'
  inverse-on-surface: '#322f35'
  outline: '#948e9c'
  outline-variant: '#494551'
  surface-tint: '#cfbcff'
  primary: '#cfbcff'
  on-primary: '#381e72'
  primary-container: '#6750a4'
  on-primary-container: '#e0d2ff'
  inverse-primary: '#6750a4'
  secondary: '#cdc0e9'
  on-secondary: '#342b4b'
  secondary-container: '#4d4465'
  on-secondary-container: '#bfb2da'
  tertiary: '#e7c365'
  on-tertiary: '#3e2e00'
  tertiary-container: '#c9a74d'
  on-tertiary-container: '#503d00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#cfbcff'
  on-primary-fixed: '#22005d'
  on-primary-fixed-variant: '#4f378a'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#cdc0e9'
  on-secondary-fixed: '#1f1635'
  on-secondary-fixed-variant: '#4b4263'
  tertiary-fixed: '#ffdf93'
  tertiary-fixed-dim: '#e7c365'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#141218'
  on-background: '#e6e0e9'
  surface-variant: '#36343a'
typography:
  display-xl:
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg:
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h2:
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  h3:
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.5'
  body-md:
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
  caption:
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  tag:
    fontSize: 9px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
---

## Brand & Style
This design system is built for the high-performance athlete who demands data density without sacrificing aesthetic clarity. The style merges **Minimalism** with **High-Contrast Athleticism**, prioritizing precision and "at-a-glance" readability.

The visual language communicates confidence through a deep, monochromatic foundation, punctuated by a singular, high-energy accent. It evokes a "Pro-Tools" feel—where every pixel is considered and every data point is accessible. The emotional response is one of focus, discipline, and premium capability.

## Colors
The palette utilizes a "Deep Dark Stack" to create hierarchy through tonal layering rather than shadows. 

- **Primary Base:** #050505 is the absolute floor.
- **Surface Elevation:** Surfaces sit at #0F0F0F, with interactive inputs and cards rising to #161616.
- **The Glow:** #D4FF4F (Electric Lime) is the exclusive brand accent. 
- **Constraint:** Maintain a strict "Maximum 2 Lime Accents" rule per screen to preserve the premium feel and ensure the accent remains meaningful for calls to action or critical KPIs.

## Typography
This design system relies exclusively on **Inter** to maintain a systematic, utilitarian aesthetic. 

**Numerical Integrity:** All numbers must use **tabular figures** (`tnum`) to ensure columns of data and timers remain perfectly aligned during activity. 

**Currency Formatting:** Use the specific format "₺2.600" for all financial or point-based transactions. 

**Weight Usage:**
- **ExtraBold (800):** Reserved for Display scales and critical performance metrics.
- **Semibold (600):** Used for Headlines and Primary Button labels.
- **Medium (500):** Used for navigation items and interactive labels.
- **Regular (400):** Used for all instructional and descriptive body copy.

## Layout & Spacing
The layout is governed by an **8px baseline grid**, ensuring mathematical harmony between all elements. 

- **Page Margins:** Fixed 16px horizontal margins for mobile views.
- **Data Density:** Use the 8px and 16px increments to pack information tightly within cards while maintaining "Generous" touch targets.
- **Grid Model:** Use a fluid column system for cards, but maintain fixed vertical rhythms to support the "Considered" personality of the brand.

## Elevation & Depth
Depth is created through **Tonal Layering** and **Backdrop Blurs** rather than traditional drop shadows.

- **The Floor:** Page background is #050505.
- **Level 1 (Cards):** Surfaces use #0F0F0F with #262626 borders.
- **Level 2 (Inputs/Active):** Surfaces use #161616.
- **Level 3 (Navigation):** The 5-tab bar uses #0F0F0F with a high-saturation backdrop blur (20px+) to create a sense of glass-like suspension over the content.
- **Borders:** Use #383838 for "strong" borders on interactive elements or separators that require high definition.

## Shapes
The shape language is varied to communicate function. 

- **Structural (16px):** Standard cards use a 16px radius to feel modern and accessible.
- **Interactive (12px):** Input fields use a slightly tighter 12px radius to differentiate from container cards.
- **Utility (4px):** Performance tags and small badges use a sharp 4px radius, emphasizing precision.
- **Organic (28px):** Floating pills and primary action buttons use full-round radii (up to 28px) for a "warm" and ergonomic feel.

## Components

### Buttons
- **Primary Button:** 54px height, Full-width or auto-layout. Background: #D4FF4F. Text: #050505 (Semibold). 28px radius.
- **Secondary Button:** 54px height. Background: #161616. Border: #383838. Text: #FFFFFF. 28px radius.

### Input Fields
- **Container:** 54px height. Background: #161616. Radius: 12px.
- **Text:** Inter Regular 16px. Placeholder color: #A1A1A1.
- **Focus State:** Border color shifts to #383838 with no lime glow.

### Navigation (Tab Bar)
- **Background:** #0F0F0F with backdrop blur.
- **Height:** 84px (including safe area).
- **Items:** 5 tabs (Ana Sayfa, Keşfet, Antrenman, Favoriler, Profil). 
- **Active State:** Icon/Text color becomes #D4FF4F.

### Cards & Lists
- **Standard Card:** Background #0F0F0F, Radius 16px, Border 1px #262626.
- **Data Rows:** 64px minimum height. 1px bottom border #262626. Tabular figures for all metrics.

### Chips & Tags
- **Performance Tag:** Background #161616, Radius 4px, Text Inter Tag (9px) #FFFFFF.
- **Active Chip:** Background #D4FF4F, Text #050505.