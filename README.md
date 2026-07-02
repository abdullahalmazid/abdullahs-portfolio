# Abdullah Al Mazid — Static Portfolio

> A premium, zero-dependency static portfolio built with plain HTML, CSS, and JavaScript.  
> Instantly loads on GitHub Pages — no server, no build step, no waiting.

## 🚀 Live Demo

**[https://your-username.github.io/portfolio-static](https://your-username.github.io/portfolio-static)**

---

## ✨ Features

- **Zero dependencies** — pure HTML, CSS, JS (only Google Fonts from CDN)
- **Instant load** — no server-side rendering, no JavaScript frameworks
- **Fully responsive** — mobile-first design that works on all screen sizes
- **Premium dark theme** — deep navy with indigo accent and glassmorphism cards
- **Animations**: typing effect, scroll reveal, floating orbs, spinning gradient border
- **Sections**: Hero, About, Skills, Education, Experience, Projects, Publications, Contact, Footer
- **Accessible**: ARIA labels, focus-visible styles, semantic HTML
- **SEO ready**: meta tags, Open Graph, Twitter Card

---

## 📁 Folder Structure

```
portfolio-static/
└── index.html        ← Everything in one file, self-contained
```

---

## 🛠️ How to Customize

Open `index.html` in any text editor and update:

### 1. Personal Info (in the HTML)
Search for and replace:
- `Abdullah Al Mazid` → your name
- `hello@example.com` → your email
- `+880 1XXX XXXXXX` → your phone
- `Dhaka, Bangladesh` → your location
- Social links (`href="https://github.com/"` etc.) → your actual URLs

### 2. Profile Photo
Replace the `.hero-photo-avatar` div with:
```html
<div class="hero-photo">
  <img src="your-photo.jpg" alt="Your Name" />
</div>
```
Place your photo in the same folder as `index.html`.

### 3. Projects
Edit the `.project-card` divs in the `#projects` section.

### 4. Publications
Edit the `.pub-card` divs in the `#publications` section.

### 5. Contact Form (using Formspree)
For a real working form, sign up at [formspree.io](https://formspree.io) and update `handleFormSubmit`:
```js
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  body: new FormData(document.getElementById('contact-form')),
  headers: { Accept: 'application/json' }
});
```

### 6. Colors (CSS variables at top of `<style>`)
```css
--accent: #6366f1;   /* Change to any color */
--teal:   #14b8a6;
--gold:   #f59e0b;
```

---

## 🌐 Deploy to GitHub Pages

### Option A — GitHub Web UI (simplest)
1. Create a new GitHub repo (e.g., `my-portfolio`)
2. Upload `index.html` via **Add file → Upload files**
3. Go to **Settings → Pages**
4. Under **Source**, select **Deploy from a branch** → `main` → `/root`
5. Click **Save** — your site is live in ~60 seconds at `https://your-username.github.io/my-portfolio`

### Option B — Git CLI
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
# Then enable GitHub Pages in repo Settings
```

---

## 📄 License

MIT License — free to use, modify, and share.

---

*Made with ❤️ by Abdullah Al Mazid*
