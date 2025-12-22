# DESIGN_SYSTEM.md
## RamosDigital - Visual & UI Architecture Guide

> **Purpose**: A style guide for developers joining the project. Explains why the site looks and feels the way it does.

---

## 1. Styling Engine (Tailwind CSS v4)

### 1.1 Theme Configuration

This project uses **Tailwind CSS v4** with the new `@theme inline` directive in `globals.css` instead of a `tailwind.config.ts` file.

```css
/* app/globals.css */
@import "tailwindcss";

@theme inline {
  /* Colors */
  --color-dark-900: #0A0A0B;
  --color-dark-800: #111113;
  --color-dark-700: #18181B;
  --color-dark-600: #1F1F23;
  
  --color-electric-400: #60A5FA;
  --color-electric-500: #3B82F6;
  --color-electric-600: #2563EB;
  
  --color-amber-400: #FBBF24;
  --color-amber-500: #F59E0B;
  
  /* Fonts */
  --font-sans: var(--font-inter);
  --font-mono: var(--font-jetbrains-mono);
  --font-heading: var(--font-inter);
}
```

### 1.2 Custom Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `dark-900` | `#0A0A0B` | Primary background (body, sections) |
| `dark-800` | `#111113` | Elevated surfaces (cards) |
| `dark-700` | `#18181B` | Inputs, subtle backgrounds |
| `dark-600` | `#1F1F23` | Borders, dividers |
| `electric-400` | `#60A5FA` | Primary accent (links, highlights) |
| `electric-500` | `#3B82F6` | Buttons, icons |
| `amber-400` | `#FBBF24` | Secondary accent (warnings, projects) |
| `emerald-400` | (Tailwind default) | Success states, "recommended" badges |

**Usage Example:**
```tsx
<span className="text-electric-400">Accent Text</span>
<div className="bg-dark-800">Elevated Card</div>
```

---

### 1.3 Typography Setup

| Font | Variable | Usage |
|------|----------|-------|
| **Inter** | `--font-inter` | Body text, headings |
| **JetBrains Mono** | `--font-jetbrains-mono` | Code, monospace elements |

**Loading Strategy** (in `layout.tsx`):
```tsx
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",       // FOUT prevention
  adjustFontFallback: false,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});
```

- `display: "swap"`: Shows fallback font immediately, swaps when loaded.
- CSS variables are applied to `<body>` and consumed via `font-sans`, `font-mono`, `font-heading`.

---

### 1.4 Custom Animations

| Animation | Duration | Purpose |
|-----------|----------|---------|
| `revealUp` | 0.8s | Section entrance (fade + slide up) |
| `fadeDown` | N/A | Navbar entrance |
| `slideUpFade` | N/A | Toast notifications |
| `infinite-scroll` | 80s | Marquee horizontal scroll |
| `spin` | 0.6s | Loading spinners |

**Key Definitions:**
```css
@keyframes revealUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes infinite-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}

.animate-infinite-scroll {
  animation: infinite-scroll 80s linear infinite;
}
```

---

## 2. Component Architecture

### 2.1 Folder Organization

```
app/components/
├── home/       # Homepage-specific sections (HeroSection, AboutSection, etc.)
├── web/        # Web Services page sections (MarqueeSection, PricingSection, etc.)
├── ui/         # Reusable primitives (Icons, TechIcon)
├── Footer.tsx  # Global footer
├── Navbar.tsx  # Global navigation
└── LenisProvider.tsx  # Smooth scroll wrapper
```

**Why this structure?**
- **`home/` & `web/`**: Page-specific components. Clear ownership, easy to find.
- **`ui/`**: Shared, generic components with no business logic.
- **Root-level**: Global layout components used across all pages.

---

### 2.2 UI Primitives (`app/components/ui/`)

| File | Contents | Library? |
|------|----------|----------|
| `Icons.tsx` | `ArrowUpRightIcon`, `GithubIcon`, `LinkedinIcon`, `MailIcon` | **Custom raw SVGs** |
| `TechIcon.tsx` | Tech stack icon component | Custom |

**No external icon library** (no Lucide, Heroicons). All icons are hand-crafted SVGs for maximum control:

```tsx
// Icons.tsx - Custom SVG component pattern
export function ArrowUpRightIcon({ className, ...props }: IconProps) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
    );
}
```

**Benefits:**
- Zero external dependencies for icons
- Full control over stroke width, colors, animations
- Tree-shaking friendly (only used icons are bundled)

---

## 3. Visual Effects & Animations

### 3.1 Animation Libraries Used

| Library | Purpose | Components |
|---------|---------|------------|
| **Framer Motion** | Declarative entrance animations | `Navbar`, `HeroSection` |
| **Lenis** | Smooth scroll physics | Global (`LenisProvider`) |
| **CSS Keyframes** | Marquee, loading states | `MarqueeSection`, buttons |

**Framer Motion Example (HeroSection):**
```tsx
<motion.h1
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
>
  Martim Ramos<span className="text-electric-400">.</span>
</motion.h1>
```

**Lenis Smooth Scroll (LenisProvider.tsx):**
```tsx
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential decay
    touchMultiplier: 2,
    infinite: false,
});
```

---

### 3.2 Marquee (Text Scroll) — How It Works

**The Illusion:**
Two identical lists scroll left infinitely. When list 1 exits the viewport, list 2 takes its place. Because they're identical and the animation resets at `-100%`, the loop is seamless.

```
 ┌───────────────────────────────────────────────────────────────┐
 │  [List 1]  [List 1]  [List 1]  │  [List 2]  [List 2]  [List 2]  │
 │  ◀──── scrolls left ────────  │  ◀──── scrolls left ────────  │
 └───────────────────────────────────────────────────────────────┘
                                 │
                          Viewport Edge
```

**Implementation (MarqueeSection.tsx):**
```tsx
<div className="flex w-full overflow-hidden">
    {/* List 1 */}
    <ul className="flex items-center gap-24 pr-24 shrink-0 animate-infinite-scroll">
        {integrations.map(...)}
    </ul>
    
    {/* List 2 (Duplicate) */}
    <ul className="flex items-center gap-24 pr-24 shrink-0 animate-infinite-scroll" aria-hidden="true">
        {integrations.map(...)}
    </ul>
</div>
```

**CSS:**
```css
@keyframes infinite-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}

.animate-infinite-scroll {
  animation: infinite-scroll 80s linear infinite;
}
```

**Key Details:**
- `aria-hidden="true"` on duplicate: Screen readers only read content once.
- `shrink-0`: Prevents flex containers from shrinking the lists.
- `80s` duration: Slow, subtle movement for elegance.

---

### 3.3 Spotlight Effect (HeroSection)

A mouse-following radial gradient creates a "spotlight" that tracks the cursor.

```tsx
const handleMouseMove = useCallback((e) => {
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    spotlightRef.current.style.setProperty("--mouse-x", x + "%");
    spotlightRef.current.style.setProperty("--mouse-y", y + "%");
}, []);

<div
  style={{
    background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59,130,246,0.15), transparent 40%)"
  }}
/>
```

---

## 4. Global Layout Elements

### 4.1 Navbar Styling

| Property | Value | Purpose |
|----------|-------|---------|
| Position | `fixed top-4 left-1/2 -translate-x-1/2` | Centered, floating pill |
| Background | `bg-[#0A0A0B]/80 backdrop-blur-xl` | Semi-transparent with blur |
| Border | `border border-white/10 rounded-full` | Subtle glassy edge |
| Shadow | `shadow-2xl shadow-black/50` | Depth without heaviness |

### 4.2 Footer Styling

| Property | Value |
|----------|-------|
| Border Top | `border-t border-white/5` |
| Background | Inherits `bg-[#0A0A0B]` from body |
| Social Icons | `w-12 h-12 rounded-xl bg-white/5 border border-white/10` |

---

### 4.3 Dark Mode — Hardcoded

**This site is dark-mode only.** There is no light mode toggle.

The dark aesthetic is achieved through:
1. **Body background**: `bg-[#0A0A0B]` (near-black)
2. **Text defaults**: `text-white` on body
3. **Opacity utilities**: `text-white/50`, `text-white/30` for hierarchy
4. **Glass effects**: `bg-white/5`, `border-white/10` for cards

---

## 5. Utility Classes Reference

### Custom Glass Card
```css
.glass-card {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(8px);
}

.glass-card:hover {
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 
              0 0 40px rgba(96, 165, 250, 0.05);
}
```

### Noise Texture Overlay
A subtle film-grain effect applied to the body:
```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,..."); /* Fractal noise SVG */
}
```

### Custom Scrollbar
```css
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: #0A0A0B; }
::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 3px; }
```

---

## 6. Quick Reference: Key Visual Tokens

| Concept | Implementation |
|---------|----------------|
| Primary accent | `text-electric-400` / `bg-electric-500` |
| Secondary accent | `text-amber-400` |
| Success/positive | `text-emerald-400` |
| Muted text | `text-white/50`, `text-white/30` |
| Elevated surface | `glass-card` + `border-white/10` |
| Entrance animation | Framer Motion `initial`/`animate` |
| Scroll animation | Lenis smooth scroll |
| Infinite loop | CSS `@keyframes infinite-scroll` |

---

> **Last Updated**: December 2024  
> **Author**: Generated by Antigravity Design Audit
