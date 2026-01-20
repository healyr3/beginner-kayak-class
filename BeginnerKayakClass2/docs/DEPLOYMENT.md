# Deployment Guide - Beginner Kayak Class 2

This guide provides comprehensive instructions for deploying the Beginner Kayak Class 2 application to production environments, with a focus on **DigitalOcean** hosting.

## 📋 Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [DigitalOcean App Platform (Recommended)](#digitalocean-app-platform-recommended)
3. [DigitalOcean Kubernetes (DOKS)](#digitalocean-kubernetes-doks)
4. [Docker Hub Setup](#docker-hub-setup)
5. [Database Setup](#database-setup)
6. [SSL/HTTPS Configuration](#ssltls-configuration)
7. [Monitoring & Logging](#monitoring--logging)
8. [Troubleshooting](#troubleshooting)

---

## ✅ Pre-Deployment Checklist

Before deploying to production, ensure:

- [ ] Code is committed to GitHub with clean git history
- [ ] All build artifacts removed (`target/`, `node_modules/`, `.angular/`)
- [ ] `.gitignore` is properly configured
- [ ] `application.properties` uses environment variables (not hardcoded values)
- [ ] Database credentials stored as secrets, not in code
- [ ] Application builds locally: `mvn clean install`
- [ ] Docker image builds successfully: `docker build .`
- [ ] Tests pass: `mvn test`
- [ ] Frontend builds: `cd src/main/angular-app && npm run build`
- [ ] All temporary files committed to `.gitignore` are excluded

### Pre-Deployment Commands

```bash
# Ensure clean repository
git status
git log --oneline -5

# Verify build
mvn clean install
mvn test

# Test Docker build
docker build -t test:latest .
docker run --rm test:latest java -version
```

---

## ☁️ DigitalOcean App Platform (Recommended)

**Advantages**: 
- Easiest setup for teams
- Automatic scaling
- Built-in SSL
- GitHub integration for CI/CD
- Managed database options

### Step 1: Push Code to GitHub

```bash
git remote add origin https://github.com/your-username/beginner-kayak-class.git
git branch -M main
git push -u origin main
```

### Step 2: Create DigitalOcean Account & Project

1. Sign up at [DigitalOcean](https://digitalocean.com)
2. Create a new project: Dashboard → Create → Project
3. Name it: "Beginner Kayak Class"

### Step 3: Create MySQL Database

1. Go to **Databases** → **Create Database**
   - **Type**: MySQL 8
   - **Region**: Same as app (e.g., New York 1)
   - **Name**: `beginner-kayak-class-db`
   - **High Availability**: Check for production

2. Note the **connection details** (host, port, username, password, database name)

3. Save connection string for later use

### Step 4: Deploy Application via App Platform

#### Option A: Using Docker Image (Recommended)

1. **Create App Platform App**:
   - Dashboard → Create → App
   - Select "GitHub" as source
   - Connect your repository
   - Select branch: `main`

2. **Configure Build Settings**:
   ```yaml
   name: beginner-kayak-class
   services:
   - name: api
     source:
       type: github
       repo: your-username/beginner-kayak-class
       branch: main
     build_command: |
       docker build -t beginner-kayak-class:latest .
     run_command: java -jar app.jar
     http_port: 8080
     health_check:
       http_path: /
   
   databases:
   - engine: MYSQL
     production: true
     name: kayak-db
     version: "8.0"
   ```

3. **Add Environment Variables** (under App Settings → Variables):
   ```
   DB_HOST=${db.HOSTNAME}
   DB_PORT=${db.PORT}
   DB_NAME=${db.NAME}
   DB_USER=${db.USERNAME}
   DB_PASSWORD=${db.PASSWORD}
   ```

4. **Deploy**: Click "Deploy" and wait for completion

#### Option B: Using Buildpack (Alternative)

1. Create `app.yaml` in repository root:

```yaml
name: beginner-kayak-class
services:
- name: web
  source_dir: .
  build_command: mvn clean package
  run_command: java -jar target/BeginnerKayakClass2-0.0.1-SNAPSHOT.jar
  http_port: 8080
  envs:
  - key: SPRING_DATASOURCE_URL
    value: jdbc:mysql://${db.HOSTNAME}:${db.PORT}/${db.NAME}?useSSL=true
  - key: SPRING_DATASOURCE_USERNAME
    value: ${db.USERNAME}
  - key: SPRING_DATASOURCE_PASSWORD
    value: ${db.PASSWORD}
  - key: JAVA_TOOL_OPTIONS
    value: "-Xmx512m -Xms256m"

databases:
- engine: MYSQL
  production: true
  name: kayak-db
```

2. Commit and push:
```bash
git add app.yaml
git commit -m "Add App Platform configuration"
git push origin main
```

### Step 5: Connect Custom Domain (Optional)

1. In App Platform → Settings → Domains
2. Add your domain or use DigitalOcean subdomain
3. Configure DNS records
4. SSL certificate auto-generated

### Step 6: Monitor Deployment

```bash
# In App Platform Dashboard
- View deployment logs
- Check application status
- Monitor resource usage
```

---

## 🚀 DigitalOcean Kubernetes (DOKS)

For advanced deployments with higher traffic:

### Create Kubernetes Cluster

1. **Create DOKS Cluster**:
   ```bash
   doctl kubernetes cluster create kayak-cluster \
     --region nyc1 \
     --size s-2vcpu-2gb \
     --count 3
   ```

2. **Configure kubectl**:
   ```bash
   doctl kubernetes cluster kubeconfig save kayak-cluster
   kubectl config use-context do-nyc1-kayak-cluster
   ```

### Deploy Using Helm

1. **Create Helm Chart**:
   ```bash
   helm create kayak-app
   cd kayak-app
   ```

2. **Update values.yaml**:
   ```yaml
   image:
     repository: your-docker-hub/beginner-kayak-class
     tag: "1.0.0"
   
   service:
     type: LoadBalancer
     port: 80
     targetPort: 8080
   
   env:
     DB_HOST: mysql-service
     DB_PORT: "3306"
   
   resources:
     limits:
       cpu: 500m
       memory: 512Mi
     requests:
       cpu: 250m
       memory: 256Mi
   ```

3. **Deploy**:
   ```bash
   helm install kayak-app ./kayak-app
   ```

---

## 🐳 Docker Hub Setup

### Build & Push Docker Image

```bash
# Login to Docker Hub
docker login

# Build image
docker build -t your-username/beginner-kayak-class:1.0.0 .
docker tag beginner-kayak-class:1.0.0 your-username/beginner-kayak-class:latest

# Push to Docker Hub
docker push your-username/beginner-kayak-class:1.0.0
docker push your-username/beginner-kayak-class:latest

# Verify
docker pull your-username/beginner-kayak-class:latest
docker run -p 8080:8080 your-username/beginner-kayak-class:latest
```

### Configure Private Repository (Optional)

1. On Docker Hub: Create Repository → Private
2. Generate access token: Account Settings → Security
3. In DigitalOcean: Create Registry authentication secret

---

## 🗄️ Database Setup

### Initial Database Creation

#### MySQL via DigitalOcean

1. Created in DigitalOcean Databases (see step 3 above)
2. Connection info provided in dashboard

#### Manual SQL Script

Create `init-db.sql`:

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS `beginner-kayak-class`;
USE `beginner-kayak-class`;

-- Create tables (automatically done by Hibernate on first run)
-- Ensure spring.jpa.hibernate.ddl-auto=update for first deployment
-- Then change to 'validate' in production
```

#### Run Initial Migration

1. Set `spring.jpa.hibernate.ddl-auto=update` in `application.properties`
2. Deploy application (Hibernate will create tables)
3. Change to `validate` after initial deployment
4. Commit and redeploy

### Backup & Restore

```bash
# Backup
mysqldump -h <host> -u <user> -p beginner-kayak-class > backup.sql

# Restore
mysql -h <host> -u <user> -p beginner-kayak-class < backup.sql

# Via DigitalOcean CLI
doctl databases backup create kayak-db --backup-name "2026-01-18"
```

---

## 🔐 SSL/TLS Configuration

### DigitalOcean App Platform

- **Automatic**: SSL certificate auto-generated for all apps
- **Custom Domain**: Managed by Let's Encrypt
- **HTTPS**: Enforced by default

### Manual NGINX Configuration (if using DOKS)

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://kayak-app:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 📊 Monitoring & Logging

### DigitalOcean Application Insights

1. In App Platform → Metrics
   - CPU Usage
   - Memory Usage
   - Request Rate
   - Response Time

2. Logs → Application Logs
   - Filter by deployment
   - Search for errors

### Application Logging

Update `src/main/resources/application.properties`:

```properties
logging.level.root=INFO
logging.level.com.crookedlinedesign=DEBUG
logging.file.name=/var/log/app/application.log
logging.file.max-size=10MB
logging.file.max-history=30
```

### External Monitoring (Optional)

```bash
# New Relic
docker run -e NEW_RELIC_LICENSE_KEY=<key> ...

# Datadog
docker run -e DD_API_KEY=<key> ...
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Application Won't Start

```bash
# Check logs
doctl apps logs list <app-id>
doctl apps logs get <app-id> --follow

# Check environment variables
- Verify DB_HOST, DB_PORT, DB_NAME are correct
- Ensure database is accessible from app
```

#### 2. Database Connection Failed

```bash
# Test connection
mysql -h <host> -u <user> -p <database>

# Check firewall
- Ensure DigitalOcean firewall allows app to database connection
- In Networking → Firewalls → Inbound Rules
```

#### 3. Out of Memory

```bash
# Increase memory
- In app.yaml: increase memory allocation
- Set JVM options: JAVA_TOOL_OPTIONS=-Xmx1024m
- Redeploy
```

#### 4. High CPU Usage

```bash
# Analyze
- Check application logs for errors
- Monitor DB queries
- Consider database query optimization
```

#### 5. Static Files Not Loading

```bash
# Verify Angular build
cd src/main/angular-app && npm run build

# Check Docker build output
docker build -v .

# Ensure compiled assets in target/classes/static/
```

### Debug Commands

```bash
# SSH into container (DOKS)
kubectl exec -it <pod-name> -- /bin/sh

# Check running processes
ps aux

# Monitor resources
top

# Check network connectivity
curl http://kayak-db:3306
```

---

## 📈 Scaling & Performance

### Auto-Scaling (App Platform)

1. Settings → Auto-Scaling
   - Metric: CPU Utilization
   - Min Instances: 2
   - Max Instances: 5
   - Threshold: 75%

### Database Optimization

- Enable query caching
- Add indexes to frequently queried fields
- Use connection pooling (configured in `application.properties`)

### CDN for Static Assets

```bash
# Configure DigitalOcean Spaces (CDN)
1. Create Space: Spaces → Create Space
2. Upload Angular dist files
3. Configure custom domain
4. Update application to reference CDN URL
```

---

## 🔄 Continuous Deployment

### GitHub Actions CI/CD

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to DigitalOcean

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Build and Deploy
      run: |
        docker build -t your-username/beginner-kayak-class:latest .
        docker push your-username/beginner-kayak-class:latest
    - name: Trigger App Platform Deployment
      run: |
        curl -X POST "https://api.digitalocean.com/v2/apps/${{ secrets.DIGITALOCEAN_APP_ID }}/deployments" \
          -H "Authorization: Bearer ${{ secrets.DIGITALOCEAN_TOKEN }}"
```

---

## 📞 Support

- **DigitalOcean Docs**: https://docs.digitalocean.com
- **Spring Boot**: https://spring.io/projects/spring-boot
- **Angular**: https://angular.io/docs
- **Docker**: https://docs.docker.com

---

**Last Updated**: January 2026
**Next Review**: April 2026
