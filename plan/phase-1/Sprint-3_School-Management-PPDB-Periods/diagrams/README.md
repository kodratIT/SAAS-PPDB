# Sprint 3 Diagrams - School Management & PPDB Periods

## 📐 Overview

Dokumentasi ini berisi diagram PlantUML untuk Sprint 3: School Management & PPDB Periods.

Total: **4 diagram files** yang menjelaskan multi-tenancy, onboarding flow, form builder, dan period configuration.

---

## 📚 Diagram List

### 1. Multi-Tenancy Architecture
**File**: [01-multi-tenancy.puml](01-multi-tenancy.puml)

**Purpose**: Menunjukkan arsitektur multi-tenant dan data isolation strategy.

**Shows**:
- **4 diagrams in 1 file**:
  1. **Multi-Tenancy Architecture** (C4 Container): System-level tenant isolation
  2. **Tenant Isolation Flow** (Sequence): Data access control flow
  3. **Tenant Context Implementation** (Component): Code structure for tenancy
  4. **Multi-Tenant Database Schema** (ER Diagram): Database design dengan schoolId

**Key Concepts**:
- Every document has `schoolId` field
- Firestore rules enforce tenant isolation
- School Context provides current tenant
- Middleware validates tenant access
- Queries automatically scoped to schoolId

**Critical Security**:
- Double protection: App logic + Firestore rules
- No cross-tenant data access
- File uploads isolated per school
- API validates schoolId on every request

**Best for**: Tech Lead, Backend Developers, DevOps

---

### 2. School Onboarding Flow
**File**: [02-school-onboarding.puml](02-school-onboarding.puml)

**Purpose**: Complete school registration process dari start hingga dashboard access.

**Shows**:
- **3 diagrams in 1 file**:
  1. **School Onboarding Flow** (Sequence): Complete registration sequence dengan semua 5 steps
  2. **Onboarding Wizard Structure** (Component): UI component architecture
  3. **Onboarding Success Paths** (State): User journey dan success scenarios

**5 Steps Covered**:
1. **Step 1**: Basic school information (name, NPSN, type, email, phone)
2. **Step 2**: Address & contact (province, city, postal code, WhatsApp)
3. **Step 3**: Logo & banner upload (optional, compressed)
4. **Step 4**: Subscription plan selection (trial, paid plans)
5. **Step 5**: Admin account creation (name, email, password)

**Transaction Flow**:
- Atomic operation - all or nothing
- Create tenant → Upload files → Create admin → Assign subscription → Send email
- Rollback on any failure

**Best for**: Frontend Developers, Full Stack Developers, Product Owners

---

### 3. Form Builder Components
**File**: [03-form-builder.puml](03-form-builder.puml)

**Purpose**: Custom form builder untuk membuat formulir PPDB yang flexible.

**Shows**:
- **4 diagrams in 1 file**:
  1. **Form Builder Component Structure** (C4): Complete component tree
  2. **Form Builder Interaction Flow** (Sequence): User interaction dengan builder
  3. **Form Builder Field Types** (Class): Field type hierarchy & properties
  4. **Form Rendering Flow** (Sequence): How forms render untuk students

**Features**:
- **9 field types**: Text, Textarea, Number, Select, Radio, Checkbox, Date, File, Address
- **Drag & drop**: Reorder fields dengan dnd-kit
- **Live preview**: Real-time preview of form
- **Validation rules**: Min/max length, pattern, custom validators
- **Conditional logic**: Show/hide fields based on other field values
- **Sections**: Group fields into sections

**Form Builder UI**:
- Left: Field palette (available field types)
- Center: Canvas (drag & drop area)
- Right: Properties panel (edit field properties)
- Bottom: Preview panel (live form preview)

**Best for**: Frontend Developers, UX Designers

---

### 4. PPDB Period Configuration
**File**: [04-ppdb-period-config.puml](04-ppdb-period-config.puml)

**Purpose**: Konfigurasi PPDB period dengan timeline, quota, jalur, dan fees.

**Shows**:
- **5 diagrams in 1 file**:
  1. **PPDB Period Configuration** (C4): Component structure
  2. **Period Creation Flow** (Sequence): Step-by-step creation process
  3. **Period Status Management** (State): Lifecycle dari Draft → Active → Closed → Archived
  4. **Period Timeline Validation** (Activity): Timeline date validation rules
  5. **Quota Distribution** (Package): Quota allocation per jalur

**5 Configuration Steps**:
1. **Basic Info**: Name, academic year, batch
2. **Timeline**: Registration dates, deadlines, announcement date
3. **Quota**: Total quota dan distribution per jalur
4. **Jalur**: Configure jalur pendaftaran (Prestasi, Zonasi, Umum, Afirmasi)
5. **Fees**: Registration & reregistration fees

**Timeline Dates** (10 dates):
- Registration start/end
- Edit deadline
- Document deadline
- Verification start/end
- Test date (optional)
- Announcement date
- Reregistration start/end

**Quota Management**:
- Total quota must equal sum of all jalur quotas
- Example: 360 total = Prestasi 36 (10%) + Zonasi 216 (60%) + Umum 90 (25%) + Afirmasi 18 (5%)
- Visual pie chart for distribution

**Status Lifecycle**:
- **Draft**: Can edit everything, not visible to students
- **Active**: Visible, accepting applications, limited editing
- **Closed**: No new applications, processing results
- **Archived**: Read-only, historical data

**Best for**: School Admins, Product Owners, Backend Developers

---

## 🎨 How to View Diagrams

### Option 1: Online PlantUML Server (Easiest)

1. Go to [PlantUML Online Server](https://www.plantuml.com/plantuml/uml/)
2. Copy paste content dari file `.puml`
3. Klik "Submit" untuk generate diagram

### Option 2: VS Code Extension (Recommended)

1. Install extension: **PlantUML** by jebbs
2. Open `.puml` file
3. Press `Alt + D` (Windows/Linux) or `Option + D` (Mac)
4. Preview akan muncul di side panel

**Prerequisites**: Java Runtime atau Graphviz

### Option 3: Generate PNG/SVG Locally

```bash
# Install PlantUML
brew install plantuml  # macOS
# atau download dari https://plantuml.com/download

cd diagrams/

# Generate PNG
plantuml 01-multi-tenancy.puml
plantuml 02-school-onboarding.puml
plantuml 03-form-builder.puml
plantuml 04-ppdb-period-config.puml

# Generate SVG (better quality)
plantuml -tsvg *.puml

# Generate all
plantuml *.puml
```

---

## 📖 Reading Order

### For New Team Members (Sprint 3)
1. **01-multi-tenancy.puml** - Understand data isolation FIRST (critical!)
2. **02-school-onboarding.puml** - See how schools register
3. **04-ppdb-period-config.puml** - Understand PPDB configuration
4. **03-form-builder.puml** - Learn form builder (complex feature)

### For Implementing Multi-Tenancy
1. **01-multi-tenancy.puml** ⭐ **START HERE** - Study all 4 sub-diagrams
2. Reference SETUP-GUIDE.md Task 3.2.x
3. Implement SchoolContext
4. Update all queries with schoolId
5. Test with 2 different schools

### For Building Onboarding
1. **02-school-onboarding.puml** ⭐ **START HERE** - Follow 5-step flow
2. Reference SETUP-GUIDE.md Task 3.1.x
3. Implement OnboardingContext
4. Build each step component
5. Integrate with API

### For Form Builder
1. **03-form-builder.puml** ⭐ **START HERE** - See component structure
2. Study field types class diagram
3. Implement drag & drop
4. Build field palette
5. Add properties panel
6. Implement preview

### For PPDB Periods
1. **04-ppdb-period-config.puml** ⭐ **START HERE** - Understand configuration
2. Study timeline validation rules
3. Implement quota calculator
4. Build timeline editor
5. Test status transitions

---

## 🎯 Diagram Details

### 01-multi-tenancy.puml Highlights

**4 Comprehensive Diagrams**:
1. Architecture showing tenant isolation at system level
2. Sequence diagram with security enforcement
3. Implementation structure with code examples
4. Database schema with schoolId in every collection

**Critical Rules**:
- ALL queries MUST include `where('schoolId', '==', schoolId)`
- ALL Firestore rules MUST check schoolId
- ALL API routes MUST validate schoolId
- Storage structure: `/schools/{schoolId}/...`

**Testing Scenarios**:
- Create School A and School B
- Verify School A cannot access School B's data
- Try direct API calls - must fail
- Check Firestore rules enforcement

**Lines of Code**: ~300+ lines PlantUML

---

### 02-school-onboarding.puml Highlights

**Complete Onboarding Journey**:
- 5 steps with detailed form fields
- Image upload & compression
- Subscription selection
- Admin account creation
- Email verification

**Transaction Safety**:
- Atomic operation ensures consistency
- Rollback on any step failure
- Welcome email sent on success

**UI/UX Focus**:
- Progress stepper shows current step
- Can go back to previous steps
- Data persists in context
- Summary before submission

**Lines of Code**: ~280+ lines PlantUML

---

### 03-form-builder.puml Highlights

**Complex Feature**:
- 9 field types supported
- Drag & drop with dnd-kit
- Real-time preview
- Conditional logic

**Builder Interface**:
- 4-panel layout
- Field palette
- Canvas
- Properties
- Preview

**Form Configuration**:
- JSON-based storage
- Sections & fields hierarchy
- Validation rules
- Document requirements

**Rendering Engine**:
- Dynamic form generation
- Type-safe components
- Conditional field display
- Validation on submit

**Lines of Code**: ~320+ lines PlantUML

---

### 04-ppdb-period-config.puml Highlights

**Comprehensive Period Management**:
- 5-step configuration wizard
- 10 timeline dates with validation
- Quota distribution with calculator
- 4 status lifecycle states

**Timeline Validation**:
- Complex date ordering rules
- Business logic enforcement
- Auto-close on registration_end
- Manual extend (1x max)

**Quota System**:
- Visual pie chart
- Must sum to total
- Per-jalur allocation
- Can increase (not decrease) when active

**Status Management**:
- Draft → Active → Closed → Archived
- Different permissions per status
- Auto-transitions on dates

**Lines of Code**: ~350+ lines PlantUML

---

## 🔄 Diagram Updates

Update diagrams when:
- Multi-tenancy rules change
- Onboarding steps modified
- Form field types added
- Period configuration changes

**Update Process**:
1. Edit `.puml` file
2. Regenerate PNG/SVG
3. Update this README if needed
4. Commit both `.puml` and images

---

## 📚 Additional Resources

### Multi-Tenancy
- [Multi-Tenancy Patterns](https://docs.microsoft.com/en-us/azure/architecture/patterns/multi-tenancy)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

### Form Builder
- [dnd-kit Documentation](https://dndkit.com/)
- [React Hook Form](https://react-hook-form.com/)

### PPDB Configuration
- [Business Logic Validation](https://martinfowler.com/bliki/DomainValidation.html)

---

## 🐛 Troubleshooting

### Diagram tidak muncul di VS Code
```bash
# Install Java
brew install openjdk

# Restart VS Code
```

### PlantUML syntax error in multi-tenancy
```
Cek:
1. Matching state diagram brackets
2. Component relationships syntax
3. Note positioning
```

### Image quality rendah
```bash
# Use SVG instead
plantuml -tsvg file.puml

# Or increase DPI
plantuml -DPLANTUML_LIMIT_SIZE=8192 file.puml
```

---

## 📊 Diagram Statistics

| Diagram | Sub-Diagrams | Elements | Flows | Complexity | Lines |
|---------|-------------|----------|-------|------------|-------|
| Multi-Tenancy | 4 | 30+ | 20+ | High | 300+ |
| School Onboarding | 3 | 25+ | 3 flows | Medium | 280+ |
| Form Builder | 4 | 35+ | 2 flows | High | 320+ |
| PPDB Period Config | 5 | 40+ | 1 flow | High | 350+ |

**Total**: ~1250+ lines of PlantUML code

---

## 🔍 Key Concepts Illustrated

### Multi-Tenancy
- ✅ Data isolation per school
- ✅ schoolId in every document
- ✅ Context-based scoping
- ✅ Firestore rules enforcement
- ✅ Storage folder isolation

### Onboarding
- ✅ Multi-step wizard pattern
- ✅ State management with context
- ✅ File upload & compression
- ✅ Transaction safety
- ✅ Email verification

### Form Builder
- ✅ Component composition
- ✅ Drag & drop interaction
- ✅ Real-time preview
- ✅ Dynamic validation
- ✅ Conditional rendering

### PPDB Periods
- ✅ Configuration wizard
- ✅ Timeline validation
- ✅ Quota calculator
- ✅ Status lifecycle
- ✅ Business rules

---

**Last Updated**: Sprint 3  
**Maintainer**: Tech Lead  
**Review Date**: End of Sprint 3

---

## 🚀 Quick Commands

```bash
# View all diagrams (VS Code)
code *.puml

# Generate all as PNG
plantuml *.puml

# Generate all as SVG
plantuml -tsvg *.puml

# Watch for changes
plantuml -watch *.puml
```

---

**Happy Diagramming! 📐✨**
