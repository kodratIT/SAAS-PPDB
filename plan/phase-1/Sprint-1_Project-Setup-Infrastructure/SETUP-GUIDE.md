# Sprint 1: Setup Guide - Step-by-Step Implementation

This guide provides detailed, step-by-step instructions for implementing all tasks in Sprint 1.

---

## 📋 Table of Contents

- [Story 1.1: Project Initialization](#story-11-project-initialization-5-sp)
- [Story 1.2: Firebase Setup](#story-12-firebase-setup-8-sp)
- [Story 1.3: Database Schema](#story-13-database-schema-implementation-8-sp)
- [Story 1.4: CI/CD Pipeline](#story-14-cicd-pipeline-setup-5-sp)
- [Story 1.5: Environment Configuration](#story-15-environment-configuration-3-sp)
- [Troubleshooting](#troubleshooting)

---

# STORY 1.1: Project Initialization (5 SP)

**Assigned to**: TL + FSD1  
**Duration**: 1 day  
**Priority**: P0 (Must complete first)

---

## Task 1.1.1: Initialize Next.js Project with TypeScript

**Owner**: TL  
**Duration**: 2 hours

### Steps:

1. **Create project directory**:
   ```bash
   mkdir ppdb
   cd ppdb
   ```

2. **Initialize Next.js with TypeScript**:
   ```bash
   npx create-next-app@latest . --typescript --tailwind --app --src-dir
   ```
   
   Select options:
   - TypeScript: Yes
   - ESLint: Yes
   - Tailwind CSS: Yes
   - `src/` directory: Yes
   - App Router: Yes
   - Import alias: Yes (@/*)

3. **Verify installation**:
   ```bash
   npm run dev
   ```
   
4. **Test** on http://localhost:3000

### Files Created:
- `package.json`
- `tsconfig.json`
- `next.config.js`
- `tailwind.config.ts`
- `src/app/layout.tsx`
- `src/app/page.tsx`

### Acceptance Criteria:
- ✅ Next.js runs on localhost:3000
- ✅ TypeScript compilation works
- ✅ No console errors

---

## Task 1.1.2: Setup Tailwind CSS Configuration

**Owner**: FSD1  
**Duration**: 1 hour

### Steps:

1. **Update `tailwind.config.ts`**:
   ```typescript
   import type { Config } from 'tailwindcss'

   const config: Config = {
     darkMode: ["class"],
     content: [
       './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
       './src/components/**/*.{js,ts,jsx,tsx,mdx}',
       './src/app/**/*.{js,ts,jsx,tsx,mdx}',
     ],
     theme: {
       extend: {
         colors: {
           border: "hsl(var(--border))",
           input: "hsl(var(--input))",
           ring: "hsl(var(--ring))",
           background: "hsl(var(--background))",
           foreground: "hsl(var(--foreground))",
           primary: {
             DEFAULT: "hsl(var(--primary))",
             foreground: "hsl(var(--primary-foreground))",
           },
           secondary: {
             DEFAULT: "hsl(var(--secondary))",
             foreground: "hsl(var(--secondary-foreground))",
           },
           destructive: {
             DEFAULT: "hsl(var(--destructive))",
             foreground: "hsl(var(--destructive-foreground))",
           },
           muted: {
             DEFAULT: "hsl(var(--muted))",
             foreground: "hsl(var(--muted-foreground))",
           },
           accent: {
             DEFAULT: "hsl(var(--accent))",
             foreground: "hsl(var(--accent-foreground))",
           },
           popover: {
             DEFAULT: "hsl(var(--popover))",
             foreground: "hsl(var(--popover-foreground))",
           },
           card: {
             DEFAULT: "hsl(var(--card))",
             foreground: "hsl(var(--card-foreground))",
           },
         },
         borderRadius: {
           lg: "var(--radius)",
           md: "calc(var(--radius) - 2px)",
           sm: "calc(var(--radius) - 4px)",
         },
       },
     },
     plugins: [require("tailwindcss-animate")],
   }
   export default config
   ```

2. **Update `src/app/globals.css`**:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   
   @layer base {
     :root {
       --background: 0 0% 100%;
       --foreground: 222.2 84% 4.9%;
       --card: 0 0% 100%;
       --card-foreground: 222.2 84% 4.9%;
       --popover: 0 0% 100%;
       --popover-foreground: 222.2 84% 4.9%;
       --primary: 222.2 47.4% 11.2%;
       --primary-foreground: 210 40% 98%;
       --secondary: 210 40% 96.1%;
       --secondary-foreground: 222.2 47.4% 11.2%;
       --muted: 210 40% 96.1%;
       --muted-foreground: 215.4 16.3% 46.9%;
       --accent: 210 40% 96.1%;
       --accent-foreground: 222.2 47.4% 11.2%;
       --destructive: 0 84.2% 60.2%;
       --destructive-foreground: 210 40% 98%;
       --border: 214.3 31.8% 91.4%;
       --input: 214.3 31.8% 91.4%;
       --ring: 222.2 84% 4.9%;
       --radius: 0.5rem;
     }
   
     .dark {
       --background: 222.2 84% 4.9%;
       --foreground: 210 40% 98%;
       --card: 222.2 84% 4.9%;
       --card-foreground: 210 40% 98%;
       --popover: 222.2 84% 4.9%;
       --popover-foreground: 210 40% 98%;
       --primary: 210 40% 98%;
       --primary-foreground: 222.2 47.4% 11.2%;
       --secondary: 217.2 32.6% 17.5%;
       --secondary-foreground: 210 40% 98%;
       --muted: 217.2 32.6% 17.5%;
       --muted-foreground: 215 20.2% 65.1%;
       --accent: 217.2 32.6% 17.5%;
       --accent-foreground: 210 40% 98%;
       --destructive: 0 62.8% 30.6%;
       --destructive-foreground: 210 40% 98%;
       --border: 217.2 32.6% 17.5%;
       --input: 217.2 32.6% 17.5%;
       --ring: 212.7 26.8% 83.9%;
     }
   }
   
   @layer base {
     * {
       @apply border-border;
     }
     body {
       @apply bg-background text-foreground;
     }
   }
   ```

3. **Install tailwindcss-animate**:
   ```bash
   npm install tailwindcss-animate
   ```

### Files Modified:
- `tailwind.config.ts`
- `src/app/globals.css`

### Acceptance Criteria:
- ✅ Tailwind classes work
- ✅ CSS variables are defined
- ✅ Dark mode support enabled

---

## Task 1.1.3: Install and Configure shadcn/ui

**Owner**: FSD1  
**Duration**: 2 hours

### Steps:

1. **Initialize shadcn/ui**:
   ```bash
   npx shadcn-ui@latest init
   ```
   
   Select options:
   - Style: Default
   - Base color: Slate
   - CSS variables: Yes

2. **Install initial components**:
   ```bash
   npx shadcn-ui@latest add button
   npx shadcn-ui@latest add input
   npx shadcn-ui@latest add label
   npx shadcn-ui@latest add card
   npx shadcn-ui@latest add dialog
   npx shadcn-ui@latest add dropdown-menu
   npx shadcn-ui@latest add table
   npx shadcn-ui@latest add form
   npx shadcn-ui@latest add select
   npx shadcn-ui@latest add toast
   npx shadcn-ui@latest add badge
   npx shadcn-ui@latest add avatar
   npx shadcn-ui@latest add tabs
   npx shadcn-ui@latest add alert
   ```

3. **Test components in page** (`src/app/page.tsx`):
   ```tsx
   import { Button } from "@/components/ui/button"
   import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
   
   export default function Home() {
     return (
       <main className="p-8">
         <Card>
           <CardHeader>
             <CardTitle>PPDB SaaS</CardTitle>
             <CardDescription>Test shadcn/ui components</CardDescription>
           </CardHeader>
           <CardContent>
             <Button>Test Button</Button>
           </CardContent>
         </Card>
       </main>
     )
   }
   ```

4. **Install additional dependencies**:
   ```bash
   npm install class-variance-authority clsx tailwind-merge
   npm install lucide-react
   npm install react-hook-form zod @hookform/resolvers
   ```

### Files Created:
- `components.json`
- `src/components/ui/*.tsx` (multiple component files)
- `src/lib/utils.ts`

### Acceptance Criteria:
- ✅ shadcn/ui components work
- ✅ Button renders correctly
- ✅ No style conflicts

---

## Task 1.1.4: Setup ESLint and Prettier

**Owner**: TL  
**Duration**: 1 hour

### Steps:

1. **Install Prettier**:
   ```bash
   npm install -D prettier prettier-plugin-tailwindcss eslint-config-prettier
   ```

2. **Create `.prettierrc`**:
   ```json
   {
     "semi": false,
     "singleQuote": true,
     "tabWidth": 2,
     "trailingComma": "es5",
     "printWidth": 100,
     "plugins": ["prettier-plugin-tailwindcss"]
   }
   ```

3. **Create `.prettierignore`**:
   ```
   node_modules
   .next
   out
   build
   dist
   *.lock
   package-lock.json
   ```

4. **Update `.eslintrc.json`**:
   ```json
   {
     "extends": [
       "next/core-web-vitals",
       "prettier"
     ],
     "rules": {
       "react/no-unescaped-entities": "off",
       "@typescript-eslint/no-unused-vars": "error",
       "@typescript-eslint/no-explicit-any": "warn",
       "prefer-const": "error",
       "no-console": ["warn", { "allow": ["warn", "error"] }]
     }
   }
   ```

5. **Add scripts to `package.json`**:
   ```json
   {
     "scripts": {
       "dev": "next dev",
       "build": "next build",
       "start": "next start",
       "lint": "next lint",
       "lint:fix": "next lint --fix",
       "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,json,css,md}\"",
       "format:check": "prettier --check \"src/**/*.{js,jsx,ts,tsx,json,css,md}\"",
       "type-check": "tsc --noEmit"
     }
   }
   ```

6. **Test linting and formatting**:
   ```bash
   npm run lint
   npm run format
   npm run type-check
   ```

### Files Created:
- `.prettierrc`
- `.prettierignore`

### Files Modified:
- `.eslintrc.json`
- `package.json`

### Acceptance Criteria:
- ✅ ESLint shows no errors
- ✅ Prettier formats code correctly
- ✅ Commands run successfully

---

## Task 1.1.5: Configure Git Repository

**Owner**: TL  
**Duration**: 30 minutes

### Steps:

1. **Initialize Git** (if not done):
   ```bash
   git init
   ```

2. **Create/Update `.gitignore`**:
   ```
   # dependencies
   /node_modules
   /.pnp
   .pnp.js
   
   # testing
   /coverage
   
   # next.js
   /.next/
   /out/
   
   # production
   /build
   
   # misc
   .DS_Store
   *.pem
   
   # debug
   npm-debug.log*
   yarn-debug.log*
   yarn-error.log*
   .pnpm-debug.log*
   
   # local env files
   .env*.local
   .env
   
   # vercel
   .vercel
   
   # typescript
   *.tsbuildinfo
   next-env.d.ts
   
   # firebase
   .firebase
   *-debug.log
   .runtimeconfig.json
   serviceAccountKey.json
   
   # IDEs
   .vscode/*
   !.vscode/settings.json
   !.vscode/tasks.json
   !.vscode/launch.json
   !.vscode/extensions.json
   .idea
   ```

3. **Create `.gitattributes`**:
   ```
   * text=auto
   *.js text eol=lf
   *.jsx text eol=lf
   *.ts text eol=lf
   *.tsx text eol=lf
   *.json text eol=lf
   *.md text eol=lf
   ```

4. **Create initial commit**:
   ```bash
   git add .
   git commit -m "chore: initial project setup with Next.js, TypeScript, Tailwind, and shadcn/ui"
   ```

5. **Create repository on GitHub** (via GitHub UI or CLI):
   ```bash
   gh repo create ppdb-saas --public --source=. --remote=origin
   ```
   
   Or manually create on GitHub.com

6. **Push to remote**:
   ```bash
   git branch -M main
   git remote add origin <repository-url>
   git push -u origin main
   ```

### Files Created:
- `.gitignore`
- `.gitattributes`

### Acceptance Criteria:
- ✅ Git repository initialized
- ✅ Initial commit created
- ✅ Pushed to remote repository

---

## Task 1.1.6: Create Project Folder Structure

**Owner**: FSD1  
**Duration**: 1 hour

### Steps:

1. **Create folder structure**:
   ```bash
   # App routes
   mkdir -p "src/app/(auth)/login"
   mkdir -p "src/app/(auth)/register"
   mkdir -p "src/app/(auth)/forgot-password"
   mkdir -p "src/app/(super-admin)/dashboard"
   mkdir -p "src/app/(super-admin)/schools"
   mkdir -p "src/app/(super-admin)/subscriptions"
   mkdir -p "src/app/(super-admin)/users"
   mkdir -p "src/app/(super-admin)/analytics"
   mkdir -p "src/app/(super-admin)/settings"
   mkdir -p "src/app/(school-admin)/dashboard"
   mkdir -p "src/app/(school-admin)/profile"
   mkdir -p "src/app/(school-admin)/periods"
   mkdir -p "src/app/(school-admin)/forms"
   mkdir -p "src/app/(school-admin)/applicants"
   mkdir -p "src/app/(school-admin)/payments"
   mkdir -p "src/app/(school-admin)/selection"
   mkdir -p "src/app/(school-admin)/announcements"
   mkdir -p "src/app/(school-admin)/reports"
   mkdir -p "src/app/(school-admin)/settings"
   mkdir -p "src/app/(panitia)/dashboard"
   mkdir -p "src/app/(panitia)/verification"
   mkdir -p "src/app/(panitia)/scoring"
   mkdir -p "src/app/(panitia)/applicants"
   mkdir -p "src/app/(public)"
   mkdir -p "src/app/(student)/dashboard"
   mkdir -p "src/app/(student)/application"
   mkdir -p "src/app/(student)/documents"
   mkdir -p "src/app/(student)/payment"
   mkdir -p "src/app/(student)/status"
   mkdir -p "src/app/(student)/result"
   
   # API routes
   mkdir -p src/app/api/auth
   mkdir -p src/app/api/schools
   mkdir -p src/app/api/periods
   mkdir -p src/app/api/applications
   mkdir -p src/app/api/payments
   mkdir -p src/app/api/documents
   mkdir -p src/app/api/notifications
   mkdir -p src/app/api/upload
   mkdir -p src/app/api/webhooks
   
   # Components
   mkdir -p src/components/layout
   mkdir -p src/components/auth
   mkdir -p src/components/dashboard
   mkdir -p src/components/forms
   mkdir -p src/components/applicants
   mkdir -p src/components/payment
   mkdir -p src/components/landing
   mkdir -p src/components/shared
   
   # Lib
   mkdir -p src/lib/firebase/collections
   mkdir -p src/lib/api
   mkdir -p src/lib/utils
   mkdir -p src/lib/payment
   mkdir -p src/lib/email
   
   # Other directories
   mkdir -p src/hooks
   mkdir -p src/store
   mkdir -p src/types
   mkdir -p src/config
   mkdir -p firebase/rules
   mkdir -p firebase/functions/src
   mkdir -p tests/unit
   mkdir -p tests/integration
   mkdir -p tests/e2e
   mkdir -p public/images
   mkdir -p public/icons
   ```

2. **Create README.md**:
   ```markdown
   # PPDB SAAS - Sistem Penerimaan Peserta Didik Baru
   
   ## Tech Stack
   - Next.js 14 (App Router)
   - TypeScript
   - Firebase (Firestore, Auth, Storage)
   - Tailwind CSS
   - shadcn/ui
   
   ## Getting Started
   
   1. Install dependencies:
      \`\`\`bash
      npm install
      \`\`\`
   
   2. Setup environment variables:
      \`\`\`bash
      cp .env.example .env.local
      \`\`\`
   
   3. Run development server:
      \`\`\`bash
      npm run dev
      \`\`\`
   
   4. Open [http://localhost:3000](http://localhost:3000)
   
   ## Project Structure
   
   See [docs/project-structure.md](./docs/project-structure.md)
   
   ## Development
   
   - `npm run dev` - Start dev server
   - `npm run build` - Build for production
   - `npm run lint` - Run ESLint
   - `npm run format` - Format code with Prettier
   
   ## Firebase
   
   - `firebase emulators:start` - Start Firebase emulators
   - `firebase deploy --only firestore:rules` - Deploy Firestore rules
   - `firebase deploy --only storage:rules` - Deploy Storage rules
   ```

3. **Create CHANGELOG.md**:
   ```markdown
   # Changelog
   
   All notable changes to this project will be documented in this file.
   
   ## [Unreleased]
   
   ### Added
   - Initial project setup
   - Next.js 14 with TypeScript
   - Tailwind CSS configuration
   - shadcn/ui components
   - ESLint and Prettier
   - Git repository
   ```

### Files Created:
- All folder structure
- `README.md`
- `CHANGELOG.md`

### Acceptance Criteria:
- ✅ All folders created
- ✅ README is informative
- ✅ Structure follows plan

---

# STORY 1.2: Firebase Setup (8 SP)

**Assigned to**: TL + FSD2  
**Duration**: 2 days  
**Priority**: P0

---

## Task 1.2.1: Create Firebase Project

**Owner**: TL  
**Duration**: 1 hour

### Steps:

1. Go to [Firebase Console](https://console.firebase.google.com/)

2. Click "Add Project"

3. Project setup:
   - Project name: `ppdb-saas` (or your choice)
   - Enable Google Analytics: Yes
   - Choose Analytics account: Default or create new

4. Wait for project creation

5. Register web app:
   - Click "Web" icon (</> icon)
   - App nickname: `ppdb-web-app`
   - Setup Firebase Hosting: No (we use Vercel)
   - Click "Register app"

6. Copy Firebase config (save for later)

7. Create a second app for admin:
   - App nickname: `ppdb-admin-sdk`
   - For server-side operations

### Deliverables:
- Firebase project created
- Web app registered
- Config copied

### Acceptance Criteria:
- ✅ Project visible in Firebase Console
- ✅ Web app registered

---

## Task 1.2.2: Enable Firebase Services

**Owner**: TL  
**Duration**: 2 hours

### Steps:

**1. Enable Firestore Database**:
- Go to Firestore Database
- Click "Create database"
- Start in **test mode** (we'll update rules later)
- Choose location: `asia-southeast1` (Singapore) or closest
- Click "Enable"

**2. Enable Authentication**:
- Go to Authentication
- Click "Get started"
- Enable sign-in methods:
  - **Email/Password**: Enable
  - **Google**: Enable (configure OAuth consent screen)
- Save

**3. Enable Storage**:
- Go to Storage
- Click "Get started"
- Start in **test mode**
- Use same location as Firestore
- Click "Done"

**4. Setup Firebase Admin SDK**:
- Go to Project Settings > Service Accounts
- Click "Generate new private key"
- Download JSON file (keep secure!)
- Rename to `serviceAccountKey.json`
- **DO NOT commit to git**

### Deliverables:
- Firestore enabled
- Authentication enabled
- Storage enabled
- Service account key downloaded

### Acceptance Criteria:
- ✅ Can access Firestore console
- ✅ Can access Authentication console
- ✅ Can access Storage console
- ✅ Service account key downloaded

---

## Task 1.2.3: Install Firebase SDK and Configure

**Owner**: FSD2  
**Duration**: 2 hours

### Steps:

**1. Install Firebase packages**:
```bash
npm install firebase firebase-admin
```

**2. Create Firebase config file** (`src/lib/firebase/config.ts`):
```typescript
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase (client-side)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
```

**3. Create Firebase Admin config** (`src/lib/firebase/admin.ts`):
```typescript
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'

// Only initialize on server-side
if (getApps().length === 0 && typeof window === 'undefined') {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
}

export const adminAuth = typeof window === 'undefined' ? getAuth() : null
export const adminDb = typeof window === 'undefined' ? getFirestore() : null
export const adminStorage = typeof window === 'undefined' ? getStorage() : null
```

**4. Create `.env.example`**:
```env
# Firebase Client (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin (Server-side only - DO NOT EXPOSE)
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**5. Create `.env.local`** (copy from .env.example and fill values from Firebase Console)

**6. Test Firebase connection** (`src/app/api/test-firebase/route.ts`):
```typescript
import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase/config'
import { collection, getDocs } from 'firebase/firestore'

export async function GET() {
  try {
    // Test Firestore connection
    const testCollection = collection(db, 'test')
    const snapshot = await getDocs(testCollection)
    
    return NextResponse.json({
      success: true,
      message: 'Firebase connected successfully',
      documentsCount: snapshot.size,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
```

**7. Test connection**:
```bash
npm run dev
# Visit http://localhost:3000/api/test-firebase
```

### Files Created:
- `src/lib/firebase/config.ts`
- `src/lib/firebase/admin.ts`
- `.env.example`
- `.env.local` (not committed)
- `src/app/api/test-firebase/route.ts`

### Acceptance Criteria:
- ✅ Firebase SDK installed
- ✅ Config files created
- ✅ Environment variables set
- ✅ Test endpoint returns success

---

*[Content continues with remaining tasks...]*

---

# Troubleshooting

## Common Issues

### Port 3000 already in use
```bash
lsof -ti:3000 | xargs kill -9
```

### Module not found
```bash
rm -rf node_modules .next
npm install
```

### Firebase connection errors
- Check `.env.local` has all required variables
- Verify Firebase project is created
- Check Firestore is enabled

### TypeScript errors
```bash
npm run type-check
```

### Build fails
```bash
rm -rf .next
npm run build
```

---

**Continue to**: [SUMMARY.md](SUMMARY.md) for quick reference
