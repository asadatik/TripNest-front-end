# TripNest Frontend

Live URL:  https://trip-nest-front-end.vercel.app
Backend Repo/URL: https://trip-nest-back-end.vercel.app

TripNest is a travel booking platform where users can browse curated travel packages, book trips, pay via Stripe, and manage their bookings from a modern dashboard.

---

## Features

- Responsive Next.js dashboard with a dark, gradient UI.
- Public package listing with filters and detailed package pages (amenities, included/excluded, day‑by‑day itinerary).
- User authentication (login/register) integrated with the backend JWT auth.
- Booking flow: select package → fill booking form → redirect to Stripe checkout → see updated booking status.
- “My Bookings” page with color‑coded status badges, cancel action, and booking details page.
- Profile and payments sections for user account management.
- Framer‑motion animations and shadcn UI components for a polished UX.

---

## Technology Stack

- **Framework:** Next.js (React, App Router or Pages Router)
- **Language:** TypeScript
- **State Management:** Redux Toolkit
- **UI Library:** shadcn/ui, Tailwind CSS
- **Animations:** framer‑motion
- **HTTP Client:** Axios (or Fetch)
- **Auth:** JWT (via backend API), HTTP‑only cookies or headers
- **API:** REST APIs served by the TripNest backend (Node/Express)

---

## Setup & Installation

1. Clone the repository (monorepo or frontend subfolder)
git clone https://github.com/asadatik/TripNest-front-end  
cd your-repo/frontend

2. Install dependencies
npm install

or
yarn install

3. Configure environment variables
cp .env.example .env.local


Then update:
NEXT_PUBLIC_API_BASE_URL= https://trip-nest-back-end.vercel.app
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
4. Run the development server
npm run dev

or
yarn dev

5. Open in browser
http://localhost:3000
text

---

## Usage

- Open the home / packages page to browse available travel packages.
- Register a new user or log in with an existing account.
- From a package details page, click **Book Now** and complete the booking form.
- You will be redirected to Stripe’s test checkout to simulate payment.
- After successful payment, go to **My Bookings** to see your updated booking status.
- Use the **Details** page to view full information about a single booking.
- If you have an admin account, log in as admin to access the admin dashboard (package and booking management).

---

## Scripts

npm run dev # Start development server
npm run build # Production build
npm run start # Start production server
npm run lint # Run ESLint

text

---

## Folder Structure (high level)

- `app/` or `pages/` – Next.js routes (dashboard, packages, bookings, auth, etc.)
- `components/` – shared UI components and layout.
- `redux/` – Redux slices and store configuration.
- `lib/` – API client, helpers, and utilities.
- `styles/` – global styles and Tailwind configuration.

---

## License

This project is for educational purposes as part of the PH L2 B5A8 assignment.