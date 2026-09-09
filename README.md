## Wage Gap Insights

A data analytics dashboard examining gender pay disparities and the role of salary history ("anchoring") in long-run wage dynamics.

This repository contains an interactive front-end built with HTML, CSS, and Chart.js that presents descriptive statistics, model summaries, and simulated policy counterfactuals based on the NLSY97 job-level panel (1997-2021), put together for the LMU Datathon.

## Highlights

- Quantifies persistent gender pay disparities across 24 years and roughly 170k job observations
- Examines how salary history contributes to wage inertia and how a salary history ban (e.g., California, 2018) affects growth differentials
- Provides clear, reproducible charts for stakeholders and a minimal static site for sharing results

## Key findings

- Fixed-effects model (within job and industry) estimates a female wage penalty of about -10.2 percent
- Women's wage growth increased roughly 2 to 3 percentage points after California's 2018 salary history ban, though a residual gap remains

## Running it locally

Serve the project folder with a static server:

    python3 -m http.server 8000

Then open http://localhost:8000 in your browser.

## License

Free to use for research or teaching; please credit the LMU Datathon team where applicable.
