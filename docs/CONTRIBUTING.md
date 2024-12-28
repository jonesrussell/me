# Contributing Guide

Thank you for considering contributing to this project! This document provides guidelines and instructions for contributing.

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## Code Style

We use ESLint and Prettier for code formatting. Our style guidelines include:

- Use semicolons
- Use single quotes for strings
- Use template literals for string concatenation
- Follow TypeScript best practices
- Maintain monospace-aligned code where appropriate

## Testing

Before submitting a PR, ensure all tests pass:

```bash
# Run all tests
npm run test

# Run specific test suites
npm run test:unit
npm run test:integration
```

## Commit Messages

Follow conventional commits format:

- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Test updates
- chore: Maintenance tasks

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all tests pass
4. Update documentation if needed
5. Submit PR against `main`

## Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable components
│   ├── utils/         # Utility functions
│   └── styles/        # Global styles
├── routes/           # SvelteKit routes
└── tests/           # Test files
```

## Design Guidelines

- Follow monospace-first design principles
- Align elements to character grid
- Use ASCII art for borders and diagrams
- Maintain responsive layouts in character units
- Follow semantic HTML structure

## Testing Guidelines

- Write unit tests for utility functions
- Add integration tests for components
- Include visual regression tests for UI changes
- Test responsive layouts
- Verify dark/light theme compatibility

## Documentation

- Update README.md for major changes
- Document new components
- Include usage examples
- Update type definitions
- Add JSDoc comments for functions

## Need Help?

- Check existing issues
- Review pull requests
- Read the documentation
- Ask questions in discussions

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.
