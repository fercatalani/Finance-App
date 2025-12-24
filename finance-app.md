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
