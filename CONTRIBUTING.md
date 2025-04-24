# Contributing to Game of Life

## Branching Strategy

We follow the Git Flow branching strategy:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `release/*` - Release preparation
- `hotfix/*` - Production hotfixes

### Branch Naming Convention
- Feature branches: `feature/add-new-pattern`
- Bug fix branches: `bugfix/fix-board-rendering`
- Release branches: `release/v1.0.0`
- Hotfix branches: `hotfix/critical-bug-fix`

## Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### Examples
```
feat(board): add glider pattern preset
fix(controls): prevent negative step values
docs(readme): update installation instructions
test(rules): add edge case tests
```

## Pull Request Process

1. Create a branch from `develop` using the naming convention
2. Make your changes in small, logical commits
3. Write tests for new features
4. Update documentation as needed
5. Create a pull request with the template
6. Request review from teammates
7. Address review comments
8. Squash and merge when approved