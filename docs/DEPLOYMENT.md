# Deployment Guide - Beginner Kayak Class 2

> **📢 PROJECT MIGRATION**: This project has been converted from Spring Boot + Angular to a pure static Angular SPA. No backend server required.

This guide covers deploying the Beginner Kayak Class 2 application to **GitHub Pages** (recommended for this project) or **DigitalOcean** for custom deployments.

## 📋 Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [GitHub Pages (Recommended)](#github-pages-recommended)
3. [GitHub Pages with Custom Domain](#github-pages-with-custom-domain)
4. [DigitalOcean Static Hosting](#digitalocean-static-hosting)
5. [Local Development](#local-development)
6. [Troubleshooting](#troubleshooting)

---

## ✅ Pre-Deployment Checklist

Before deploying to production, ensure:

- [ ] Code is committed to GitHub with clean git history
- [ ] All build artifacts removed (`node_modules/`, `dist/`, `.angular/`)
- [ ] `.gitignore` is properly configured
- [ ] Angular app builds locally: `npm run build`
- [ ] All tests pass: `npm test -- --watch=false`
- [ ] Repository is public (for GitHub Pages free tier)
- [ ] `404.html` exists in `public/` directory for SPA routing

### Pre-Deployment Commands

```bash
# Ensure clean repository
git status
git log --oneline -5

# Verify build
cd src/main/angular-app
npm ci
npm run build
npm test -- --watch=false --browsers=ChromeHeadless

# Clean up
rm -rf dist/ node_modules/
cd ../../../
git status
```

---

## 🚀 GitHub Pages (Recommended)

**Advantages:**
- ✅ Free tier for public repositories
- ✅ Automatic HTTPS/TLS
- ✅ No backend infrastructure needed
- ✅ Auto-deploys on push to main
- ✅ GitHub Actions included
- ✅ Perfect for static Angular SPA

**How It Works:**
1. GitHub Actions builds your Angular app on every push
2. Built files are deployed to `gh-pages` branch
3. GitHub Pages serves from that branch
4. **SPA routing**: 404.html redirects all routes to index.html

### Setup GitHub Pages Deployment

#### Step 1: Enable GitHub Pages in Repository Settings

1. Go to GitHub → Your Repository → **Settings** → **Pages**
2. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - **Branch**: (auto-configured by workflow)
3. Click Save

#### Step 2: Verify GitHub Actions Workflow

The workflow file [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml) handles everything:

```yaml
# This workflow:
# 1. Triggers on push to main
# 2. Installs Angular dependencies
# 3. Builds production Angular app
# 4. Copies 404.html for SPA routing
# 5. Deploys to GitHub Pages
```

No additional configuration needed! The workflow is ready to use.

#### Step 3: Deploy

Simply push to main:

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

GitHub Actions will:
1. Build the Angular app (~ 2-3 minutes)
2. Deploy automatically to `https://username.github.io/BeginnerKayakClass-Backup/`
3. Show deployment status in **Actions** tab

**View Deployment:**
- **Live Site**: `https://username.github.io/BeginnerKayakClass-Backup/`
- **Workflow Runs**: Repository → **Actions** tab
- **Deployment History**: Settings → **Deployments**

#### Step 4: Verify SPA Routing Works

Test that routes work correctly:

```bash
# These should all work:
https://username.github.io/BeginnerKayakClass-Backup/
https://username.github.io/BeginnerKayakClass-Backup/river1
https://username.github.io/BeginnerKayakClass-Backup/classroom
https://username.github.io/BeginnerKayakClass-Backup/pool1

# And refreshing the page should NOT give 404 errors
```

How it works:
1. You navigate to `/river1` (doesn't exist on server)
2. GitHub Pages serves `404.html`
3. `404.html` contains JavaScript that redirects to `index.html`
4. Angular Router handles the navigation to `/river1`

---

## 🌐 GitHub Pages with Custom Domain

Want to use your own domain instead of `github.io`?

### Prerequisites

- A registered domain (e.g., `beginnerkayakclass.com`)
- Access to domain registrar's DNS settings
- GitHub Pages enabled (see above)

### Setup Custom Domain

#### Step 1: Add Domain to GitHub Pages

1. Go to Repository → **Settings** → **Pages**
2. Under "Custom domain", enter your domain: `beginnerkayakclass.com`
3. Click Save
4. GitHub automatically creates `CNAME` file

#### Step 2: Configure DNS

**Option A: Using Apex Domain (beginnerkayakclass.com)**

In your domain registrar's DNS settings, create **A records** pointing to GitHub Pages:

```dns
Host: @
Type: A
Value: 185.199.108.153

Host: @
Type: A
Value: 185.199.109.153

Host: @
Type: A
Value: 185.199.110.153

Host: @
Type: A
Value: 185.199.111.153
```

**Option B: Using Subdomain (kayak.example.com)**

```dns
Host: kayak
Type: CNAME
Value: username.github.io
```

⚠️ **Note**: Apex domain (Option A) is recommended. Subdomain setup requires `username.github.io` as value.

#### Step 3: Enable HTTPS

1. After DNS propagates (5-30 minutes):
   - Go to Settings → Pages
   - Check "Enforce HTTPS"
   - Wait for SSL certificate (auto-generated by Let's Encrypt)

2. Verify certificate status in Settings → Pages

#### Step 4: Test

```bash
# Should work after DNS propagates
https://beginnerkayakclass.com
https://beginnerkayakclass.com/river1

# Old GitHub Pages URL redirects
https://username.github.io/BeginnerKayakClass-Backup/ → https://beginnerkayakclass.com/
```

---

## 📊 DigitalOcean Static Hosting

If you prefer managed static hosting with more control:

### Setup on DigitalOcean

#### Step 1: Build Angular App Locally

```bash
cd src/main/angular-app
npm ci
npm run build

# Output: dist/angular-app/
```

#### Step 2: Upload to DigitalOcean

**Option A: Using DigitalOcean App Platform**

1. Go to [DigitalOcean Dashboard](https://cloud.digitalocean.com/)
2. Click **Create** → **App**
3. Select **GitHub** → Connect repository
4. Choose `main` branch
5. Create file `app.yaml` in repo root:

```yaml
name: beginner-kayak-class
static_sites:
  - name: web
    source_dir: src/main/angular-app/dist/angular-app
    routes:
      - path: /
        match_prefix: true
        redirect_uri: /index.html
        redirect_code: 200
```

6. Commit and push:

```bash
git add app.yaml
git commit -m "Add DigitalOcean App Platform config"
git push origin main
```

7. DigitalOcean auto-deploys on every push

**Option B: Using DigitalOcean Spaces (CDN)**

1. Create Space: **Spaces** → **Create Space**
2. Build and upload files:

```bash
# Build Angular app
cd src/main/angular-app && npm run build

# Configure doctl CLI
doctl auth init

# Upload to Spaces
doctl compute spaces upload dist/angular-app/* \
  --recursive \
  your-space-name/
```

3. Enable CDN access in Space settings
4. Configure custom domain

#### Step 3: Configure SPA Routing

In DigitalOcean App Platform:

1. Go to Settings → **Routing Rules**
2. Add catch-all rule:

```yaml
routes:
  - path: /
    match_prefix: true
    redirect_uri: /index.html
    redirect_code: 200
```

3. Redeploy app

---

## 💻 Local Development

### Development Server

```bash
# Navigate to Angular app
cd src/main/angular-app

# Install dependencies
npm install

# Start dev server
npm start

# Open http://localhost:4200
```

### Building for Production

```bash
cd src/main/angular-app

# Build with optimization
npm run build

# Output in: dist/angular-app/

# Preview build
npx http-server dist/angular-app/ -p 8080
```

### Testing

```bash
cd src/main/angular-app

# Run unit tests
npm test

# Run in headless mode (CI)
npm test -- --watch=false --browsers=ChromeHeadless

# Check coverage
npm test -- --code-coverage
```

---

## 🐛 Troubleshooting

### SPA Routing Issues

**Problem**: Page shows 404 when navigating to routes directly

**Solution**:
- Ensure `404.html` exists in `public/` directory
- Verify GitHub Pages deployment includes `404.html`
- Check GitHub Actions logs: Repository → **Actions** tab

```bash
# Verify locally
npx http-server dist/angular-app/

# Try navigating to non-existent route
# http://localhost:8080/river1
# Should redirect via 404.html
```

### GitHub Pages Not Updating

**Problem**: Changes not showing after push

**Solution**:
1. Check GitHub Actions: Repository → **Actions**
2. Look for failed workflows (red ❌)
3. Click on workflow run for error details
4. Common issues:
   - `npm ci` failed → check `package-lock.json`
   - Build failed → check console output
   - Deploy failed → check permissions

```bash
# Force rebuild by amending commit
git commit --amend --no-edit
git push origin main --force
```

### Build Fails with Angular Errors

**Problem**: `npm run build` fails

**Solution**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Run build with verbose output
npm run build -- --verbose

# Check for TypeScript errors
npx tsc --noEmit
```

### Assets Not Loading

**Problem**: Images/CSS/fonts return 404

**Solution**:
- Ensure assets are in `src/assets/`
- Check `angular.json` assets configuration
- Verify relative paths in CSS/HTML use correct paths
- For GitHub Pages with sub-path, use base-href:

```bash
# Build with base-href for non-root deployment
npm run build -- --base-href=/BeginnerKayakClass-Backup/
```

### Custom Domain Not Working

**Problem**: Custom domain shows GitHub's error page

**Solution**:
1. Verify `CNAME` file exists in gh-pages branch:
   ```bash
   # Check repo settings - should auto-create
   ```
2. Check DNS settings:
   ```bash
   # Verify DNS records are propagated
   nslookup beginnerkayakclass.com
   dig beginnerkayakclass.com
   ```
3. Wait for HTTPS certificate (can take 5-30 min):
   - Settings → Pages → Check certificate status
4. Hard refresh browser (Ctrl+Shift+R)

### High Bandwidth Usage

**Problem**: DigitalOcean Space charges for bandwidth

**Solution**:
- Use GitHub Pages (no bandwidth charges)
- Or enable DigitalOcean CDN to cache static files
- Monitor usage: DigitalOcean Dashboard → Spaces → Metrics

---

## 📈 Monitoring & Analytics

### GitHub Pages Deployment Analytics

Repository → **Insights** → **Traffic**

### Track Application Errors (Optional)

1. Integrate Sentry or Datadog:

```bash
npm install @sentry/angular
```

2. Configure in `main.ts`:

```typescript
import * as Sentry from "@sentry/angular";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production",
});
```

### Application Performance

Use Angular DevTools:
```bash
# In Chrome DevTools console
ng.probe($0).componentInstance
```

---

## 🔄 Continuous Deployment Workflow

### Automated Workflow

1. **Commit & Push**:
   ```bash
   git add .
   git commit -m "Update content"
   git push origin main
   ```

2. **GitHub Actions Triggers**:
   - Runs: [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml)
   - Builds: Angular app
   - Tests: Unit tests
   - Deploys: To GitHub Pages

3. **View Status**:
   - Repository → **Actions** tab
   - Shows real-time build/deploy status
   - Estimated time: 2-5 minutes

4. **Live Update**:
   - Site automatically updates after deploy succeeds
   - Changes visible in ~5 minutes

---

## 📝 Migration Notes (Spring Boot → Static)

### What Changed

- **Removed**: Spring Boot (no backend)
- **Removed**: Java code (all static now)
- **Removed**: pom.xml dependencies
- **Added**: 404.html for SPA routing
- **Added**: GitHub Pages workflow
- **Updated**: Angular build output path

### Why?

1. No backend API required
2. Simpler infrastructure
3. Lower hosting costs
4. Easier team handoff
5. Faster deployment

### Rollback?

To restore Spring Boot:
```bash
git log --oneline
git revert COMMIT_HASH
git push origin main
```

---

## 📞 Support & Resources

### Documentation

- **GitHub Pages**: https://pages.github.com
- **GitHub Pages Custom Domain**: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- **GitHub Actions**: https://docs.github.com/en/actions
- **Angular**: https://angular.io/docs
- **DigitalOcean**: https://docs.digitalocean.com

### Community

- **GitHub Issues**: Report bugs in repository
- **Angular Docs**: https://angular.io/docs
- **Stack Overflow**: Tag `angular` or `github-pages`

---

**Last Updated**: January 2026  
**Current Deployment**: GitHub Pages  
**Status**: ✅ Static SPA (No Backend)  
**Next Review**: April 2026
