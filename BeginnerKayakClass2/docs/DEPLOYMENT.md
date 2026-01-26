# Deployment Guide - Beginner Kayak Class 2

This guide provides comprehensive instructions for deploying the Beginner Kayak Class 2 application to production environments, with a focus on **DigitalOcean** hosting.

**Repository**: https://github.com/healyr3/beginner-kayak-class

## 📋 Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Local Build & Test](#local-build--test)
3. [DigitalOcean App Platform (Recommended)](#digitalocean-app-platform-recommended)
4. [Docker Hub Setup](#docker-hub-setup)
5. [SSL/HTTPS Configuration](#ssltls-configuration)
6. [Monitoring & Logging](#monitoring--logging)
7. [Troubleshooting](#troubleshooting)

---

## ✅ Pre-Deployment Checklist

**IMPORTANT: Complete ALL steps before pushing to GitHub or deploying to DigitalOcean**

Local verification (on your machine):
- [ ] Code builds locally: `.\mvnw.cmd clean install`
- [ ] Tests pass: `.\mvnw.cmd test`
- [ ] Angular builds: `cd src/main/angular-app && npm run build`
- [ ] Docker image builds: `docker build -t beginner-kayak-class:test .`
- [ ] Docker runs locally: `docker run -p 8080:8080 beginner-kayak-class:test`
- [ ] Application responds: `curl http://localhost:8080`
- [ ] All static assets load (CSS, images, JavaScript)
- [ ] No errors in browser DevTools console

Git verification:
- [ ] Code committed: `git status` shows clean
- [ ] Large files excluded: `.gitignore` updated
- [ ] Remote configured: `git remote -v` shows origin

### Pre-Deployment Commands

```powershell
# Verify build locally
.\mvnw.cmd clean install
.\mvnw.cmd test

# Build Docker image
docker build -t beginner-kayak-class:test .

# Test Docker locally
docker run -p 8080:8080 beginner-kayak-class:test
# Open http://localhost:8080 in browser

# Verify Git status
git status
git log --oneline -5
```

---

## 🚀 Local Build & Test

### Prerequisites
- Java 17+ installed
- Node.js 18+ installed
- Maven (or use `mvnw.cmd`)
- Docker Desktop installed and running
- Git configured

### Build Steps

```powershell
# Navigate to project root
cd BeginnerKayakClass2

# Clean and build the entire project
.\mvnw.cmd clean install

# Run tests
.\mvnw.cmd test

# Build Angular frontend
cd src/main/angular-app
npm install
npm run build
cd ../../../

# Build Docker image locally
docker build -t beginner-kayak-class:latest .

# Test Docker container
docker run -p 8080:8080 beginner-kayak-class:latest
```

Visit `http://localhost:8080` to verify the application works correctly.

---

## 🌐 DigitalOcean App Platform (Recommended)

DigitalOcean App Platform provides the easiest deployment path with automatic scaling and managed services.

### Step 1: Prepare GitHub Repository

```powershell
# Ensure code is pushed to GitHub
git add .
git commit -m "Ready for deployment"
git push -u origin main
```

### Step 2: Create DigitalOcean Account & Project

1. Sign up at [DigitalOcean](https://www.digitalocean.com)
2. Create a new project or use existing one
3. Create an API token in Account > API > Tokens/Keys

### Step 3: Deploy via App Platform

**Option A: Using DigitalOcean Console**

1. Go to Apps > Create App
2. Select "GitHub" as source
3. Authorize and select `healyr3/beginner-kayak-class` repository
4. Choose branch (e.g., `main`)
5. Configure the app:
   - **Source**: Docker (use Dockerfile from repo)
   - **Port**: 8080
   - **HTTP Request Routes**: `/`
   - **Resource Tier**: Basic ($12/month minimum)
6. Review and deploy

**Option B: Using App Spec (YAML Configuration)**

Create `app.yaml` in repository root:

```yaml
name: beginner-kayak-class
services:
- name: web
  github:
    branch: main
    repo: healyr3/beginner-kayak-class
  build_command: |
    ./mvnw clean install
    cd src/main/angular-app
    npm install
    npm run build
  dockerfile_path: Dockerfile
  http_port: 8080
  health_check:
    http_path: /
  autoscaling:
    max_count: 3
    min_count: 1
    target_cpu_utilization_percent: 70
envs:
- key: SPRING_PROFILES_ACTIVE
  value: prod
```

Deploy with:
```powershell
doctl apps create --spec app.yaml
```

### Step 4: Configure Custom Domain (Optional)

1. In DigitalOcean App > Settings > Domains
2. Add your custom domain
3. Update DNS records to point to DigitalOcean nameservers or CNAME

---

## 🐳 Docker Hub Setup

For more control, push Docker image to Docker Hub and deploy from there.

### Step 1: Create Docker Hub Account

1. Sign up at [Docker Hub](https://hub.docker.com)
2. Create a repository (e.g., `username/beginner-kayak-class`)

### Step 2: Build and Push Image

```powershell
# Build image
docker build -t username/beginner-kayak-class:latest .

# Login to Docker Hub
docker login

# Push image
docker push username/beginner-kayak-class:latest

# Tag specific version
docker tag username/beginner-kayak-class:latest username/beginner-kayak-class:v1.0.0
docker push username/beginner-kayak-class:v1.0.0
```

### Step 3: Deploy to DigitalOcean Droplet

If using a Droplet (VM) instead of App Platform:

```bash
# SSH into your Droplet
ssh root@your-droplet-ip

# Pull and run Docker image
docker pull username/beginner-kayak-class:latest
docker run -d -p 80:8080 \
  --restart always \
  --name kayak-app \
  username/beginner-kayak-class:latest

# Verify container is running
docker ps
curl http://localhost
```

---

## 🔒 SSL/TLS Configuration

### Using DigitalOcean App Platform (Automatic)

- SSL certificate is automatically provisioned and renewed
- HTTPS is enabled by default on `*.ondigitalocean.app` domain

### Using Custom Domain with DigitalOcean

1. **Let's Encrypt (Recommended)**
   - DigitalOcean automatically issues free certificates
   - Configure in App > Settings > Domains

2. **Manual Nginx Configuration (Droplet)**

```bash
# Install Certbot
apt-get update
apt-get install certbot python3-certbot-nginx

# Get certificate
certbot certonly --standalone -d yourdomain.com

# Configure Nginx reverse proxy
cat > /etc/nginx/sites-available/kayak-app << EOF
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/kayak-app /etc/nginx/sites-enabled/

# Test and restart
nginx -t
systemctl restart nginx
```

---

## 📊 Monitoring & Logging

### DigitalOcean App Platform

1. **Real-time Logs**: Apps > Logs tab
   ```
   Shows deployment, build, and runtime logs
   ```

2. **Metrics**: Apps > Insights tab
   - CPU, memory, bandwidth usage
   - Request counts and response times
   - Billing information

### Droplet Monitoring

```bash
# Check container logs
docker logs -f kayak-app

# Monitor resource usage
docker stats

# View system resources
top
df -h
```

### Application Logging

Add to `application.properties`:
```properties
logging.level.root=INFO
logging.level.com.crookedlinedesign=DEBUG
logging.file.name=/var/log/kayak-app/application.log
logging.file.max-size=10MB
logging.file.max-history=10
```

---

## 🔧 Troubleshooting

### App won't start on DigitalOcean

1. Check logs: Apps > Logs tab
2. Verify Dockerfile is correct
3. Ensure Java 17+ is specified
4. Check build command completes successfully

```powershell
# Test build locally first
docker build --no-cache -t beginner-kayak-class:test .
```

### Port 8080 already in use (Droplet)

```bash
# Find process using port 8080
lsof -i :8080

# Kill process (if needed)
kill -9 <PID>

# Alternative: Change port mapping
docker run -d -p 8081:8080 username/beginner-kayak-class:latest
```

### Static assets not loading (CSS, images)

1. Verify Angular build completed: `npm run build`
2. Check `src/main/resources/static/` contains built files
3. Rebuild Docker image: `docker build --no-cache -t beginner-kayak-class:latest .`

### Database connection issues (if applicable)

```properties
# In application-prod.properties
spring.datasource.url=jdbc:mysql://host:3306/dbname
spring.datasource.username=user
spring.datasource.password=pass
spring.jpa.hibernate.ddl-auto=validate
```

### Memory issues

```bash
# Check memory usage
docker stats

# Increase memory allocation
docker run -d -p 80:8080 -m 512m \
  username/beginner-kayak-class:latest
```

---

## 📝 Deployment Checklist

Before going live:

- [ ] All tests pass locally
- [ ] Docker image builds and runs successfully
- [ ] Code is pushed to GitHub
- [ ] DigitalOcean app/droplet is configured
- [ ] Custom domain is configured (if applicable)
- [ ] SSL certificate is active
- [ ] Monitoring/logging is enabled
- [ ] Backup strategy is in place
- [ ] Team has access to DigitalOcean console
- [ ] Documentation is updated

---

## 📚 Additional Resources

- [DigitalOcean App Platform Docs](https://docs.digitalocean.com/products/app-platform/)
- [Spring Boot Docker](https://spring.io/guides/gs/spring-boot-docker/)
- [Angular Production Build](https://angular.io/guide/build)
- [Docker Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
