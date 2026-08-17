# Iniesta Automation Hub — AI Consulting & Automation Agency Website

A complete, production-ready, high-converting multi-page website for **Iniesta Automation Hub** — an AI consulting and automation agency.

## 🚀 Key Features

- **Brand & Visual Aesthetics**:
  - Primary Navy Blue (`#0A1628`) & Dark Navy cards (`#112240`)
  - Electric Red accents & CTA buttons (`#E63946`)
  - Bright Cyan glows, links, and icons (`#00D4FF`)
  - Glassmorphism frosted-glass cards with neon cyan border highlights
  - Interactive ambient particle network background on Hero sections
  - Space Grotesk & Inter typography
- **7 Fully Responsive Pages**:
  - `index.html` — **Home** (Hero with particles, Who We Serve, 9 What We Do cards, 5-stage vertical timeline, tech stack strip, CTA banner)
  - `services.html` — **Services** (12 stacked cards with use cases, benefits, tool chips, and direct booking actions)
  - `portfolio.html` — **Portfolio & Case Studies** (4 detailed metric-driven case studies + 19 project catalog)
  - `about.html` — **About** (Inoluwa bio, interactive Claude AI Certificate modal viewer, 3 value cards, 12 core expertise items, 10 client testimonials)
  - `blog.html` — **Blog** (Live category filter tabs, 18 post cards with interactive reader modals, newsletter subscription)
  - `contact.html` — **Contact** (2x3 contact info grid, validated inquiry form with loading state & confirmation modal)
  - `book.html` — **Book a Call** (Value checklist + comprehensive booking form with Calendly integration modal)
- **🤖 Built-in AI Chatbot Widget (All Pages)**:
  - Floating cyan glowing bubble with 5-second auto-open trigger on first visit.
  - Conversational knowledge engine answering questions about services, pricing, timelines, tools, and contact info.
  - Fast action chips for 1-tap inquiries.

## 📁 Project Structure

```
├── index.html              # Home Page
├── services.html           # Services Page (12 full-width cards)
├── portfolio.html          # Portfolio & Case Studies (4 case studies + 19 projects)
├── about.html              # About Page (Bio, Certificate modal, 10 Testimonials)
├── blog.html               # Blog Page (18 articles + live filters + modal reader)
├── contact.html            # Contact Page (2x3 info grid + contact form)
├── book.html               # Book a Call Page (Checklist + Booking form + Calendly)
├── css/
│   ├── style.css           # Core Design Tokens, Typography, Layout, Utilities
│   ├── components.css      # Navbar, Footer, Buttons, Modals, Chatbot, Forms
│   └── animations.css      # Keyframes, Glassmorphism, Glows, Particles
└── js/
    ├── main.js             # Sticky navbar, mobile menu, scroll reveal, particle canvas
    ├── chatbot.js          # AI Chatbot Widget & Knowledge Engine
    ├── forms.js            # Validation, submission animations, confirmation modals
    └── blog-portfolio.js   # Category filters, modal reader, certificate viewer
```

## 🛠️ How to Run Locally

You can serve this static website using any HTTP server:

```bash
# Python
python -m http.server 3000

# Node.js
npx serve .
```

Open your browser at `http://localhost:3000`.

---

© 2026 Iniesta Automation Hub. All rights reserved.
