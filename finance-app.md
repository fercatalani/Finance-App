# 📘 Finance App

## Overview

Finance App is a financial management application designed to help users track their finances, including income, expenses, and bills. This document outlines the current architecture, technology stack, and key features of the application.

## Folder Structure

```
├── 📁 app
│   ├── 📁 (private)
│   │   ├── 📁 dashboard
│   │   │   ├── ⚙️ dashboard.copy.json
│   │   │   └── 📄 page.tsx
│   │   └── 📄 layout.tsx
│   ├── 📁 (public)
│   │   ├── 📁 forgot-password
│   │   │   ├── 📁 enter-code
│   │   │   ├── 📁 reset-password
│   │   │   ├── ⚙️ forgotPassword.copy.json
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 sign-in
│   │   │   ├── 📄 page.tsx
│   │   │   └── ⚙️ signIn.copy.json
│   │   ├── 📁 sign-up
│   │   │   ├── 📄 page.tsx
│   │   │   └── ⚙️ signUp.copy.json
│   │   └── 📄 layout.tsx
│   ├── 📁 assets
│   │   └── 📁 images
│   │       └── 🖼️ image.gif
│   ├── 📁 components
│   │   ├── 📄 Button.tsx
│   │   └── 📄 Input.tsx
│   ├── 📄 AuthProvider.tsx
│   ├── 🎨 globals.css
│   ├── 📄 layout.tsx
│   └── 📄 page.tsx
├── 📁 lib
│   └── 📄 auth-client.ts
├── 📁 mocks
│   ├── 📁 handlers
│   │   ├── 📄 auth.ts
│   │   └── 📄 finances.ts
│   └── 📄 browser.ts
└── 📄 middleware.ts
```

## Architecture

The architecture is planned to be build with a clear separation between the frontend and backend components, ensuring a smooth user experience and maintainability.

### Tech Stack

- **Frontend**

  - **Next.js (App Router)**: For server-rendered React applications.
  - **React 18**: Leverages both server and client components.
  - **TailwindCSS (v4)**: For styling.
  - **Mock Service Worker (MSW)**: To simulate backend HTTP requests during development.

- **Backend**
  - **Node.js**: Chosen for the backend, though not yet implemented.

### Key Decisions

- **Authentication**: Custom implementation using `AuthContext` and mocked fetch requests until backend is implemented.
- **State Management**: Authentication state is managed manually, integrating seamlessly with MSW and the future Node.js backend.

## Features

### Authentication Flow

The application implements the following authentication flows:

- **Sign-In**: Users can sign in through a form that sends a POST request to `/api/auth/signin`. On success, users are redirected to the dashboard.
- **Sign-Up**: Users can create an account via a form that posts to `/api/auth/signup`. After creation, they are redirected to the dashboard or sign-in page.
- **Forgot Password**: Users can request a password reset, receiving a message confirming that a reset code has been sent to their email.

### Dashboard Components

The dashboard _(yet to be implemented)_ provides a user-friendly interface displaying:

- Total balance
- Recent entries
- Upcoming bills
- Reminders to register daily expenses
- A link to the Finances section

### Finances Section

In the Finances section, users can view:

- A comprehensive table of income and expenses
- Cards showing total income and fixed monthly expenses

## MSW Organization

The MSW is set up to handle authentication-related HTTP requests. It features dedicated handlers for:

- Signing in
- Signing up
- Password resets

This setup allows for clean separation and easy management of mock endpoints during development.

## Conclusion

Finance App is designed with a focus on simplicity and user experience. By leveraging modern technologies and a clear architecture, the app aims to provide users with effective tools for managing their finances.

---

<small>**\*Generated:** 12/1/2025, 10:35:14 PM\*</small> |
<small>**\*Root Path:** `/Users/fcatalani/finance-app/src`\*</small>

5️⃣ Client vs Server boundary rule
Ensure route page.tsx files remain Server Components when possible.
Move hooks, state, effects, and event handlers into colocated Client Components.
Do not mark page.tsx as "use client" unless unavoidable.

6️⃣ Middleware & auth discipline
Validate that authentication and route protection are handled by middleware.
Do not add client-side redirects for auth-protected routes.
Keep middleware logic minimal and cookie-based.

7️⃣ Safe refactoring contract (VERY IMPORTANT)
Before applying any refactor, explain:

1. What problem the refactor solves
2. Why it aligns with the project rules
3. Whether it introduces any behavioral change
   Wait for confirmation before proceeding.

Direction 1 — Understated Warm Ribbon

Palette (surfaces → accents):

Neutral surface: #F5F5F4 (warm ivory) — large backgrounds.
Card/background contrast: #E9ECEF (soft stone) — cards, panels.
Text / chrome: #273043 (charcoal) — primary text and chrome.
Muted warm accent (ribbon): #E07A5F (desaturated coral) — small affordances (CTA outlines, active tabs).
Deep ribbon: #B74C3C (warm rust) — small badges, focused highlights.
Subtle secondary accent: #C88DA0 (muted magenta) — secondary badges or neutral highlights.
Usage: keep neutrals for surfaces and text; use #E07A5F only sparingly (borders, subtle icon fills, small badges). Use #B74C3C for emphasis on small elements (dot indicators, badges). Avoid filling large areas with accent colors.

Accessibility: ensure text remains dark (#273043) on light surfaces; test accent on pale surfaces for contrast (use darker ribbon for text-on-accent).

Emotional tone: warm, approachable, confident.

Direction 2 — Cool Slate + Strategic Warm Accents

Palette (surfaces → accents):

Neutral surface: #F7F9FB (cool off-white)
Panels / cards: #F1F5F8 (paler slate)
Primary chrome / text: #102132 (deep slate/ink)
Cool primary UI: #2B5666 (teal‑slate) — sidebar, headings, subtle chrome.
Warm accent (flag nod): #ECA77A (muted papaya) — primary CTA and alerts (sparingly).
Accent alternate: #D86B58 (deep coral) — critical highlights or error states.
Usage: majority of UI in cool slates and deep text color; reserve the warm accent for primary CTAs and exceptional highlights so it reads intentional, not theme-y. Charts and badges can use cool palette with single warm highlight to draw attention.

Accessibility: warm accent should sit on neutral or dark backgrounds only; provide darker fallbacks for low‑contrast scenarios.

Emotional tone: analytical, trustworthy, modern.

Direction 3 — Neutral Minimal + Ribbon Data Layer (recommended)

Palette (surfaces → ribbon stops):

Background: #FBFBFC (near‑white neutral)
Card surface: #F3F4F6 (stone)
Text / chrome: #0F1724 (graphite)
Ribbon steps (muted flag stops, used only inside charts/badges):
Step 1 (soft): #F6CEDF (pale rose)
Step 2 (mid): #E79BBF (muted rose)
Step 3 (core): #C86B9A (muted magenta)
Step 4 (deep): #A53D6E (muted berry)
Step 5 (anchor): #7A254C (deep maroon)
Usage: keep UI chrome, buttons, and panels neutral; use ribbon steps strictly within data: stacked bars, line series, category chips, progress segments. Use the deeper ribbon steps for active/highlighted series; use paler steps for background series. CTAs remain neutral solid fills (e.g., dark graphite or soft slate) to avoid signaling gendered emphasis.

Accessibility: when ribbon colors label important states, add patterns or icons as redundant channels; ensure each ribbon stop has sufficient contrast with its background inside charts. For text-on-ribbon, prefer Step 4/5 with light text, or Step 1/2 with dark text.

Emotional tone: focused, discreetly personal, professional.
