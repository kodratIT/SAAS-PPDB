# Sprint 7: Form Builder & Email System - Navigation Index

## 📚 Selamat Datang!

Ini adalah dokumentasi lengkap untuk **Sprint 7: Form Builder & Email System** - PPDB SaaS System.

Sprint 7 adalah tahap pertama Phase 2 Enhancement dimana kita build custom form builder system dan comprehensive email communication system.

---

## 🗂️ Struktur Dokumentasi

```
Sprint-7_Form-Builder-Email-System/
├── INDEX.md                    📍 File ini - Panduan navigasi
├── README.md                   ⭐ START HERE - Overview & goals
├── SETUP-GUIDE.md              🔧 Step-by-step implementation
├── SUMMARY.md                  📊 Quick reference & checklist
└── diagrams/                   📐 Architecture Diagrams
    └── README.md               Diagram documentation
```

---

## 🎯 Mulai Dari Mana?

### 👉 Saya Baru Join Sprint 7
**Start Here** → [README.md](README.md)
1. Baca sprint goals & objectives
2. Understand form builder architecture
3. Learn email system flow
4. Check team structure & assignments

**Then** → [SUMMARY.md](SUMMARY.md)
- Quick overview
- Key commands
- Success criteria

### 👉 Saya Mau Implement Tasks
**Follow This** → [SETUP-GUIDE.md](SETUP-GUIDE.md)

**Sprint 7 Stories:**
1. **Story 7.1.1**: Form Builder Interface (8 SP)
   - Drag & drop dengan dnd-kit
   - Field palette & canvas
   - Property editor
   - Conditional logic builder
   
2. **Story 7.1.2**: Form Renderer (5 SP)
   - Dynamic form component
   - All field types rendering
   - Validation & conditional visibility
   
3. **Story 7.2**: Email System Setup (8 SP)
   - Resend integration
   - Email templates dengan React Email
   - Queue system & background jobs
   
4. **Story 7.3**: Notification System (5 SP)
   - In-app notifications
   - Real-time updates
   - Notification dropdown & page
   
5. **Story 7.4**: Email Templates (5 SP)
   - Additional templates
   - Testing across email clients

### 👉 Saya Mau Lihat Architecture
**View Diagrams** → [diagrams/README.md](./diagrams/README.md)

### 👉 Saya Mau Quick Reference
**Go To** → [SUMMARY.md](SUMMARY.md)
- Quick start commands
- Checklist
- Common issues & solutions

---

## 📖 Reading Guide by Role

### 🏗️ Tech Lead

**Your Focus**: Form builder architecture, email system integration

**Reading Order**:
1. [README.md](README.md) - Complete sprint overview
2. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Implementation details
3. [SUMMARY.md](SUMMARY.md) - Success criteria

**Your Tasks Sprint 7**:
- Design form builder architecture (Story 7.1.1)
- Implement conditional logic (Story 7.1.1)
- Setup email queue system (Story 7.2)
- Review all pull requests

### 👨‍💻 Full Stack Developer 1 (Form Builder)

**Your Focus**: Form builder implementation

**Reading Order**:
1. [README.md](README.md) - Sprint goals & tech stack
2. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Story 7.1.1, 7.1.2
3. dnd-kit documentation

**Your Tasks Sprint 7**:
- Setup dnd-kit
- Build form builder interface
- Implement field palette & canvas
- Create property editor
- Build form renderer

### 👨‍💻 Full Stack Developer 2 (Email System)

**Your Focus**: Email system implementation

**Reading Order**:
1. [README.md](README.md) - Email architecture
2. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Story 7.2, 7.3, 7.4
3. Resend documentation

**Your Tasks Sprint 7**:
- Setup Resend
- Create email templates
- Build queue system
- Implement notifications

### 🎨 Frontend Developer

**Your Focus**: UI/UX for form builder & notifications

**Reading Order**:
1. [README.md](README.md) - UI requirements
2. [SETUP-GUIDE.md](SETUP-GUIDE.md) - UI components
3. [SUMMARY.md](SUMMARY.md) - Design checklist

**Your Tasks Sprint 7**:
- Form builder UI/UX
- Email template design
- Notification components

### ⚙️ DevOps Engineer

**Your Focus**: Email service config, monitoring

**Reading Order**:
1. [README.md](README.md) - Deployment strategy
2. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Service setup
3. [SUMMARY.md](SUMMARY.md) - Deployment checklist

**Your Tasks Sprint 7**:
- Configure Resend
- Setup email queue monitoring
- Deploy Cloud Functions for email processing

### 🧪 QA Engineer

**Your Focus**: Testing form builder & email delivery

**Reading Order**:
1. [README.md](README.md) - Testing requirements
2. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Test scenarios
3. [SUMMARY.md](SUMMARY.md) - Test checklist

**Your Tasks Sprint 7**:
- Test form builder functionality
- Test email delivery across clients
- Test notification system

### 📊 Product Owner / Scrum Master

**Your Focus**: Progress tracking, sprint management

**Reading Order**:
1. [SUMMARY.md](SUMMARY.md) - Sprint overview
2. [README.md](README.md) - Story points & timeline

**Your Monitoring**:
- Track 31 SP progress
- Ensure team has no blockers
- Facilitate daily standups

---

## ✅ Sprint 7 Daily Checklist

### Week 13 - Day 1-2 (Story 7.1.1: Form Builder Interface)
- [ ] dnd-kit installed & configured
- [ ] Form builder page UI created
- [ ] Field palette component done
- [ ] Form canvas (drop zone) working
- [ ] Drag & drop functional

### Week 13 - Day 3-4 (Story 7.1.1 continued)
- [ ] Field property editor complete
- [ ] Section management added
- [ ] Conditional logic builder implemented
- [ ] Preview mode working
- [ ] Form configuration saves to Firestore

### Week 13 - Day 5 + Week 14 - Day 1 (Story 7.1.2: Form Renderer)
- [ ] Dynamic form renderer created
- [ ] All field types rendering
- [ ] Validation rules applied
- [ ] Conditional visibility working
- [ ] Auto-save implemented
- [ ] Form submission handling

### Week 14 - Day 2-3 (Story 7.2: Email System)
- [ ] Resend account setup
- [ ] Resend package installed
- [ ] Email utility functions created
- [ ] 6 email templates built
- [ ] Email queue system implemented
- [ ] Background job for processing created
- [ ] Email logging added

### Week 14 - Day 4 (Story 7.3: Notifications)
- [ ] Notification icon & dropdown
- [ ] Real-time listener implemented
- [ ] Mark as read functionality
- [ ] Notifications page created
- [ ] Notifications on key events

### Week 14 - Day 5 (Story 7.4 & Sprint Review)
- [ ] Additional email templates created
- [ ] Templates tested in email clients
- [ ] Documentation complete
- [ ] Sprint demo prepared
- [ ] Sprint retrospective

---

## 📋 Key Information At A Glance

### Sprint 7 Overview

| Metric | Value |
|--------|-------|
| **Duration** | 2 weeks |
| **Story Points** | 31 SP |
| **Team Size** | 4-5 developers |
| **Stories** | 5 stories |
| **Goal** | Form builder & email system |

### New Tech Stack

| Technology | Purpose |
|-----------|---------|
| **@dnd-kit** | Drag & drop |
| **resend** | Email service |
| **@react-email/components** | Email templates |
| **react-hook-form** | Form management |
| **zod** | Validation |

### Story Breakdown

| Story | SP | Duration | Assigned To |
|-------|----|---------|-----------| 
| 7.1.1 Form Builder Interface | 8 | 2 days | TL + FSD1 |
| 7.1.2 Form Renderer | 5 | 1.5 days | FSD1 + FED |
| 7.2 Email System | 8 | 2 days | TL + FSD2 |
| 7.3 Notifications | 5 | 1.5 days | FSD2 + FED |
| 7.4 Email Templates | 5 | 1.5 days | FSD2 + FED |

### Common Commands

```bash
# Install new packages
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
npm install resend @react-email/components
npm install react-hook-form zod

# Development
npm run dev
npm run lint

# Firebase
firebase deploy --only functions:processEmailQueue

# Test emails
npm run test:email

# Build email templates
npm run build:emails
```

---

## 🐛 Common Issues & Quick Fixes

### Drag & drop not working?
Make sure dnd-kit is properly initialized with DndContext wrapper.

### Emails not sending?
Check Resend API key in environment variables and verify domain.

### Notifications not real-time?
Verify Firestore real-time listener is properly subscribed.

---

## 📞 Getting Help

### Documentation
- [dnd-kit Docs](https://docs.dndkit.com/)
- [Resend Docs](https://resend.com/docs)
- [React Email Docs](https://react.email/docs)
- [React Hook Form](https://react-hook-form.com/)

### Internal
- **Technical Issues**: #dev-support Slack
- **Sprint Questions**: Scrum Master
- **Architecture**: Tech Lead

---

## 🎯 Sprint 7 Success Criteria

Sprint 7 is **SUCCESSFUL** when:

- ✅ Form builder fully functional
- ✅ School admin can create custom forms
- ✅ Email system sending emails
- ✅ All templates rendering correctly
- ✅ Notifications working real-time
- ✅ All 31 SP completed
- ✅ No critical bugs
- ✅ Demo ready

---

## 📈 Next Steps

After Sprint 7:

1. **Sprint 7 Demo** - Friday Week 14
2. **Sprint 7 Retrospective** - Friday Week 14
3. **Sprint 8 Planning** - Monday Week 15
4. **Sprint 8 Goal**: "Advanced verification & communication features"

---

**Sprint Status**: 🚀 Ready to Start  
**Version**: 1.0  
**Last Updated**: 2024

---

## 🚀 Ready to Code?

1. Read [README.md](README.md) untuk sprint overview
2. Follow [SETUP-GUIDE.md](SETUP-GUIDE.md) untuk implementation
3. Check [SUMMARY.md](SUMMARY.md) untuk quick reference

**Let's build amazing features! 🎉**
