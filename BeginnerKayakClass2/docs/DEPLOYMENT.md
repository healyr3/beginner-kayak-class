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