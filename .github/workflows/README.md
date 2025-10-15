# GitHub Actions Workflows

This directory contains CI/CD workflows for the PPDB SaaS project.

## Workflows

### 1. CI (ci.yml)

**Triggers**: Push and Pull Request to `main` and `develop` branches

**Jobs**:
- **lint-and-typecheck**: Runs ESLint, TypeScript checking, and Prettier formatting check
- **build**: Builds the Next.js application and uploads artifacts
- **security-scan**: Runs npm audit and secret scanning with TruffleHog

**Status**: ✅ Must pass for PR merge

---

### 2. Deploy (deploy.yml)

**Triggers**: Push to `main` branch

**Jobs**:
- **deploy-vercel**: Deploys application to Vercel production
- **deploy-firebase**: Deploys Firestore rules, Storage rules, and indexes to Firebase

**Required Secrets**:
- `VERCEL_TOKEN` - Vercel deployment token
- `FIREBASE_TOKEN` - Firebase CI token
- Firebase environment variables (see below)

---

### 3. PR Checks (pr-checks.yml)

**Triggers**: Pull Request opened, synchronized, or reopened

**Jobs**:
- **pr-title-check**: Validates PR title follows conventional commit format
- **lint-and-test**: Runs linting and type checking
- **build-check**: Verifies project builds successfully
- **pr-size-check**: Comments on PR size (files/lines changed)
- **pr-label**: Auto-labels PR based on changed files

**PR Title Format**:
```
<type>: <description>

Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
```

---

## Setup Instructions

### 1. Required Secrets

Add these secrets to your GitHub repository:
**Settings → Secrets and variables → Actions → New repository secret**

#### Vercel
- `VERCEL_TOKEN` - Get from Vercel Account Settings → Tokens
- `VERCEL_ORG_ID` - Found in Vercel project settings
- `VERCEL_PROJECT_ID` - Found in Vercel project settings

#### Firebase
- `FIREBASE_TOKEN` - Get with `firebase login:ci`
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

### 2. Get Vercel Token

```bash
# Install Vercel CLI
npm i -g vercel

# Login and get token
vercel login

# Link project (in project directory)
vercel link

# Get project info
vercel project ls
```

### 3. Get Firebase Token

```bash
# Login to Firebase
firebase login:ci

# Copy the token and add to GitHub secrets
```

### 4. Vercel Environment Variables

In Vercel dashboard, add environment variables:
- Go to Project Settings → Environment Variables
- Add all Firebase config variables
- Set for Production, Preview, and Development environments

---

## Workflow Status Badges

Add to README.md:

```markdown
![CI](https://github.com/kodratIT/SAAS-PPDB/workflows/CI/badge.svg)
![Deploy](https://github.com/kodratIT/SAAS-PPDB/workflows/Deploy/badge.svg)
```

---

## Local Testing

### Test Build Locally
```bash
npm run build
```

### Test Linting
```bash
npm run lint
npm run type-check
npm run format:check
```

---

## Troubleshooting

### Build Fails in CI
- Check if `.env.local` is properly configured in workflow
- Verify all dependencies are in `package.json`
- Test build locally first

### Deploy Fails
- Verify Vercel token is valid
- Check Firebase token hasn't expired
- Ensure project is linked in Vercel

### PR Checks Fail
- Fix linting errors: `npm run lint:fix`
- Fix formatting: `npm run format`
- Check TypeScript errors: `npm run type-check`

---

## Branch Protection Rules

Recommended settings for `main` branch:

**Settings → Branches → Add branch protection rule**

- ✅ Require pull request reviews before merging (1 approver)
- ✅ Require status checks to pass before merging
  - `Lint & Type Check`
  - `Build`
  - `Lint & Test`
  - `Build Check`
- ✅ Require conversation resolution before merging
- ✅ Include administrators
- ✅ Restrict who can push to matching branches

---

## Deployment Flow

```
Developer → Push to branch → Create PR → PR Checks Run
                                ↓
                          Review & Approve
                                ↓
                          Merge to main
                                ↓
                    CI workflow runs → Deploy workflow
                                ↓
                    Vercel Deploy → Firebase Rules Deploy
                                ↓
                            Production ✅
```

---

## Cost Optimization

- CI runs on ubuntu-latest (free for public repos)
- Caching npm packages speeds up workflows
- Artifacts retained for 7 days only
- Deploy only on main branch push

---

## Security Best Practices

✅ Secrets stored in GitHub Secrets (encrypted)
✅ TruffleHog scans for exposed secrets
✅ npm audit checks for vulnerabilities
✅ Build artifacts not committed to repo
✅ Environment variables never logged

---

## Questions?

Check logs in:
**Actions tab → Select workflow → View logs**

For failed workflows, click on the failed job to see detailed logs.
