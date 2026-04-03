# Aziz Ben Ayed — Portfolio

A premium personal portfolio site built with React, Vite, Tailwind CSS, and Framer Motion.

## Stack

- **React 18** — UI
- **Vite 5** — Build tool
- **Tailwind CSS 3** — Styling
- **Framer Motion 11** — Animations
- **Lucide React** — Icons

---

## Getting started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
```

Output goes to `dist/`.

### Preview production build

```bash
npm run preview
```

---

## Deployment — GitHub Pages

This site is configured to deploy to **`azizbenayed.github.io`** (a GitHub user/org site).

### 1. Create the repository

Create a GitHub repository named exactly: `azizbenayed.github.io`

### 2. Verify the Vite base path

For a user/org site (`username.github.io`), the base stays as `'/'` in `vite.config.js`:

```js
export default defineConfig({
  base: '/',
})
```

If hosting under a project repo (e.g. `github.com/azizbenayed/portfolio`),
change base to `'/portfolio/'`.

### 3. Deploy

The `gh-pages` package is included. Run:

```bash
npm run deploy
```

This builds the site and pushes the `dist/` folder to the `gh-pages` branch.

Your site will be live at: **https://azizbenayed.github.io**

### GitHub Actions (optional CI/CD)

Create `.github/workflows/deploy.yml` for automatic deploys on push to `main`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## Customising content

All content lives in **`src/data/portfolio.js`** — edit it to update your info without touching any component code.

```
src/
  data/
    portfolio.js      ← personal info, projects, skills, experience
  sections/
    Hero.jsx
    About.jsx
    Projects.jsx
    Skills.jsx
    Experience.jsx
    Contact.jsx
    Footer.jsx
  components/
    Navigation.jsx
    SectionWrapper.jsx
    ui/
      Button.jsx
      Badge.jsx
```
