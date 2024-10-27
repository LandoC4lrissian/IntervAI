# Next.js Chatbot Project Setup Guide

This guide contains step-by-step instructions for setting up a Next.js-based chatbot project.

## Prerequisites

- Node.js (18.17 or higher)
- npm or yarn or pnpm

## Installation Steps

### 1. Creating a Next.js Project

```bash
npx create-next-app@latest chatbot-project
cd chatbot-project
```

Select the following options during installation:
- What is your project named? my-app
- Would you like to use TypeScript? No / Yes
- Would you like to use ESLint? No / Yes
- Would you like to use Tailwind CSS? No / Yes
- Would you like your code inside a `src/` directory? No / Yes
- Would you like to use App Router? (recommended) No / Yes
- Would you like to use Turbopack for `next dev`?  No / Yes
- Would you like to customize the import alias (`@/*` by default)? No / Yes
- What import alias would you like configured? @/*


### 2. Installing shadcn/ui

```bash
npx shadcn-ui@latest init
```

Select the following options during installation:
- Would you like to use TypeScript (recommended)? -> Yes
- Which style would you like to use? -> Default
- Which color would you like to use as base color? -> Slate
- Where is your global CSS file? -> app/globals.css
- Do you want to use CSS variables for colors? -> Yes
- Where is your tailwind.config.js located? -> tailwind.config.js
- Configure the import alias for components? -> @/components
- Configure the import alias for utils? -> @/lib/utils
- Are you using React Server Components? -> Yes

### 3. Installing Required Components

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
```

### 4. Implementation the Project

Develop your project.

## Running the Project

To run the project in development mode:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the chatbot.

## Note

This chatbot is currently a simple demo. For a production chatbot application, backend integration and additional features would need to be implemented.
