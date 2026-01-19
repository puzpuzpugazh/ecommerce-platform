# 🔄 Redeployment Steps Guide

Quick reference guide for redeploying your e-commerce platform after making updates.

## 📋 Pre-Deployment Checklist

Before redeploying, ensure you've:
- [ ] Tested changes locally (`npm run dev`)
- [ ] Fixed any linter errors
- [ ] Committed your changes to Git
- [ ] Verified environment variables are correct
- [ ] Built the application successfully (`npm run build`)

---

## 🚀 Quick Redeployment Steps

### Option 1: Vercel (Recommended - Automatic Deployment)

If you're using Vercel with GitHub integration, deployments are **automatic**:

#### Steps:
1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Your update description"
   git push origin main
   ```

2. **Vercel automatically:**
   - Detects the push to GitHub
   - Builds your application
   - Deploys the new version
   - Updates your live site

3. **Verify deployment:**
   - Check Vercel dashboard for build status
   - Visit your live URL to test changes

#### Manual Vercel Deployment (if needed):
```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel --prod
```

---

### Option 2: Render (Backend + Frontend)

#### For Backend Updates:
1. **Commit and push:**
   ```bash
   git add .
   git commit -m "Backend updates"
   git push origin main
   ```

2. **Render automatically:**
   - Detects changes from your Git repository
   - Rebuilds and redeploys automatically

3. **Check deployment:**
   - Go to Render dashboard
   - Monitor build logs
   - Verify service is running

#### For Frontend Updates:
1. **Build locally (optional check):**
   ```bash
   npm run build
   ```

2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Frontend updates"
   git push origin main
   ```

3. **Render rebuilds automatically**

---

### Option 3: Heroku

#### Steps:
1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Your updates"
   ```

2. **Deploy to Heroku:**
   ```bash
   git push heroku main
   ```

3. **Monitor deployment:**
   ```bash
   heroku logs --tail
   ```

4. **Restart if needed:**
   ```bash
   heroku restart
   ```

---

### Option 4: Manual Deployment (Any Platform)

#### Step-by-Step Process:

1. **Test Locally:**
   ```bash
   # Install dependencies
   npm run install-all
   
   # Build the application
   npm run build
   
   # Test production build locally
   npm start
   ```

2. **Commit Changes:**
   ```bash
   git add .
   git commit -m "Description of your updates"
   git push origin main
   ```

3. **Deploy Based on Platform:**
   - **Vercel:** Automatic or `vercel --prod`
   - **Render:** Automatic from Git
   - **Heroku:** `git push heroku main`
   - **DigitalOcean:** Push to connected repo (auto-deploy)
   - **AWS:** `eb deploy` or push to connected repo

4. **Verify Deployment:**
   - Check build logs for errors
   - Test key features on live site
   - Verify environment variables are set

---

## 🔧 Common Update Scenarios

### Frontend-Only Updates (React Components, Styles, etc.)

1. **Make your changes** in `client/src/`
2. **Test locally:**
   ```bash
   npm run client
   ```
3. **Build:**
   ```bash
   npm run build
   ```
4. **Commit and push:**
   ```bash
   git add .
   git commit -m "Frontend: Updated [feature]"
   git push origin main
   ```
5. **Deploy** (automatic if using Vercel/Render with Git)

### Backend-Only Updates (API Routes, Controllers, etc.)

1. **Make your changes** in `server/`
2. **Test locally:**
   ```bash
   npm run server
   ```
3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Backend: Updated [feature]"
   git push origin main
   ```
4. **Deploy** (automatic if using Render/Heroku with Git)

### Database Schema Changes

1. **Update models** in `server/models/`
2. **Test locally** with your database
3. **Create migration script** (if needed)
4. **Commit and push:**
   ```bash
   git add .
   git commit -m "Database: Updated schema"
   git push origin main
   ```
5. **Deploy backend**
6. **Run migrations** on production database (if needed)

### Environment Variable Updates

1. **Update variables** in your platform's dashboard:
   - Vercel: Project Settings → Environment Variables
   - Render: Environment → Environment Variables
   - Heroku: `heroku config:set KEY=value`

2. **Redeploy** to apply changes:
   ```bash
   # Vercel
   vercel --prod
   
   # Heroku
   git push heroku main
   
   # Render (automatic after variable update)
   ```

---

## 🐛 Troubleshooting Redeployment

### Build Failures

1. **Check build logs** in your platform dashboard
2. **Test build locally:**
   ```bash
   npm run build
   ```
3. **Common issues:**
   - Missing dependencies → Run `npm run install-all`
   - Syntax errors → Fix linting errors
   - Environment variables → Verify all required vars are set

### Deployment Not Updating

1. **Clear cache** (if applicable):
   - Vercel: Redeploy with "Clear Cache" option
   - Heroku: `heroku restart`
   
2. **Force rebuild:**
   ```bash
   # Vercel
   vercel --prod --force
   
   # Heroku
   git commit --allow-empty -m "Force rebuild"
   git push heroku main
   ```

### Database Connection Issues

1. **Verify MongoDB URI** is correct in environment variables
2. **Check network access** in MongoDB Atlas
3. **Test connection** locally with production URI

---

## 📝 Quick Command Reference

```bash
# Local Testing
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Test production build locally

# Git Workflow
git add .                # Stage changes
git commit -m "Message"  # Commit changes
git push origin main     # Push to GitHub

# Deployment Commands
vercel --prod            # Deploy to Vercel
git push heroku main     # Deploy to Heroku
eb deploy                # Deploy to AWS Elastic Beanstalk

# Database
npm run seed             # Seed database
npm run seed-checkout    # Seed checkout data
```

---

## ✅ Post-Deployment Verification

After redeploying, always verify:

- [ ] Application loads without errors
- [ ] User authentication works
- [ ] Products display correctly
- [ ] Shopping cart functions properly
- [ ] Checkout process works
- [ ] API endpoints respond correctly
- [ ] Database connections are active
- [ ] No console errors in browser
- [ ] Mobile responsiveness maintained

---

## 🎯 Best Practices

1. **Always test locally** before deploying
2. **Use meaningful commit messages** for easier tracking
3. **Deploy during low-traffic periods** (if possible)
4. **Keep a changelog** of major updates
5. **Monitor logs** after deployment
6. **Have a rollback plan** ready
7. **Backup database** before major changes

---

## 📞 Need Help?

- Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed setup
- Review platform-specific documentation
- Check application logs in your platform dashboard
- Verify environment variables are correctly set

---

**Remember:** Most modern platforms (Vercel, Render, Heroku) automatically redeploy when you push to your main branch. Just commit and push! 🚀
