# Beginner Kayak Class 2

A lightweight static website for kayak class information, lessons, and resources. Built with **Angular** frontend and **Spring Boot** as a simple static file server.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Local Development](#local-development)
- [Building & Testing](#building--testing)
- [Docker Deployment](#docker-deployment)
- [API Endpoints](#api-endpoints)
- [Environment Configuration](#environment-configuration)
- [Troubleshooting](#troubleshooting)
- [Contributing & Security](#contributing--security)
- [Documentation](#documentation)
- [Getting Help](#getting-help)

## ✨ Features

- Classroom information and schedules
- Gear checklist reference
- River gauge information
- Location details
- American Whitewater resources
- Club trip information
- Shopping resources
- Instruction materials
- Responsive Material Design UI
- Fast static site serving

## 🛠 Tech Stack

### Frontend
- **Angular 17** - Modern SPA framework
- **Angular Material** - UI components
- **TypeScript 5.2** - Type-safe development
- **RxJS 7.8** - Reactive programming
- **Node.js 18+** - Build tooling

### Backend (Static Server)
- **Java 17** (JDK)
- **Spring Boot 3.1.5** - Lightweight static file server
- **Maven 3.8+** - Build tool

### DevOps
- **Docker** (multi-stage, optimized ~150MB image)
- **GitHub Actions** (automated testing)
- **DigitalOcean** (deployment ready)

## 📦 Prerequisites

### Required
- **Java 17+** - [Download](https://adoptopenjdk.net/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Maven 3.8+** - [Download](https://maven.apache.org/download.cgi)
- **MySQL 8.0+** - [Download](https://dev.mysql.com/downloads/mysql/)
- **Git**

### Optional
- **Git** - Version control

## 🚀 Quick Start

Get up and running in 5 minutes:

```bash
# 1. Clone repository
git clone <repository-url>
cd BeginnerKayakClass2

# 2. Setup environment
cp .env.example .env
# Edit .env with your database credentials

# 3. Build and run
mvn clean install
mvn spring-boot:run

# 4. Access application
# Open http://localhost:8080 in your browser
```

For detailed setup instructions, see [Local Development](#local-development) section below.
- **Docker & Docker Compose** - For containerized deployment
- **VS Code** or **IntelliJ IDEA** - For development

## 🚀 Local Development

### 1. Clone the Repository
```bash
git clone <repository-url>
cd BeginnerKayakClass2
```

### 2. Setup Backend

```bash
# Install dependencies and build
mvn clean install

# Configure database connection
# Edit: src/main/resources/application.properties
# Update DB_HOST, DB_NAME, DB_USER, DB_PASSWORD as needed
```

### 3. Setup Frontend

```bash
cd src/main/angular-app

# Install dependencies
npm install

# Build Angular application
npm run build
```

### 4. Run Application Locally

**Option A: Using Maven (includes compiled Angular)**
```bash
# From project root, build everything
mvn clean install

# Run Spring Boot
mvn spring-boot:run
```

**Option B: Separate Servers (for active development)**
```bash
# Terminal 1 - Spring Boot Backend
mvn spring-boot:run

# Terminal 2 - Angular Frontend (with live reload)
cd src/main/angular-app
npm start

# Access: http://localhost:4200
```

### 5. Access Application
- **Frontend**: http://localhost:4200 (dev) or http://localhost:8080 (production)
- **Backend API**: http://localhost:8080/api
- **Swagger/API Docs**: http://localhost:8080/swagger-ui.html (if configured)

## 🔨 Building & Testing

### Build Backend
```bash
mvn clean install
mvn test
```

### Build Frontend
```bash
cd src/main/angular-app
npm run build
npm run test
```

### Code Quality
```bash
# Lint Angular code
npm run lint

# Static analysis (if configured)
mvn sonar:sonar
```

## 🐳 Docker Deployment

### Build Docker Image

```bash
# Build image (includes full build process)
docker build -t beginner-kayak-class:latest .

# Or with version tag
docker build -t beginner-kayak-class:1.0.0 .
```

### Run Container Locally

```bash
# Create Docker network
docker network create kayak-network

# Run MySQL container
docker run -d \
  --name kayak-db \
  --network kayak-network \
  -e MYSQL_ROOT_PASSWORD=your-secure-password \
  -e MYSQL_DATABASE=beginner-kayak-class \
  -p 3306:3306 \
  mysql:8.0

# Run Application container
docker run -d \
  --name kayak-app \
  --network kayak-network \
  -p 8080:8080 \
  -e DB_HOST=kayak-db \
  -e DB_PORT=3306 \
  -e DB_NAME=beginner-kayak-class \
  -e DB_USER=root \
  -e DB_PASSWORD=your-secure-password \
  beginner-kayak-class:latest
```� API Endpoints

The Spring Boot backend serves the Angular frontend from the root path `/`.
## 🌐 Serving Static Content

The Spring Boot application simply serves the compiled Angular frontend as static files.

### Root Endpoint
```
GET http://localhost:8080/
```
Returns the compiled Angular application (index.html).

### How It Works
1. Angular frontend is built during Maven compilation
2. Compiled files copied to `src/main/resources/static/`
3. Spring Boot serves all requests from static folder
4. Angular router handles all URL routing client-side
5. `FallbackController` ensures all routes map to `index.html` for SPA routing

### Static Files
- Compiled Angular app: `src/main/resources/static/`
- Images, assets: `src/main/angular-app/src/assets/`
- Styles: `src/main/angular-app/src/styles.css`
The application uses environment variables for configuration. See `.env.example` for available options.

### Development Setup
```bash
cp .env.example .env
# Edit .env with your local database credentials
mvn spring-boot:run
```

### Production Setup
Use environment variables in your deployment platform:

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_HOST` | MySQL database host | `mysql.example.com` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_NAME` | Database name | `beginner-kayak-class` |
| `DB_USER` | Database username | `kayak_user` |
| `DB_PASSWORD` | Database password | `SecurePassword123!` |
| `DB_POOL_SIZE` | Connection pool size | `10` |
| `SPRING_PROFILES_ACTIVE` | Active profile | `production` |

**Important**: Never commit sensitive credentials to Git. Use `.env.example` as template and add `.env` to `.gitignore`
## ☁️ Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive production deployment guides including:
- **DigitalOcean App Platform**
- **DigitalOcean Kubernetes Service (DOKS)**
- **Docker Hub & Container Registry setup**
- **SSL/HTTPS Configuration**
- **Database Backup & Recovery**
- **Monitoring & Logging**

## 🔐 Environment Variables

The application supports environment variable configuration for production. Update `src/main/resources/application.properties`:

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_HOST` | localhost | MySQL database host |
| `🐛 Troubleshooting

### Build Issues

**Maven build fails**
```bash
# Clean everything
mvn clean
rm -rf node_modules src/main/angular-app/node_modules
# Rebuild
mvn clean install
```

**Angular build fails**
```bash
cd src/main/angular-app
rm -rf node_modules dist .angular
npm install
npm run build
```

### Database Connection Issues

**Error: Cannot connect to MySQL**
- Verify database is running: `mysql -u root -p`
- Check `.env` has correct credentials
- Ensure database exists: `CREATE DATABASE beginner-kayak-class;`

**Error: Tables don't exist**
- Set `spring.jpa.hibernate.ddl-auto=update` in dev environment
- First run will create tables automatically
- Check `application.properties` for correct setting

### Docker Issues

**Cannot build Docker image**
```bash
# Ensure full build works first
mvn clean install
# Then try Docker build
docker build -t beginner-kayak-class:latest .
```

**Container exits immediately**
```bash
# Check logs
docker logs container_name
# Verify environment variables are set correctly
```

### Port Already in Use

**Port 8080 already in use**
```bash
# Option 1: Kill process using port 8080
# Windows: netstat -ano | findstr :8080
# Linux: lsof -i :8080

# Option 2: Use different port
mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=8888"
```

## 🤝 Contributing & Security

### Development Workflow
See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for:
- Setup instructions for new developers
- Code standards and style guidelines
- Testing requirements
- Pull request process
- Commit message format

### Security Guidelines
See [`SECURITY.md`](./SECURITY.md) for:
- Password security requirements
- Environment variable management
- Dependency vulnerability scanning
- SSL/TLS configuration
- Security incident reporting

### Project Documentation
- **Architecture**: See [`docs/PROJECT_STRUCTURE.md`](./docs/PROJECT_STRUCTURE.md)
- **Deployment**: See [`DEPLOYMENT.md`](./DEPLOYMENT.md)
- **Contributing**: See [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- **Security**: See [`SECURITY.md`](./SECURITY.md)
│   │   ├── angular-app/           # Angular frontend
│   │   │   ├── src/
│   │   │   ├── package.json
│   │   │   └── angular.json
│   │   ├── java/                  # Spring Boot backend
│   │   │   └── com/crookedlinedesign/
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/            # Compiled Angular assets
│   └── test/                      # Unit tests
├── pom.xml                        # Maven configuration
├── Dockerfile                     # Docker build configuration
├── README.md                      # This file
└── DEPLOYMENT.md                  # Deployment guide
```

## 🤝 Contributing

### Code Standards
- Follow Google Java Style Guide for backend code
- Follow Angular Style Guide for frontend code
- Use meaningful commit messages
- Write unit tests for new features

### Pull Request Process
1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and test locally
3. Commit with descriptive messages
4. Push to repository
5. Create Pull Request with description

## 📞 Support & Documentation

- **API Documentation**: See backend README in `src/main/java`
- **Frontend Documentation**: See `src/main/angular-app/README.md`
- **Issues**: Report bugs via GitHub Issues

## 👥 Team

- **Created by**: Ross Healy
- **Maintained by**: WKC Beginner Kayak Course Instructors
- **Last Updated**: January 2026

---

**Questions?** Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed production setup or contact the development team.
