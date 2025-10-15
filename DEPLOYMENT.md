# Deployment Guide

Complete guide for deploying PPDB SaaS to production.

## Prerequisites

- ✅ GitHub repository created
- ✅ Firebase project created and configured
- ⏳ Vercel account (sign up at https://vercel.com)
- ⏳ Domain name (optional, for custom domain)

---

## 1. Vercel Setup

### 1.1 Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub account
3. Authorize Vercel to access your repositories

### 1.2 Import Project

1. Click "Add New" → "Project"
2. Import `kodratIT/SAAS-PPDB` repository
3. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### 1.3 Configure Environment Variables

In Vercel project settings, add these variables:

**Firebase Client (Public)**
```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

**Firebase Admin (Server-side)**
```
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**Next.js**
```
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NODE_ENV=production
```

**Important**: Set these for all environments:
- ✅ Production
- ✅ Preview
- ✅ Development

### 1.4 Deploy

Click "Deploy" and wait for deployment to complete.

Your app will be available at: `https://your-project.vercel.app`

---

## 2. Firebase Deployment

### 2.1 Login to Firebase

```bash
firebase login
```

### 2.2 Select Project

Update `.firebaserc` with your project ID:
```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

### 2.3 Deploy Security Rules

```bash
npm run firebase:deploy:rules
```

Or:
```bash
firebase deploy --only firestore:rules,storage:rules
```

### 2.4 Deploy Firestore Indexes

```bash
npm run firebase:deploy:indexes
```

Or:
```bash
firebase deploy --only firestore:indexes
```

---

## 3. GitHub Actions Setup

### 3.1 Add GitHub Secrets

Go to: **Repository → Settings → Secrets and variables → Actions**

Click "New repository secret" and add:

**Vercel**
- `VERCEL_TOKEN` - Get from Vercel Account Settings → Tokens
- `VERCEL_ORG_ID` - Get from Vercel Project Settings
- `VERCEL_PROJECT_ID` - Get from Vercel Project Settings

**Firebase**
- `FIREBASE_TOKEN` - Get with `firebase login:ci`

**Firebase Config** (same as Vercel env vars)
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

### 3.2 Get Vercel Token

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login
vercel login

# Link project
cd /path/to/ppdb
vercel link

# Get project details
vercel project ls
```

Copy:
- `VERCEL_ORG_ID` from project settings
- `VERCEL_PROJECT_ID` from project settings
- Generate token at: https://vercel.com/account/tokens

### 3.3 Get Firebase Token

```bash
firebase login:ci
```

Copy the token and add to GitHub secrets.

---

## 4. Custom Domain (Optional)

### 4.1 Add Domain in Vercel

1. Go to Vercel Project → Settings → Domains
2. Add your custom domain: `ppdb.yourdomain.com`
3. Copy DNS records

### 4.2 Configure DNS

Add these records in your domain registrar:

**A Record**
```
Type: A
Name: ppdb (or @)
Value: 76.76.21.21
```

**CNAME Record**
```
Type: CNAME
Name: www.ppdb
Value: cname.vercel-dns.com
```

### 4.3 Wait for DNS Propagation

Check with:
```bash
nslookup ppdb.yourdomain.com
```

Usually takes 5-60 minutes.

### 4.4 Enable SSL

Vercel automatically provisions SSL certificate (Let's Encrypt).

---

## 5. Post-Deployment Checklist

### 5.1 Verify Deployment

- ✅ Visit your Vercel URL
- ✅ Check if Firebase connection works: `/api/test-firebase`
- ✅ Test authentication (register/login)
- ✅ Verify Firestore reads/writes
- ✅ Test file upload to Storage

### 5.2 Firebase Security

- ✅ Verify security rules are deployed
- ✅ Test unauthorized access is blocked
- ✅ Check indexes are created

### 5.3 Monitoring

**Vercel**
- Enable Vercel Analytics
- Setup error monitoring (Sentry integration)

**Firebase**
- Monitor usage in Firebase Console
- Setup budget alerts
- Enable Firebase Performance Monitoring

---

## 6. Continuous Deployment

### Automatic Deployment

Deployment happens automatically on push to `main`:

```bash
git push origin main
```

This triggers:
1. ✅ CI workflow (lint, type-check, build)
2. ✅ Deploy workflow (Vercel + Firebase)
3. ✅ Deployment successful

### Manual Deployment

**Vercel**
```bash
vercel --prod
```

**Firebase**
```bash
firebase deploy
```

---

## 7. Environment Management

### Branches & Environments

- `main` → Production (ppdb.yourdomain.com)
- `develop` → Preview (ppdb-git-develop.vercel.app)
- `feature/*` → Preview (ppdb-git-feature-*.vercel.app)

### Environment Variables

Each environment can have different values:

**Production**: Real Firebase project
**Preview**: Staging Firebase project (recommended)
**Development**: Local emulators

---

## 8. Rollback

### Vercel Rollback

1. Go to Vercel Project → Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

### Firebase Rollback

```bash
# Revert to previous rules version
firebase deploy --only firestore:rules --version <version>
```

---

## 9. Monitoring & Alerts

### Setup Vercel Alerts

**Project Settings → Notifications**
- Deployment notifications
- Build failures
- Error rate alerts

### Firebase Alerts

**Firebase Console → Alerts**
- Billing threshold alerts
- Security rules violations
- Performance degradation

### GitHub Notifications

**Repository → Settings → Notifications**
- Workflow failures
- Security alerts
- Dependency updates

---

## 10. Performance Optimization

### Vercel

- ✅ Enable Edge Functions for API routes
- ✅ Use Edge Caching for static assets
- ✅ Enable Image Optimization

### Firebase

- ✅ Create composite indexes for queries
- ✅ Use Firestore query cursors for pagination
- ✅ Enable Cloud Storage CDN

---

## 11. Backup Strategy

### Firestore Backups

**Automated**:
- Enable Firebase automated backups
- Retention: 30 days

**Manual**:
```bash
gcloud firestore export gs://your-bucket/backups/$(date +%Y%m%d)
```

### Code Backups

- ✅ Git repository (primary)
- ✅ GitHub backup (automatic)
- ✅ Local clones (manual)

---

## 12. Cost Management

### Vercel

- **Free Tier**: 100GB bandwidth/month
- **Pro**: $20/month (unlimited bandwidth)

### Firebase

- **Spark (Free)**: 
  - 1GB Storage
  - 10GB/month downloads
  - 50K reads/day

- **Blaze (Pay as you go)**:
  - Monitor usage in Console
  - Set budget alerts

---

## 13. Troubleshooting

### Deployment Failed

**Check logs**:
- Vercel: Deployments → View logs
- GitHub: Actions → View workflow run

**Common issues**:
- Missing environment variables
- Build errors (test locally first)
- Firebase token expired

### Runtime Errors

**Vercel logs**:
```bash
vercel logs
```

**Firebase logs**:
```bash
firebase functions:log
```

### Database Issues

- Check Firestore security rules
- Verify indexes are created
- Monitor query performance

---

## 14. Security Best Practices

### Vercel

- ✅ Enable "Preview Protection" for staging
- ✅ Use environment variables (never hardcode)
- ✅ Enable "Secure Compute" for sensitive data

### Firebase

- ✅ Strict security rules
- ✅ Regular security audits
- ✅ Monitor for suspicious activity

### GitHub

- ✅ Enable branch protection
- ✅ Require PR reviews
- ✅ Enable security scanning

---

## 15. Maintenance

### Weekly

- Check deployment logs
- Monitor error rates
- Review Firebase usage

### Monthly

- Update dependencies
- Review security alerts
- Backup database

### Quarterly

- Security audit
- Performance review
- Cost optimization

---

## Support

### Documentation

- [Vercel Docs](https://vercel.com/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Next.js Docs](https://nextjs.org/docs)

### Community

- GitHub Issues
- Vercel Discord
- Firebase Stack Overflow

---

**Last Updated**: 2024-10-15  
**Version**: 1.0
