# React Portfolio

A modern, interactive portfolio built with React, Vite, and Tailwind CSS.

## Features

- Interactive particle background with mouse interaction
- Smooth scroll navigation with section highlighting
- Animated profile card with rotating decorative elements
- Tech stack showcase with animated progress bars
- Featured project section (VIOTRACK with RFID)
- Contact form with floating labels

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React (icons)

## Project Structure

```
src/
├── assets/              # Static assets (images, fonts)
├── components/
│   ├── effects/         # Animation/background effects
│   │   └── ParticleBackground.jsx
│   ├── layout/          # Layout components
│   │   └── Navigation.jsx
│   ├── sections/        # Page sections
│   │   ├── Hero.jsx
│   │   ├── TechStack.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   └── index.js         # Barrel exports
├── App.jsx
├── main.jsx
└── index.css
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Customization

1. Update your name and info in `src/components/sections/Hero.jsx`
2. Add your photo or keep the initials placeholder
3. Update contact info in `src/components/sections/Contact.jsx`
4. Modify tech stack in `src/components/sections/TechStack.jsx`
5. Add your projects in `src/components/sections/Projects.jsx`
