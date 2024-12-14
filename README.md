# Personal Website of Me

My personal website built with SvelteKit, featuring a monospace-first design approach and modern web development practices.

Visit the website at https://jonesrussell.github.io/me/

## Features

- Monospace-based design system
- Character-grid layouts
- Dark/light theme support
- Responsive design
- GitHub Pages deployment
- Modern CSS features
  - CSS Container Queries
  - CSS Color Level 4
  - CSS Custom Properties
  - CSS Grid
  - CSS Transitions

## Tech Stack

- SvelteKit
- TypeScript
- Modern CSS
- GitHub Pages

## Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable components
│   ├── utils/         # Utility functions
│   └── styles/        # Global styles
├── routes/           # SvelteKit routes
│   ├── +page.svelte  # Home page
│   ├── blog/         # Blog section
│   └── projects/     # Projects showcase
└── app.css          # Global CSS variables and styles
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This site is automatically deployed to GitHub Pages using GitHub Actions. See the deployment configuration in `.github/workflows/deploy.yml`

## Resources

- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Modern CSS Features](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [GitHub Pages](https://pages.github.com/)

## License

MIT - see [LICENSE](LICENSE)
