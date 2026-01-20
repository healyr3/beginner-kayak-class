# Contributing Guidelines

Thank you for contributing to the Beginner Kayak Class 2 project! This guide will help you get started.

## Setup for Development

### Prerequisites
- Java 17 or higher
- Node.js 18+
- Maven 3.8+
- MySQL 8.0+
- Git

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BeginnerKayakClass2
   ```

2. **Setup environment variables**
   ```bash
   # Copy template and update with your local configuration
   cp .env.example .env
   # Edit .env with your local database credentials
   ```

3. **Install backend dependencies**
   ```bash
   mvn clean install
   ```

4. **Install frontend dependencies**
   ```bash
   cd src/main/angular-app
   npm install
   cd ../../..
   ```

5. **Verify setup**
   ```bash
   mvn --version
   java -version
   node --version
   npm --version
   ```

## Development Workflow

### Running Locally

**Option 1: Full Stack with Maven**
```bash
# From project root - builds Angular and runs Spring Boot
mvn clean install
mvn spring-boot:run
```
Access at: `http://localhost:8080`

**Option 2: Separate Development Servers** (for active frontend development)
```bash
# Terminal 1 - Spring Boot Backend
mvn spring-boot:run

# Terminal 2 - Angular Frontend (with hot reload)
cd src/main/angular-app
npm start
```
- Frontend: `http://localhost:4200`
- Backend API: `http://localhost:8080`

### Database Setup

1. Create MySQL database:
   ```sql
   CREATE DATABASE beginner-kayak-class CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'kayak_user'@'localhost' IDENTIFIED BY 'secure_password';
   GRANT ALL PRIVILEGES ON beginner-kayak-class.* TO 'kayak_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

2. Update `.env` with credentials

3. Hibernate will create tables automatically on first run (configured in `application.properties`)

## Code Style & Standards

### Java Code
- Follow [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)
- Use meaningful variable/method names
- Add Javadoc for public methods
- Maximum line length: 100 characters

### Angular/TypeScript
- Follow [Angular Style Guide](https://angular.io/guide/styleguide)
- Use strict mode in tsconfig
- One component per file
- Add inline documentation for complex logic

### HTML/CSS
- Use valid semantic HTML
- Avoid `<p>` inside `<li>` or vice versa
- Use BEM naming convention for CSS classes
- Mobile-first responsive design

### Git Commits
Format your commit messages clearly:
```
type(scope): subject

Longer description explaining the change and why it was made.

Closes #123
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Code style/formatting (no logic changes)
- `refactor` - Code refactoring
- `test` - Add/update tests
- `chore` - Dependencies, build config, etc.

**Examples:**
```
feat(gear-checklist): add ability to save checklist
fix(river1): correct typo in eddy description
docs(readme): update deployment instructions
test(app): add unit tests for AppComponent
```

## Testing Before Commit

Always run tests before committing:

```bash
# Backend unit tests
mvn test

# Frontend unit tests (headless for CI/CD)
cd src/main/angular-app
npm test -- --watch=false --browsers=ChromeHeadless

# Full build verification
mvn clean install

# Docker build verification
docker build -t beginner-kayak-class:local .
```

## Pull Request Process

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # Or for fixes:
   git checkout -b fix/issue-number-brief-description
   ```

2. **Make your changes**
   - Keep commits focused and atomic
   - Frequently pull latest `main` to avoid conflicts
   - Add tests for new functionality

3. **Test thoroughly**
   ```bash
   mvn clean install
   cd src/main/angular-app && npm test -- --watch=false
   docker build .
   ```

4. **Push and create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```
   - Create PR with clear title and description
   - Link related issues: "Closes #123"
   - Request review from team

5. **Address feedback**
   - Respond to review comments
   - Push updates to same branch
   - Do not force-push after review starts

6. **Merge**
   - Rebase if needed: `git rebase main`
   - Squash related commits if appropriate
   - Delete feature branch after merge

## Common Tasks

### Adding a New Component

```bash
# Use Angular CLI
cd src/main/angular-app
ng generate component my-component

# Or create manually:
# src/main/angular-app/src/app/my-component/
#   ├── my-component.component.ts
#   ├── my-component.component.html
#   ├── my-component.component.css
#   └── my-component.component.spec.ts
```

### Adding a Backend Endpoint

1. Create/update Controller in `src/main/java/.../controller/`
2. Create Service in `src/main/java/.../service/` for business logic
3. Use Repository (extends `JpaRepository`) for data access
4. Add unit tests
5. Document the endpoint

### Adding Dependencies

**Maven (Java)**
```bash
# Add to pom.xml <dependencies> section
# Then run:
mvn install
```

**NPM (Angular)**
```bash
cd src/main/angular-app
npm install package-name
```

## Reporting Issues

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment (OS, Java version, Node version, etc.)
- Screenshots/logs if applicable

## Questions?

- Check existing [documentation](./docs/)
- Review [DEPLOYMENT.md](./DEPLOYMENT.md) for production info
- Check [SECURITY.md](./SECURITY.md) for security guidelines
- Review [README.md](./README.md) for general info

Thank you for contributing! 🎉
