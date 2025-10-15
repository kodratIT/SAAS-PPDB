# Sprint 1: Project Setup & Infrastructure - Navigation Index

## 📚 Selamat Datang!

Ini adalah dokumentasi lengkap untuk **Sprint 1: Project Setup & Infrastructure** - PPDB SaaS System.

Sprint 1 adalah tahap AWAL development dimana kita setup project foundation, Firebase infrastructure, dan CI/CD pipeline.

---

## 🗂️ Struktur Dokumentasi

```
Sprint-1_Project-Setup-Infrastructure/
├── INDEX.md                    📍 File ini - Panduan navigasi
├── README.md                   ⭐ START HERE - Overview & goals
├── SETUP-GUIDE.md              🔧 Step-by-step implementation
├── SUMMARY.md                  📊 Quick reference & checklist
└── diagrams/                   📐 C4 Architecture Diagrams (5 files)
    ├── 01-system-context.puml         Big picture view
    ├── 02-container.puml              Architecture layers
    ├── 03-component.puml              Internal structure
    ├── 04-deployment.puml             Deployment setup
    ├── 05-database-schema.puml        Database structure
    └── README.md                      Diagram documentation
```

---

## 🎯 Mulai Dari Mana?

### 👉 Saya Baru Join Sprint 1
**Start Here** → [README.md](README.md)
1. Baca sprint goals & objectives
2. Check prerequisites & required tools
3. Lihat team structure & assignments
4. Understand tech stack

**Then** → [SUMMARY.md](SUMMARY.md)
- Quick overview
- Key commands
- Success criteria

### 👉 Saya Mau Implement Tasks
**Follow This** → [SETUP-GUIDE.md](SETUP-GUIDE.md)

**Sprint 1 Stories:**
1. **Story 1.1**: Project Initialization (5 SP)
   - Initialize Next.js with TypeScript
   - Setup Tailwind CSS & shadcn/ui
   - Configure ESLint & Prettier
   - Git repository setup
   
2. **Story 1.2**: Firebase Setup (8 SP)
   - Create Firebase project
   - Enable services (Firestore, Auth, Storage)
   - Install & configure SDK
   - Write security rules
   
3. **Story 1.3**: Database Schema (8 SP)
   - Create TypeScript interfaces
   - Implement helper functions
   - Create composite indexes
   
4. **Story 1.4**: CI/CD Pipeline (5 SP)
   - GitHub Actions workflows
   - Deployment configuration
   
5. **Story 1.5**: Environment Config (3 SP)
   - Development, staging, production setup

### 👉 Saya Mau Lihat Architecture
**View Diagrams** → [diagrams/](./diagrams/)

**Recommended order:**
1. **[01-system-context.puml](diagrams/01-system-context.puml)** - Lihat big picture dulu
2. **[02-container.puml](diagrams/02-container.puml)** - Architecture layers
3. **[03-component.puml](diagrams/03-component.puml)** - Internal components
4. **[04-deployment.puml](diagrams/04-deployment.puml)** - How it deploys
5. **[05-database-schema.puml](diagrams/05-database-schema.puml)** - Database structure

**Cara view diagrams:**
- Online: Copy paste ke https://www.plantuml.com/plantuml/uml/
- VS Code: Install "PlantUML" extension, lalu Alt+D

### 👉 Saya Mau Quick Reference
**Go To** → [SUMMARY.md](SUMMARY.md)
- Quick start commands
- File structure checklist
- Common issues & solutions

---

## 📖 Reading Guide by Role

### 🏗️ Tech Lead

**Your Focus**: Architecture decisions, code review, technical guidance

**Reading Order**:
1. [README.md](README.md) - Complete sprint overview
2. [SETUP-GUIDE.md](SETUP-GUIDE.md) - All implementation details
3. [SUMMARY.md](SUMMARY.md) - Success criteria

**Your Tasks Sprint 1**:
- Lead project initialization (Story 1.1)
- Design database schema (Story 1.3)
- Setup Firebase project (Story 1.2)
- Review all pull requests
- Guide team on best practices

### 👨‍💻 Full Stack Developers

**Your Focus**: Feature implementation

**Reading Order**:
1. [README.md](README.md) - Sprint goals & team structure
2. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Find your assigned tasks
3. [SUMMARY.md](SUMMARY.md) - Quick commands

**Your Tasks Sprint 1**:
- FSD1: Tailwind config, shadcn/ui setup, folder structure
- FSD2: Firebase SDK, helper functions, Firestore utilities
- Code implementation following Tech Lead guidance

### 🎨 Frontend Developer (Optional)

**Your Focus**: UI components, styling

**Reading Order**:
1. [README.md](README.md) - Tech stack (Tailwind, shadcn/ui)
2. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Task 1.1.2, 1.1.3
3. [SUMMARY.md](SUMMARY.md) - Component checklist

**Your Tasks Sprint 1**:
- Setup Tailwind CSS configuration
- Install & configure shadcn/ui components
- Create CSS design tokens
- Test component library

### ⚙️ DevOps Engineer

**Your Focus**: CI/CD, deployment, monitoring

**Reading Order**:
1. [README.md](README.md) - Deployment strategy
2. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Story 1.4, 1.5
3. [SUMMARY.md](SUMMARY.md) - Deployment checklist

**Your Tasks Sprint 1**:
- Setup GitHub Actions workflows
- Configure Firebase emulator
- Setup Vercel deployment
- Create environment configurations
- Setup monitoring & logging

### 🧪 QA Engineer

**Your Focus**: Test planning, quality assurance

**Reading Order**:
1. [README.md](README.md) - Testing strategy
2. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Testing sections
3. [SUMMARY.md](SUMMARY.md) - Test checklist

**Your Tasks Sprint 1**:
- Setup development environment
- Create test plan document
- Setup Jest & React Testing Library
- Plan E2E testing strategy
- Document testing standards

### 📊 Product Owner / Scrum Master

**Your Focus**: Progress tracking, sprint management

**Reading Order**:
1. [SUMMARY.md](SUMMARY.md) - Sprint overview
2. [README.md](README.md) - Story points & timeline
3. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Task breakdown

**Your Monitoring**:
- Track story completion
- Ensure team has no blockers
- Facilitate daily standups
- Monitor 29 SP progress

---

## ✅ Sprint 1 Daily Checklist

### Week 1 - Day 1-2 (Story 1.1: Project Initialization)
- [ ] Next.js project initialized
- [ ] Tailwind CSS configured
- [ ] shadcn/ui components installed
- [ ] ESLint & Prettier working
- [ ] Git repository created & pushed
- [ ] Folder structure complete

### Week 1 - Day 3-4 (Story 1.2: Firebase Setup - Part 1)
- [ ] Firebase project created
- [ ] Firestore enabled
- [ ] Authentication enabled
- [ ] Storage enabled
- [ ] Service account key downloaded

### Week 1 - Day 5 (Story 1.2: Firebase Setup - Part 2)
- [ ] Firebase SDK installed & configured
- [ ] Helper functions created
- [ ] Security rules written
- [ ] Firebase emulator setup

### Week 2 - Day 1-2 (Story 1.3: Database Schema)
- [ ] TypeScript interfaces defined
- [ ] Collection helpers implemented
- [ ] Firestore indexes created
- [ ] Test data seeded

### Week 2 - Day 3-4 (Story 1.4: CI/CD Pipeline)
- [ ] GitHub Actions workflows created
- [ ] Vercel deployment configured
- [ ] Firebase deploy workflow setup
- [ ] PR checks working

### Week 2 - Day 5 (Story 1.5 & Sprint Review)
- [ ] Environment configs complete
- [ ] All stories tested & verified
- [ ] Sprint demo prepared
- [ ] Sprint retrospective completed

---

## 📋 Key Information At A Glance

### Sprint 1 Overview

| Metric | Value |
|--------|-------|
| **Duration** | 2 weeks |
| **Story Points** | 29 SP |
| **Team Size** | 4-5 developers |
| **Stories** | 5 stories |
| **Goal** | Complete project foundation |

### Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | Next.js 14 (App Router) |
| **Language** | TypeScript 5+ |
| **Styling** | Tailwind CSS |
| **UI Library** | shadcn/ui |
| **Backend** | Firebase (Firestore, Auth, Storage) |
| **Deployment** | Vercel |
| **CI/CD** | GitHub Actions |

### Story Breakdown

| Story | SP | Duration | Assigned To |
|-------|----|---------|-----------| 
| 1.1 Project Initialization | 5 | 1 day | TL + FSD1 |
| 1.2 Firebase Setup | 8 | 2 days | TL + FSD2 |
| 1.3 Database Schema | 8 | 2 days | TL + FSD1 |
| 1.4 CI/CD Pipeline | 5 | 1.5 days | DEV |
| 1.5 Environment Config | 3 | 0.5 day | DEV |

### Common Commands

```bash
# Project setup
npx create-next-app@latest . --typescript --tailwind --app --src-dir
npm install

# Development
npm run dev
npm run lint
npm run format

# Firebase
firebase login
firebase init
firebase deploy --only firestore:rules
firebase emulators:start

# Git
git add .
git commit -m "feat: implement story X.X"
git push origin main
```

---

## 🐛 Common Issues & Quick Fixes

### Module not found?
```bash
rm -rf node_modules .next
npm install
```

### Tailwind classes not working?
Check `tailwind.config.ts` content array includes all source paths.

### Firebase connection failed?
Verify `.env.local` has all required environment variables.

### Emulator won't start?
```bash
firebase emulators:start --import=./firebase-data --export-on-exit
```

**For more**: See [SETUP-GUIDE.md](SETUP-GUIDE.md)

---

## 📞 Getting Help

### Internal
- **Technical Issues**: #dev-support Slack channel
- **Sprint Questions**: Scrum Master
- **Architecture**: Tech Lead

### External
- **Next.js**: https://nextjs.org/docs
- **Firebase**: https://firebase.google.com/docs
- **Tailwind**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com/

---

## 🎯 Sprint 1 Success Criteria

Sprint 1 is **SUCCESSFUL** when:

- ✅ Project runs locally on all dev machines
- ✅ Firebase connected and operational
- ✅ Database schema implemented
- ✅ CI/CD pipeline working
- ✅ All 29 SP completed
- ✅ No critical bugs
- ✅ Code reviewed & merged
- ✅ Demo ready for stakeholders

---

## 📈 Next Steps

After Sprint 1:

1. **Sprint 1 Demo** - Friday Week 2
2. **Sprint 1 Retrospective** - Friday Week 2
3. **Sprint 2 Planning** - Monday Week 3
4. **Sprint 2 Goal**: "Implement authentication & super admin foundation"

---

**Sprint Status**: 🚀 Ready to Start  
**Version**: 1.0  
**Last Updated**: 2024

---

## 🚀 Ready to Code?

1. Read [README.md](README.md) untuk sprint overview
2. Follow [SETUP-GUIDE.md](SETUP-GUIDE.md) untuk implementation
3. Check [SUMMARY.md](SUMMARY.md) untuk quick reference

**Let's build! 🎉**
