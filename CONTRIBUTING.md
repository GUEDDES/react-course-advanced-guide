# Contributing to React Advanced Guide

Thank you for your interest in contributing! 🎉

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-course-advanced-guide.git
   ```
3. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Install Dependencies

```bash
# For each project
cd examples/advanced-task-manager
npm install
```

## Code Style

### JavaScript/React
- Use ESLint configuration provided
- Format code with Prettier
- Follow React best practices
- Use functional components and hooks

### CSS
- Use CSS modules or scoped styles
- Follow BEM naming convention
- Use CSS variables for theming

### Git Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Examples:
```
feat: add drag and drop to task list
fix: resolve WebSocket reconnection issue
docs: update installation instructions
```

## Pull Request Process

1. **Update documentation** - Ensure README is updated
2. **Add tests** - Include tests for new features
3. **Run tests** - Ensure all tests pass:
   ```bash
   npm test
   ```
4. **Run linter** - Fix any linting errors:
   ```bash
   npm run lint
   ```
5. **Build project** - Ensure it builds successfully:
   ```bash
   npm run build
   ```
6. **Create PR** - Provide clear description of changes

## PR Title Format

```
[Project] Type: Brief description
```

Examples:
- `[Task Manager] feat: add export to PDF`
- `[E-Commerce] fix: cart total calculation`
- `[Social Dashboard] docs: add WebSocket setup guide`

## Adding New Examples

When adding a new example project:

1. Create folder in `examples/`
2. Include:
   - Complete README.md
   - package.json with all dependencies
   - Dockerfile and docker-compose.yml
   - Tests
   - Example .env file
3. Update main README.md
4. Add to CI/CD pipeline

## Testing Guidelines

### Unit Tests
- Test individual components
- Mock external dependencies
- Aim for 80%+ coverage

### Integration Tests
- Test user workflows
- Test component interactions
- Use React Testing Library

### Example Test Structure

```javascript
import { render, screen } from '@testing-library/react';
import TaskCard from './TaskCard';

describe('TaskCard', () => {
  it('should render task title', () => {
    const task = { id: '1', title: 'Test Task' };
    render(<TaskCard task={task} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });
});
```

## Documentation

- Use clear, concise language
- Include code examples
- Add screenshots for UI features
- Keep README up to date

## Code Review Process

1. Maintainer reviews PR
2. Automated tests run
3. Request changes if needed
4. Approve and merge

## Community

- Be respectful and inclusive
- Help others learn
- Share knowledge
- Have fun! 🚀

## Questions?

Feel free to open an issue for:
- Questions about the code
- Feature requests
- Bug reports
- General discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
