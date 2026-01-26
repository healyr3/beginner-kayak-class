# GitHub Pages Setup Checklist

Complete this checklist to get your site live on GitHub Pages.

## Pre-Setup (Do Once)

- [ ] Repository is on GitHub (public or private)
- [ ] Repository name is: `BeginnerKayakClass-Backup`
- [ ] You have push access to the repository
- [ ] Node.js 18+ is installed locally (for testing)

## Step 1: Enable GitHub Pages (2 min)

- [ ] Open GitHub repository
- [ ] Go to **Settings** tab
- [ ] Select **Pages** from left menu
- [ ] Under "Build and deployment":
  - [ ] Source is set to "GitHub Actions"
- [ ] Click **Save**

✅ Status: GitHub Pages is now enabled

## Step 2: Deploy Your First Build (5 min)

- [ ] Clone or pull the latest code locally
- [ ] Review changes in git status: `git status`
- [ ] Stage changes: `git add .`
- [ ] Commit: `git commit -m "Enable GitHub Pages"`
- [ ] Push to main: `git push origin main`

## Step 3: Monitor Deployment (2-5 min)

- [ ] Go to GitHub repository
- [ ] Click **Actions** tab
- [ ] Watch for the "Deploy to GitHub Pages" workflow
- [ ] Wait for ✅ green checkmark
- [ ] Click on the completed workflow to view details

### Troubleshooting if workflow fails:
- [ ] Click on failed workflow
- [ ] Look for red ❌ step
- [ ] Read error message
- [ ] Common issues:
  - Missing `package-lock.json` → Run `npm install` and commit
  - TypeScript errors → Run `npm run build` locally to see errors
  - Node.js version → Workflow uses Node 18, which should work

## Step 4: Verify Live Site (1 min)

- [ ] Wait for workflow to complete (green ✅)
- [ ] Visit: `https://username.github.io/BeginnerKayakClass-Backup/`
- [ ] Home page loads: ✅
- [ ] Navigation links work: ✅
- [ ] Click a route (e.g., /river1): ✅
- [ ] Refresh page (F5) - doesn't show 404: ✅
- [ ] Browser back button works: ✅

## Optional: Custom Domain Setup (10 min)

If you want `your-domain.com` instead of `github.io`:

### Buy Domain
- [ ] Domain registered (GoDaddy, Namecheap, Cloudflare, etc.)
- [ ] Access to domain registrar's DNS settings

### Configure GitHub Pages
- [ ] Go to Repository → Settings → **Pages**
- [ ] Under "Custom domain", enter: `beginnerkayakclass.com`
- [ ] Click **Save**
- [ ] GitHub creates `CNAME` file automatically

### Configure DNS Records
Go to your domain registrar's DNS settings and add these **A records**:

| Type | Host | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Or for subdomain setup (e.g., kayak.example.com):

| Type | Host | Value |
|------|------|-------|
| CNAME | kayak | username.github.io |

- [ ] DNS records added in registrar

### Wait for SSL Certificate
- [ ] Go to Repository → Settings → **Pages**
- [ ] Look for "DNS check in progress"
- [ ] Wait 5-30 minutes for DNS to propagate
- [ ] Check "Enforce HTTPS" when SSL certificate is ready
- [ ] Certificate status shows ✅ "Certificate issued"

### Test Custom Domain
- [ ] Visit your custom domain
- [ ] HTTPS works (green lock in browser): ✅
- [ ] Old GitHub Pages URL redirects to custom domain: ✅

## Ongoing Deployment

For future updates, just follow this workflow:

```bash
# 1. Make your changes
# Edit files in src/main/angular-app/

# 2. Test locally (recommended)
cd src/main/angular-app
npm install    # First time only
npm start      # http://localhost:4200

# 3. Commit and push
git add .
git commit -m "Describe your changes"
git push origin main

# 4. Workflow auto-runs (2-5 min)
# Check Actions tab for progress
# Site updates automatically
```

## Deployment Verification Checklist

After each deployment:

- [ ] Go to Actions tab
- [ ] New workflow shows ✅ green checkmark
- [ ] No red ❌ failures
- [ ] Live site updated
- [ ] All routes work
- [ ] Refresh doesn't break anything
- [ ] Images load correctly

## Rollback (if something breaks)

```bash
# View recent commits
git log --oneline -5

# Revert to previous version
git revert COMMIT_HASH
git push origin main

# Workflow auto-runs and deploys previous version
```

## Monitoring

### View Deployment History
- Repository → Settings → **Deployments**
- Shows all past deployments
- Can view logs for each deployment
- Can rollback to previous versions

### View Site Analytics (optional)
- Repository → **Insights** → **Traffic**
- See visitor stats, traffic sources, etc.

### Monitor Build Status
- Repository → **Actions** tab
- Shows all workflow runs
- Can see real-time build logs
- Can debug failures

## Support & Documentation

- **Stuck?** → Read [DEPLOYMENT.md](DEPLOYMENT.md)
- **Questions?** → See [QUICK_START.md](QUICK_START.md)
- **What changed?** → Read [MIGRATION_SUMMARY.md](MIGRATION_SUMMARY.md)
- **GitHub Help**: https://docs.github.com/en/pages

## Success Criteria ✅

Your setup is complete when:

1. ✅ GitHub Pages is enabled in Settings → Pages
2. ✅ Workflow runs successfully (green checkmark)
3. ✅ Site is live at `https://username.github.io/BeginnerKayakClass-Backup/`
4. ✅ All routes work correctly
5. ✅ Refreshing page doesn't show 404
6. ✅ No Spring Boot or Java code in deployment

---

## Quick Reference

| Item | Details |
|------|---------|
| Repository | Public (for free GitHub Pages) |
| Deployment | Automatic on push to main |
| Workflow File | `.github/workflows/deploy-github-pages.yml` |
| Build Tool | Angular CLI |
| SPA Routing Handler | `src/main/angular-app/public/404.html` |
| Site URL | `https://username.github.io/BeginnerKayakClass-Backup/` |
| Build Time | 2-5 minutes |
| HTTPS | Automatic |

---

**Ready to deploy?** Start with Step 1 above!

**Need more details?** See [DEPLOYMENT.md](DEPLOYMENT.md)

**Questions about content?** See [QUICK_START.md](QUICK_START.md)
