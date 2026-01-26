# 🚀 Quick Start Guide - GitHub Pages Deployment

**For team members taking over the Beginner Kayak Class project**

## One-Time Setup (5 minutes)

### Step 1: Enable GitHub Pages
1. Go to GitHub → Your Repository → **Settings** → **Pages**
2. Under "Build and deployment":
   - Select **Source**: "GitHub Actions"
3. Click **Save**

That's it! The workflow is already configured.

### Step 2: Make Your First Push
```bash
# Clone the repository
git clone https://github.com/your-username/BeginnerKayakClass-Backup.git
cd BeginnerKayakClass-Backup

# Make a small change (optional)
echo "# Updated!" >> README.md

# Commit and push
git add .
git commit -m "Initial setup"
git push origin main
```

### Step 3: Watch It Deploy
- Go to Repository → **Actions** tab
- Click the running workflow
- Wait for it to complete (2-5 minutes)
- Live site: `https://your-username.github.io/BeginnerKayakClass-Backup/`

---

## Day-to-Day Workflow

### Making Content Updates

```bash
# 1. Make changes
cd src/main/angular-app
# Edit Angular components, add images, update text, etc.

# 2. Test locally (optional but recommended)
npm install    # First time only
npm start      # Starts dev server at http://localhost:4200

# 3. Commit and push
git add .
git commit -m "Update river guides"
git push origin main

# 4. Site auto-deploys (2-5 minutes)
# Check: https://your-username.github.io/BeginnerKayakClass-Backup/
```

---

## Common Tasks

### Adding a New Page/Route

```bash
# 1. Generate new component
cd src/main/angular-app
ng generate component new-page

# 2. Add route to app.routes.ts
# import { NewPageComponent } from './new-page/new-page.component';
# { path: 'new-page', component: NewPageComponent }

# 3. Add link in app.component.html
# <a routerLink="/new-page">New Page</a>

# 4. Push to deploy
git add .
git commit -m "Add new page"
git push origin main
```

### Updating Images

```bash
# 1. Add images to src/main/angular-app/src/assets/images/
# Use file manager or:
# cp your-image.jpg src/main/angular-app/src/assets/images/

# 2. Reference in component
# <img src="assets/images/your-image.jpg" alt="Description">

# 3. Push to deploy
git add .
git commit -m "Add new images"
git push origin main
```

### Updating Text Content

```bash
# 1. Edit HTML templates in src/main/angular-app/src/app/*/component.html
# 2. Edit TypeScript in src/main/angular-app/src/app/*/component.ts

# 3. Commit and push
git add .
git commit -m "Update content"
git push origin main
```

---

## Testing Locally

```bash
cd src/main/angular-app

# Install dependencies (first time)
npm install

# Start dev server
npm start

# Browser opens automatically at http://localhost:4200
# Hot-reload: changes appear instantly as you save

# Run tests
npm test -- --watch=false --browsers=ChromeHeadless

# Build for production (like GitHub Actions does)
npm run build
# Output in: dist/angular-app/
```

---

## Important: SPA Routing

✅ **The site uses Angular's Single Page Application (SPA) routing**

This means:
- ✅ Routes like `/river1`, `/classroom` work correctly
- ✅ Refreshing the page stays on the same route
- ✅ Browser back/forward buttons work
- ✅ Links work from anywhere on the site

This is handled by the magical `404.html` file! Don't delete it.

---

## Deployment Checklist

Before pushing, verify:
- [ ] No syntax errors in TypeScript
- [ ] Images are in `src/assets/` directory
- [ ] CSS loads correctly
- [ ] All links work locally
- [ ] Tested in browser

```bash
# Quick checklist
npm run build      # Should succeed
npm test -- --watch=false  # Should pass
npm start          # Should start without errors
```

---

## Deployment Status

After pushing, monitor:

1. **GitHub Actions Workflow**
   - Go to: Repository → **Actions** tab
   - Watch for workflow to complete ✅ (green checkmark)
   - Click workflow for detailed logs

2. **Live Site**
   - URL: `https://your-username.github.io/BeginnerKayakClass-Backup/`
   - Changes appear 2-5 minutes after successful deploy

3. **View Deployment History**
   - Go to: Settings → **Deployments**
   - See all past deployments and rollback if needed

---

## Troubleshooting

### "Workflow failed" in Actions tab
**Solution**:
1. Click on the failed workflow
2. Look for red ❌ step
3. Check the error message
4. Common fixes:
   - Missing `package-lock.json` → Run `npm install` locally and commit
   - TypeScript errors → Run `npm run build` locally to see errors
   - Failed tests → Run `npm test -- --watch=false` to debug

### "Site still shows old content"
**Solution**:
1. Wait 5 minutes (GitHub caches content)
2. Hard refresh browser: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
3. Clear browser cache or try incognito mode

### "Routes don't work / 404 errors"
**Solution**:
1. Check that 404.html is in `src/main/angular-app/public/`
2. Verify it was deployed (check workflow logs)
3. Hard refresh browser: **Ctrl+Shift+R**

### "Can't push - authentication error"
**Solution**:
```bash
# Use HTTPS (easier)
git remote set-url origin https://github.com/username/repo.git

# Or use SSH (requires setup)
# See: https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh
```

---

## File Structure Overview

```
BeginnerKayakClass-Backup/
├── src/main/angular-app/           ← All website code here
│   ├── src/
│   │   ├── app/                    ← Angular components
│   │   │   ├── home/
│   │   │   ├── river1/
│   │   │   ├── classroom/
│   │   │   └── ...more pages
│   │   ├── assets/                 ← Images, content files
│   │   │   ├── images/
│   │   │   └── content/
│   │   └── index.html              ← Main HTML file
│   ├── public/
│   │   └── 404.html                ← SPA routing magic ✨
│   ├── angular.json                ← Angular config
│   └── package.json                ← NPM dependencies
├── .github/workflows/
│   └── deploy-github-pages.yml     ← Auto-deployment workflow ✨
├── docs/
│   ├── DEPLOYMENT.md               ← Full deployment guide
│   └── MIGRATION_SUMMARY.md        ← What changed
└── pom.xml                         ← (minimal, not needed)
```

---

## Git Workflow

```bash
# See what you changed
git status

# See detailed changes
git diff

# Stage changes
git add .

# Or stage specific file
git add src/main/angular-app/src/app/home/home.component.html

# Commit
git commit -m "Describe your changes here"

# Push to GitHub (triggers auto-deploy)
git push origin main

# View history
git log --oneline -10

# Undo last commit (if needed)
git revert HEAD
```

---

## Need Help?

### Documentation
- **DEPLOYMENT.md**: Complete deployment guide
- **MIGRATION_SUMMARY.md**: What changed and why
- **Angular Docs**: https://angular.io/docs
- **GitHub Pages**: https://pages.github.com

### Common Questions

**Q: How do I add a new page?**  
A: See "Adding a New Page/Route" section above

**Q: How do I update the header/navigation?**  
A: Edit `src/main/angular-app/src/app/main-nav/main-nav.component.html`

**Q: Where do I put images?**  
A: Put them in `src/main/angular-app/src/assets/images/`

**Q: How do I change colors/styling?**  
A: Edit CSS files in component folders or `src/styles.css`

**Q: Can I use a custom domain?**  
A: Yes! See "GitHub Pages with Custom Domain" in DEPLOYMENT.md

---

## Pro Tips

1. **Use descriptive commit messages**
   ```bash
   ✅ git commit -m "Update river guide with new photos"
   ❌ git commit -m "stuff"
   ```

2. **Make small commits**
   - Easier to find issues
   - Easier to revert if needed

3. **Always pull before working**
   ```bash
   git pull origin main
   ```

4. **Test locally before pushing**
   ```bash
   npm start
   # Test your changes at http://localhost:4200
   ```

5. **Keep package-lock.json committed**
   - Ensures everyone has same dependencies
   - Never delete it

---

## Ready to Deploy?

1. ✅ Enabled GitHub Pages in settings
2. ✅ Made your first commit
3. ✅ Workflow ran successfully
4. ✅ Site is live

**You're done!** Now just:
- Make changes
- Commit and push
- Site auto-deploys ✨

---

**Last Updated**: January 2026  
**Status**: ✅ Ready for deployment  
**Support**: See DEPLOYMENT.md for detailed guide
