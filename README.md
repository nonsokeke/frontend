# Opportunities Connect Frontend

Frontend for the **Stetson University Professional Network**, built with Next.js.  
It helps students and alumni connect through profiles, messaging, and shared opportunities.

## Features

- Authentication (login/signup)
- User directory and profile pages
- Opportunity browsing and details
- Direct messaging between users
- Admin approval flows for users and opportunities

## Tech Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS

## Project Structure

- `/app` – routes and page-level UI
- `/components` – reusable UI and feature components
- `/lib` – shared logic, API calls, and global state
- `/hooks` – custom React hooks

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` – start local development server
- `npm run build` – build for production
- `npm run start` – run production server
- `npm run lint` – run lint checks

## Backend API

The frontend calls a backend API from `lib/api.ts` using a configured base URL.
Make sure the backend is running and reachable before using authenticated features.
