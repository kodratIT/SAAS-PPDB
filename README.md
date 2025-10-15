# PPDB SaaS - Sistem Penerimaan Peserta Didik Baru

Platform SaaS multi-tenant untuk membantu sekolah mengelola proses pendaftaran siswa baru secara online.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5+
- **Database**: Firebase (Firestore, Auth, Storage)
- **Styling**: Tailwind CSS 3+
- **UI Components**: shadcn/ui
- **State Management**: Zustand + React Query
- **Forms**: React Hook Form + Zod
- **Code Quality**: ESLint + Prettier

## 📋 Prerequisites

- Node.js 18.x or 20.x LTS
- npm 9.x or 10.x
- Git 2.x+
- Firebase account
- Vercel account (for deployment)

## 🛠️ Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Setup environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   
   Then configure your Firebase credentials in `.env.local`

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**: [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ppdb/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Authentication routes
│   │   ├── (super-admin)/       # Super admin routes
│   │   ├── (school-admin)/      # School admin routes
│   │   ├── (panitia)/           # Panitia routes
│   │   ├── (student)/           # Student routes
│   │   ├── (public)/            # Public routes
│   │   └── api/                 # API routes
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── layout/              # Layout components
│   │   ├── auth/                # Auth components
│   │   └── shared/              # Shared components
│   ├── lib/
│   │   ├── firebase/            # Firebase configuration
│   │   ├── api/                 # API utilities
│   │   └── utils/               # Utility functions
│   ├── hooks/                   # Custom React hooks
│   ├── store/                   # State management
│   ├── types/                   # TypeScript types
│   └── config/                  # App configuration
├── firebase/                    # Firebase config files
├── tests/                       # Test files
└── public/                      # Static assets
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server (with Turbopack)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

### Code Quality

This project uses ESLint and Prettier to maintain code quality:

```bash
# Check code quality
npm run lint
npm run format:check
npm run type-check

# Fix issues
npm run lint:fix
npm run format
```

## 🏗️ Architecture

### Multi-Tenancy
- Database-per-tenant approach with Firestore
- Tenant identification via `schoolId`
- URL routing: `app.ppdb.com/{schoolSlug}`
- Data isolation with Firestore Security Rules

### User Roles
1. **Super Admin** - Platform owner with full access
2. **School Admin** - School management
3. **Panitia PPDB** - Verification and scoring
4. **Student/Parent** - Registration and tracking

## 📚 Documentation

- [Complete Specification](./plan/PPDB_SAAS_COMPLETE_SPEC.md)
- [Phase 1 Tasks](./plan/PHASE_1_DETAILED_TASKS.md)
- [Sprint Documentation](./plan/phase-1/)

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

### Firebase
```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Storage rules
firebase deploy --only storage:rules
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:coverage
```

## 📄 License

This project is private and proprietary.

## 👥 Team

- Tech Lead: [TBD]
- Full Stack Developers: [TBD]
- DevOps: [TBD]
- QA: [TBD]

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

**Status**: 🚧 Sprint 1 - In Progress  
**Version**: 0.1.0  
**Last Updated**: 2024-10-15
