# Muhammad Suleman — React Native Developer Portfolio ⚛️📱

A liquid-glass, fully animated portfolio built with **Next.js 14 + React 18 + Tailwind CSS 3 + Framer Motion**.
Light/dark mode, interactive phone mockup, cursor spotlight, marquees, magnetic buttons, scroll-drawn timeline — the works.

---

## 🚀 Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## ✏️ Personalize it (2 minutes)

**Everything you need to change lives in ONE file → `lib/data.js`**

| Field      | What to put                                                      |
| ---------- | ---------------------------------------------------------------- |
| `email`    | Your real Gmail address                                           |
| `whatsapp` | Country code + number, digits only → `923001234567` for +92 300 1234567 |
| `linkedin` | Full LinkedIn profile URL                                         |
| `github`   | Full GitHub profile URL                                           |

The same file also holds your skills, toolbelt, "currently learning" list,
experience bullets and stats — edit freely, the UI updates automatically.

## 🌗 Theme

- Defaults to **dark** (recruiters love it), toggle in the navbar.
- Choice is saved to `localStorage`; colors are defined as CSS variables at the
  top of `app/globals.css` if you ever want to re-tint the whole site.

## 📦 Build & deploy

```bash
npm run build   # outputs a fully static site into /out
```

**Easiest (recommended): Vercel**
1. Push this folder to a GitHub repo.
2. Go to vercel.com → "Add New Project" → import the repo → Deploy.
3. Done — free `your-name.vercel.app` URL for your CV.

**Also works on:** Netlify, GitHub Pages, Cloudflare Pages (it's a static
export, so any static host can serve the `out/` folder).

## 🗂 Structure

```
app/            layout, page, global styles, favicon
components/     Nav, Hero, PhoneMockup, About, Skills, Experience, Contact, Footer…
lib/data.js     ← ALL your personal content (edit this one)
```

## ✨ Animation inventory

Morphing gradient blobs · twinkling stars (dark mode) · cursor spotlight ·
film grain · typewriter roles · waving hand · magnetic buttons · light-streak
hovers · animated conic "liquid" borders · interactive iPhone mockup with
3 auto-cycling, tappable screens · orbiting tech chips · 3D tilt · count-up
stats · skill bars · dual-direction marquee · scroll-drawn timeline ·
pulsing nodes · scroll progress bar · smooth theme cross-fade ·
blur-in reveals everywhere. `prefers-reduced-motion` is respected.
