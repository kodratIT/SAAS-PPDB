# Sprint 4 Diagrams - Student Registration Portal

## 📐 Overview

Dokumentasi ini berisi diagram PlantUML untuk Sprint 4: Student Registration Portal.

Total: **4 diagram files** yang menjelaskan student registration flow, dynamic form rendering, auto-save mechanism, dan student dashboard.

---

## 📚 Diagram List

### 1. Student Registration Flow
**File**: [01-student-registration-flow.puml](01-student-registration-flow.puml)

**Purpose**: Complete user journey dari landing page hingga application submitted.

**Shows**:
- Landing page interaction
- Registration wizard (5 steps)
- Form validation
- Review & submit
- Confirmation & email

**Best for**: Product Owners, Full Stack Developers, QA

---

### 2. Dynamic Form Renderer
**File**: [02-dynamic-form-renderer.puml](02-dynamic-form-renderer.puml)

**Purpose**: Architecture for rendering forms from configuration.

**Shows**:
- Form config structure
- Field type rendering
- Conditional logic evaluation
- Validation system
- Component hierarchy

**Best for**: Tech Lead, Frontend Developers

---

### 3. Auto-Save Mechanism
**File**: [03-auto-save-mechanism.puml](03-auto-save-mechanism.puml)

**Purpose**: Auto-save strategy and draft management.

**Shows**:
- Auto-save trigger (every 30s)
- Draft storage (IndexedDB + Firestore)
- Resume from draft
- Conflict resolution
- Cleanup on submit

**Best for**: Tech Lead, Full Stack Developers

---

### 4. Student Dashboard
**File**: [04-student-dashboard.puml](04-student-dashboard.puml)

**Purpose**: Student dashboard components and interactions.

**Shows**:
- Dashboard layout
- Application status display
- Timeline tracker
- Quick actions
- Document checklist

**Best for**: Frontend Developers, UX Designers

---

## 🎨 How to View Diagrams

### Online PlantUML Server
1. Go to https://www.plantuml.com/plantuml/uml/
2. Copy paste content dari file `.puml`
3. Klik "Submit"

### VS Code
1. Install "PlantUML" extension
2. Open `.puml` file
3. Press `Alt + D`

### Generate PNG/SVG
```bash
cd diagrams/
plantuml *.puml              # PNG
plantuml -tsvg *.puml        # SVG
```

---

## 📖 Reading Order

### For Implementation
1. **02-dynamic-form-renderer.puml** ⭐ START - Architecture critical
2. **01-student-registration-flow.puml** - Complete flow
3. **03-auto-save-mechanism.puml** - Save strategy
4. **04-student-dashboard.puml** - UI components

### For Testing
1. **01-student-registration-flow.puml** - Flow to test
2. **04-student-dashboard.puml** - Dashboard features
3. **03-auto-save-mechanism.puml** - Auto-save scenarios

---

## 🎯 Key Concepts

### Dynamic Form Rendering
- Config-driven form generation
- 9 field types supported
- Conditional field display
- Dynamic validation
- Type-safe rendering

### Auto-Save Strategy
- Debounced saves (30s)
- Dual storage (IndexedDB + Firestore)
- Offline capability
- Resume on return
- Conflict handling

### Student Experience
- 5-step registration wizard
- Progress indication
- Real-time validation
- Auto-save feedback
- Clear status display

---

**Last Updated**: Sprint 4  
**Maintainer**: Tech Lead
