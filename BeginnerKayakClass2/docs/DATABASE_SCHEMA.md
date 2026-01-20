# Database Schema Reference

This document describes the database structure for the Beginner Kayak Class 2 application.

## 📋 Overview

The application uses MySQL 8.0+ with Spring Data JPA for data persistence. Tables are automatically created by Hibernate on first deployment.

## 🗄️ Entity-Relationship Diagram

```
┌──────────────────────┐
│      User            │ (Future: if auth implemented)
├──────────────────────┤
│ - id (PK)            │
│ - username           │
│ - email              │
│ - role               │
└──────────────────────┘

┌──────────────────────┐
│      Class           │
├──────────────────────┤
│ - id (PK)            │
│ - name               │
│ - description        │
│ - level              │
│ - capacity           │
│ - location_id (FK)   │──┐
└──────────────────────┘  │
                          │
┌──────────────────────┐  │
│      Location        │◄─┘
├──────────────────────┤
│ - id (PK)            │
│ - name               │
│ - address            │
│ - coordinates        │
│ - facilities         │
└──────────────────────┘

┌──────────────────────┐
│      Session         │
├──────────────────────┤
│ - id (PK)            │
│ - class_id (FK)      │──┐
│ - start_date         │  │
│ - end_date           │  │
│ - instructor         │  │
│ - max_students       │  │
└──────────────────────┘  │
                          │
                    (References Class)
```

## 📊 Core Tables

### Current Tables (Static Content)

The application currently serves static content pages. If database functionality is added, create entities following this pattern:

### Example: Class Entity (for future implementation)

```sql
CREATE TABLE class (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    level VARCHAR(50),
    capacity INT,
    location_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES location(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## 🔑 Naming Conventions

### Table Names
- Singular noun: `class`, `location`, `session`
- Snake_case: `user_session`, `class_schedule`

### Column Names
- Snake_case: `first_name`, `last_name`
- Suffixes:
  - Primary Key: `id` (auto-increment Long)
  - Foreign Key: `{entity}_id` (e.g., `location_id`)
  - Timestamps: `created_at`, `updated_at`
  - Flags: `is_{property}` (e.g., `is_active`)

### Indexes
```sql
-- Foreign keys automatically indexed
CREATE INDEX idx_class_location ON class(location_id);
CREATE INDEX idx_session_class ON session(class_id);
CREATE INDEX idx_session_date ON session(start_date);
```

## 🔐 Data Types

| Use Case | Type | Example |
|----------|------|---------|
| IDs | BIGINT AUTO_INCREMENT | `id` |
| Names/Text | VARCHAR(255) | `name`, `title` |
| Long text | TEXT/LONGTEXT | `description` |
| Numbers | INT, DECIMAL | `capacity`, `price` |
| Dates | DATETIME, DATE | `created_at`, `birth_date` |
| Timestamps | TIMESTAMP | `created_at`, `updated_at` |
| Flags | BOOLEAN/TINYINT(1) | `is_active` |

## ⚙️ Hibernate Configuration

The application uses Spring Data JPA with Hibernate for ORM.

### Configuration in `application.properties`

```properties
# Development (auto-create tables)
spring.jpa.hibernate.ddl-auto=update

# Production (validate only, no changes)
spring.jpa.hibernate.ddl-auto=validate

# Dialect for MySQL 8.0
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

### Entity Example

```java
@Entity
@Table(name = "class")
public class ClassEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 255)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private Level level;
    
    @Column(nullable = false)
    private Integer capacity;
    
    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
    
    // Getters, Setters, Constructors
}
```

## 🚀 Adding New Entities

When adding database functionality, follow this pattern:

### 1. Create Entity Class
```java
@Entity
@Table(name = "table_name")
public class EntityName {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // Properties with proper annotations
    // Timestamps
}
```

### 2. Create Repository
```java
@Repository
public interface EntityRepository extends JpaRepository<Entity, Long> {
    // Custom queries as needed
}
```

### 3. Create Service
```java
@Service
public class EntityService {
    // Business logic
}
```

### 4. Create Controller
```java
@RestController
@RequestMapping("/api/entities")
public class EntityController {
    // REST endpoints
}
```

## 🔄 Migrations

### Initial Database Setup

1. **First deployment** (development environment):
   ```properties
   # application.properties
   spring.jpa.hibernate.ddl-auto=update
   ```
   Hibernate automatically creates all tables from entities.

2. **Switch to production**:
   ```properties
   # application-prod.properties
   spring.jpa.hibernate.ddl-auto=validate
   ```
   Application will fail to start if entity definitions don't match database.

### Schema Changes

For production changes, use Flyway or Liquibase (optional but recommended):

```bash
# Add to pom.xml
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
</dependency>
```

Create migration files:
```
src/main/resources/db/migration/
├── V1__initial_schema.sql
├── V2__add_user_table.sql
└── V3__add_indexes.sql
```

## 📊 Backup & Recovery

### Backup Database
```bash
mysqldump -h <host> -u <user> -p <database> > backup.sql

# With datetime
mysqldump -h <host> -u <user> -p <database> > backup-$(date +%Y%m%d-%H%M%S).sql
```

### Restore Database
```bash
mysql -h <host> -u <user> -p <database> < backup.sql
```

### DigitalOcean Backups
```bash
# List backups
doctl databases backup list <db-cluster-id>

# Create backup
doctl databases backup create <db-cluster-id> --backup-name "backup-name"

# Restore from backup
doctl databases backup restore <db-cluster-id> <backup-id>
```

## 🔐 Security Best Practices

### Connection Security
- ✅ Use SSL for database connections
- ✅ Create restricted user accounts
- ✅ Use strong passwords (16+ characters)
- ✅ Rotate credentials every 90 days

### Query Security
- ✅ Use parameterized queries (Spring Data JPA does this automatically)
- ✅ Validate input in service layer
- ✅ Limit database user permissions

### Data Protection
- ✅ Enable encrypted backups
- ✅ Store sensitive data encrypted
- ✅ Regular security audits
- ✅ Monitor access logs

## 📈 Performance Optimization

### Indexes
```sql
-- Add for frequently searched columns
CREATE INDEX idx_user_email ON user(email);
CREATE INDEX idx_class_level ON class(level);
CREATE INDEX idx_session_date ON session(start_date);
```

### Query Optimization
- Use `@Query` for complex queries
- Add `@EntityGraph` for relationship fetching
- Implement pagination for large result sets

```java
@Repository
public interface ClassRepository extends JpaRepository<ClassEntity, Long> {
    
    // Pagination
    Page<ClassEntity> findByLevel(Level level, Pageable pageable);
    
    // Custom query
    @Query("SELECT c FROM ClassEntity c WHERE c.level = :level")
    List<ClassEntity> findClassesByLevel(@Param("level") Level level);
}
```

## 🛠️ Common Issues

### Hibernate Doesn't Create Tables
- Check `ddl-auto` is set to `create` or `update`
- Verify entities are in correct package
- Check for compile errors in entity classes
- Restart application after changes

### Foreign Key Constraint Errors
- Ensure parent record exists before inserting child
- Use cascade options carefully
- Check column types match (both should be BIGINT)

### Performance Issues
- Add indexes to frequently queried columns
- Use lazy loading for large collections
- Implement query caching for read-heavy data
- Monitor slow queries in application logs

## 📚 Resources

- [Spring Data JPA Documentation](https://spring.io/projects/spring-data-jpa)
- [Hibernate User Guide](https://hibernate.org/orm/documentation/)
- [MySQL 8.0 Documentation](https://dev.mysql.com/doc/refman/8.0/en/)

---

**Last Updated:** January 2026
