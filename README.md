<div align="center">

# 🚀 shubhanshushrimali.github.io

### My Personal Portfolio

A premium, animated developer portfolio built with **React**, **Three.js**, and **Framer Motion**.  
Auto-deployed to GitHub Pages via **GitHub Actions** on every push.

[![Deploy](https://github.com/shubhanshushrimali/shubhanshushrimali.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/shubhanshushrimali/shubhanshushrimali.github.io/actions/workflows/deploy.yml)
[![Live](https://img.shields.io/badge/🌐_Live-shubhanshushrimali.github.io-a78bfa?style=flat-square)](https://shubhanshushrimali.github.io)

</div>

---

## ✨ Features

- 🎨 **Premium Dark Theme** — Glassmorphism cards, vibrant gradients, custom scrollbar
- 🌌 **3D Particle Background** — 1500+ animated particles with floating orbs (Three.js + React Three Fiber)
- ⚡ **Buttery Smooth Animations** — Scroll-triggered reveals, hover effects, typewriter text (Framer Motion)
- 📱 **Fully Responsive** — Looks great on mobile, tablet, and desktop
- 🔍 **SEO Optimized** — Open Graph, Twitter Cards, semantic HTML, meta tags
- 🚀 **Auto-Deploy** — Push to `main` → GitHub Actions builds → Live on GitHub Pages
- ♿ **Accessible** — Respects `prefers-reduced-motion`, ARIA labels, semantic structure

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | React 19 + Vite 8 |
| **3D Graphics** | Three.js, React Three Fiber, Drei |
| **Animations** | Framer Motion, GSAP |
| **Icons** | React Icons (Feather) |
| **Styling** | Vanilla CSS with custom design system |
| **Fonts** | Inter, Space Grotesk, JetBrains Mono |
| **CI/CD** | GitHub Actions |
| **Hosting** | GitHub Pages |

## 📂 Project Structure

```
src/
├── components/
│   ├── ParticleCanvas.jsx    # Three.js 3D particle background
│   ├── Navbar.jsx            # Animated navigation with scroll detection
│   ├── Hero.jsx              # Hero section with typewriter effect
│   ├── About.jsx             # About me + animated skill grid
│   ├── Projects.jsx          # Featured projects with code preview
│   ├── Experience.jsx        # Work timeline with scroll animations
│   ├── Contact.jsx           # Contact form + social links
│   └── Footer.jsx            # Footer with heartbeat animation
├── App.jsx                   # Main app layout
├── main.jsx                  # React entry point
└── index.css                 # Design system (colors, typography, utilities)
```

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- npm

### Development

```bash
# Clone the repo
git clone git@github.com:shubhanshushrimali/shubhanshushrimali.github.io.git
cd shubhanshushrimali.github.io

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it.

### Production Build

```bash
npm run build
npm run preview   # Preview the production build locally
```

## 🔄 CI/CD Pipeline

Every push to `main` triggers the GitHub Actions workflow:

```
Push to main → Install deps → Vite build → Deploy to GitHub Pages
```

The workflow is defined in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## 📄 Sections

| # | Section | Description |
|---|---|---|
| 01 | **About** | Bio, stats, and animated tech stack grid |
| 02 | **Projects** | Featured project (Eisen Engine) with live code preview |
| 03 | **Experience** | Work history timeline with scroll animations |
| 04 | **Contact** | Contact form and social links |

## 🎮 Featured Project: Eisen Engine

> A custom C++ game engine built from scratch with OpenGL — featuring ECS architecture, event-driven systems, batch rendering, and ImGui debug tools.

🔗 [View Eisen Engine →](https://github.com/shubhanshushrimali/Eisen-Engine)

---

<div align="center">

Built with ❤️ by [Shubhanshu Shrimali](https://github.com/shubhanshushrimali)

</div>
