# ARCHITECTURE.md
## RamosDigital - Technical Architecture Guide

> **Purpose**: Knowledge transfer document for developers onboarding to this codebase. Explains the "why" behind architectural decisions, particularly the `next-intl` internationalization migration.

---

## 1. Project Tree Overview

```
ramos-digital-v2/
├── app/                        # Next.js App Router (Core Application Logic)
│   ├── [locale]/               # Dynamic locale segment (i18n routing)
│   │   ├── layout.tsx          # Root layout with NextIntlClientProvider
│   │   ├── page.tsx            # Homepage (Server Component)
│   │   └── web/                # Web Services page route
│   │       └── page.tsx
│   ├── components/             # Reusable UI components
│   │   ├── home/               # Homepage-specific sections
│   │   ├── web/                # Web page sections
│   │   └── ui/                 # Shared UI primitives (Icons, etc.)
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions
│   └── globals.css             # Global styles & Tailwind config
├── i18n/                       # Internationalization configuration
│   ├── request.ts              # Server-side locale/message loading
│   └── navigation.ts           # Client-side navigation wrappers
├── messages/                   # Translation JSON files
│   ├── en.json                 # English translations
│   └── pt.json                 # Portuguese translations
├── middleware.ts               # Next.js middleware for locale detection
├── next.config.ts              # Next.js configuration
└── public/                     # Static assets
```

### Folder Responsibilities

| Folder | Responsibility |
|--------|----------------|
| `app/[locale]` | All page routes wrapped in the dynamic `[locale]` segment. The `layout.tsx` here is the root of the app. |
| `i18n/` | Contains `next-intl` configuration. `navigation.ts` exports locale-aware `Link`, `useRouter`. |
| `messages/` | JSON files with key-value pairs for translations. One file per locale. |
| `middleware.ts` | Intercepts requests at the edge to detect/redirect locale. |

---

## 2. Core Infrastructure (The Engine)

### 2.1 `middleware.ts` - The Gatekeeper

```typescript
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['en', 'pt'],      // Supported locales
    defaultLocale: 'en'         // Fallback when no match
});

export const config = {
    matcher: ['/', '/(pt|en)/:path*']
};
```

**Line-by-Line Analysis:**

1. **`createMiddleware`**: Factory function from `next-intl` that generates a middleware handler.
2. **`locales`**: Array of supported language codes. Must match file names in `messages/`.
3. **`defaultLocale`**: Used when the user's `Accept-Language` header doesn't match any supported locale.
4. **`matcher`**: A regex pattern telling Next.js *which* requests this middleware should intercept.
   - `'/'`: Match the root path.
   - `'/(pt|en)/:path*'`: Match any path prefixed with `/pt/` or `/en/`.

**What it does:**
- On a request to `/`, it checks the user's browser `Accept-Language` header.
- If it matches `pt`, redirects to `/pt`. Otherwise, defaults to `/en`.
- On a request to `/en/web`, it passes through, extracting `en` as the locale.

---

### 2.2 `i18n/request.ts` - The Message Loader

```typescript
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !['en', 'pt'].includes(locale)) {
        locale = 'en';
    }

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
```

**Line-by-Line Analysis:**

1. **`getRequestConfig`**: A Next.js server-side helper. Runs once per request.
2. **`requestLocale`**: Extracted from the `[locale]` segment in the URL.
3. **Validation**: If the locale is invalid or missing, fall back to `'en'`.
4. **Dynamic Import**: `import(`../messages/${locale}.json`)` loads the correct translation file at runtime. The `.default` is needed because of how ES modules export JSON.
5. **Return Value**: The `locale` and `messages` object are provided to the `next-intl` context.

**Why this file?**
`next-intl` requires a "request configuration" to know which locale is active on the server and what messages to use. Without this, `useTranslations` on the server would have no data.

---

### 2.3 `i18n/navigation.ts` - The Navigation Wrappers

```typescript
import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['en', 'pt'],
    defaultLocale: 'en'
});

export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);
```

**Why Wrap `next/navigation`?**

The standard `Link` from Next.js doesn't know about i18n. If you're on `/en/web` and use `<Link href="/">`, it would go to `/` (ambiguous) instead of `/en/`.

The `next-intl` wrapped components:
- **`Link`**: Automatically prepends the current locale to `href`.
- **`useRouter`**: The `router.replace(path, { locale: 'pt' })` syntax allows changing locale without a full page reload.
- **`usePathname`**: Returns the path *without* the locale prefix (e.g., `/web` instead of `/en/web`), making route detection logic simpler.

---

## 3. The Routing Layer (`app/[locale]/`)

### 3.1 `layout.tsx` - The Provider

```typescript
// Key Imports
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {/* App content */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Why is `NextIntlClientProvider` here?**

- **Server Components** can use `getTranslations` (a server-side function) directly.
- **Client Components** (marked with `"use client"`) cannot access server-only functions. They need the translations passed down via React Context.
- The `messages` prop contains the *entire* translation file for the current locale. It's serialized and sent to the client.

**The `html lang={locale}` attribute** is crucial for:
1. SEO (search engines know the page language).
2. Accessibility (screen readers use it).

---

### 3.2 `page.tsx` - Server Component Behavior

```typescript
import { HeroSection } from "@/app/components/home/HeroSection";
// ... other imports

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      {/* ... */}
    </>
  );
}
```

**Key Observation**: No `"use client"` directive.

This means `HomePage` is a **React Server Component (RSC)**.

**Benefits:**
- Zero JavaScript sent to the client for this specific component.
- Can `await` data directly (though not used here).
- Faster initial page load (Time-to-First-Byte).

**Why do child components have `"use client"`?**
Interactivity (animations, state, event handlers) requires client-side JavaScript. The server renders the initial HTML, and the client "hydrates" the interactive parts.

---

## 4. Component Patterns (Case Studies)

### 4.1 `Navbar.tsx` - The Control Center

```typescript
"use client"; // Interactive component

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
```

#### Hook Usage Breakdown

| Hook | Source | Purpose |
|------|--------|---------|
| `useTranslations` | `next-intl` | Access translation keys (`t("nav_home")`). |
| `useLocale` | `next-intl` | Get current locale string (`"en"` or `"pt"`). |
| `usePathname` | `@/i18n/navigation` | Get current path *without* locale prefix. |
| `useRouter` | `@/i18n/navigation` | Programmatic navigation with locale support. |

#### Language Switcher Logic

```typescript
const switchLanguage = useCallback((nextLocale: string) => {
    startTransition(() => {
        router.replace(pathname, { locale: nextLocale });
    });
}, [pathname, router]);
```

- **`router.replace`**: Changes the locale segment in the URL (e.g., `/en/web` → `/pt/web`).
- **`startTransition`**: Marks the navigation as a non-blocking transition, preventing UI jank.
- **`pathname`**: Used to stay on the same route when switching language.

#### Smart Navigation Button

```typescript
const isWebPage = pathname.startsWith("/web");
const navLinkDest = isWebPage ? "/" : "/web";
const navLinkText = isWebPage ? t("nav_home") : t("nav_work");
```

- Dynamically changes the center navigation link based on current page.
- On `/web`: Shows "Home" and links to `/`.
- On `/` (Home): Shows "Web Services" and links to `/web`.

---

### 4.2 `ProjectsSection.tsx` - The Tailwind Static Map Pattern

#### The Problem: Dynamic Class Purging

Tailwind CSS uses a build-time "purge" step to remove unused classes. If you write:

```typescript
// ❌ BAD - Tailwind can't see this at build time
const color = "electric";
<div className={`bg-${color}-500`} />
```

Tailwind's scanner sees `bg-${color}-500`, not `bg-electric-500`. The class is purged, and the style disappears in production.

#### The Solution: Static Class Map

```typescript
// ✅ GOOD - All classes are statically defined
const themes = {
    electric: {
        borderHover: "hover:border-electric-500/30",
        bgGradient: "bg-gradient-to-br from-electric-500/20 ...",
        // ...
    },
    amber: { /* ... */ },
    emerald: { /* ... */ },
};

// Usage
const theme = themes[project.theme]; // project.theme is "electric"
<div className={theme.bgGradient} />
```

**Why this works:**
- Tailwind scans the source code and sees `"hover:border-electric-500/30"` as a literal string.
- The class is included in the final CSS bundle.

---

## 5. Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        USER REQUEST: /pt/web                            │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  MIDDLEWARE.TS                                                          │
│  ────────────                                                           │
│  1. Matcher: ['/', '/(pt|en)/:path*'] → MATCH                          │
│  2. Extract locale: 'pt'                                                │
│  3. Set `x-next-intl-locale` header                                     │
│  4. Pass to Next.js router                                              │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  I18N/REQUEST.TS (Server-Side)                                          │
│  ─────────────────────────────                                          │
│  1. getRequestConfig() called                                           │
│  2. requestLocale = 'pt'                                                │
│  3. import('../messages/pt.json')                                       │
│  4. Return { locale: 'pt', messages: { ... } }                          │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  APP/[LOCALE]/LAYOUT.TSX (Server Component)                             │
│  ────────────────────────────────────────────                           │
│  1. params.locale = 'pt'                                                │
│  2. getMessages() → messages object from request.ts                     │
│  3. <html lang="pt">                                                    │
│  4. <NextIntlClientProvider messages={...}>                             │
│     └── Injects messages into React Context                             │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  APP/[LOCALE]/WEB/PAGE.TSX (Server Component)                           │
│  ─────────────────────────────────────────────                          │
│  1. Render <HeroSection />, <MarqueeSection />, etc.                    │
│  2. These are Client Components ("use client")                          │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  CLIENT COMPONENT (e.g., Navbar.tsx)                                    │
│  ────────────────────────────────────                                   │
│  1. const t = useTranslations();                                        │
│  2. t("nav_home") → Looks up "nav_home" in Context                      │
│  3. Context.messages["nav_home"] → "Início" (from pt.json)              │
│  4. Render: <span>Início</span>                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Appendix: Quick Reference

### Translation Key Conventions

| Prefix | Usage | Example |
|--------|-------|---------|
| `nav_` | Navbar links | `nav_home`, `nav_work` |
| `hero_` | Hero section text | `hero_title`, `hero_cta` |
| `about_` | About section | `about_edu_title` |
| `project_` | Project cards | `project_ramos_desc` |
| `footer_` | Footer content | `footer_tagline` |
| `toast_` | Toast notifications | `toast_email_copied` |

### Import Paths

```typescript
// Navigation (use these, NOT next/navigation)
import { Link, usePathname, useRouter } from "@/i18n/navigation";

// Translations
import { useTranslations, useLocale } from "next-intl";

// Server-side messages
import { getMessages, getTranslations } from "next-intl/server";
```

---

> **Last Updated**: December 2024
> **Author**: Generated by Antigravity Architecture Audit

