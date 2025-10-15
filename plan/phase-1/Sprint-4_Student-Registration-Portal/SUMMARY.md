# Sprint 4: Quick Summary & Checklist

## 🎯 Sprint Goal
Build student-facing registration portal with dynamic forms and auto-save

---

## 📊 Sprint Metrics

| Metric | Value |
|--------|-------|
| **Duration** | 2 weeks |
| **Story Points** | 27 SP |
| **Team Size** | 4-5 developers |
| **Stories** | 5 |
| **Tasks** | 15 tasks |

---

## 📚 Stories Overview

| # | Story | SP | Owner | Status |
|---|-------|----|----|--------|
| 4.1 | School Landing Pages | 5 | FED + FSD1 | [ ] |
| 4.2 | Student Registration | 8 | FSD1 + FSD2 | [ ] |
| 4.3 | Dynamic Form Rendering | 7 | TL + FSD1 | [ ] |
| 4.4 | Auto-Save & Draft | 4 | FSD2 | [ ] |
| 4.5 | Student Dashboard | 3 | FED | [ ] |

---

## ✅ Master Checklist

### Story 4.1: School Landing Pages (Day 1-2)
- [ ] Task 4.1.1: School profile page (FED, 3h)
- [ ] Task 4.1.2: PPDB info section (FSD1, 2h)
- [ ] Task 4.1.3: Requirements & FAQ (FED, 2h)
- [ ] Task 4.1.4: Registration CTA (FED, 1h)

**Verification**:
```bash
# Visit school landing page
open http://localhost:3000/schools/sman1-jakarta

# Check sections visible:
# - School profile
# - Active PPDB period
# - Registration requirements
# - FAQ
# - Register button
```

---

### Story 4.2: Student Registration (Day 3-5)
- [ ] Task 4.2.1: Registration wizard structure (FSD1, 3h)
- [ ] Task 4.2.2: Personal data form (FSD1, 2h)
- [ ] Task 4.2.3: Address with map (FSD2, 3h)
- [ ] Task 4.2.4: Parent info form (FSD1, 2h)
- [ ] Task 4.2.5: Education history (FSD1, 2h)
- [ ] Task 4.2.6: Achievements form (FSD1, 2h)

**Verification**:
```bash
# Complete registration flow
# 1. Fill personal data
# 2. Enter address (map shows location)
# 3. Fill parent info
# 4. Enter education history
# 5. Add achievements (optional)
# 6. Review and submit
# 7. Check application in Firestore
```

---

### Story 4.3: Dynamic Form Rendering (Day 6-7)
- [ ] Task 4.3.1: Form renderer engine (TL, 4h)
- [ ] Task 4.3.2: Field type renderers (FSD1, 3h)
- [ ] Task 4.3.3: Conditional logic (TL, 2h)
- [ ] Task 4.3.4: Custom validation (FSD1, 2h)

**Verification**:
```bash
# Test all field types:
# - Text, Textarea, Number ✓
# - Select, Radio, Checkbox ✓
# - Date, File, Address ✓

# Test conditional fields:
# - Set trigger field value
# - Verify conditional field appears/disappears
```

---

### Story 4.4: Auto-Save & Draft (Day 8)
- [ ] Task 4.4.1: Auto-save mechanism (FSD2, 2h)
- [ ] Task 4.4.2: Draft management (FSD2, 2h)
- [ ] Task 4.4.3: Resume functionality (FSD2, 2h)

**Verification**:
```bash
# Test auto-save:
# 1. Start filling form
# 2. Wait 30 seconds
# 3. Check Firestore drafts collection
# 4. Close browser
# 5. Reopen - should resume from draft

# Test submit clears draft:
# 1. Complete and submit application
# 2. Check draft is deleted
```

---

### Story 4.5: Student Dashboard (Day 9-10)
- [ ] Task 4.5.1: Dashboard layout (FED, 1h)
- [ ] Task 4.5.2: Status display (FED, 1h)
- [ ] Task 4.5.3: Timeline tracker (FED, 2h)
- [ ] Task 4.5.4: Quick actions (FED, 1h)

**Verification**:
```bash
open http://localhost:3000/student/dashboard

# Check displays:
# - Application status
# - Registration number
# - Payment status
# - Document checklist
# - Timeline
# - Quick action buttons
```

---

## ⚡ Quick Commands

### Development
```bash
# Start dev server
npm run dev

# School landing pages
open http://localhost:3000/schools/[school-slug]

# Student registration (need periodId)
open http://localhost:3000/register/[period-id]

# Student dashboard
open http://localhost:3000/student/dashboard
```

### Testing Dynamic Forms
```bash
# Create form config in Sprint 3 form builder
# Activate PPDB period
# Visit registration page
# Verify all fields render correctly

# Test field types:
# - Add text field - renders Input
# - Add select field - renders Select dropdown
# - Add file field - renders file upload
# - Add conditional field - shows/hides based on value
```

### Testing Auto-Save
```bash
# Open browser DevTools → Application → IndexedDB
# Fill form partially
# Wait 30 seconds
# Check IndexedDB has draft data
# Refresh page
# Verify form data restored
```

### Firebase
```bash
# Check collections:
# - applications (status: draft, submitted)
# - drafts (auto-saved data)

# Firestore queries:
# - Get student's applications: where('userId', '==', uid)
# - Get school's applications: where('schoolId', '==', schoolId)
```

---

## 📁 Key Files Created

### Sprint 4 Files

#### Landing Pages (Story 4.1)
- `src/app/schools/[slug]/page.tsx` - School profile page
- `src/components/landing/SchoolHeader.tsx` - School header
- `src/components/landing/PPDBInfo.tsx` - Period information
- `src/components/landing/Requirements.tsx` - Requirements section
- `src/components/landing/FAQ.tsx` - FAQ component
- `src/app/api/schools/[slug]/route.ts` - Get school data API

#### Student Registration (Story 4.2)
- `src/app/register/[periodId]/page.tsx` - Main registration page
- `src/contexts/RegistrationContext.tsx` - Registration state
- `src/components/registration/RegistrationWizard.tsx` - Wizard container
- `src/components/registration/PersonalDataStep.tsx` - Step 1
- `src/components/registration/AddressStep.tsx` - Step 2 with map
- `src/components/registration/ParentInfoStep.tsx` - Step 3
- `src/components/registration/EducationStep.tsx` - Step 4
- `src/components/registration/AchievementStep.tsx` - Step 5
- `src/components/registration/ReviewStep.tsx` - Final review
- `src/app/api/applications/route.ts` - Submit application API

#### Dynamic Form Rendering (Story 4.3)
- `src/components/form-renderer/FormRenderer.tsx` - Main renderer
- `src/components/form-renderer/FieldRenderer.tsx` - Render field by type
- `src/components/form-renderer/field-types/TextField.tsx` - Text field
- `src/components/form-renderer/field-types/SelectField.tsx` - Select
- `src/components/form-renderer/field-types/FileField.tsx` - File upload
- `src/components/form-renderer/field-types/AddressField.tsx` - Address
- `src/lib/form-renderer/conditionalLogic.ts` - Conditional evaluator
- `src/lib/form-renderer/validation.ts` - Dynamic validation

#### Auto-Save (Story 4.4)
- `src/hooks/useAutoSave.ts` - Auto-save hook
- `src/lib/utils/drafts.ts` - Draft management utilities
- `src/lib/utils/debounce.ts` - Debounce utility
- `src/app/api/drafts/route.ts` - Save/load draft API

#### Student Dashboard (Story 4.5)
- `src/app/(student)/dashboard/page.tsx` - Dashboard page
- `src/components/student/ApplicationCard.tsx` - Application display
- `src/components/student/TimelineTracker.tsx` - Timeline component
- `src/components/student/StatusBadge.tsx` - Status indicator
- `src/components/student/QuickActions.tsx` - Action buttons

---

## 🎨 Tech Stack (Sprint 4 Additions)

| Category | Technology |
|----------|-----------|
| **Map** | react-leaflet / @react-google-maps/api |
| **Geo Services** | Google Geocoding API |
| **Auto-Save** | useDebounce + IndexedDB |
| **Form State** | React Hook Form + Context |
| **File Preview** | react-dropzone |
| **Timeline** | Custom component with Tailwind |

---

## 🔍 Verification Checklist

### Landing Page Complete
- [ ] School profile displays correctly
- [ ] Active PPDB period shown
- [ ] Requirements list clear
- [ ] FAQ section helpful
- [ ] Register button visible and working
- [ ] Mobile responsive

### Registration Flow Complete
- [ ] All 5 steps working
- [ ] Form validation on each step
- [ ] Can navigate back/forward
- [ ] Progress indicator shows current step
- [ ] Review step shows all data
- [ ] Submit creates application
- [ ] Confirmation message shown
- [ ] Email notification sent

### Dynamic Forms Working
- [ ] All field types render
- [ ] Validation works per field
- [ ] Conditional fields appear/disappear
- [ ] Custom fields from form builder display
- [ ] Section grouping works
- [ ] Required fields enforced

### Auto-Save Functional
- [ ] Saves every 30 seconds
- [ ] Draft saves to Firestore/IndexedDB
- [ ] Resume from draft works
- [ ] Draft deleted on submit
- [ ] Works offline (IndexedDB)
- [ ] Shows "Saving..." indicator
- [ ] Shows "Saved" confirmation

### Dashboard Complete
- [ ] Shows application status
- [ ] Registration number displayed
- [ ] Timeline shows progress
- [ ] Payment status visible
- [ ] Document checklist available
- [ ] Quick actions work
- [ ] Can edit draft application
- [ ] Can view submitted application

---

## 🐛 Common Issues

### Issue: "Form config not found"
```bash
# Solution
# 1. Check periodId is valid
# 2. Verify form_configs exists for period
# 3. Check form is assigned to period
# 4. Use default form if custom not found
```

### Issue: "Map not loading"
```bash
# Solution
# 1. Check NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local
# 2. Enable Maps JavaScript API in Google Cloud Console
# 3. Enable Geocoding API
# 4. Check API key restrictions
```

### Issue: "Auto-save not triggering"
```bash
# Solution
# 1. Check useAutoSave hook is called
# 2. Verify debounce (30000ms) is set
# 3. Check Firestore rules allow drafts write
# 4. Check browser console for errors
# 5. Verify userId is set in auth context
```

### Issue: "Conditional field not working"
```bash
# Solution
# 1. Check condition in form config
# 2. Verify trigger field ID matches
# 3. Check operator (==, !=, >, <)
# 4. Verify value type matches (string, number)
# 5. Test evaluateCondition() function
```

### Issue: "Draft not resuming"
```bash
# Solution
# 1. Check draft exists in Firestore/IndexedDB
# 2. Verify userId matches
# 3. Check periodId matches
# 4. Verify form state is restored
# 5. Check resume logic in useEffect
```

### Issue: "File upload fails"
```bash
# Solution
# 1. Check file size < 5MB
# 2. Verify file type allowed
# 3. Check Firebase Storage rules
# 4. Verify storage path correct
# 5. Check network connectivity
```

---

## 📞 Quick Links

### Documentation
- [React Hook Form](https://react-hook-form.com/)
- [react-leaflet](https://react-leaflet.js.org/)
- [Google Maps API](https://developers.google.com/maps/documentation/javascript)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

### Internal
- [INDEX.md](INDEX.md) - Navigation
- [README.md](README.md) - Overview
- [SETUP-GUIDE.md](SETUP-GUIDE.md) - Detailed steps
- [diagrams/](./diagrams/) - Architecture diagrams

### Support
- #dev-frontend - UI/form questions
- #dev-student-portal - Student feature questions
- Tech Lead - Architecture decisions

---

## 📈 Progress Tracking

### Daily Progress Template

**Day [X] - [Date]**

**Completed**:
- [x] Story 4.X - Task 4.X.X

**In Progress**:
- [ ] Story 4.X - Task 4.X.X

**Blocked**:
- [ ] Issue: [Description]

**Tomorrow**:
- [ ] Story 4.X - Task 4.X.X

---

## 🎯 Success Criteria

Sprint 4 is **DONE** when:

✅ All stories completed (27 SP)  
✅ Students can register completely  
✅ Dynamic forms work for all field types  
✅ Auto-save prevents data loss  
✅ Dashboard shows status  
✅ Mobile responsive  
✅ 0 critical bugs  
✅ Demo successful

---

## 🧪 Testing Scenarios

### Scenario 1: Complete Registration
1. Visit school landing page
2. Click "Daftar Sekarang"
3. Fill personal data
4. Enter address (map shows marker)
5. Fill parent info
6. Add education history
7. Add achievements (optional)
8. Review all data
9. Submit application
10. **Expected**: Application created, confirmation shown, email sent

### Scenario 2: Auto-Save & Resume
1. Start registration
2. Fill personal data partially
3. Wait 30 seconds
4. Close browser WITHOUT submitting
5. Reopen registration page
6. **Expected**: Shows "Resume draft?" option
7. Click "Resume"
8. **Expected**: Form data restored, can continue

### Scenario 3: Conditional Fields
1. Open registration form with conditional fields
2. Select School Type: "SMA"
3. **Expected**: "Jurusan" field appears
4. Select School Type: "SMP"
5. **Expected**: "Jurusan" field disappears

### Scenario 4: Form Validation
1. Fill registration form
2. Leave required field empty
3. Try to proceed to next step
4. **Expected**: Error message shown, cannot proceed
5. Fill required field
6. **Expected**: Can proceed

### Scenario 5: Mobile Registration
1. Open on mobile device
2. Complete registration
3. **Expected**: 
   - Form is touch-friendly
   - Map works on mobile
   - File upload from camera works
   - Progress indicator visible
   - Submit button reachable

---

## 📊 Sprint Velocity

**Planned**: 27 SP  
**Completed**: ___ SP  
**Velocity**: ___% 

---

**Last Updated**: [Date]  
**Sprint Status**: 🚀 In Progress

---

## 🚀 Next Actions

After Sprint 4:
1. Sprint Demo (Friday, Week 2)
2. Sprint Retrospective
3. Sprint 5 Planning (Document Upload & Payment)
4. Start Sprint 5: File management & payment integration

---

**Need Help?** Check [SETUP-GUIDE.md](SETUP-GUIDE.md) or ask in #dev-student-portal
