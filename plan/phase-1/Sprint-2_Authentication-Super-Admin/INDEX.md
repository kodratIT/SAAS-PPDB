# Sprint 2: Authentication & Super Admin Foundation - Navigation Index

## 📚 Selamat Datang!

Ini adalah dokumentasi lengkap untuk **Sprint 2: Authentication & Super Admin Foundation** - PPDB SaaS System.

Sprint 2 fokus pada implementasi sistem autentikasi lengkap dan fondasi super admin untuk mengelola platform.

---

## 🗂️ Struktur Dokumentasi

```
Sprint-2_Authentication-Super-Admin/
├── INDEX.md                    📍 File ini - Panduan navigasi
├── README.md                   ⭐ START HERE - Overview & goals
├── SETUP-GUIDE.md              🔧 Step-by-step implementation
├── SUMMARY.md                  📊 Quick reference & checklist
└── diagrams/                   📐 C4 Architecture Diagrams
    ├── 01-auth-flow.puml              Authentication flow
    ├── 02-rbac-system.puml            Role-based access control
    ├── 03-super-admin-components.puml Component structure
    └── README.md                      Diagram documentation
```

---

## 🎯 Mulai Dari Mana?

### 👉 Saya Baru Join Sprint 2
**Start Here** → [README.md](README.md)
1. Baca sprint goals & objectives
2. Check prerequisites (Sprint 1 complete)
3. Lihat team structure & assignments
4. Understand authentication architecture

**Then** → [SUMMARY.md](SUMMARY.md)
- Quick overview
- Key commands
- Success criteria

### 👉 Saya Mau Implement Tasks
**Follow This** → [SETUP-GUIDE.md](SETUP-GUIDE.md)

**Sprint 2 Stories:**
1. **Story 2.1**: Authentication System (8 SP)
   - Firebase Auth setup
   - Login/Register/Logout
   - Google OAuth integration
   - Password reset flow
   
2. **Story 2.2**: Authentication UI (6 SP)
   - Login page with validation
   - Register page
   - Forgot password page
   - Protected routes
   
3. **Story 2.3**: Role-Based Access Control (5 SP)
   - Define roles & permissions
   - RBAC middleware
   - Permission guards
   
4. **Story 2.4**: Super Admin Dashboard (4 SP)
   - Dashboard layout
   - Statistics widgets
   - Activity feed
   
5. **Story 2.5**: Subscription Plan Management (3 SP)
   - Plan CRUD operations
   - Admin UI

### 👉 Saya Mau Lihat Architecture
**View Diagrams** → [diagrams/](./diagrams/)

**Recommended order:**
1. **[01-auth-flow.puml](diagrams/01-auth-flow.puml)** - Authentication flow & sequence
2. **[02-rbac-system.puml](diagrams/02-rbac-system.puml)** - Role & permission structure
3. **[03-super-admin-components.puml](diagrams/03-super-admin-components.puml)** - Component structure

**Cara view diagrams:**
- Online: Copy paste ke https://www.plantuml.com/plantuml/uml/
- VS Code: Install "PlantUML" extension, lalu Alt+D

### 👉 Saya Mau Quick Reference
**Go To** → [SUMMARY.md](SUMMARY.md)
- Quick start commands
- Story checklist
- Common authentication issues

---

## 📖 Reading Guide by Role

### 🏗️ Tech Lead

**Your Focus**: Authentication architecture, security, RBAC design

**Reading Order**:
1. [README.md](README.md) - Complete sprint overview
2. [diagrams/](./diagrams/) - All authentication & RBAC diagrams
3. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Implementation details
4. [SUMMARY.md](SUMMARY.md) - Success criteria

**Your Tasks Sprint 2**:
- Design authentication flow (Story 2.1)
- Design RBAC system (Story 2.3)
- Security review
- Code review for auth components

### 👨‍💻 Full Stack Developers

**Your Focus**: Feature implementation

**Reading Order**:
1. [README.md](README.md) - Sprint goals
2. [diagrams/01-auth-flow.puml](diagrams/01-auth-flow.puml) - Auth flow
3. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Find your assigned tasks
4. [SUMMARY.md](SUMMARY.md) - Quick commands

**Your Tasks Sprint 2**:
- FSD1: Auth UI components, forms, validation
- FSD2: RBAC system, API routes, permissions
- Test authentication flows

### 🎨 Frontend Developer

**Your Focus**: UI/UX for authentication pages

**Reading Order**:
1. [README.md](README.md) - UI requirements
2. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Story 2.2, 2.4
3. [SUMMARY.md](SUMMARY.md) - Component checklist

**Your Tasks Sprint 2**:
- Design login/register pages
- Form validation UI
- Dashboard layout
- Statistics widgets

### 🧪 QA Engineer

**Your Focus**: Authentication testing, security testing

**Reading Order**:
1. [README.md](README.md) - Testing strategy
2. [diagrams/01-auth-flow.puml](diagrams/01-auth-flow.puml) - Flows to test
3. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Features to test
4. [SUMMARY.md](SUMMARY.md) - Test checklist

**Your Tasks Sprint 2**:
- Test all authentication flows
- Test RBAC permissions
- Security testing (XSS, CSRF, etc.)
- Session management testing

### 📊 Product Owner / Scrum Master

**Your Focus**: Progress tracking, security acceptance

**Reading Order**:
1. [SUMMARY.md](SUMMARY.md) - Sprint overview
2. [README.md](README.md) - Story points & timeline
3. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Task breakdown

**Your Monitoring**:
- Track story completion (26 SP)
- Ensure security standards met
- Monitor authentication testing
- Prepare demo scenarios

---

## ✅ Sprint 2 Daily Checklist

### Week 1 - Day 1-2 (Story 2.1: Authentication System)
- [ ] Firebase Auth configured
- [ ] Auth context created
- [ ] Login function implemented
- [ ] Register function implemented
- [ ] Logout function implemented
- [ ] Google OAuth integrated
- [ ] Password reset working

### Week 1 - Day 3-4 (Story 2.2: Authentication UI)
- [ ] Login page with validation
- [ ] Register page with validation
- [ ] Forgot password page
- [ ] Error handling
- [ ] Success messages
- [ ] Loading states

### Week 1 - Day 5 (Story 2.3: RBAC - Part 1)
- [ ] Roles defined
- [ ] Permissions mapped
- [ ] User role assignment

### Week 2 - Day 1-2 (Story 2.3: RBAC - Part 2)
- [ ] RBAC middleware created
- [ ] Permission guards implemented
- [ ] Protected routes working
- [ ] Role-based UI rendering

### Week 2 - Day 3-4 (Story 2.4: Super Admin Dashboard)
- [ ] Dashboard layout complete
- [ ] Statistics widgets
- [ ] Recent activities
- [ ] Navigation menu

### Week 2 - Day 5 (Story 2.5 & Sprint Review)
- [ ] Subscription plan management
- [ ] Plan CRUD complete
- [ ] All stories tested & verified
- [ ] Sprint demo prepared
- [ ] Sprint retrospective completed

---

## 📋 Key Information At A Glance

### Sprint 2 Overview

| Metric | Value |
|--------|-------|
| **Duration** | 2 weeks |
| **Story Points** | 26 SP |
| **Team Size** | 4-5 developers |
| **Stories** | 5 stories |
| **Goal** | Complete authentication & admin foundation |

### Tech Stack Additions (Sprint 2)

| Category | Technology |
|----------|-----------|
| **Authentication** | Firebase Auth |
| **Form Validation** | React Hook Form + Zod |
| **State Management** | React Context API |
| **OAuth** | Google Identity Services |
| **Session** | Firebase Auth Tokens |

### Story Breakdown

| Story | SP | Duration | Assigned To |
|-------|----|---------|-----------| 
| 2.1 Authentication System | 8 | 2 days | TL + FSD1 |
| 2.2 Authentication UI | 6 | 1.5 days | FSD1 + FED |
| 2.3 Role-Based Access Control | 5 | 1.5 days | TL + FSD2 |
| 2.4 Super Admin Dashboard | 4 | 1 day | FSD1 + FED |
| 2.5 Subscription Plans | 3 | 1 day | TL + FSD2 |

### Common Commands

```bash
# Authentication testing
npm run dev
# Test login: http://localhost:3000/login
# Test register: http://localhost:3000/register

# Run tests
npm test -- auth
npm test -- rbac

# Firebase Auth emulator
firebase emulators:start --only auth

# Check user in Firestore
# Firestore Console -> users collection
```

---

## 🐛 Common Issues & Quick Fixes

### Issue: Firebase Auth not initialized
```bash
# Check .env.local has all Firebase keys
# Restart dev server
```

### Issue: OAuth redirect not working
Check Firebase Console → Authentication → Sign-in method → Google → Authorized domains

### Issue: Token verification fails
```bash
# Check Firebase Admin SDK credentials
# Verify FIREBASE_ADMIN_PRIVATE_KEY in .env.local
```

### Issue: Permission denied in Firestore
Check Firestore rules allow authenticated users

**For more**: See [SETUP-GUIDE.md](SETUP-GUIDE.md#troubleshooting)

---

## 📞 Getting Help

### Internal
- **Auth Issues**: #dev-auth Slack channel
- **Security Questions**: Tech Lead
- **Sprint Questions**: Scrum Master

### External
- **Firebase Auth**: https://firebase.google.com/docs/auth
- **React Hook Form**: https://react-hook-form.com/
- **Zod Validation**: https://zod.dev/

---

## 🎯 Sprint 2 Success Criteria

Sprint 2 is **SUCCESSFUL** when:

- ✅ Users can register with email/password
- ✅ Users can login with email/password
- ✅ Users can login with Google OAuth
- ✅ Password reset works end-to-end
- ✅ Sessions persist correctly
- ✅ RBAC prevents unauthorized access
- ✅ Super admin can access admin routes
- ✅ All 26 SP completed
- ✅ 0 critical security bugs
- ✅ Authentication tests passing

---

## 🔐 Security Checklist

Before completing Sprint 2, verify:

- [ ] Passwords never logged or exposed
- [ ] JWT tokens validated on every API call
- [ ] Protected routes check authentication
- [ ] RBAC prevents privilege escalation
- [ ] CSRF protection enabled
- [ ] XSS sanitization in forms
- [ ] Rate limiting on auth endpoints
- [ ] Email verification working
- [ ] Session timeout configured
- [ ] Secure cookies (httpOnly)

---

## 📈 Next Steps

After Sprint 2:

1. **Sprint 2 Demo** - Friday Week 2
2. **Sprint 2 Retrospective** - Friday Week 2
3. **Sprint 3 Planning** - Monday Week 5
4. **Sprint 3 Goal**: "School Management & Multi-tenancy"

---

**Sprint Status**: 🚀 Ready to Start  
**Version**: 1.0  
**Last Updated**: 2024

---

## 🚀 Ready to Code?

1. Read [README.md](README.md) untuk sprint overview
2. Follow [SETUP-GUIDE.md](SETUP-GUIDE.md) untuk implementation
3. Check [SUMMARY.md](SUMMARY.md) untuk quick reference
4. View [diagrams/](./diagrams/) untuk architecture

**Let's secure the app! 🔐**
