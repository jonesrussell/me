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
- Optimized build pipeline
  - Dependency caching
  - Fast CI/CD with GitHub Actions
  - Comprehensive testing suite
- Development Tools
  - Session initialization script
  - AI-assisted development workflow
  - Automated documentation updates
  - Rule-based code standards

## Tech Stack

- SvelteKit
- TypeScript
- Modern CSS
- GitHub Pages
- Testing
  - Playwright for integration tests
  - Vitest for unit tests
- ESLint + Prettier for code quality
- YAML for configuration
- Custom development tools

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

docs/
├── CONTRIBUTING.md   # Contribution guidelines
└── TESTING.md       # Testing procedures

scripts/
└── scripts.ts       # Development workflow tools
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

# Run tests
npm run test         # Run all tests
npm run test:unit    # Run unit tests
npm run test:integration  # Run integration tests

# Development Tools
npm run init-session # Initialize development session
npm run ai-attach    # Get AI file review instructions

# Code Quality
npm run lint         # Run ESLint
npm run format       # Run Prettier
```

## Development Workflow

This project uses several tools to maintain code quality and development efficiency:

1. **Session Initialization**

   - Run `npm run init-session` to validate project setup
   - Checks cursor rules, documentation, and project structure
   - Ensures consistent development environment

2. **AI-Assisted Development**

   - Use `npm run ai-attach` for AI code review
   - Maintains consistent coding standards
   - Helps with documentation updates
   - Provides intelligent suggestions

3. **Documentation**

   - Automated updates to key files
   - Rule-based code standards
   - Comprehensive API documentation
   - Clear contribution guidelines

4. **Code Quality**
   - Strict TypeScript types
   - ESLint and Prettier integration
   - Automated testing
   - CI/CD pipeline

## Deployment

This site is automatically deployed to GitHub Pages using GitHub Actions. The deployment pipeline includes:

- Dependency caching for faster builds
- Comprehensive testing suite
- Type checking
- Linting and formatting checks
- Automated deployment to GitHub Pages

See the deployment configuration in `.github/workflows/deploy.yml`

## Resources

- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Modern CSS Features](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [GitHub Pages](https://pages.github.com/)
- [Playwright Documentation](https://playwright.dev)
- [Vitest Documentation](https://vitest.dev)

## License

MIT - see [LICENSE](LICENSE)
