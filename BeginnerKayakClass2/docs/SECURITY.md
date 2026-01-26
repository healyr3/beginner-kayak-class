# Security Guidelines

This document outlines security best practices for the Beginner Kayak Class 2 project.

## 🔒 Never Commit to Version Control

The following must NEVER be committed to Git:

- Database passwords, usernames, or connection strings
- API keys, tokens, or secrets
- `.env` files with actual values
- Private keys or certificates
- SSH keys or deployment credentials
- OAuth tokens or refresh tokens
- Any file listed in `.gitignore`

**Verification:** Use `git status` before committing to verify no sensitive files are staged.

## 🔐 Environment Variables (Required)

All sensitive configuration must use environment variables:

| Variable | Usage | Example |
|----------|-------|---------|
| `DB_HOST` | MySQL hostname | `mysql.example.com` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_NAME` | Database name | `beginner-kayak-class` |
| `DB_USER` | MySQL username | `kayak_user` |
| `DB_PASSWORD` | MySQL password | `SecurePassword123!` |
| `DB_POOL_SIZE` | Connection pool size | `10` |
| `JAVA_TOOL_OPTIONS` | JVM memory settings | `-Xmx512m -Xms256m` |
| `SPRING_PROFILES_ACTIVE` | Active profile | `production` |

### Setup Instructions

1. **Local Development**
   ```bash
   # Copy template
   cp .env.example .env
   
   # Update with your local values
   # Never commit .env to Git
   ```

2. **DigitalOcean App Platform**
   - Set via App Settings → Variables
   - Platform masks sensitive values automatically
   - No need to commit configuration

3. **Docker Deployment**
   ```bash
   docker run \
     -e DB_HOST=mysql-server \
     -e DB_USER=kayak_user \
     -e DB_PASSWORD=secure_password \
     beginner-kayak-class:latest
   ```

## 🔑 Password Security

### Requirements
- **Minimum 16 characters** for production
- Mix of uppercase, lowercase, numbers, and symbols
- Avoid dictionary words or patterns
- Rotate credentials every 90 days

### Examples of Strong Passwords
✅ `K@yak#Paddle2026$Secure`  
✅ `MySQL_bP4&rJ9mX2wQ5nV`  
❌ `password123`  
❌ `kayak`  
❌ `admin`

### Credential Management

For team deployment credentials:
- Use password manager (1Password, LastPass, Bitwarden)
- Share via secure channel, not email
- Rotate after employee departure
- Document access restrictions

## 🛡️ Database Security

### Connection Security
- Enable SSL for database connections (configured in `application-prod.properties`)
- Use strong credentials
- Restrict database access by IP (firewall rules)

### Data Protection
- Regular automated backups (daily minimum)
- Encrypt backups at rest
- Test restore procedures monthly
- Separate read-only replica for backups

### Access Control
- Create separate MySQL user for each environment (dev, staging, prod)
- Use principle of least privilege
- Never use root account for application
- Disable default accounts

**Example: Create restricted MySQL user**
```sql
CREATE USER 'kayak_app'@'10.0.0.0/8' IDENTIFIED BY 'strong_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON beginner-kayak-class.* TO 'kayak_app'@'10.0.0.0/8';
FLUSH PRIVILEGES;
```

## 🔗 HTTPS/SSL/TLS

### Production Requirements
- **HTTPS mandatory** for all traffic
- **TLS 1.2 minimum** (preferably 1.3)
- Valid SSL certificate from trusted CA
- Auto-redirect HTTP → HTTPS

### Certificate Management

**DigitalOcean App Platform**
- SSL certificate auto-generated
- Auto-renewed before expiration
- No manual intervention needed
- Managed globally via CDN

**Custom Domain**
- Use Let's Encrypt (free, automatic)
- Or purchase from trusted CA
- Set renewal 30 days before expiration

**Configuration**
```yaml
# In app.yaml for DigitalOcean
envs:
  - key: SERVER_SSL_ENABLED
    value: "true"
```

## 📦 Dependency Security

### Regular Audits

**Check Java dependencies**
```bash
# Generate dependency update report
mvn versions:display-dependency-updates

# Check for known CVEs
mvn dependency-check:check

# Update dependencies
mvn versions:update-properties
```

**Check Node dependencies**
```bash
cd src/main/angular-app

# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Update packages
npm update
```

### Policy
- Run security audits monthly
- Update dependencies in non-critical releases
- Test thoroughly before updating
- Use exact versions in pom.xml and package-lock.json
- Never use `LATEST` or wildcards

## 🚀 Deployment Security

### Pre-Deployment Checklist
- [ ] No hardcoded credentials in code
- [ ] All `.env` files excluded from Git
- [ ] Database firewall rules configured
- [ ] SSL certificate valid and auto-renewing
- [ ] Backups tested and documented
- [ ] Audit logs enabled
- [ ] Error pages don't leak sensitive info
- [ ] Security headers configured

### Security Headers (Add to Spring Boot)

```java
// src/main/java/.../config/SecurityHeadersConfig.java
@Configuration
public class SecurityHeadersConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new HandlerInterceptor() {
            @Override
            public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
                response.setHeader("X-Content-Type-Options", "nosniff");
                response.setHeader("X-Frame-Options", "SAMEORIGIN");
                response.setHeader("X-XSS-Protection", "1; mode=block");
                response.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
                return true;
            }
        });
    }
}
```

## 🔍 Monitoring & Logging

### What to Log
✅ Authentication attempts  
✅ Failed login attempts  
✅ Database access  
✅ Configuration changes  
✅ Error conditions  
❌ Passwords or sensitive data  
❌ Personal information  
❌ API keys in logs  

### Log Retention
- Development: 7 days
- Staging: 30 days
- Production: 90 days (with encryption)

### Monitoring
```properties
# src/main/resources/application-prod.properties
logging.level.root=WARN
logging.level.com.crookedlinedesign=INFO
logging.file.name=/var/log/app/application.log
logging.file.max-size=10MB
logging.file.max-history=30
```

## 🛡️ API Security

### Authentication & Authorization
- Implement Spring Security for API endpoints
- Use role-based access control (RBAC)
- Validate all inputs (SQL injection, XSS prevention)

### Rate Limiting
```java
// Prevent brute force attacks
// Consider using: spring-boot-starter-security with rate limiting
```

### Input Validation
```java
@PostMapping("/api/endpoint")
public ResponseEntity<?> example(@Valid @RequestBody Data data) {
    // Spring validation prevents invalid input
}
```

## 📋 Security Incident Response

### Report a Vulnerability
1. **Do NOT** create a public GitHub issue
2. Email security team with:
   - Description of vulnerability
   - Steps to reproduce
   - Affected version(s)
   - Suggested fix (if known)
3. Allow 72 hours for response
4. Coordinate disclosure timeline

### Response Process
1. Acknowledge receipt within 24 hours
2. Create fix within 7 days
3. Release patch update
4. Public disclosure after patch available

## 🔄 Regular Security Tasks

### Monthly
- [ ] Run `mvn dependency-check:check`
- [ ] Run `npm audit` and fix
- [ ] Review access logs
- [ ] Verify backups completed

### Quarterly
- [ ] Penetration testing report
- [ ] Security update review
- [ ] Credential rotation
- [ ] Disaster recovery drill

### Annually
- [ ] Full security audit
- [ ] Compliance assessment (GDPR, etc.)
- [ ] Third-party vulnerability scan
- [ ] Security policy review

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Spring Security Documentation](https://spring.io/projects/spring-security)
- [Angular Security Guide](https://angular.io/guide/security)
- [CWE Top 25](https://cwe.mitre.org/top25/)

## ❓ Questions?

Contact the security team or review:
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) - Development guidelines
- [`README.md`](./README.md) - Project overview
- [`DEPLOYMENT.md`](./DEPLOYMENT.md) - Deployment security

---

**Last Updated:** January 2026  
**Next Review:** April 2026
