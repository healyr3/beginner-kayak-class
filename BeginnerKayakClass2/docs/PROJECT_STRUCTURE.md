# Project Structure & Architecture

This document describes the organization and architecture of the Beginner Kayak Class 2 project.

## 🏗️ Directory Structure

```
BeginnerKayakClass2/
├── .github/
│   └── workflows/
│       └── build-test.yml           # CI/CD workflow
├── docs/
│   ├── PROJECT_STRUCTURE.md         # This file
│   ├── ARCHITECTURE.md              # Architecture diagram & decisions
│   └── DATABASE_SCHEMA.md           # Database entity relationships
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/crookedlinedesign/beginnerkayakclass2/
│   │   │       ├── controller/      # REST API endpoints
│   │   │       ├── service/         # Business logic layer
│   │   │       ├── repository/      # Data access layer
│   │   │       ├── model/           # Entity classes
│   │   │       └── config/          # Spring configuration
│   │   ├── angular-app/             # Angular frontend
│   │   │   ├── src/
│   │   │   │   ├── app/
│   │   │   │   │   ├── app.component.*       # Root component
│   │   │   │   │   ├── app.routes.ts         # Route definitions
│   │   │   │   │   ├── app.config.ts         # Angular config
│   │   │   │   │   ├── main-nav/             # Navigation component
│   │   │   │   │   ├── classroom/            # Classroom component
│   │   │   │   │   ├── pool1/, pool2/, pool3/   # Pool sessions
│   │   │   │   │   ├── river1/, river2/, river3/, river4/  # River guides
│   │   │   │   │   ├── gear-checklist/       # Equipment checklist
│   │   │   │   │   ├── locations/            # Location info
│   │   │   │   │   ├── club-trips/           # Trip coordination
│   │   │   │   │   ├── american-whitewater/  # AWW integration
│   │   │   │   │   ├── river-gauges/         # Water level info
│   │   │   │   │   ├── instruction-materials/  # Learning resources
│   │   │   │   │   ├── shopping-resources/   # Equipment links
│   │   │   │   │   ├── introduction/         # Getting started
│   │   │   │   │   ├── home/                 # Homepage
│   │   │   │   │   └── assets/
│   │   │   │   │       ├── images/           # Images & icons
│   │   │   │   │       └── content/          # Static content
│   │   │   │   ├── styles.css                # Global styles
│   │   │   │   ├── main.ts                   # Entry point
│   │   │   │   └── index.html                # Root HTML
│   │   │   ├── angular.json                  # Angular build config
│   │   │   ├── tsconfig.json                 # TypeScript config
│   │   │   ├── package.json                  # Dependencies
│   │   │   └── README.md                     # Frontend readme
│   │   ├── resources/
│   │   │   ├── application.properties        # Spring config (dev)
│   │   │   ├── application-prod.properties   # Spring config (prod)
│   │   │   ├── static/                       # Compiled Angular build
│   │   │   └── templates/                    # Thymeleaf templates (if used)
│   │   └── BeginnerKayakClass2Application.java   # Spring Boot entry point
│   └── test/
│       ├── java/                     # Backend tests
│       └── angular-app/              # Frontend tests
├── target/                          # Maven build output (ignored in Git)
├── .env.example                     # Environment template
├── .gitignore                       # Git exclusions
├── pom.xml                          # Maven configuration
├── Dockerfile                       # Docker build
├── CONTRIBUTING.md                 # Contribution guidelines
├── SECURITY.md                      # Security guidelines
├── DEPLOYMENT.md                    # Deployment guide
└── README.md                        # Project overview
```

## 🔄 Application Architecture

### Layered Architecture

```
┌─────────────────────────────────────────┐
│        Angular Frontend (Browser)        │
│        - Components                     │
│        - Routing                        │
│        - Services                       │
└────────────────┬────────────────────────┘
                 │ HTTP/REST
┌─────────────────▼────────────────────────┐
│     Spring Boot Application (Port 8080)  │
│  ┌───────────────────────────────────┐  │
│  │      Controller Layer             │  │
│  │  - REST Endpoints (/api/...)      │  │
│  │  - Request/Response Handling      │  │
│  └───────────────┬───────────────────┘  │
│  ┌───────────────▼───────────────────┐  │
│  │      Service Layer                │  │
│  │  - Business Logic                 │  │
│  │  - Data Validation                │  │
│  │  - Business Rules                 │  │
│  └───────────────┬───────────────────┘  │
│  ┌───────────────▼───────────────────┐  │
│  │     Repository/DAO Layer          │  │
│  │  - Database Access (JPA)          │  │
│  │  - Query Generation               │  │
│  └───────────────┬───────────────────┘  │
└────────────────┬────────────────────────┘
                 │ JDBC/SQL
┌────────────────▼────────────────────────┐
│         MySQL Database                  │
│         - Entities                      │
│         - Persisted Data                │
└─────────────────────────────────────────┘
```

### Deployment Architecture

```
┌──────────────────────────────────────┐
│    DigitalOcean App Platform         │
│  ┌──────────────────────────────┐   │
│  │  Docker Container            │   │
│  │ ┌────────────────────────┐   │   │
│  │ │ Node: Build Angular    │   │   │
│  │ │ Maven: Build Java JAR  │   │   │
│  │ │ Tomcat: Run Spring App │   │   │
│  │ └────────────────────────┘   │   │
│  └──────────────┬───────────────┘   │
│                 │                    │
│  ┌──────────────▼───────────────┐   │
│  │ Managed MySQL Database       │   │
│  │ - Automated backups          │   │
│  │ - Connection pooling         │   │
│  │ - SSL encryption             │   │
│  └──────────────────────────────┘   │
│                                      │
│  ┌──────────────────────────────┐   │
│  │ Auto SSL/HTTPS               │   │
│  │ - Let's Encrypt              │   │
│  │ - Auto renewal               │   │
│  └──────────────────────────────┘   │
└──────────────────────────────────────┘
```

## 🛠️ Backend Structure

### Controller Layer
**Location:** `src/main/java/.../controller/`

Handles HTTP requests and responses:
- `FallbackController` - Routes requests to Angular SPA
- Custom Controllers - API endpoints (extend as needed)

```java
@RestController
@RequestMapping("/api")
public class ExampleController {
    @GetMapping("/example")
    public ResponseEntity<?> getExample() {
        // Handle request
    }
}
```

### Service Layer
**Location:** `src/main/java/.../service/`

Contains business logic and rules:
- Data validation
- Business operations
- Integration logic

```java
@Service
public class ExampleService {
    // Business logic here
}
```

### Repository Layer
**Location:** `src/main/java/.../repository/`

Data access using Spring Data JPA:

```java
public interface ExampleRepository extends JpaRepository<Example, Long> {
    // CRUD operations auto-generated
    // Add custom queries as needed
}
```

### Model/Entity Layer
**Location:** `src/main/java/.../model/`

JPA entity classes representing database tables:

```java
@Entity
@Table(name = "example")
public class Example {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // Properties
}
```

## 🎨 Frontend Structure

### Components
Each feature has its own component directory:
- **classroom/** - Class scheduling and management
- **pool1/, pool2/, pool3/** - Pool training sessions
- **river1-4/** - River guides and difficulty levels
- **gear-checklist/** - Equipment tracking
- **locations/** - Venue information
- **club-trips/** - Trip coordination
- **american-whitewater/** - AWW integration
- **river-gauges/** - Water level monitoring
- **instruction-materials/** - Learning resources
- **shopping-resources/** - Equipment retailers
- **introduction/** - Onboarding guide
- **home/** - Homepage
- **main-nav/** - Navigation component

Each component typically includes:
```
component-name/
├── component-name.component.ts       # Logic
├── component-name.component.html     # Template
├── component-name.component.css      # Styles
└── component-name.component.spec.ts  # Tests
```

### Routing
**File:** `src/main/angular-app/src/app/app.routes.ts`

Defines all application routes:
```typescript
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'classroom', component: ClassroomComponent },
  // ... more routes
];
```

### Global Styles
**File:** `src/main/angular-app/src/styles.css`

Application-wide CSS and Material Design integration.

## 🗄️ Database Schema

See [`docs/DATABASE_SCHEMA.md`](DATABASE_SCHEMA.md) for entity relationships and schema details.

### Key Tables (typical):
- Users (if authentication added)
- Classes
- Sessions
- Equipment
- Locations
- Trips

## 📦 Build Process

### Maven Build Flow
1. Clean previous build
2. Compile Java code
3. Run backend tests
4. Build Angular frontend (npm run build)
5. Copy Angular dist to `src/main/resources/static/`
6. Package JAR with static files included

```bash
mvn clean install
# Creates: target/BeginnerKayakClass2-0.0.1-SNAPSHOT.jar
```

### Docker Build Flow
1. Stage 1: Build Angular with Node 18
2. Stage 2: Build Java with Maven
3. Stage 3: Copy both to runtime image (Eclipse Temurin)
4. Final image: ~400MB multi-stage build

```bash
docker build -t beginner-kayak-class:latest .
```

## 🔄 Build & Deployment Process

```
┌─────────────────────────────────────┐
│   Developer Commits to main          │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│   GitHub Actions CI/CD               │
│  1. Checkout code                   │
│  2. Build Java backend              │
│  3. Run Java tests                  │
│  4. Build Angular frontend          │
│  5. Run Angular tests               │
│  6. Build Docker image              │
│  7. Push to registry (optional)     │
└────────────────┬────────────────────┘
                 │
        ┌────────▼────────┐
        │   Success?      │
        └────┬───────┬────┘
             │       │
            Yes      No
             │       │
             │   ┌───▼─────────┐
             │   │ Notify team │
             │   └─────────────┘
             │
┌────────────▼────────────────┐
│ DigitalOcean App Platform   │
│ - Pull latest Docker image  │
│ - Restart container         │
│ - Health check passed?      │
│ - Deployment complete ✓     │
└─────────────────────────────┘
```

## 📊 Configuration Management

### Environment-Specific Config

**Development** (`application.properties`):
```properties
spring.jpa.hibernate.ddl-auto=update
logging.level.root=DEBUG
```

**Production** (`application-prod.properties`):
```properties
spring.jpa.hibernate.ddl-auto=validate
logging.level.root=WARN
```

Set active profile via `SPRING_PROFILES_ACTIVE` environment variable.

## 🔐 Key Configuration Files

| File | Purpose |
|------|---------|
| `pom.xml` | Maven: Dependencies, plugins, build config |
| `angular.json` | Angular build & serve config |
| `tsconfig.json` | TypeScript compiler settings |
| `application.properties` | Spring Boot dev config |
| `application-prod.properties` | Spring Boot prod config |
| `Dockerfile` | Multi-stage container build |
| `.github/workflows/*.yml` | CI/CD automation |

## 📚 Related Documentation

- [`ARCHITECTURE.md`](ARCHITECTURE.md) - Detailed architecture decisions
- [`DATABASE_SCHEMA.md`](DATABASE_SCHEMA.md) - Database design
- [`../DEPLOYMENT.md`](../DEPLOYMENT.md) - Production deployment
- [`../CONTRIBUTING.md`](../CONTRIBUTING.md) - Development workflow
- [`../SECURITY.md`](../SECURITY.md) - Security best practices
- [`../README.md`](../README.md) - Project overview

---

**Last Updated:** January 2026
