# Opportunities Connect Frontend

Frontend for the Stetson University Professional Network, built with Next.js and TypeScript.  
The app helps students and alumni connect, browse opportunities, and manage profile and approval workflows.

## Features

- Authentication (signup/login) with role-aware UI behavior
- Alumni directory with search and pagination
- Opportunities listing with search and filtering
- User profile view and direct messaging support
- Admin-only approval screens for users and opportunities

## Tech Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Radix UI + shadcn/ui components
- Lucide icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install and run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

- `npm run dev` — start development server
- `npm run build` — create production build
- `npm run start` — run production server
- `npm run lint` — run Next.js ESLint checks
- `npm run deploy` — run the repository's deploy script

## Project Structure

- `/app` — Next.js routes and layouts
- `/components` — reusable UI and feature components
- `/lib` — API calls, global state provider, and utilities
- `/hooks` — custom React hooks
- `/public` — static assets

## Backend Integration

API requests are defined in `/lib/api.ts` and currently point to a configured backend base URL in that file.

## Contributing

1. Create a branch
2. Make changes
3. Run `npm run lint`
4. Open a pull request
