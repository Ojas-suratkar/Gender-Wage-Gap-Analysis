# Wage Gap Insights

A rigorous data analytics dashboard and reproducible analysis pipeline examining gender pay disparities and the role of salary history (anchoring) in long-run wage dynamics.

This repository contains a polished, interactive front-end built with HTML, CSS and Chart.js that presents descriptive statistics, model summaries, and simulated policy counterfactuals based on the NLSY97 job-level panel (1997–2021).

## Why this project
- Quantifies persistent gender pay disparities across 24 years and ~170k job observations.
- Evaluates how salary history contributes to wage inertia and how a salary history ban (e.g., California, 2018) affects growth differentials.
- Provides clear, reproducible charts for stakeholders and a minimal static site for sharing results.

## Highlights
- Model 3 (preferred): within-job & industry fixed effects estimate a female wage penalty of −10.2% (p < 0.001).
- Policy signal: women’s wage growth increased ~2–3 percentage points after California's 2018 salary history ban, but a residual gap remains.

## How to view locally
Serve the project folder with a static server (Python):

```bash
cd /Users/ojas/Desktop/lmu-datathon-wage-gap-insights-main
python3 -m http.server 8000
# open http://localhost:8000 in your browser
```

## How to publish (GitHub Pages)
1. Create a repository under your GitHub account (suggested name: `wage-gap-insights`).
2. Push this directory to the repo's `main` branch.
3. The included GitHub Actions workflow (`.github/workflows/gh-pages.yml`) will deploy the site to GitHub Pages automatically.

## Developer notes
- Charts are generated client-side with Chart.js; the dataset is embedded as small arrays for visualization purposes.
- `scripts/screenshot.js` (Puppeteer) can generate screenshots of key sections. Run `npm install` then `npm run screenshot`.

## License & attribution
Use this code and visuals freely for research or teaching; cite the LMU Datathon team where applicable.

---

If you want, I can push this repo to your GitHub account (`Ojas-suratkar`), run the screenshot script and attach images, or tune the visual theme further. Tell me which repo name you prefer if you want me to push.
