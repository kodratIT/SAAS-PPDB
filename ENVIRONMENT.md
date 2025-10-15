# Environment Configuration Guide

Complete guide for setting up environment variables in PPDB SaaS.

## 📋 Table of Contents

- [Overview](#overview)
- [Environment Files](#environment-files)
- [Required Variables](#required-variables)
- [Optional Variables](#optional-variables)
- [Setup Methods](#setup-methods)
- [Validation](#validation)
- [Security Best Practices](#security-best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

PPDB SaaS uses environment variables for configuration. Different environments (development, staging, production) use different files.

### Environment Types

- **Development**: Local development (`npm run dev`)
- **Staging**: Preview/testing environment (Vercel preview)
- **Production**: Live production environment (Vercel production)

---

## Environment Files

### .env.local (Development)
```bash
# Used for local development
# Not committed to git (in .gitignore)
# Created manually or with setup script
```

### .env.development
```bash
# Development-specific defaults
# Committed to git (no secrets)
# Used as fallback if .env.local doesn't exist
```

### .env.production.example
```bash
# Template for production environment
# Shows all available variables
# Not used directly, copy to Vercel
```

### .env.example
```bash
# Main template file
# Shows all variables with placeholders
# Used to create .env.local
```

---

## Required Variables

These variables MUST be set for the application to work:

### Firebase Client (Public)

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

**How to get**:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings (⚙️)
4. Scroll to "Your apps" section
5. Copy config values

---

## Recommended Variables

Highly recommended for full functionality:

### Firebase Admin (Server-side)

```env
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Key\n-----END PRIVATE KEY-----\n"
```

**How to get**:
1. Firebase Console → Project Settings
2. Service Accounts tab
3. Click "Generate new private key"
4. Download JSON file
5. Extract values from JSON

**Security**: Never commit private key to git!

### Application

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="PPDB SaaS"
NODE_ENV=development
```

---

## Optional Variables

Features that can be enabled later:

### Payment Gateway (Midtrans)

```env
MIDTRANS_SERVER_KEY=your-server-key
MIDTRANS_CLIENT_KEY=your-client-key
MIDTRANS_IS_PRODUCTION=false
```

### Email Service (SendGrid/Mailgun)

```env
EMAIL_SERVICE_API_KEY=your-api-key
EMAIL_FROM_ADDRESS=noreply@yourdomain.com
EMAIL_FROM_NAME="PPDB SaaS"
```

### SMS/WhatsApp (Twilio)

```env
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890
WHATSAPP_API_KEY=your-whatsapp-key
```

### Analytics & Monitoring

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
SENTRY_AUTH_TOKEN=your-auth-token
```

### Feature Flags

```env
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_ERROR_TRACKING=true
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=false
```

---

## Setup Methods

### Method 1: Interactive Setup (Recommended)

```bash
npm run env:setup
```

This script will:
- ✅ Guide you through configuration
- ✅ Ask for each variable
- ✅ Validate inputs
- ✅ Create `.env.local` file

### Method 2: Manual Copy

```bash
# Copy example file
cp .env.example .env.local

# Edit file
nano .env.local  # or use your editor
```

Fill in your actual values.

### Method 3: Quick Firebase Setup

```bash
# Create minimal .env.local for Firebase only
cat > .env.local << 'EOF'
NEXT_PUBLIC_FIREBASE_API_KEY=your-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
EOF
```

---

## Validation

### Check Environment

```bash
npm run env:check
```

This will:
- ✅ Check if `.env.local` exists
- ✅ Validate required variables are set
- ✅ Warn about missing recommended variables
- ✅ List optional variables status

### Expected Output

```
🔍 Checking environment variables...

📋 Required variables:
  ✅ NEXT_PUBLIC_FIREBASE_API_KEY
  ✅ NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  ✅ NEXT_PUBLIC_FIREBASE_PROJECT_ID
  ...

📋 Recommended variables:
  ✅ FIREBASE_ADMIN_PROJECT_ID
  ⚠️  FIREBASE_ADMIN_CLIENT_EMAIL - NOT SET
  ...

✅ Environment check PASSED
```

### Auto-check on Install

Environment is automatically checked after `npm install`:
```bash
npm install
# ... installs packages ...
# ✅ Environment check PASSED
```

---

## Security Best Practices

### ❌ Never Commit

These files should NEVER be committed:
- `.env.local`
- `.env.production`
- `serviceAccountKey.json`
- Any file with actual secrets

### ✅ Use .gitignore

Already configured in `.gitignore`:
```gitignore
.env*
!.env.example
!.env.development
serviceAccountKey.json
*firebase-adminsdk*.json
```

### ✅ Rotate Keys Regularly

- Change Firebase keys every 3-6 months
- Rotate API keys if compromised
- Update all environments

### ✅ Use Different Configs per Environment

- **Development**: Test Firebase project
- **Staging**: Staging Firebase project
- **Production**: Production Firebase project

### ✅ Vercel Environment Variables

For Vercel deployment:
1. Project Settings → Environment Variables
2. Add variables for each environment
3. Mark sensitive variables as "Secret"
4. Set appropriate scopes (Production/Preview/Development)

---

## Environment-specific Configuration

### Development

```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true  # Use emulators
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### Staging (Vercel Preview)

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-project-git-develop.vercel.app
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=false
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### Production

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://ppdb.yourdomain.com
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=false
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_ERROR_TRACKING=true
```

---

## Using Firebase Emulators

### Enable Emulators

In `.env.local`:
```env
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true
```

### Start Emulators

```bash
npm run emulator
```

### Connect Application

The app automatically connects to emulators when:
- `NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true`
- Emulators are running

Emulator ports:
- Auth: `http://localhost:9099`
- Firestore: `http://localhost:8080`
- Storage: `http://localhost:9199`
- UI: `http://localhost:4000`

---

## Troubleshooting

### Issue: "Missing required environment variables"

**Solution**:
```bash
# Check what's missing
npm run env:check

# Run setup wizard
npm run env:setup
```

### Issue: ".env.local not found"

**Solution**:
```bash
# Copy example
cp .env.example .env.local

# Or run setup
npm run env:setup
```

### Issue: "Firebase connection failed"

**Solutions**:
1. Verify all Firebase variables are correct
2. Check Firebase project is active
3. Test with: `http://localhost:3000/api/test-firebase`
4. Check Firebase Console for errors

### Issue: "Private key format error"

**Solution**:
```env
# Wrap in quotes and use \n for newlines
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQI...\n-----END PRIVATE KEY-----\n"
```

### Issue: Environment not loading

**Solutions**:
1. Restart dev server: `Ctrl+C` then `npm run dev`
2. Clear Next.js cache: `rm -rf .next`
3. Reinstall: `rm -rf node_modules && npm install`

### Issue: Emulator won't connect

**Solution**:
```env
# Make sure this is set
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true

# Restart both emulator and dev server
npm run emulator  # Terminal 1
npm run dev       # Terminal 2
```

---

## Configuration Helper Scripts

### scripts/check-env.js

Validates environment configuration:
- Checks required variables
- Warns about missing recommended variables
- Lists optional variables

### scripts/setup-env.js

Interactive setup wizard:
- Guides through configuration
- Asks for each variable
- Creates `.env.local` file
- Validates inputs

---

## Environment Variables Reference

### Complete List

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NODE_ENV` | ✅ | development | Node environment |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | ✅ | - | Firebase API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | ✅ | - | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | ✅ | - | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | ✅ | - | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | ✅ | - | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | ✅ | - | Firebase app ID |
| `FIREBASE_ADMIN_PROJECT_ID` | ⚠️ | - | Firebase admin project ID |
| `FIREBASE_ADMIN_CLIENT_EMAIL` | ⚠️ | - | Firebase admin email |
| `FIREBASE_ADMIN_PRIVATE_KEY` | ⚠️ | - | Firebase admin private key |
| `NEXT_PUBLIC_APP_URL` | ✅ | localhost:3000 | Application URL |
| `NEXT_PUBLIC_APP_NAME` | ⚪ | PPDB SaaS | Application name |
| `NEXT_PUBLIC_USE_FIREBASE_EMULATOR` | ⚪ | false | Use Firebase emulators |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | ⚪ | false | Enable Google Analytics |
| `NEXT_PUBLIC_ENABLE_ERROR_TRACKING` | ⚪ | false | Enable Sentry |
| `MIDTRANS_SERVER_KEY` | ⚪ | - | Midtrans server key |
| `MIDTRANS_CLIENT_KEY` | ⚪ | - | Midtrans client key |
| `EMAIL_SERVICE_API_KEY` | ⚪ | - | Email service API key |
| `TWILIO_ACCOUNT_SID` | ⚪ | - | Twilio account SID |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ⚪ | - | Google Analytics ID |
| `NEXT_PUBLIC_SENTRY_DSN` | ⚪ | - | Sentry DSN |

Legend:
- ✅ Required
- ⚠️ Recommended
- ⚪ Optional

---

## Quick Start Checklist

- [ ] Copy `.env.example` to `.env.local`
- [ ] Get Firebase config from console
- [ ] Fill in Firebase client variables
- [ ] Get Firebase admin key (service account)
- [ ] Fill in Firebase admin variables
- [ ] Run `npm run env:check` to validate
- [ ] Test with `npm run dev`
- [ ] Visit `http://localhost:3000/api/test-firebase`
- [ ] Verify Firebase connection works

---

**Last Updated**: 2024-10-15  
**Version**: 1.0
