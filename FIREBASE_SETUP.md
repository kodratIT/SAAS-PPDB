# Firebase Setup Guide

## Prerequisites

1. **Firebase Project** ✅ (Already created)
2. **Firebase Services Enabled** ✅ (Firestore, Auth, Storage)
3. **Firebase CLI** - Needs to be installed

## Install Firebase CLI

### Option 1: Global Installation (Recommended)
```bash
npm install -g firebase-tools
```

### Option 2: Project Dev Dependency
```bash
npm install -D firebase-tools
```

**Note**: If using Node.js v24, you may see warnings. Firebase tools officially support Node 18/20/22.

## Verify Installation

```bash
firebase --version
```

## Firebase Login

```bash
firebase login
```

## Configure Firebase Project

1. Update `.firebaserc` with your actual project ID:
```json
{
  "projects": {
    "default": "your-actual-firebase-project-id"
  }
}
```

2. Copy your Firebase config to `.env.local`:
```env
# Firebase Client (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Firebase Admin (Server-side only)
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## Deploy Security Rules

Deploy Firestore and Storage security rules to Firebase:

```bash
npm run firebase:deploy:rules
```

Or manually:
```bash
firebase deploy --only firestore:rules,storage:rules
```

## Deploy Firestore Indexes

```bash
npm run firebase:deploy:indexes
```

Or manually:
```bash
firebase deploy --only firestore:indexes
```

## Firebase Emulator Setup

### Start Emulators

Start all Firebase emulators for local development:

```bash
npm run emulator
```

Or:
```bash
firebase emulators:start
```

This will start:
- **Authentication Emulator**: http://localhost:9099
- **Firestore Emulator**: http://localhost:8080
- **Storage Emulator**: http://localhost:9199
- **Emulator UI**: http://localhost:4000

### Export Emulator Data

To save current emulator data:

```bash
npm run emulator:export
```

This saves data to `./firebase-data` directory.

### Import Emulator Data

To start emulators with previously saved data:

```bash
npm run emulator:import
```

### Connect Next.js to Emulators

When running emulators, update your Firebase config to connect to local emulators:

```typescript
// src/lib/firebase/config.ts
import { connectAuthEmulator } from 'firebase/auth'
import { connectFirestoreEmulator } from 'firebase/firestore'
import { connectStorageEmulator } from 'firebase/storage'

// ... existing config ...

// Connect to emulators in development
if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true') {
  connectAuthEmulator(auth, 'http://localhost:9099')
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectStorageEmulator(storage, 'localhost', 9199)
}
```

Add to `.env.local`:
```env
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true
```

## Firebase Configuration Files

### firebase.json
Main Firebase configuration file:
- Firestore rules path
- Storage rules path
- Firestore indexes path
- Emulator settings

### .firebaserc
Firebase project ID mapping for different environments.

### firebase/rules/firestore.rules
Firestore security rules with:
- Multi-tenancy support
- Role-based access control
- Data isolation per school

### firebase/rules/storage.rules
Storage security rules with:
- File type validation
- File size limits
- Role-based access

### firebase/indexes.json
Composite indexes for optimized queries.

## Testing Firebase Connection

### Test API Endpoint

Visit: http://localhost:3000/api/test-firebase

Should return:
```json
{
  "success": true,
  "message": "Firebase connection successful!",
  "timestamp": "2024-10-15T..."
}
```

### Test with Emulator

1. Start emulators: `npm run emulator`
2. Set `NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true` in `.env.local`
3. Start Next.js: `npm run dev`
4. Test the API endpoint
5. Check Emulator UI at http://localhost:4000

## Common Commands

```bash
# Login to Firebase
firebase login

# Select project
firebase use your-project-id

# Deploy all
firebase deploy

# Deploy rules only
firebase deploy --only firestore:rules,storage:rules

# Deploy indexes only
firebase deploy --only firestore:indexes

# Start emulators
firebase emulators:start

# Start emulators with UI
firebase emulators:start --ui

# Export emulator data
firebase emulators:export ./firebase-data

# Import emulator data
firebase emulators:start --import=./firebase-data

# Clear emulator data
rm -rf firebase-data
```

## Troubleshooting

### "Firebase command not found"
Install Firebase CLI globally:
```bash
npm install -g firebase-tools
```

### "Permission denied"
Login to Firebase:
```bash
firebase login
```

### "Project not found"
Update `.firebaserc` with correct project ID.

### Emulator not starting
Check if ports are available:
```bash
lsof -ti:8080  # Firestore
lsof -ti:9099  # Auth
lsof -ti:9199  # Storage
lsof -ti:4000  # UI
```

Kill processes if needed:
```bash
kill -9 $(lsof -ti:8080)
```

### Rules deployment failed
Verify syntax in `firebase/rules/*.rules` files.

## Security Notes

⚠️ **IMPORTANT**: Never commit the following files:
- `.env.local` (contains secrets)
- `serviceAccountKey.json` (admin credentials)
- `firebase-data/` (emulator data)

These are already in `.gitignore`.

## Next Steps

1. ✅ Firebase project created
2. ✅ Services enabled
3. ✅ SDK configured
4. ✅ Security rules written
5. ⏳ Install Firebase CLI
6. ⏳ Deploy rules to Firebase
7. ⏳ Test with emulators
8. ⏳ Update `.env.local` with actual credentials

## Resources

- [Firebase Console](https://console.firebase.google.com/)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
- [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
