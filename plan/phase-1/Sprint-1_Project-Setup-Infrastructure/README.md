# Sprint 1: Project Setup & Infrastructure

## 📋 Sprint Overview

**Duration**: Week 1-2 (2 weeks)  
**Story Points**: 29 SP  
**Team Size**: 4-5 developers  
**Sprint Goal**: Setup development environment, initialize project, configure Firebase, and establish CI/CD pipeline

---

## 🎯 Sprint Goals

1. ✅ Initialize Next.js project with TypeScript, Tailwind CSS, and shadcn/ui
2. ✅ Setup Firebase (Firestore, Authentication, Storage)
3. ✅ Implement database schema with TypeScript interfaces
4. ✅ Configure CI/CD pipeline with GitHub Actions
5. ✅ Setup development, staging, and production environments

---

## 👥 Team Structure & Roles

### Development Team

**👨‍💼 Tech Lead (TL) - 1 person**
- Architecture decisions & technical guidance
- Code review & quality assurance
- Database design
- Complex features implementation
- Team mentoring

**👨‍💻 Full Stack Developer 1 (FSD1)**
- Frontend setup (Tailwind, shadcn/ui)
- Folder structure creation
- Helper functions
- Database schema implementation

**👨‍💻 Full Stack Developer 2 (FSD2)**
- Firebase SDK configuration
- Firestore helper functions
- API route creation
- Testing Firebase connectivity

**🎨 Frontend Developer (FED) - Optional**
- UI component setup
- Styling configuration
- Design system implementation

**⚙️ DevOps Engineer (DEV) - Part time**
- CI/CD pipeline setup
- Firebase emulator configuration
- Deployment automation
- Environment configuration

**🧪 QA Engineer (QA) - Part time**
- Test planning
- Testing strategy document
- Environment verification

---

## 📚 Stories & Tasks

### Story 1.1: Project Initialization (5 SP)
**Assigned**: TL + FSD1  
**Duration**: 1 day

#### Tasks:
1. **Task 1.1.1**: Initialize Next.js with TypeScript (TL, 2h)
2. **Task 1.1.2**: Setup Tailwind CSS Configuration (FSD1, 1h)
3. **Task 1.1.3**: Install and Configure shadcn/ui (FSD1, 2h)
4. **Task 1.1.4**: Setup ESLint and Prettier (TL, 1h)
5. **Task 1.1.5**: Configure Git Repository (TL, 30min)
6. **Task 1.1.6**: Create Project Folder Structure (FSD1, 1h)

**Deliverables**:
- Next.js project running
- Tailwind CSS configured
- shadcn/ui components installed
- Linting & formatting working
- Git repository created

---

### Story 1.2: Firebase Setup (8 SP)
**Assigned**: TL + FSD2  
**Duration**: 2 days

#### Tasks:
1. **Task 1.2.1**: Create Firebase Project (TL, 1h)
2. **Task 1.2.2**: Enable Firebase Services (TL, 2h)
3. **Task 1.2.3**: Install Firebase SDK and Configure (FSD2, 2h)
4. **Task 1.2.4**: Create Firestore Helper Functions (FSD2, 2h)
5. **Task 1.2.5**: Write Firestore Security Rules (TL, 2h)
6. **Task 1.2.6**: Setup Firebase Emulator (DEV, 1h)

**Deliverables**:
- Firebase project created
- Firestore, Auth, Storage enabled
- SDK configured (client & admin)
- Helper functions created
- Security rules deployed
- Emulator running locally

---

### Story 1.3: Database Schema Implementation (8 SP)
**Assigned**: TL + FSD1  
**Duration**: 2 days

#### Tasks:
1. **Task 1.3.1**: Create TypeScript Interfaces (TL, 3h)
2. **Task 1.3.2**: Create Collection-Specific Helpers (FSD1, 4h)
3. **Task 1.3.3**: Create Composite Indexes (TL, 1h)

**Deliverables**:
- Complete TypeScript interfaces
- Collection helpers (schools, users, periods, applications)
- Firestore indexes created
- Type-safe database operations

---

### Story 1.4: CI/CD Pipeline Setup (5 SP)
**Assigned**: DEV  
**Duration**: 1.5 days

#### Tasks:
1. **Task 1.4.1**: Setup GitHub Actions Workflow (DEV, 2h)
2. **Task 1.4.2**: Configure Vercel Deployment (DEV, 2h)
3. **Task 1.4.3**: Setup Firebase Deploy Workflow (DEV, 1h)
4. **Task 1.4.4**: Configure PR Checks (DEV, 1h)

**Deliverables**:
- GitHub Actions workflows
- Automated testing on PR
- Vercel auto-deploy
- Firebase rules auto-deploy

---

### Story 1.5: Environment Configuration (3 SP)
**Assigned**: DEV  
**Duration**: 0.5 day

#### Tasks:
1. **Task 1.5.1**: Setup Environment Variables (DEV, 1h)
2. **Task 1.5.2**: Create Development Config (DEV, 1h)
3. **Task 1.5.3**: Document Environment Setup (DEV, 1h)

**Deliverables**:
- `.env.local`, `.env.development`, `.env.production`
- Configuration documentation
- Environment setup guide

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3+
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod

### Backend
- **BaaS**: Firebase
  - **Database**: Firestore
  - **Authentication**: Firebase Auth
  - **Storage**: Firebase Storage
  - **Functions**: Cloud Functions (later sprints)

### DevOps
- **Version Control**: Git + GitHub
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel (Frontend)
- **Monitoring**: Vercel Analytics
- **Error Tracking**: Sentry (later sprints)

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript
- **Testing**: Jest + React Testing Library (Sprint 2)

---

## 📦 Prerequisites

### Required Software

| Software | Version | Download |
|----------|---------|----------|
| Node.js | 18.x or 20.x LTS | https://nodejs.org/ |
| npm | 9.x or 10.x | (bundled with Node.js) |
| Git | 2.x+ | https://git-scm.com/ |
| VS Code | Latest | https://code.visualstudio.com/ |
| Firebase CLI | Latest | `npm install -g firebase-tools` |

### Required Accounts
- GitHub account (for repository)
- Firebase account (for backend)
- Vercel account (for deployment)
- Firebase Blaze plan (pay-as-you-go, for Cloud Functions)

### VS Code Extensions (Recommended)
- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- Firebase
- GitLens

---

## 📁 Project Structure

```
ppdb/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Authentication routes
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── (super-admin)/            # Super admin routes
│   │   │   ├── dashboard/
│   │   │   ├── schools/
│   │   │   ├── subscriptions/
│   │   │   └── settings/
│   │   ├── (school-admin)/           # School admin routes
│   │   │   ├── dashboard/
│   │   │   ├── periods/
│   │   │   ├── applicants/
│   │   │   └── settings/
│   │   ├── (panitia)/                # Panitia routes
│   │   │   ├── dashboard/
│   │   │   └── verification/
│   │   ├── (student)/                # Student routes
│   │   │   ├── dashboard/
│   │   │   ├── application/
│   │   │   └── status/
│   │   ├── (public)/                 # Public routes
│   │   ├── api/                      # API routes
│   │   │   ├── auth/
│   │   │   ├── schools/
│   │   │   ├── applications/
│   │   │   └── payments/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── layout/                   # Layout components
│   │   ├── auth/                     # Auth components
│   │   ├── dashboard/                # Dashboard components
│   │   └── shared/                   # Shared components
│   ├── lib/
│   │   ├── firebase/
│   │   │   ├── config.ts             # Firebase config
│   │   │   ├── admin.ts              # Firebase Admin SDK
│   │   │   ├── firestore.ts          # Firestore helpers
│   │   │   └── collections/          # Collection helpers
│   │   │       ├── schools.ts
│   │   │       ├── users.ts
│   │   │       ├── periods.ts
│   │   │       └── applications.ts
│   │   ├── api/                      # API utilities
│   │   ├── utils/                    # Utility functions
│   │   └── payment/                  # Payment integration
│   ├── hooks/                        # Custom React hooks
│   ├── store/                        # State management
│   ├── types/                        # TypeScript types
│   │   ├── index.ts
│   │   └── database.ts
│   └── config/                       # App configuration
├── firebase/
│   ├── rules/
│   │   ├── firestore.rules           # Firestore security rules
│   │   └── storage.rules             # Storage security rules
│   └── functions/                    # Cloud Functions (later)
├── public/                           # Static assets
│   ├── images/
│   └── icons/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .github/
│   └── workflows/                    # GitHub Actions
├── .env.example
├── .env.local
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── firebase.json
├── .firebaserc
└── README.md
```

---

## ✅ Acceptance Criteria

### Story 1.1: Project Initialization
- [x] Next.js 14 project created with TypeScript
- [x] Runs on `http://localhost:3000` without errors
- [x] Tailwind CSS configured and working
- [x] shadcn/ui components installed (Button, Input, Card, etc.)
- [x] ESLint passes with no errors
- [x] Prettier formats code correctly
- [x] Git repository created and pushed to GitHub
- [x] Folder structure matches the plan

### Story 1.2: Firebase Setup
- [x] Firebase project created in console
- [x] Firestore database enabled
- [x] Firebase Authentication enabled (Email/Password, Google)
- [x] Firebase Storage enabled
- [x] Firebase SDK installed and configured
- [x] Admin SDK configured for server-side
- [x] Test endpoint returns success
- [x] Security rules written and deployed
- [x] Firebase emulator runs locally

### Story 1.3: Database Schema
- [x] All TypeScript interfaces defined
- [x] Collection helpers implemented
- [x] CRUD operations work correctly
- [x] Firestore indexes created
- [x] Type-safe database queries
- [x] No TypeScript errors

### Story 1.4: CI/CD Pipeline
- [x] GitHub Actions workflow runs on push
- [x] Automated tests run on PR
- [x] Vercel deployment succeeds
- [x] Firebase rules deploy automatically
- [x] PR checks must pass before merge

### Story 1.5: Environment Configuration
- [x] Environment variables documented
- [x] Development environment works
- [x] Production environment configured
- [x] Team can setup environment easily

---

## 🧪 Testing Strategy

### Sprint 1 Testing Focus

**Manual Testing**:
- Project runs without errors
- Firebase connection works
- Database operations succeed
- Emulator functions correctly

**Automated Testing** (Setup for later sprints):
- Unit tests for helper functions
- Integration tests for API routes
- E2E tests for critical flows

**Testing Tools**:
- Jest (Unit testing)
- React Testing Library (Component testing)
- Playwright or Cypress (E2E testing - Sprint 2+)

---

## 📊 Sprint Velocity & Capacity

### Team Capacity
- Tech Lead: 6 hours/day × 10 days = 60 hours
- FSD1: 8 hours/day × 10 days = 80 hours
- FSD2: 8 hours/day × 10 days = 80 hours
- DEV: 4 hours/day × 10 days = 40 hours (part-time)
- QA: 4 hours/day × 10 days = 40 hours (part-time)

**Total**: ~300 hours

### Story Points Breakdown
- 1 SP ≈ 4-6 hours (varies by complexity)
- 29 SP × 5 hours average = ~145 hours
- **Buffer**: ~155 hours for meetings, breaks, unknowns

---

## 🚀 Getting Started

### Day 1: Setup & Initialization

1. **Clone repository** (if exists) or create new:
   ```bash
   npx create-next-app@latest ppdb --typescript --tailwind --app --src-dir
   cd ppdb
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Follow SETUP-GUIDE.md** for detailed steps

---

## 📞 Support & Communication

### Daily Standup
- **Time**: 9:00 AM
- **Duration**: 15 minutes
- **Format**: What I did yesterday, what I'll do today, any blockers

### Sprint Planning
- **When**: Day 1, Week 1
- **Duration**: 2 hours
- **Output**: Sprint backlog, task assignments

### Sprint Review
- **When**: Last day of Week 2
- **Duration**: 1 hour
- **Output**: Demo, stakeholder feedback

### Sprint Retrospective
- **When**: After Sprint Review
- **Duration**: 1 hour
- **Output**: Improvements for Sprint 2

---

## 🎯 Definition of Done

A story is **DONE** when:

1. ✅ All tasks completed
2. ✅ Code reviewed and approved
3. ✅ Tests written and passing
4. ✅ Documentation updated
5. ✅ No critical bugs
6. ✅ Deployed to dev environment
7. ✅ Accepted by Product Owner

---

## 📖 References

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Learning Resources
- [Next.js 14 Tutorial](https://nextjs.org/learn)
- [Firebase for Web](https://firebase.google.com/docs/web/setup)
- [Tailwind CSS Crash Course](https://www.youtube.com/watch?v=UBOj6rqRUME)

---

## 📈 Success Metrics

Sprint 1 is **SUCCESSFUL** when:

- ✅ All 5 stories completed (29 SP)
- ✅ 0 critical bugs
- ✅ Project runs on all team member machines
- ✅ Firebase operational
- ✅ CI/CD pipeline working
- ✅ Demo approved by stakeholders
- ✅ Team velocity established

---

**Next**: [SETUP-GUIDE.md](SETUP-GUIDE.md) - Detailed implementation steps

**Quick Reference**: [SUMMARY.md](SUMMARY.md) - Cheat sheet & checklist
