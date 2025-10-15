# 📋 PHASE 1 MVP - DETAILED TASKS (Sprint 1-6)

## 📖 Table of Contents
- [Team Structure & Roles](#team-structure--roles)
- [Sprint 1: Project Setup & Infrastructure](#sprint-1-project-setup--infrastructure-week-1-2)
- [Sprint 2: Authentication & Super Admin](#sprint-2-authentication--super-admin-foundation-week-3-4)
- [Sprint 3: School Management & PPDB Periods](#sprint-3-school-management--ppdb-periods-week-5-6)
- [Sprint 4: Student Registration Portal](#sprint-4-student-registration-portal-week-7-8)
- [Sprint 5: Document Upload & Payment](#sprint-5-document-upload--payment-integration-week-9-10)
- [Sprint 6: Verification & Admin Features](#sprint-6-verification--admin-features-week-11-12)
- [Testing Strategy](#testing-strategy)
- [Deployment Pipeline](#deployment-pipeline)

---

## Team Structure & Roles

### Development Team (Recommended: 4-5 people)

**👨‍💼 Tech Lead / Senior Full Stack Developer (1)**
- Architecture decisions
- Code review
- Technical guidance
- Database design
- Complex features implementation

**👨‍💻 Full Stack Developer (2-3)**
- Feature development (Frontend + Backend)
- API development
- Database operations
- Testing

**🎨 Frontend Developer (Optional)**
- UI/UX implementation
- Component development
- Styling (Tailwind CSS)
- Responsive design

**⚙️ DevOps Engineer (0.5 - Part time)**
- CI/CD setup
- Firebase configuration
- Deployment automation
- Monitoring setup

**🧪 QA Engineer (0.5 - Part time)**
- Test planning
- Manual testing
- Test automation
- Bug tracking

### Role Abbreviations Used
- **TL**: Tech Lead
- **FSD**: Full Stack Developer
- **FED**: Frontend Developer
- **BED**: Backend Developer
- **DEV**: DevOps Engineer
- **QA**: QA Engineer

---

# SPRINT 1: Project Setup & Infrastructure (Week 1-2)

**Sprint Goal**: Setup development environment, initialize project, configure Firebase, and establish CI/CD pipeline

**Total Story Points**: 29 SP

---

## STORY 1.1: Project Initialization (5 SP)

**Assigned to**: TL + FSD1  
**Duration**: 1 day  
**Priority**: P0 (Must complete first)

### Step-by-Step Implementation

#### Task 1.1.1: Initialize Next.js Project with TypeScript
**Owner**: TL  
**Duration**: 2 hours

**Steps**:
1. Create project directory
   ```bash
   mkdir ppdb
   cd ppdb
   ```

2. Initialize Next.js with TypeScript
   ```bash
   npx create-next-app@latest . --typescript --tailwind --app --src-dir
   ```
   
3. Verify installation
   ```bash
   npm run dev
   ```
   
4. Test on http://localhost:3000

**Files Created**:
- `package.json`
- `tsconfig.json`
- `next.config.js`
- `tailwind.config.ts`
- `src/app/layout.tsx`
- `src/app/page.tsx`

**Acceptance Criteria**:
- ✅ Next.js runs on localhost:3000
- ✅ TypeScript compilation works
- ✅ No console errors

---

#### Task 1.1.2: Setup Tailwind CSS Configuration
**Owner**: FSD1  
**Duration**: 1 hour

**Steps**:
1. Update `tailwind.config.ts`
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
           // ... more colors
         },
       },
     },
     plugins: [require("tailwindcss-animate")],
   }
   export default config
   ```

2. Update `src/app/globals.css`
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   
   @layer base {
     :root {
       --background: 0 0% 100%;
       --foreground: 222.2 84% 4.9%;
       --primary: 222.2 47.4% 11.2%;
       /* ... more CSS variables */
     }
   }
   ```

**Files Modified**:
- `tailwind.config.ts`
- `src/app/globals.css`

**Acceptance Criteria**:
- ✅ Tailwind classes work
- ✅ CSS variables are defined
- ✅ Dark mode support enabled

---

#### Task 1.1.3: Install and Configure shadcn/ui
**Owner**: FSD1  
**Duration**: 2 hours

**Steps**:
1. Initialize shadcn/ui
   ```bash
   npx shadcn-ui@latest init
   ```
   
2. Select options:
   - Style: Default
   - Base color: Slate
   - CSS variables: Yes

3. Install initial components
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
   ```

4. Test components in page
   ```tsx
   // src/app/page.tsx
   import { Button } from "@/components/ui/button"
   
   export default function Home() {
     return (
       <main className="p-8">
         <Button>Test Button</Button>
       </main>
     )
   }
   ```

**Files Created**:
- `components.json`
- `src/components/ui/button.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/label.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/dialog.tsx`
- `src/components/ui/dropdown-menu.tsx`
- `src/components/ui/table.tsx`
- `src/components/ui/form.tsx`
- `src/components/ui/select.tsx`
- `src/components/ui/toast.tsx`
- `src/lib/utils.ts`

**Acceptance Criteria**:
- ✅ shadcn/ui components work
- ✅ Button renders correctly
- ✅ No style conflicts

---

#### Task 1.1.4: Setup ESLint and Prettier
**Owner**: TL  
**Duration**: 1 hour

**Steps**:
1. Install Prettier
   ```bash
   npm install -D prettier prettier-plugin-tailwindcss
   ```

2. Create `.prettierrc`
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

3. Update `.eslintrc.json`
   ```json
   {
     "extends": [
       "next/core-web-vitals",
       "prettier"
     ],
     "rules": {
       "react/no-unescaped-entities": "off",
       "@typescript-eslint/no-unused-vars": "error",
       "@typescript-eslint/no-explicit-any": "warn"
     }
   }
   ```

4. Add scripts to `package.json`
   ```json
   {
     "scripts": {
       "lint": "next lint",
       "lint:fix": "next lint --fix",
       "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,json,css,md}\""
     }
   }
   ```

5. Test linting
   ```bash
   npm run lint
   npm run format
   ```

**Files Created**:
- `.prettierrc`
- `.prettierignore`

**Files Modified**:
- `.eslintrc.json`
- `package.json`

**Acceptance Criteria**:
- ✅ ESLint shows no errors
- ✅ Prettier formats code correctly
- ✅ Commands run successfully

---

#### Task 1.1.5: Configure Git Repository
**Owner**: TL  
**Duration**: 30 minutes

**Steps**:
1. Initialize Git (if not done)
   ```bash
   git init
   ```

2. Create/Update `.gitignore`
   ```
   # dependencies
   /node_modules
   
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
   
   # env files
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
   ```

3. Create `.gitattributes`
   ```
   * text=auto
   *.js text eol=lf
   *.jsx text eol=lf
   *.ts text eol=lf
   *.tsx text eol=lf
   ```

4. Create initial commit
   ```bash
   git add .
   git commit -m "chore: initial project setup with Next.js, TypeScript, Tailwind, and shadcn/ui"
   ```

5. Create repository on GitHub
   
6. Push to remote
   ```bash
   git remote add origin <repository-url>
   git branch -M main
   git push -u origin main
   ```

**Files Created**:
- `.gitignore`
- `.gitattributes`

**Acceptance Criteria**:
- ✅ Git repository initialized
- ✅ Initial commit created
- ✅ Pushed to remote repository

---

#### Task 1.1.6: Create Project Folder Structure
**Owner**: FSD1  
**Duration**: 1 hour

**Steps**:
1. Create folder structure
   ```bash
   mkdir -p src/app/\(auth\)/{login,register,forgot-password}
   mkdir -p src/app/\(super-admin\)/{dashboard,schools,subscriptions,users,analytics,settings}
   mkdir -p src/app/\(school-admin\)/{dashboard,profile,periods,forms,applicants,payments,selection,announcements,reports,settings}
   mkdir -p src/app/\(panitia\)/{dashboard,verification,scoring,applicants}
   mkdir -p src/app/\(public\)
   mkdir -p src/app/\(student\)/{dashboard,application,documents,payment,status,result}
   mkdir -p src/app/api/{auth,schools,periods,applications,payments,documents,notifications,upload,webhooks}
   mkdir -p src/components/{ui,layout,auth,dashboard,forms,applicants,payment,landing,shared}
   mkdir -p src/lib/{firebase,api,utils,payment,email}
   mkdir -p src/hooks
   mkdir -p src/store
   mkdir -p src/types
   mkdir -p src/config
   mkdir -p firebase/{rules,functions/src}
   mkdir -p tests/{unit,integration,e2e}
   mkdir -p public/{images,icons}
   ```

2. Create README.md
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
   ```

3. Create CHANGELOG.md
   ```markdown
   # Changelog
   
   ## [Unreleased]
   
   ### Added
   - Initial project setup
   - Next.js 14 with TypeScript
   - Tailwind CSS configuration
   - shadcn/ui components
   - ESLint and Prettier
   ```

**Files Created**:
- All folder structure
- `README.md`
- `CHANGELOG.md`

**Acceptance Criteria**:
- ✅ All folders created
- ✅ README is informative
- ✅ Structure follows plan

---

## STORY 1.2: Firebase Setup (8 SP)

**Assigned to**: TL + FSD2  
**Duration**: 2 days  
**Priority**: P0 (Critical dependency)

### Step-by-Step Implementation

#### Task 1.2.1: Create Firebase Project
**Owner**: TL  
**Duration**: 1 hour

**Steps**:
1. Go to [Firebase Console](https://console.firebase.google.com/)

2. Click "Add Project"

3. Project setup:
   - Project name: `ppdb-saas` or your choice
   - Enable Google Analytics: Yes
   - Choose Analytics account: Default or create new

4. Wait for project creation

5. Register web app:
   - Click "Web" icon (</> icon)
   - App nickname: `ppdb-web-app`
   - Setup Firebase Hosting: No (we use Vercel)
   - Click "Register app"

6. Copy Firebase config (will use in next task)

7. Create a second app for admin:
   - App nickname: `ppdb-admin-sdk`
   - For server-side operations

**Deliverables**:
- Firebase project created
- Web app registered
- Config copied

**Acceptance Criteria**:
- ✅ Project is visible in Firebase Console
- ✅ Web app is registered

---

#### Task 1.2.2: Enable Firebase Services
**Owner**: TL  
**Duration**: 2 hours

**Steps**:

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
  - **Phone**: Enable later (requires billing)
- Save

**3. Enable Storage**:
- Go to Storage
- Click "Get started"
- Start in **test mode**
- Use same location as Firestore
- Click "Done"

**4. Setup Firebase Admin SDK** (for server-side):
- Go to Project Settings > Service Accounts
- Click "Generate new private key"
- Download JSON file (keep it secure!)
- Rename to `serviceAccountKey.json`

**Deliverables**:
- Firestore enabled
- Authentication enabled
- Storage enabled
- Service account key downloaded

**Acceptance Criteria**:
- ✅ Can access Firestore console
- ✅ Can access Authentication console
- ✅ Can access Storage console
- ✅ Service account key downloaded

---

#### Task 1.2.3: Install Firebase SDK and Configure
**Owner**: FSD2  
**Duration**: 2 hours

**Steps**:

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

# Firebase Admin (Server-side only)
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**5. Create `.env.local`** (copy from .env.example and fill values)

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

**Files Created**:
- `src/lib/firebase/config.ts`
- `src/lib/firebase/admin.ts`
- `.env.example`
- `.env.local` (not committed)
- `src/app/api/test-firebase/route.ts`

**Acceptance Criteria**:
- ✅ Firebase SDK installed
- ✅ Config files created
- ✅ Environment variables set
- ✅ Test endpoint returns success

---

#### Task 1.2.4: Create Firestore Helper Functions
**Owner**: FSD2  
**Duration**: 2 hours

**Steps**:

**1. Create base Firestore utilities** (`src/lib/firebase/firestore.ts`):
```typescript
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryConstraint,
  Timestamp,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore'
import { db } from './config'

// Generic CRUD operations

export async function createDocument<T extends DocumentData>(
  collectionName: string,
  data: T,
  customId?: string
): Promise<DocumentReference> {
  const collectionRef = collection(db, collectionName)
  
  if (customId) {
    const docRef = doc(collectionRef, customId)
    await setDoc(docRef, {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return docRef
  } else {
    return await addDoc(collectionRef, {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
  }
}

export async function getDocument<T>(
  collectionName: string,
  documentId: string
): Promise<T | null> {
  const docRef = doc(db, collectionName, documentId)
  const docSnap = await getDoc(docRef)
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as T
  }
  return null
}

export async function updateDocument<T extends DocumentData>(
  collectionName: string,
  documentId: string,
  data: Partial<T>
): Promise<void> {
  const docRef = doc(db, collectionName, documentId)
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  })
}

export async function deleteDocument(
  collectionName: string,
  documentId: string
): Promise<void> {
  const docRef = doc(db, collectionName, documentId)
  await deleteDoc(docRef)
}

export async function queryDocuments<T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> {
  const collectionRef = collection(db, collectionName)
  const q = query(collectionRef, ...constraints)
  const snapshot = await getDocs(q)
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as T[]
}

// Pagination helper
export async function paginateDocuments<T>(
  collectionName: string,
  constraints: QueryConstraint[] = [],
  pageSize: number = 20,
  lastDoc?: any
): Promise<{ data: T[]; lastDoc: any; hasMore: boolean }> {
  const collectionRef = collection(db, collectionName)
  const queryConstraints = [...constraints, limit(pageSize + 1)]
  
  if (lastDoc) {
    queryConstraints.push(startAfter(lastDoc))
  }
  
  const q = query(collectionRef, ...queryConstraints)
  const snapshot = await getDocs(q)
  
  const docs = snapshot.docs.slice(0, pageSize)
  const hasMore = snapshot.docs.length > pageSize
  
  return {
    data: docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[],
    lastDoc: docs[docs.length - 1],
    hasMore,
  }
}

// Tenant-specific helpers
export async function queryBySchool<T>(
  collectionName: string,
  schoolId: string,
  additionalConstraints: QueryConstraint[] = []
): Promise<T[]> {
  return queryDocuments<T>(collectionName, [
    where('schoolId', '==', schoolId),
    ...additionalConstraints,
  ])
}

export { where, orderBy, limit, Timestamp }
```

**2. Create TypeScript interfaces** (`src/types/index.ts`):
```typescript
import { Timestamp } from 'firebase/firestore'

export interface BaseDocument {
  id: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface School extends BaseDocument {
  name: string
  slug: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    province: string
    postalCode: string
    coordinates: { lat: number; lng: number }
  }
  npsn: string
  schoolType: 'SD' | 'SMP' | 'SMA' | 'SMK'
  status: 'negeri' | 'swasta'
  logo?: string
  subscription: {
    planId: string
    status: 'trial' | 'active' | 'expired' | 'suspended'
    startDate: Timestamp
    endDate: Timestamp
  }
}

export interface User extends BaseDocument {
  email: string
  name: string
  phone?: string
  photoURL?: string
  role: 'super_admin' | 'school_admin' | 'panitia' | 'student'
  schoolId?: string
  status: 'active' | 'inactive' | 'suspended'
}

// Add more types as needed
```

**Files Created**:
- `src/lib/firebase/firestore.ts`
- `src/types/index.ts`

**Acceptance Criteria**:
- ✅ Helper functions work correctly
- ✅ TypeScript types are defined
- ✅ Functions are tested

---

#### Task 1.2.5: Write Firestore Security Rules
**Owner**: TL  
**Duration**: 2 hours

**Steps**:

**1. Create security rules** (`firebase/rules/firestore.rules`):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isSuperAdmin() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'super_admin';
    }
    
    function isSchoolAdmin(schoolId) {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'school_admin' &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.schoolId == schoolId;
    }
    
    function belongsToSchool(schoolId) {
      return isAuthenticated() &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.schoolId == schoolId;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isOwner(userId) || isSuperAdmin();
      allow delete: if isSuperAdmin();
    }
    
    // Schools (tenants) collection
    match /tenants/{schoolId} {
      allow read: if isAuthenticated();
      allow create: if isSuperAdmin();
      allow update: if isSuperAdmin() || isSchoolAdmin(schoolId);
      allow delete: if isSuperAdmin();
    }
    
    // PPDB Periods
    match /ppdb_periods/{periodId} {
      allow read: if true; // Public can read active periods
      allow create: if isSchoolAdmin(resource.data.schoolId);
      allow update: if isSchoolAdmin(resource.data.schoolId);
      allow delete: if isSchoolAdmin(resource.data.schoolId);
    }
    
    // Applications
    match /applications/{applicationId} {
      allow read: if isOwner(resource.data.userId) || 
                     belongsToSchool(resource.data.schoolId) ||
                     isSuperAdmin();
      allow create: if isAuthenticated();
      allow update: if isOwner(resource.data.userId) || 
                       belongsToSchool(resource.data.schoolId);
      allow delete: if isSuperAdmin();
    }
    
    // Payments
    match /payments/{paymentId} {
      allow read: if isOwner(resource.data.userId) || 
                     belongsToSchool(resource.data.schoolId) ||
                     isSuperAdmin();
      allow create: if isAuthenticated();
      allow update: if belongsToSchool(resource.data.schoolId) || isSuperAdmin();
      allow delete: if isSuperAdmin();
    }
    
    // Notifications
    match /notifications/{notificationId} {
      allow read: if isOwner(resource.data.userId);
      allow create: if isAuthenticated();
      allow update: if isOwner(resource.data.userId);
      allow delete: if isOwner(resource.data.userId);
    }
    
    // Default deny all
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

**2. Create Storage rules** (`firebase/rules/storage.rules`):
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isImageFile() {
      return request.resource.contentType.matches('image/.*');
    }
    
    function isPDFFile() {
      return request.resource.contentType == 'application/pdf';
    }
    
    function isValidFileType() {
      return isImageFile() || isPDFFile();
    }
    
    function isValidSize() {
      return request.resource.size < 5 * 1024 * 1024; // 5MB
    }
    
    // Schools folder (logos, galleries)
    match /schools/{schoolId}/{allPaths=**} {
      allow read: if true; // Public read for logos and galleries
      allow write: if isAuthenticated() && 
                      isValidFileType() && 
                      isValidSize();
    }
    
    // Applications folder (documents)
    match /applications/{applicationId}/{document} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && 
                      isValidFileType() && 
                      isValidSize();
    }
    
    // User profiles
    match /users/{userId}/profile/{fileName} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && 
                      request.auth.uid == userId &&
                      isImageFile() && 
                      isValidSize();
    }
    
    // Default deny
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

**3. Deploy rules**:
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize Firebase in project
firebase init

# Select:
# - Firestore
# - Storage
# - Use existing project
# - Choose your project

# Deploy rules
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
```

**Files Created**:
- `firebase/rules/firestore.rules`
- `firebase/rules/storage.rules`
- `firebase.json`
- `.firebaserc`

**Acceptance Criteria**:
- ✅ Security rules are defined
- ✅ Rules are deployed
- ✅ Rules are tested (manual)

---

#### Task 1.2.6: Setup Firebase Emulator for Local Development
**Owner**: DEV  
**Duration**: 1 hour

**Steps**:

**1. Initialize Firebase emulators**:
```bash
firebase init emulators
```

Select:
- Authentication Emulator: Yes (port 9099)
- Firestore Emulator: Yes (port 8080)
- Storage Emulator: Yes (port 9199)

**2. Update `firebase.json`**:
```json
{
  "firestore": {
    "rules": "firebase/rules/firestore.rules"
  },
  "storage": {
    "rules": "firebase/rules/storage.rules"
  },
  "emulators": {
    "auth": {
      "port": 9099
    },
    "firestore": {
      "port": 8080
    },
    "storage": {
      "port": 9199
    },
    "ui": {
      "enabled": true,
      "port": 4000
    }
  }
}
```

**3. Update Firebase config to use emulators in development** (`src/lib/firebase/config.ts`):
```typescript
import { connectAuthEmulator } from 'firebase/auth'
import { connectFirestoreEmulator } from 'firebase/firestore'
import { connectStorageEmulator } from 'firebase/storage'

// Connect to emulators in development
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099')
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectStorageEmulator(storage, 'localhost', 9199)
}
```

**4. Add script to `package.json`**:
```json
{
  "scripts": {
    "emulators": "firebase emulators:start",
    "emulators:export": "firebase emulators:export ./firebase-data",
    "emulators:import": "firebase emulators:start --import=./firebase-data"
  }
}
```

**5. Create seed data script** (`scripts/seed-data.ts`):
```typescript
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

// Use emulator
// ... Firebase config with emulator

async function seedData() {
  console.log('Seeding data...')
  
  // Create super admin user
  const auth = getAuth()
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    'admin@ppdb.com',
    'Admin123!'
  )
  
  // Add user document
  const db = getFirestore()
  await addDoc(collection(db, 'users'), {
    email: 'admin@ppdb.com',
    name: 'Super Admin',
    role: 'super_admin',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  
  // Create sample school
  await addDoc(collection(db, 'tenants'), {
    name: 'SMA Negeri 1 Jakarta',
    slug: 'sman1-jakarta',
    email: 'admin@sman1jakarta.sch.id',
    phone: '021-12345678',
    schoolType: 'SMA',
    status: 'negeri',
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  
  console.log('Seed data completed!')
}

seedData()
```

**6. Test emulators**:
```bash
npm run emulators
# Visit http://localhost:4000 for Emulator UI
```

**Files Created**:
- `firebase.json`
- `.firebaserc`
- `scripts/seed-data.ts`

**Files Modified**:
- `src/lib/firebase/config.ts`
- `package.json`

**Acceptance Criteria**:
- ✅ Emulators run successfully
- ✅ Emulator UI is accessible
- ✅ Seed data script works

---

## STORY 1.3: Database Schema Implementation (8 SP)

**Assigned to**: TL + FSD1  
**Duration**: 2 days  
**Priority**: P0

### Step-by-Step Implementation

#### Task 1.3.1: Create TypeScript Interfaces for All Collections
**Owner**: TL  
**Duration**: 3 hours

**Steps**:

**1. Create comprehensive types file** (`src/types/database.ts`):
```typescript
import { Timestamp } from 'firebase/firestore'

// Base interface
export interface BaseDocument {
  id: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

// School (Tenant)
export interface School extends BaseDocument {
  name: string
  slug: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    province: string
    postalCode: string
    coordinates: { lat: number; lng: number }
  }
  npsn: string
  nss: string
  schoolType: 'SD' | 'SMP' | 'SMA' | 'SMK'
  status: 'negeri' | 'swasta'
  accreditation: 'A' | 'B' | 'C' | 'Belum'
  logo?: string
  coverImage?: string
  gallery?: string[]
  about?: {
    vision: string
    mission: string
    history: string
    facilities: string[]
    achievements: string[]
  }
  socialMedia?: {
    facebook?: string
    instagram?: string
    twitter?: string
    youtube?: string
    whatsapp?: string
  }
  branding?: {
    primaryColor: string
    secondaryColor: string
    font: string
    favicon?: string
  }
  customDomain?: string
  subscription: {
    planId: string
    status: 'trial' | 'active' | 'expired' | 'suspended'
    startDate: Timestamp
    endDate: Timestamp
    billingCycle: 'monthly' | 'yearly'
    autoRenew: boolean
  }
  quotas: {
    maxStudents: number
    maxAdmins: number
    maxStorage: number
    maxEmailsPerMonth: number
    maxSMSPerMonth: number
    usedStudents: number
    usedStorage: number
    usedEmails: number
    usedSMS: number
  }
  features: {
    customForms: boolean
    whatsappNotif: boolean
    whiteLabel: boolean
    apiAccess: boolean
    prioritySupport: boolean
  }
  settings: {
    timezone: string
    dateFormat: string
    language: string
    emailSignature: string
  }
  createdBy: string
}

// User
export interface User extends BaseDocument {
  email: string
  phone?: string
  name: string
  photoURL?: string
  role: 'super_admin' | 'school_admin' | 'panitia' | 'student'
  schoolId?: string
  permissions?: string[]
  status: 'active' | 'inactive' | 'suspended'
  twoFactorEnabled: boolean
  preferences: {
    emailNotif: boolean
    smsNotif: boolean
    pushNotif: boolean
    language: string
  }
  lastLogin?: Timestamp
}

// Subscription Plan
export interface SubscriptionPlan extends BaseDocument {
  name: string
  description: string
  price: number
  billingCycle: 'monthly' | 'yearly'
  features: {
    maxStudents: number
    maxAdmins: number
    maxStorage: number
    maxEmails: number
    maxSMS: number
    customForms: boolean
    whatsappNotif: boolean
    whiteLabel: boolean
    apiAccess: boolean
    prioritySupport: boolean
    customDomain: boolean
    removeBranding: boolean
  }
  trialDays: number
  isActive: boolean
  sortOrder: number
}

// PPDB Period
export interface PPDBPeriod extends BaseDocument {
  schoolId: string
  name: string
  academicYear: string
  batch: number
  status: 'draft' | 'active' | 'closed' | 'archived'
  timeline: {
    registrationStart: Timestamp
    registrationEnd: Timestamp
    editDeadline: Timestamp
    documentDeadline: Timestamp
    verificationStart: Timestamp
    verificationEnd: Timestamp
    testDate?: Timestamp
    announcementDate: Timestamp
    reregistrationStart: Timestamp
    reregistrationEnd: Timestamp
  }
  quotas: {
    total: number
    prestasi: number
    zonasi: number
    umum: number
    afirmasi: number
    perpindahan: number
  }
  fees: {
    registrationFee: number
    reregistrationFee: number
    paymentMethods: string[]
    paymentDeadline: number
  }
  jalur: JalurPendaftaran[]
  autoCloseWhenFull: boolean
  createdBy: string
}

export interface JalurPendaftaran {
  id: string
  name: string
  description: string
  quota: number
  criteria: any
  active: boolean
}

// Form Configuration
export interface FormConfig extends BaseDocument {
  schoolId: string
  periodId: string
  name: string
  isDefault: boolean
  sections: FormSection[]
  documents: DocumentRequirement[]
  settings: {
    multiStep: boolean
    showProgress: boolean
    autoSaveInterval: number
    allowEditAfterSubmit: boolean
    confirmationMessage: string
  }
}

export interface FormSection {
  id: string
  title: string
  order: number
  fields: FormField[]
}

export interface FormField {
  id: string
  type: 'text' | 'number' | 'email' | 'phone' | 'date' | 'select' | 'radio' | 'checkbox' | 'textarea' | 'file' | 'address' | 'map'
  label: string
  placeholder?: string
  required: boolean
  validation?: {
    min?: number
    max?: number
    regex?: string
    message?: string
  }
  options?: string[]
  helpText?: string
  defaultValue?: any
  conditionalVisibility?: {
    fieldId: string
    operator: string
    value: any
  }
  order: number
}

export interface DocumentRequirement {
  id: string
  name: string
  description: string
  required: boolean
  allowedFormats: string[]
  maxSizeKB: number
  multipleFiles: boolean
  exampleUrl?: string
}

// Application
export interface Application extends BaseDocument {
  schoolId: string
  periodId: string
  userId: string
  registrationNumber: string
  jalurId: string
  status: 'draft' | 'submitted' | 'paid' | 'verified' | 'rejected' | 'selected' | 'accepted' | 'declined' | 're_registered'
  formData: {
    personal: PersonalData
    address: AddressData
    parents: ParentsData
    education: EducationData
    achievements: Achievement[]
    customFields: Record<string, any>
  }
  documents: Record<string, DocumentStatus>
  payment: PaymentInfo
  verification: VerificationInfo
  scores: ScoreData
  ranking?: number
  selectionResult?: SelectionResult
  timeline: TimelineEvent[]
  notes?: string
  submittedAt?: Timestamp
}

export interface PersonalData {
  fullName: string
  nik: string
  nisn?: string
  birthPlace: string
  birthDate: Timestamp
  gender: 'L' | 'P'
  religion: string
  phone: string
  email: string
  photoUrl?: string
}

export interface AddressData {
  street: string
  rt: string
  rw: string
  kelurahan: string
  kecamatan: string
  city: string
  province: string
  postalCode: string
  coordinates: { lat: number; lng: number }
  distanceFromSchool: number
  residenceStatus: string
}

export interface ParentsData {
  father: ParentInfo
  mother: ParentInfo
  guardian?: GuardianInfo
}

export interface ParentInfo {
  name: string
  nik: string
  birthDate: Timestamp
  education: string
  occupation: string
  income: number
  phone: string
}

export interface GuardianInfo {
  name: string
  relation: string
  nik: string
  phone: string
  occupation: string
}

export interface EducationData {
  previousSchool: string
  npsn: string
  graduationYear: number
  certificateNumber?: string
  grades: Record<string, any>
  averageGrade: number
}

export interface Achievement {
  type: string
  name: string
  level: string
  rank: string
  year: number
  organizer: string
  certificateUrl?: string
  points: number
}

export interface DocumentStatus {
  url: string
  status: 'pending' | 'approved' | 'rejected'
  note?: string
  verifiedBy?: string
  verifiedAt?: Timestamp
}

export interface PaymentInfo {
  amount: number
  status: 'pending' | 'paid' | 'failed' | 'refunded'
  method?: string
  transactionId?: string
  paidAt?: Timestamp
  proofUrl?: string
  invoiceUrl?: string
  gatewayResponse?: any
}

export interface VerificationInfo {
  status: 'pending' | 'in_progress' | 'approved' | 'rejected'
  verifiedBy?: string
  verifiedAt?: Timestamp
  notes?: string
  rejectionReason?: string
}

export interface ScoreData {
  academic: number
  achievement: number
  zonasi: number
  test: number
  interview: number
  total: number
}

export interface SelectionResult {
  status: 'passed' | 'failed' | 'waitlist'
  announcedAt: Timestamp
  acceptanceLetterUrl?: string
  reregistered: boolean
  reregisteredAt?: Timestamp
  declinedAt?: Timestamp
  declineReason?: string
}

export interface TimelineEvent {
  event: string
  timestamp: Timestamp
  by: string
}

// Payment
export interface Payment extends BaseDocument {
  schoolId: string
  applicationId: string
  userId: string
  type: 'registration' | 'reregistration' | 'subscription'
  amount: number
  method: string
  status: 'pending' | 'processing' | 'success' | 'failed' | 'expired' | 'refunded'
  gatewayProvider: 'midtrans' | 'xendit' | 'manual'
  externalId?: string
  vaNumber?: string
  qrCodeUrl?: string
  paymentUrl?: string
  expiryDate?: Timestamp
  paidAt?: Timestamp
  proofUrl?: string
  invoiceUrl?: string
  refund?: {
    status: 'none' | 'pending' | 'processed'
    amount: number
    reason: string
    processedAt?: Timestamp
    processedBy?: string
  }
  gatewayResponse?: any
  metadata?: any
}

// Notification
export interface Notification extends BaseDocument {
  userId: string
  schoolId?: string
  type: 'info' | 'success' | 'warning' | 'error'
  category: 'application' | 'payment' | 'document' | 'announcement' | 'system'
  title: string
  message: string
  actionUrl?: string
  read: boolean
  readAt?: Timestamp
  metadata?: any
  expiresAt?: Timestamp
}

// Add more interfaces as needed...
```

**Files Created**:
- `src/types/database.ts`

**Acceptance Criteria**:
- ✅ All main collections have interfaces
- ✅ Interfaces are properly typed
- ✅ Enums are defined correctly

---

#### Task 1.3.2: Create Collection-Specific Helper Functions
**Owner**: FSD1  
**Duration**: 4 hours

**Steps**:

**1. Create School helpers** (`src/lib/firebase/collections/schools.ts`):
```typescript
import { School } from '@/types/database'
import { createDocument, getDocument, updateDocument, queryDocuments, where } from '../firestore'

const COLLECTION = 'tenants'

export async function createSchool(data: Omit<School, 'id' | 'createdAt' | 'updatedAt'>) {
  return createDocument<Omit<School, 'id' | 'createdAt' | 'updatedAt'>>(COLLECTION, data)
}

export async function getSchool(schoolId: string) {
  return getDocument<School>(COLLECTION, schoolId)
}

export async function updateSchool(schoolId: string, data: Partial<School>) {
  return updateDocument<School>(COLLECTION, schoolId, data)
}

export async function getSchoolBySlug(slug: string) {
  const schools = await queryDocuments<School>(COLLECTION, [where('slug', '==', slug)])
  return schools[0] || null
}

export async function getAllSchools() {
  return queryDocuments<School>(COLLECTION)
}

export async function getActiveSchools() {
  return queryDocuments<School>(COLLECTION, [
    where('subscription.status', '==', 'active')
  ])
}
```

**2. Create User helpers** (`src/lib/firebase/collections/users.ts`):
```typescript
import { User } from '@/types/database'
import { createDocument, getDocument, updateDocument, queryDocuments, where } from '../firestore'

const COLLECTION = 'users'

export async function createUser(userId: string, data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
  return createDocument<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>(COLLECTION, data, userId)
}

export async function getUser(userId: string) {
  return getDocument<User>(COLLECTION, userId)
}

export async function updateUser(userId: string, data: Partial<User>) {
  return updateDocument<User>(COLLECTION, userId, data)
}

export async function getUserByEmail(email: string) {
  const users = await queryDocuments<User>(COLLECTION, [where('email', '==', email)])
  return users[0] || null
}

export async function getUsersBySchool(schoolId: string) {
  return queryDocuments<User>(COLLECTION, [where('schoolId', '==', schoolId)])
}
```

**3. Create PPDB Period helpers** (`src/lib/firebase/collections/periods.ts`):
```typescript
import { PPDBPeriod } from '@/types/database'
import { createDocument, getDocument, updateDocument, queryBySchool, where, orderBy } from '../firestore'

const COLLECTION = 'ppdb_periods'

export async function createPeriod(data: Omit<PPDBPeriod, 'id' | 'createdAt' | 'updatedAt'>) {
  return createDocument<Omit<PPDBPeriod, 'id' | 'createdAt' | 'updatedAt'>>(COLLECTION, data)
}

export async function getPeriod(periodId: string) {
  return getDocument<PPDBPeriod>(COLLECTION, periodId)
}

export async function updatePeriod(periodId: string, data: Partial<PPDBPeriod>) {
  return updateDocument<PPDBPeriod>(COLLECTION, periodId, data)
}

export async function getSchoolPeriods(schoolId: string) {
  return queryBySchool<PPDBPeriod>(COLLECTION, schoolId, [
    orderBy('createdAt', 'desc')
  ])
}

export async function getActivePeriod(schoolId: string) {
  const periods = await queryBySchool<PPDBPeriod>(COLLECTION, schoolId, [
    where('status', '==', 'active')
  ])
  return periods[0] || null
}
```

**4. Create Application helpers** (`src/lib/firebase/collections/applications.ts`):
```typescript
import { Application } from '@/types/database'
import { createDocument, getDocument, updateDocument, queryBySchool, where, orderBy, paginateDocuments } from '../firestore'

const COLLECTION = 'applications'

export async function createApplication(data: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>) {
  return createDocument<Omit<Application, 'id' | 'createdAt' | 'updatedAt'>>(COLLECTION, data)
}

export async function getApplication(applicationId: string) {
  return getDocument<Application>(COLLECTION, applicationId)
}

export async function updateApplication(applicationId: string, data: Partial<Application>) {
  return updateDocument<Application>(COLLECTION, applicationId, data)
}

export async function getApplicationsBySchool(schoolId: string, periodId?: string) {
  const constraints = periodId ? [where('periodId', '==', periodId)] : []
  return queryBySchool<Application>(COLLECTION, schoolId, [
    ...constraints,
    orderBy('createdAt', 'desc')
  ])
}

export async function getApplicationsByUser(userId: string) {
  return queryDocuments<Application>(COLLECTION, [
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  ])
}

export async function paginateApplications(
  schoolId: string,
  pageSize: number = 20,
  lastDoc?: any,
  status?: string
) {
  const constraints = [
    where('schoolId', '==', schoolId),
    ...(status ? [where('status', '==', status)] : []),
    orderBy('createdAt', 'desc')
  ]
  
  return paginateDocuments<Application>(COLLECTION, constraints, pageSize, lastDoc)
}

export async function generateRegistrationNumber(schoolId: string, periodId: string): Promise<string> {
  // Format: SCHOOL-PERIOD-NUMBER
  // Example: SMA1-2024-001
  
  const applications = await queryBySchool<Application>(COLLECTION, schoolId, [
    where('periodId', '==', periodId)
  ])
  
  const nextNumber = applications.length + 1
  const paddedNumber = String(nextNumber).padStart(4, '0')
  
  return `${schoolId.substring(0, 6).toUpperCase()}-${periodId.substring(0, 4)}-${paddedNumber}`
}
```

**Files Created**:
- `src/lib/firebase/collections/schools.ts`
- `src/lib/firebase/collections/users.ts`
- `src/lib/firebase/collections/periods.ts`
- `src/lib/firebase/collections/applications.ts`

**Acceptance Criteria**:
- ✅ All helper functions work
- ✅ Functions are typed correctly
- ✅ Queries are optimized

---

#### Task 1.3.3: Create Composite Indexes
**Owner**: TL  
**Duration**: 1 hour

**Steps**:

**1. Create `firebase/firestore.indexes.json`**:
```json
{
  "indexes": [
    {
      "collectionGroup": "applications",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "schoolId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "applications",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "schoolId", "order": "ASCENDING" },
        { "fieldPath": "periodId", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "applications",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "schoolId", "order": "ASCENDING" },
        { "fieldPath": "jalurId", "order": "ASCENDING" },
        { "fieldPath": "ranking", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "ppdb_periods",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "schoolId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "notifications",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "read", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "payments",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "schoolId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "users",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "schoolId", "order": "ASCENDING" },
        { "fieldPath": "role", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" }
      ]
    }
  ],
  "fieldOverrides": []
}
```

**2. Deploy indexes**:
```bash
firebase deploy --only firestore:indexes
```

**Files Created**:
- `firebase/firestore.indexes.json`

**Acceptance Criteria**:
- ✅ Indexes are defined
- ✅ Indexes are deployed
- ✅ Queries use indexes (check in Firebase Console)

---

[Content continues with remaining tasks...]

*Due to length constraints, I'll create the remaining detailed tasks in the next file. Shall I continue?*

**Files Status for Sprint 1 so far**:
- ✅ Project initialization complete
- ✅ Firebase setup complete
- ✅ Database schema implementation in progress
- ⏳ CI/CD setup (next)
- ⏳ Environment configuration (next)

---

**SPRINT 1 SUMMARY SO FAR**:
- Story 1.1: ✅ Complete (5 SP)
- Story 1.2: ✅ Complete (8 SP)
- Story 1.3: 🔄 In Progress (8 SP)
- Story 1.4: ⏳ Pending (5 SP)
- Story 1.5: ⏳ Pending (3 SP)

**Total Sprint 1**: 29 SP (targeting 2 weeks with 3-4 developers)
