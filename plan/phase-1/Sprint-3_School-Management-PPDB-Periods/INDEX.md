# Sprint 3: School Management & PPDB Periods - Navigation Index

## 📚 Selamat Datang!

Ini adalah dokumentasi lengkap untuk **Sprint 3: School Management & PPDB Periods** - PPDB SaaS System.

Sprint 3 fokus pada implementasi multi-tenancy, school onboarding, dan konfigurasi PPDB periods untuk setiap sekolah.

---

## 🗂️ Struktur Dokumentasi

```
Sprint-3_School-Management-PPDB-Periods/
├── INDEX.md                    📍 File ini - Panduan navigasi
├── README.md                   ⭐ START HERE - Overview & goals
├── SETUP-GUIDE.md              🔧 Step-by-step implementation
├── SUMMARY.md                  📊 Quick reference & checklist
└── diagrams/                   📐 Architecture Diagrams
    ├── 01-multi-tenancy.puml          Multi-tenant architecture
    ├── 02-school-onboarding.puml      Onboarding flow
    ├── 03-form-builder.puml           Form builder components
    ├── 04-ppdb-period-config.puml     Period configuration
    └── README.md                      Diagram documentation
```

---

## 🎯 Mulai Dari Mana?

### 👉 Saya Baru Join Sprint 3
**Start Here** → [README.md](README.md)
1. Baca sprint goals & objectives
2. Check prerequisites (Sprint 2 complete)
3. Lihat team structure & assignments
4. Understand multi-tenancy architecture

**Then** → [SUMMARY.md](SUMMARY.md)
- Quick overview
- Key commands
- Success criteria

### 👉 Saya Mau Implement Tasks
**Follow This** → [SETUP-GUIDE.md](SETUP-GUIDE.md)

**Sprint 3 Stories:**
1. **Story 3.1**: School Registration & Onboarding (8 SP)
   - Multi-step onboarding wizard
   - School profile creation
   - Logo & banner upload
   - Subscription selection
   
2. **Story 3.2**: Multi-Tenancy System (6 SP)
   - Tenant isolation in Firestore
   - Custom subdomain routing
   - School-specific contexts
   
3. **Story 3.3**: PPDB Period Management (7 SP)
   - Create/edit PPDB periods
   - Timeline configuration
   - Quota management
   
4. **Story 3.4**: Custom Form Builder (5 SP)
   - Drag-and-drop form builder
   - Field type selections
   - Conditional logic
   
5. **Story 3.5**: School Admin Dashboard (2 SP)
   - Dashboard overview
   - Quick statistics
   - Recent applications

### 👉 Saya Mau Lihat Architecture
**View Diagrams** → [diagrams/](./diagrams/)

**Recommended order:**
1. **[01-multi-tenancy.puml](diagrams/01-multi-tenancy.puml)** - Multi-tenant data isolation
2. **[02-school-onboarding.puml](diagrams/02-school-onboarding.puml)** - Onboarding flow
3. **[03-form-builder.puml](diagrams/03-form-builder.puml)** - Form builder structure
4. **[04-ppdb-period-config.puml](diagrams/04-ppdb-period-config.puml)** - Period setup

**Cara view diagrams:**
- Online: Copy paste ke https://www.plantuml.com/plantuml/uml/
- VS Code: Install "PlantUML" extension, lalu Alt+D

### 👉 Saya Mau Quick Reference
**Go To** → [SUMMARY.md](SUMMARY.md)
- Quick start commands
- Story checklist
- Multi-tenancy tips

---

## 📖 Reading Guide by Role

### 🏗️ Tech Lead

**Your Focus**: Multi-tenancy architecture, data isolation, form builder design

**Reading Order**:
1. [README.md](README.md) - Complete sprint overview
2. [diagrams/01-multi-tenancy.puml](diagrams/01-multi-tenancy.puml) - Critical architecture
3. [diagrams/03-form-builder.puml](diagrams/03-form-builder.puml) - Complex feature
4. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Implementation details
5. [SUMMARY.md](SUMMARY.md) - Success criteria

**Your Tasks Sprint 3**:
- Design multi-tenancy system (Story 3.2)
- Design form builder architecture (Story 3.4)
- Database schema for periods (Story 3.3)
- Code review all features

### 👨‍💻 Full Stack Developers

**Your Focus**: Feature implementation

**Reading Order**:
1. [README.md](README.md) - Sprint goals
2. [diagrams/02-school-onboarding.puml](diagrams/02-school-onboarding.puml) - Onboarding flow
3. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Find your assigned tasks
4. [SUMMARY.md](SUMMARY.md) - Quick commands

**Your Tasks Sprint 3**:
- FSD1: Onboarding wizard, form builder UI
- FSD2: Multi-tenancy implementation, period management
- Test all features thoroughly

### 🎨 Frontend Developer

**Your Focus**: Complex UI (wizard, form builder)

**Reading Order**:
1. [README.md](README.md) - UI requirements
2. [diagrams/03-form-builder.puml](diagrams/03-form-builder.puml) - Form builder UI
3. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Story 3.1, 3.4
4. [SUMMARY.md](SUMMARY.md) - Component checklist

**Your Tasks Sprint 3**:
- Multi-step onboarding wizard UI
- Form builder interface (drag-and-drop)
- School admin dashboard
- Period configuration UI

### ⚙️ DevOps Engineer

**Your Focus**: Subdomain routing, storage setup

**Reading Order**:
1. [README.md](README.md) - Infrastructure needs
2. [diagrams/01-multi-tenancy.puml](diagrams/01-multi-tenancy.puml) - Tenancy architecture
3. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Story 3.2
4. [SUMMARY.md](SUMMARY.md) - Deployment checklist

**Your Tasks Sprint 3**:
- Configure subdomain routing (optional)
- Firebase Storage organization
- Firestore indexes optimization
- Backup strategy for tenant data

### 🧪 QA Engineer

**Your Focus**: Multi-tenancy testing, data isolation

**Reading Order**:
1. [README.md](README.md) - Testing strategy
2. [diagrams/](./diagrams/) - All flows to test
3. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Features to test
4. [SUMMARY.md](SUMMARY.md) - Test checklist

**Your Tasks Sprint 3**:
- Test school onboarding flow
- Verify data isolation between tenants
- Test PPDB period creation
- Test form builder functionality
- Cross-tenant data leak testing

### 📊 Product Owner / Scrum Master

**Your Focus**: Progress tracking, feature acceptance

**Reading Order**:
1. [SUMMARY.md](SUMMARY.md) - Sprint overview
2. [README.md](README.md) - Story points & timeline
3. [diagrams/02-school-onboarding.puml](diagrams/02-school-onboarding.puml) - User experience
4. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Task breakdown

**Your Monitoring**:
- Track story completion (28 SP)
- Ensure onboarding UX is smooth
- Monitor form builder usability
- Prepare demo scenarios

---

## ✅ Sprint 3 Daily Checklist

### Week 1 - Day 1-2 (Story 3.1: School Onboarding - Part 1)
- [ ] Onboarding wizard structure created
- [ ] Step 1: School basic info form
- [ ] Step 2: Address & contact form
- [ ] Step 3: Logo & banner upload
- [ ] Wizard navigation working
- [ ] Form validation

### Week 1 - Day 3-4 (Story 3.1: School Onboarding - Part 2)
- [ ] Step 4: Subscription plan selection
- [ ] Step 5: Admin account creation
- [ ] Onboarding complete flow
- [ ] Success confirmation page
- [ ] Email notification sent

### Week 1 - Day 5 (Story 3.2: Multi-Tenancy - Part 1)
- [ ] Tenant isolation design implemented
- [ ] SchoolId in all collections
- [ ] Firestore rules updated
- [ ] Tenant context created

### Week 2 - Day 1-2 (Story 3.2 & 3.3)
- [ ] Subdomain routing (optional)
- [ ] School-specific data fetching
- [ ] PPDB period schema created
- [ ] Period CRUD operations

### Week 2 - Day 3-4 (Story 3.3 & 3.4)
- [ ] Period timeline configuration
- [ ] Quota management
- [ ] Form builder structure
- [ ] Field type components
- [ ] Drag-and-drop working

### Week 2 - Day 5 (Story 3.5 & Sprint Review)
- [ ] School admin dashboard
- [ ] Statistics widgets
- [ ] Recent applications feed
- [ ] All stories tested & verified
- [ ] Sprint demo prepared
- [ ] Sprint retrospective completed

---

## 📋 Key Information At A Glance

### Sprint 3 Overview

| Metric | Value |
|--------|-------|
| **Duration** | 2 weeks |
| **Story Points** | 28 SP |
| **Team Size** | 4-5 developers |
| **Stories** | 5 stories |
| **Goal** | Multi-tenancy & school management |

### Tech Stack Additions (Sprint 3)

| Category | Technology |
|----------|-----------|
| **File Upload** | Firebase Storage |
| **Drag & Drop** | react-beautiful-dnd / dnd-kit |
| **Rich Text** | React Quill (for descriptions) |
| **Date Picker** | shadcn/ui date picker |
| **Multi-Step Form** | React Hook Form + state |

### Story Breakdown

| Story | SP | Duration | Assigned To |
|-------|----|---------|-----------| 
| 3.1 School Onboarding | 8 | 2 days | TL + FSD1 + FED |
| 3.2 Multi-Tenancy | 6 | 1.5 days | TL + FSD2 |
| 3.3 PPDB Period Mgmt | 7 | 2 days | FSD1 + FSD2 |
| 3.4 Form Builder | 5 | 1.5 days | FSD1 + FED |
| 3.5 School Dashboard | 2 | 1 day | FED |

### Common Commands

```bash
# Start dev server
npm run dev

# School onboarding pages
open http://localhost:3000/school/register

# School admin dashboard
open http://localhost:3000/school-admin/dashboard

# PPDB period management
open http://localhost:3000/school-admin/periods

# Form builder
open http://localhost:3000/school-admin/forms
```

---

## 🐛 Common Issues & Quick Fixes

### Issue: Tenant data leaking between schools
```bash
# Solution: Check all queries include schoolId
# Update Firestore rules
# Test with multiple school accounts
```

### Issue: File upload fails
```bash
# Check Firebase Storage rules
# Verify file size < 5MB
# Check file type validation
```

### Issue: Form builder drag not working
```bash
# Install dnd-kit: npm install @dnd-kit/core
# Check touch events on mobile
```

### Issue: Period dates overlap
```bash
# Add validation: registrationEnd > registrationStart
# Check timeline consistency
```

**For more**: See [SETUP-GUIDE.md](SETUP-GUIDE.md#troubleshooting)

---

## 📞 Getting Help

### Internal
- **Multi-Tenancy Questions**: Tech Lead
- **UI/UX Issues**: #dev-frontend Slack
- **Sprint Questions**: Scrum Master

### External
- **Firebase Storage**: https://firebase.google.com/docs/storage
- **React Hook Form**: https://react-hook-form.com/
- **dnd-kit**: https://dndkit.com/

---

## 🎯 Sprint 3 Success Criteria

Sprint 3 is **SUCCESSFUL** when:

- ✅ Schools can self-register through onboarding
- ✅ Multi-tenancy prevents data leaks
- ✅ School admin can create PPDB periods
- ✅ Form builder creates custom forms
- ✅ School dashboard displays data
- ✅ All 28 SP completed
- ✅ 0 critical bugs
- ✅ Data isolation verified

---

## 🔒 Multi-Tenancy Checklist

Before completing Sprint 3, verify:

- [ ] All queries filter by schoolId
- [ ] Firestore rules enforce tenant isolation
- [ ] Users can only see their school's data
- [ ] File uploads isolated per school
- [ ] No cross-tenant data access
- [ ] School context always set
- [ ] API routes validate schoolId
- [ ] Subdomain routing works (if implemented)
- [ ] School switching prevented
- [ ] Audit logs per school

---

## 📈 Next Steps

After Sprint 3:

1. **Sprint 3 Demo** - Friday Week 2
2. **Sprint 3 Retrospective** - Friday Week 2
3. **Sprint 4 Planning** - Monday Week 7
4. **Sprint 4 Goal**: "Student Registration Portal"

---

**Sprint Status**: 🚀 Ready to Start  
**Version**: 1.0  
**Last Updated**: 2024

---

## 🚀 Ready to Code?

1. Read [README.md](README.md) untuk sprint overview
2. Study [diagrams/](./diagrams/) untuk architecture
3. Follow [SETUP-GUIDE.md](SETUP-GUIDE.md) untuk implementation
4. Check [SUMMARY.md](SUMMARY.md) untuk quick reference

**Let's build the school management system! 🏫**
