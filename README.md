# adam

Personal website built with React and Vite, published at https://adamgrossberg.github.io/.

## Local development

```sh
npm ci
npm run dev
```

## Checks

```sh
npm run lint
npm run build
npm run preview
```

## Editing

- `src/Home.jsx`: homepage content, animation, and quote columns.
- `src/Home.css`: homepage layout, title, navigation, and quote styling.
- `src/App.css`: shared colors and page defaults.
- `src/Navigation.jsx`: navigation labels and links. The non-home links are placeholders.
- `src/home-text.txt`: one quote per line; each column repeats one quote.
- `src/wave-edges.js`: wave depth, wavelength, speed, hover inset, text spacing, and mobile breakpoint.
- `src/assets/images/`: app images.

Waves and hover expansion are disabled below the mobile breakpoint. Reduced-motion preferences stop the animation.

## Publishing

Push changes to `main`. The GitHub Pages workflow in `.github/workflows/deploy.yml` installs dependencies, runs lint and build checks, and deploys `dist/`. Dependencies and generated build files are ignored by Git.
