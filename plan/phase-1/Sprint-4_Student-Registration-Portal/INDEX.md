# Sprint 4: Student Registration Portal - Navigation Index

## 📚 Selamat Datang!

Ini adalah dokumentasi lengkap untuk **Sprint 4: Student Registration Portal** - PPDB SaaS System.

Sprint 4 fokus pada implementasi portal student-facing dengan dynamic form rendering, auto-save, dan dashboard untuk calon siswa.

---

## 🗂️ Struktur Dokumentasi

```
Sprint-4_Student-Registration-Portal/
├── INDEX.md                    📍 File ini - Panduan navigasi
├── README.md                   ⭐ START HERE - Overview & goals
├── SETUP-GUIDE.md              🔧 Step-by-step implementation
├── SUMMARY.md                  📊 Quick reference & checklist
└── diagrams/                   📐 Architecture Diagrams
    ├── 01-student-registration-flow.puml  Complete registration sequence
    ├── 02-dynamic-form-renderer.puml      Form rendering engine
    ├── 03-auto-save-mechanism.puml        Auto-save & draft system
    ├── 04-student-dashboard.puml          Dashboard components
    └── README.md                          Diagram documentation
```

---

## 🎯 Mulai Dari Mana?

### 👉 Saya Baru Join Sprint 4
**Start Here** → [README.md](README.md)
1. Baca sprint goals & objectives
2. Check prerequisites (Sprint 3 complete)
3. Lihat team structure & assignments
4. Understand student user journey

**Then** → [SUMMARY.md](SUMMARY.md)
- Quick overview
- Key commands
- Success criteria

### 👉 Saya Mau Implement Tasks
**Follow This** → [SETUP-GUIDE.md](SETUP-GUIDE.md)

**Sprint 4 Stories:**
1. **Story 4.1**: School Landing Pages (5 SP)
   - Public school profile page
   - PPDB period information
   - Registration requirements
   - FAQ section
   
2. **Story 4.2**: Student Registration Flow (8 SP)
   - Multi-step registration wizard
   - Personal data form
   - Address with map picker
   - Parent/guardian information
   - Education history
   - Achievement records
   
3. **Story 4.3**: Dynamic Form Rendering (7 SP)
   - Render forms from configuration
   - Handle all field types
   - Conditional field display
   - Custom validation
   
4. **Story 4.4**: Form Auto-Save & Draft (4 SP)
   - Auto-save every 30 seconds
   - Draft status management
   - Resume incomplete applications
   
5. **Story 4.5**: Student Dashboard (3 SP)
   - Application status overview
   - Timeline tracker
   - Quick actions

### 👉 Saya Mau Lihat Architecture
**View Diagrams** → [diagrams/](./diagrams/)

**Recommended order:**
1. **[01-student-registration-flow.puml](diagrams/01-student-registration-flow.puml)** - Complete user journey
2. **[02-dynamic-form-renderer.puml](diagrams/02-dynamic-form-renderer.puml)** - Form rendering engine
3. **[03-auto-save-mechanism.puml](diagrams/03-auto-save-mechanism.puml)** - Auto-save system
4. **[04-student-dashboard.puml](diagrams/04-student-dashboard.puml)** - Dashboard UI

**Cara view diagrams:**
- Online: Copy paste ke https://www.plantuml.com/plantuml/uml/
- VS Code: Install "PlantUML" extension, lalu Alt+D

### 👉 Saya Mau Quick Reference
**Go To** → [SUMMARY.md](SUMMARY.md)
- Quick start commands
- Story checklist
- Testing tips

---

## 📖 Reading Guide by Role

### 🏗️ Tech Lead

**Your Focus**: Dynamic form rendering architecture, auto-save strategy

**Reading Order**:
1. [README.md](README.md) - Complete sprint overview
2. [diagrams/02-dynamic-form-renderer.puml](diagrams/02-dynamic-form-renderer.puml) - Critical architecture
3. [diagrams/03-auto-save-mechanism.puml](diagrams/03-auto-save-mechanism.puml) - Auto-save design
4. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Implementation details
5. [SUMMARY.md](SUMMARY.md) - Success criteria

**Your Tasks Sprint 4**:
- Design dynamic form renderer (Story 4.3)
- Design auto-save mechanism (Story 4.4)
- Review form validation strategy
- Code review all features

### 👨‍💻 Full Stack Developers

**Your Focus**: Feature implementation

**Reading Order**:
1. [README.md](README.md) - Sprint goals
2. [diagrams/01-student-registration-flow.puml](diagrams/01-student-registration-flow.puml) - User flow
3. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Find your assigned tasks
4. [SUMMARY.md](SUMMARY.md) - Quick commands

**Your Tasks Sprint 4**:
- FSD1: Landing pages, registration forms, dashboard
- FSD2: Dynamic form renderer, auto-save, API routes
- Test complete registration flow

### 🎨 Frontend Developer

**Your Focus**: Student-facing UI/UX

**Reading Order**:
1. [README.md](README.md) - UI requirements
2. [diagrams/04-student-dashboard.puml](diagrams/04-student-dashboard.puml) - Dashboard design
3. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Story 4.1, 4.5
4. [SUMMARY.md](SUMMARY.md) - Component checklist

**Your Tasks Sprint 4**:
- School landing page design
- Registration wizard UI
- Student dashboard
- Timeline tracker component
- Responsive design for mobile

### 🧪 QA Engineer

**Your Focus**: End-to-end testing, form validation

**Reading Order**:
1. [README.md](README.md) - Testing strategy
2. [diagrams/](./diagrams/) - All flows to test
3. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Features to test
4. [SUMMARY.md](SUMMARY.md) - Test checklist

**Your Tasks Sprint 4**:
- Test complete registration flow
- Test all field types rendering
- Test auto-save functionality
- Test draft recovery
- Test conditional fields
- Cross-browser testing
- Mobile responsiveness testing

### 📊 Product Owner / Scrum Master

**Your Focus**: User experience, progress tracking

**Reading Order**:
1. [SUMMARY.md](SUMMARY.md) - Sprint overview
2. [README.md](README.md) - Story points & timeline
3. [diagrams/01-student-registration-flow.puml](diagrams/01-student-registration-flow.puml) - User journey
4. [SETUP-GUIDE.md](SETUP-GUIDE.md) - Task breakdown

**Your Monitoring**:
- Track story completion (27 SP)
- Ensure user experience is smooth
- Monitor form completion rate
- Prepare demo scenarios

---

## ✅ Sprint 4 Daily Checklist

### Week 1 - Day 1-2 (Story 4.1: School Landing Pages)
- [ ] Public school profile page
- [ ] PPDB period information display
- [ ] Registration requirements section
- [ ] FAQ section
- [ ] Contact information
- [ ] Registration CTA button

### Week 1 - Day 3-5 (Story 4.2: Student Registration - Part 1)
- [ ] Registration wizard structure
- [ ] Step 1: Personal data form
- [ ] Step 2: Address with map picker
- [ ] Step 3: Parent/guardian info
- [ ] Form validation working
- [ ] Navigation between steps

### Week 2 - Day 1-2 (Story 4.2 & 4.3: Registration + Dynamic Forms)
- [ ] Step 4: Education history
- [ ] Step 5: Achievements
- [ ] Dynamic form renderer implemented
- [ ] All field types render correctly
- [ ] Conditional fields working

### Week 2 - Day 3-4 (Story 4.4: Auto-Save)
- [ ] Auto-save every 30 seconds
- [ ] Draft saved to Firestore
- [ ] Resume from draft working
- [ ] Draft cleanup on submit
- [ ] Connection loss handling

### Week 2 - Day 5 (Story 4.5 & Sprint Review)
- [ ] Student dashboard complete
- [ ] Application status display
- [ ] Timeline tracker
- [ ] Quick actions
- [ ] All stories tested & verified
- [ ] Sprint demo prepared
- [ ] Sprint retrospective completed

---

## 📋 Key Information At A Glance

### Sprint 4 Overview

| Metric | Value |
|--------|-------|
| **Duration** | 2 weeks |
| **Story Points** | 27 SP |
| **Team Size** | 4-5 developers |
| **Stories** | 5 stories |
| **Goal** | Student-facing registration portal |

### Tech Stack Additions (Sprint 4)

| Category | Technology |
|----------|-----------|
| **Map Integration** | Google Maps API / Leaflet |
| **Auto-Save** | debounce (lodash) |
| **State Persistence** | localStorage / IndexedDB |
| **Form Rendering** | Dynamic component rendering |
| **Timeline** | Custom timeline component |

### Story Breakdown

| Story | SP | Duration | Assigned To |
|-------|----|---------|-----------| 
| 4.1 School Landing Pages | 5 | 1.5 days | FED + FSD1 |
| 4.2 Student Registration | 8 | 2 days | FSD1 + FSD2 |
| 4.3 Dynamic Form Rendering | 7 | 2 days | TL + FSD1 |
| 4.4 Auto-Save & Draft | 4 | 1 day | FSD2 |
| 4.5 Student Dashboard | 3 | 1 day | FED |

### Common Commands

```bash
# Start dev server
npm run dev

# School landing page
open http://localhost:3000/schools/sman1-jakarta

# Student registration
open http://localhost:3000/register/period-id

# Student dashboard
open http://localhost:3000/student/dashboard

# Test auto-save
# Fill form, wait 30s, check Firestore drafts collection
```

---

## 🐛 Common Issues & Quick Fixes

### Issue: Form not rendering
```bash
# Check form config exists in Firestore
# Verify periodId is correct
# Check form_configs collection
```

### Issue: Auto-save not working
```bash
# Check debounce is working
# Verify Firestore rules allow draft writes
# Check browser console for errors
```

### Issue: Map picker not loading
```bash
# Verify Google Maps API key
# Check API key has Maps JavaScript API enabled
# Check network tab for API calls
```

### Issue: Conditional fields not showing
```bash
# Check condition logic in form config
# Verify field values are correct type
# Test condition evaluation function
```

**For more**: See [SETUP-GUIDE.md](SETUP-GUIDE.md#troubleshooting)

---

## 📞 Getting Help

### Internal
- **Form Rendering Questions**: Tech Lead
- **UI/UX Issues**: #dev-frontend Slack
- **Sprint Questions**: Scrum Master

### External
- **React Hook Form**: https://react-hook-form.com/
- **Google Maps API**: https://developers.google.com/maps
- **Auto-Save Patterns**: https://web.dev/patterns/

---

## 🎯 Sprint 4 Success Criteria

Sprint 4 is **SUCCESSFUL** when:

- ✅ Students can view school landing page
- ✅ Students can register completely
- ✅ All form fields render correctly
- ✅ Conditional fields work
- ✅ Auto-save prevents data loss
- ✅ Can resume from draft
- ✅ Dashboard shows application status
- ✅ All 27 SP completed
- ✅ 0 critical bugs
- ✅ Mobile responsive

---

## 🎨 User Experience Checklist

Before completing Sprint 4, verify:

- [ ] Landing page is attractive
- [ ] Registration CTA is prominent
- [ ] Form is intuitive to fill
- [ ] Validation messages are helpful
- [ ] Progress indicator shows steps
- [ ] Auto-save gives feedback
- [ ] Can go back to edit
- [ ] Submit confirmation clear
- [ ] Dashboard is informative
- [ ] Timeline is easy to understand
- [ ] Mobile experience smooth
- [ ] Loading states shown
- [ ] Error states handled gracefully

---

## 📈 Next Steps

After Sprint 4:

1. **Sprint 4 Demo** - Friday Week 2
2. **Sprint 4 Retrospective** - Friday Week 2
3. **Sprint 5 Planning** - Monday Week 9
4. **Sprint 5 Goal**: "Document Upload & Payment Integration"

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

**Let's build an amazing student experience! 🎓**
