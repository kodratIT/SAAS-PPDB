# Sprint 3: Quick Summary & Checklist

## 🎯 Sprint Goal
Implement multi-tenancy, school onboarding, and PPDB period management

---

## 📊 Sprint Metrics

| Metric | Value |
|--------|-------|
| **Duration** | 2 weeks |
| **Story Points** | 28 SP |
| **Team Size** | 4-5 developers |
| **Stories** | 5 |
| **Tasks** | 18 tasks |

---

## 📚 Stories Overview

| # | Story | SP | Owner | Status |
|---|-------|----|----|--------|
| 3.1 | School Onboarding | 8 | TL + FSD1 + FED | [ ] |
| 3.2 | Multi-Tenancy | 6 | TL + FSD2 | [ ] |
| 3.3 | PPDB Period Mgmt | 7 | FSD1 + FSD2 | [ ] |
| 3.4 | Form Builder | 5 | FSD1 + FED | [ ] |
| 3.5 | School Dashboard | 2 | FED | [ ] |

---

## ✅ Master Checklist

### Story 3.1: School Onboarding (Day 1-4)
- [ ] Task 3.1.1: Onboarding wizard structure (FED, 3h)
- [ ] Task 3.1.2: Step 1 - Basic info form (FSD1, 2h)
- [ ] Task 3.1.3: Step 2 - Address form (FSD1, 2h)
- [ ] Task 3.1.4: Step 3 - Logo upload (FSD1, 3h)
- [ ] Task 3.1.5: Step 4 - Subscription selection (FSD1, 2h)
- [ ] Task 3.1.6: Step 5 - Admin account (FSD1, 2h)
- [ ] Task 3.1.7: Complete onboarding API (FSD2, 3h)

**Verification**:
```bash
# Test onboarding flow
open http://localhost:3000/school/register
# Complete all 5 steps
# Verify school created in Firestore
# Check subscription assigned
# Verify admin account created
```

---

### Story 3.2: Multi-Tenancy System (Day 5-7)
- [ ] Task 3.2.1: Tenant isolation design (TL, 3h)
- [ ] Task 3.2.2: Update Firestore rules (TL, 2h)
- [ ] Task 3.2.3: School context provider (FSD2, 2h)
- [ ] Task 3.2.4: Tenant-scoped queries (FSD2, 3h)
- [ ] Task 3.2.5: Subdomain routing (DEV, 2h) - Optional

**Verification**:
```bash
# Create 2 schools
# Login as each school admin
# Verify can only see own data
# Try to access other school's data - should fail
```

---

### Story 3.3: PPDB Period Management (Day 7-9)
- [ ] Task 3.3.1: Period schema & types (TL, 2h)
- [ ] Task 3.3.2: Period CRUD API (FSD2, 3h)
- [ ] Task 3.3.3: Create period form (FSD1, 3h)
- [ ] Task 3.3.4: Timeline configuration (FSD1, 2h)
- [ ] Task 3.3.5: Quota management (FSD1, 2h)
- [ ] Task 3.3.6: Period list & status (FSD1, 2h)

**Verification**:
```bash
# Create PPDB period
# Set timeline dates
# Configure quotas
# Activate period
# Check status changes
```

---

### Story 3.4: Form Builder (Day 9-10)
- [ ] Task 3.4.1: Form builder structure (TL, 2h)
- [ ] Task 3.4.2: Field type components (FSD1, 3h)
- [ ] Task 3.4.3: Drag-and-drop (FED, 3h)
- [ ] Task 3.4.4: Form preview (FSD1, 2h)
- [ ] Task 3.4.5: Save form config (FSD2, 2h)

**Verification**:
```bash
# Open form builder
# Add fields (text, select, file)
# Drag to reorder
# Preview form
# Save configuration
```

---

### Story 3.5: School Dashboard (Day 10)
- [ ] Task 3.5.1: Dashboard layout (FED, 1h)
- [ ] Task 3.5.2: Statistics widgets (FED, 1h)
- [ ] Task 3.5.3: Recent activities (FED, 1h)

**Verification**:
```bash
open http://localhost:3000/school-admin/dashboard
# View statistics
# Check recent applications
```

---

## ⚡ Quick Commands

### Development
```bash
# Start dev server
npm run dev

# School onboarding
open http://localhost:3000/school/register

# School admin dashboard
open http://localhost:3000/school-admin/dashboard

# PPDB periods
open http://localhost:3000/school-admin/periods

# Form builder
open http://localhost:3000/school-admin/forms
```

### Testing Multi-Tenancy
```bash
# Create 2 schools
# School A: SMAN 1 Jakarta (schoolId: school-a)
# School B: SMPN 2 Bandung (schoolId: school-b)

# Login as School A admin
# Create PPDB period for School A
# Verify only School A can see it

# Login as School B admin
# Verify School B cannot see School A's period
# Try to fetch School A data - should be empty
```

### Firebase
```bash
# Check Firestore data
# Collection: tenants
# Collection: ppdb_periods (check schoolId field)
# Collection: form_configs (check schoolId field)

# Firebase Storage structure
# /schools/{schoolId}/logo.jpg
# /schools/{schoolId}/banner.jpg
```

### Git
```bash
# Create feature branch
git checkout -b feature/story-3.1-school-onboarding

# Commit
git add .
git commit -m "feat: implement school onboarding wizard"

# Push
git push origin feature/story-3.1-school-onboarding
```

---

## 📁 Key Files Created

### Sprint 3 Files

#### Onboarding (Story 3.1)
- `src/contexts/OnboardingContext.tsx` - Wizard state management
- `src/app/school/register/page.tsx` - Main onboarding page
- `src/app/school/register/layout.tsx` - Onboarding layout
- `src/components/onboarding/Stepper.tsx` - Progress stepper
- `src/components/onboarding/Step1BasicInfo.tsx` - School info form
- `src/components/onboarding/Step2Address.tsx` - Address form
- `src/components/onboarding/Step3Branding.tsx` - Logo upload
- `src/components/onboarding/Step4Subscription.tsx` - Plan selection
- `src/components/onboarding/Step5AdminAccount.tsx` - Admin creation
- `src/lib/utils/upload.ts` - File upload utilities
- `src/data/provinces.ts` - Indonesia province data
- `src/app/api/schools/register/route.ts` - Complete registration API

#### Multi-Tenancy (Story 3.2)
- `src/contexts/SchoolContext.tsx` - School tenant context
- `src/hooks/useSchool.ts` - School context hook
- `src/middleware.ts` - Updated with tenant checks
- `src/lib/firebase/tenant.ts` - Tenant-scoped queries
- Updated Firestore rules with schoolId checks

#### PPDB Periods (Story 3.3)
- `src/app/(school-admin)/periods/page.tsx` - Period list
- `src/app/(school-admin)/periods/create/page.tsx` - Create period
- `src/app/(school-admin)/periods/[id]/page.tsx` - Period details
- `src/components/periods/PeriodForm.tsx` - Period creation form
- `src/components/periods/TimelineConfig.tsx` - Timeline editor
- `src/components/periods/QuotaConfig.tsx` - Quota management
- `src/app/api/periods/route.ts` - Period CRUD API
- `src/types/period.ts` - Period type definitions

#### Form Builder (Story 3.4)
- `src/app/(school-admin)/forms/page.tsx` - Form list
- `src/app/(school-admin)/forms/builder/page.tsx` - Form builder
- `src/components/form-builder/FormBuilder.tsx` - Main builder
- `src/components/form-builder/FieldTypes.tsx` - Field components
- `src/components/form-builder/FormPreview.tsx` - Preview component
- `src/app/api/forms/route.ts` - Form config API
- `src/types/form.ts` - Form type definitions

#### School Dashboard (Story 3.5)
- `src/app/(school-admin)/dashboard/page.tsx` - Dashboard
- `src/components/school-dashboard/StatsCard.tsx` - Stats widget
- `src/components/school-dashboard/RecentApplicants.tsx` - Applicants
- `src/components/school-dashboard/PeriodStatus.tsx` - Period status

---

## 🎨 Tech Stack (Sprint 3 Additions)

| Category | Technology |
|----------|-----------|
| **Multi-Step Form** | React Hook Form + Context |
| **File Upload** | Firebase Storage |
| **Image Compression** | Canvas API |
| **Drag & Drop** | @dnd-kit/core |
| **Province Data** | react-select |
| **Date Picker** | shadcn/ui calendar |
| **Rich Text** | React Quill (optional) |

---

## 🔍 Verification Checklist

### Onboarding Complete
- [ ] All 5 steps work
- [ ] Form validation works
- [ ] File upload succeeds
- [ ] School created in Firestore
- [ ] Subscription assigned
- [ ] Admin account created
- [ ] Welcome email sent
- [ ] Can login as school admin

### Multi-Tenancy Working
- [ ] Each school has unique schoolId
- [ ] All queries filter by schoolId
- [ ] Firestore rules enforce isolation
- [ ] School A cannot see School B data
- [ ] File uploads isolated per school
- [ ] School context always set
- [ ] No cross-tenant leaks

### PPDB Periods
- [ ] Can create period
- [ ] Timeline dates validated
- [ ] Quotas sum correctly
- [ ] Period status updates
- [ ] Can edit period (when draft)
- [ ] Cannot edit active period dates
- [ ] Period list shows school's periods only

### Form Builder
- [ ] Can add field types
- [ ] Drag to reorder works
- [ ] Field validation configured
- [ ] Preview renders correctly
- [ ] Form config saved
- [ ] Can edit saved forms

### School Dashboard
- [ ] Statistics display correctly
- [ ] Recent applicants shown
- [ ] Period status visible
- [ ] Quick actions work

---

## 🐛 Common Issues

### Issue: "schoolId undefined in queries"
```bash
# Solution
# Check SchoolContext is wrapping the component
# Verify user has schoolId in Firestore
# Check useSchool() hook is called
```

### Issue: "File upload permission denied"
```bash
# Solution
# Update Firebase Storage rules:
# allow write: if request.auth != null && 
#               request.resource.size < 2 * 1024 * 1024
```

### Issue: "Province dropdown not working"
```bash
# Solution
# Install react-select: npm install react-select
# Check provinces.ts has correct data
```

### Issue: "Drag and drop not working"
```bash
# Solution
# Install @dnd-kit: npm install @dnd-kit/core @dnd-kit/sortable
# Check DndContext wraps draggable items
```

### Issue: "Period dates validation fails"
```bash
# Solution
# Use date-fns for date comparison
# npm install date-fns
# Validate: registrationEnd > registrationStart
```

### Issue: "Multi-tenancy leak"
```bash
# Solution
# Add .where('schoolId', '==', schoolId) to ALL queries
# Update Firestore rules
# Test with 2 different school accounts
```

---

## 📞 Quick Links

### Documentation
- [Firebase Storage Docs](https://firebase.google.com/docs/storage)
- [React Hook Form](https://react-hook-form.com/)
- [dnd-kit](https://dndkit.com/)
- [react-select](https://react-select.com/)

### Internal
- [INDEX.md](INDEX.md) - Navigation
- [README.md](README.md) - Overview
- [SETUP-GUIDE.md](SETUP-GUIDE.md) - Detailed steps
- [diagrams/](./diagrams/) - Architecture diagrams

### Support
- #dev-tenancy - Multi-tenancy questions
- #dev-frontend - UI/form builder
- Tech Lead - Architecture decisions

---

## 📈 Progress Tracking

### Daily Progress Template

**Day [X] - [Date]**

**Completed**:
- [x] Story 3.X - Task 3.X.X

**In Progress**:
- [ ] Story 3.X - Task 3.X.X

**Blocked**:
- [ ] Issue: [Description]

**Tomorrow**:
- [ ] Story 3.X - Task 3.X.X

---

## 🎯 Success Criteria

Sprint 3 is **DONE** when:

✅ All stories completed (28 SP)  
✅ Schools can self-register  
✅ Multi-tenancy prevents data leaks  
✅ PPDB periods configurable  
✅ Form builder functional  
✅ School dashboard shows data  
✅ 0 critical bugs  
✅ Multi-tenancy tested & verified  
✅ Demo successful

---

## 🔒 Multi-Tenancy Test Scenarios

### Scenario 1: Data Isolation
1. Create School A
2. Create PPDB Period for School A
3. Create School B
4. Login as School B admin
5. Query periods
6. **Expected**: Only School B's periods visible (empty initially)
7. **Fail if**: School A's periods appear

### Scenario 2: API Security
1. Login as School A admin
2. Get School A's period ID
3. Try to update using School B's session
4. **Expected**: 403 Forbidden or 404 Not Found
5. **Fail if**: Update succeeds

### Scenario 3: File Upload Isolation
1. School A uploads logo
2. Check storage path: `/schools/school-a-id/logo.jpg`
3. School B uploads logo
4. Check storage path: `/schools/school-b-id/logo.jpg`
5. **Expected**: Separate folders
6. **Fail if**: Files in same folder

### Scenario 4: Context Switching Prevention
1. Login as School A admin
2. Try to manually change schoolId in context
3. **Expected**: Middleware rejects or resets
4. **Fail if**: Can access other school's data

### Scenario 5: Query Leak Check
1. Create 10 schools
2. Create period for each
3. Login as School 5
4. Query all collections
5. **Expected**: Only School 5 data
6. **Fail if**: Any other school's data appears

---

## 📊 Sprint Velocity

**Planned**: 28 SP  
**Completed**: ___ SP  
**Velocity**: ___% 

---

**Last Updated**: [Date]  
**Sprint Status**: 🚀 In Progress

---

## 🚀 Next Actions

After Sprint 3:
1. Sprint Demo (Friday, Week 2)
2. Sprint Retrospective
3. Sprint 4 Planning (Student Registration)
4. Start Sprint 4: Student-facing features

---

## 🧪 Manual Testing Checklist

### Onboarding Flow
- [ ] Visit `/school/register`
- [ ] Complete Step 1 with valid data
- [ ] Complete Step 2 with address
- [ ] Upload logo (optional)
- [ ] Select subscription plan
- [ ] Create admin account
- [ ] Verify email sent
- [ ] Login with admin account
- [ ] Check school data in Firestore

### Multi-Tenancy
- [ ] Create School A
- [ ] Create period for School A
- [ ] Logout
- [ ] Create School B
- [ ] Login as School B
- [ ] Verify cannot see School A's period
- [ ] Try direct API call to School A period - should fail

### PPDB Period
- [ ] Login as school admin
- [ ] Go to `/school-admin/periods`
- [ ] Click "Create Period"
- [ ] Fill all fields
- [ ] Set timeline dates (validate order)
- [ ] Configure quotas (validate sum)
- [ ] Save period
- [ ] Verify period in list
- [ ] Activate period
- [ ] Try to edit (should be restricted)

### Form Builder
- [ ] Go to `/school-admin/forms`
- [ ] Click "Create Form"
- [ ] Add text field
- [ ] Add select field with options
- [ ] Add file upload field
- [ ] Drag fields to reorder
- [ ] Click "Preview"
- [ ] Verify preview matches builder
- [ ] Save form
- [ ] Edit form - fields persist

---

**Need Help?** Check [SETUP-GUIDE.md](SETUP-GUIDE.md) or ask in #dev-tenancy
