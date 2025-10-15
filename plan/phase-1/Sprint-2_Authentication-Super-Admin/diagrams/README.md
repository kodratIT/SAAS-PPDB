# Sprint 2 Diagrams - Authentication & Super Admin

## 📐 Overview

Dokumentasi ini berisi diagram PlantUML untuk Sprint 2: Authentication & Super Admin Foundation.

Total: **3 diagram files** yang menjelaskan authentication flow, RBAC system, dan super admin components.

---

## 📚 Diagram List

### 1. Authentication Flow Diagram
**File**: [01-auth-flow.puml](01-auth-flow.puml)

**Purpose**: Sequence diagram yang menunjukkan semua authentication flows.

**Shows**:
- **Registration Flow**: User → Browser → Firebase Auth → Firestore
- **Login Flow (Email/Password)**: Full authentication sequence dengan session creation
- **Login Flow (Google OAuth)**: OAuth popup flow dengan Google Identity
- **Password Reset Flow**: Email-based password reset dengan oobCode
- **Email Verification Flow**: Email verification link handling
- **Logout Flow**: Sign out dan session cleanup
- **Session Verification**: Check session on page load
- **Protected Route Access**: Middleware authentication check

**Key Components**:
- User interactions
- Browser (React/Next.js)
- Next.js API Routes
- Firebase Authentication
- Firestore database
- Session management (JWT)

**Best for**: Developers implementing authentication, QA testing auth flows

---

### 2. RBAC System Diagram
**File**: [02-rbac-system.puml](02-rbac-system.puml)

**Purpose**: Component dan matrix diagram untuk Role-Based Access Control system.

**Shows**:
- **RBAC Components**:
  - Roles definition
  - Permissions mapping
  - RBAC middleware
  - Permission guards
  - Permission hooks
  
- **Permissions Matrix**:
  - 4 roles: Super Admin, School Admin, Panitia, Student
  - 40+ permissions mapped to roles
  - Permission categories: Schools, Users, Periods, Applications, Verification, Payments, Plans, Analytics
  
- **Implementation Structure**:
  - TypeScript classes and interfaces
  - Middleware implementation
  - React hooks for permissions
  - Component guards

**Key Features**:
- Complete permission list per role
- Visual matrix showing role-permission relationships
- Code structure for implementation

**Best for**: Tech Lead designing RBAC, Backend developers implementing permissions

---

### 3. Super Admin Components Diagram
**File**: [03-super-admin-components.puml](03-super-admin-components.puml)

**Purpose**: Component structure, layout design, dan user flow untuk Super Admin dashboard.

**Shows**:
- **Component Structure**:
  - Dashboard page components
  - School management components
  - Subscription plan components
  - User management components
  - Analytics components
  - Common UI components (DataTable, SearchBar, Filters)
  
- **Dashboard Layout**:
  - Header with logo, search, notifications, user menu
  - Sidebar navigation
  - Main content area with breadcrumbs
  - Stats cards (4 key metrics)
  - Charts (Revenue, School Growth)
  - Recent activities feed
  
- **User Flow State Diagram**:
  - Navigation between pages
  - CRUD operations flow
  - Role verification
  - Logout flow

**Key Components**:
- 20+ React components
- Layout system (Sidebar + Content)
- Data services layer
- UI library usage (shadcn/ui)

**Best for**: Frontend developers, UI/UX designers, Product Owners

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
plantuml 01-auth-flow.puml
plantuml 02-rbac-system.puml
plantuml 03-super-admin-components.puml

# Generate SVG (better quality)
plantuml -tsvg *.puml

# Generate all
plantuml *.puml
```

---

## 📖 Reading Order

### For New Team Members (Sprint 2)
1. **01-auth-flow.puml** - Understand authentication flows first
2. **02-rbac-system.puml** - Learn permission system
3. **03-super-admin-components.puml** - See dashboard structure

### For Implementing Authentication
1. **01-auth-flow.puml** ⭐ **START HERE** - Follow exact sequence
2. Reference SETUP-GUIDE.md for code implementation
3. Test each flow shown in diagram

### For Implementing RBAC
1. **02-rbac-system.puml** ⭐ **START HERE** - Understand permission matrix
2. Implement roles enum
3. Create permissions mapping
4. Implement middleware
5. Add permission guards

### For Building Dashboard
1. **03-super-admin-components.puml** ⭐ **START HERE** - See component tree
2. Build layout structure (Sidebar + Content)
3. Implement stats cards
4. Add charts
5. Build activity feed

---

## 🎯 Diagram Details

### 01-auth-flow.puml Highlights

**Flows Covered**:
- ✅ 8 complete authentication flows
- ✅ All Firebase Auth methods
- ✅ Session management with JWT
- ✅ Protected route access
- ✅ Security features documented

**Key Security Notes**:
- Passwords hashed by Firebase
- JWT tokens with 7-day expiry
- HttpOnly cookies
- Email verification enforced
- Rate limiting on auth endpoints

**Lines of Code**: ~200+ lines PlantUML

---

### 02-rbac-system.puml Highlights

**3 Diagrams in 1 File**:
1. **Component Diagram**: RBAC system architecture
2. **Permissions Matrix**: Visual permission mapping
3. **Implementation Structure**: Code classes & relationships

**Roles & Permissions**:
- **Super Admin**: 40+ permissions (full access)
- **School Admin**: 15+ permissions (school management)
- **Panitia**: 5+ permissions (verification only)
- **Student**: 3 permissions (own data only)

**Permission Categories**: 8 categories covering entire system

**Lines of Code**: ~300+ lines PlantUML

---

### 03-super-admin-components.puml Highlights

**3 Diagrams in 1 File**:
1. **Component Structure**: Full component tree
2. **Dashboard Layout**: Visual layout mockup
3. **User Flow State**: Navigation state diagram

**Components Count**:
- 25+ React components defined
- 4 main feature areas
- 6+ reusable UI components

**Dashboard Features**:
- 4 stats cards
- 2 chart widgets
- Activity feed
- Quick actions
- Search & filters

**Lines of Code**: ~250+ lines PlantUML

---

## 🔄 Diagram Updates

Update diagrams when:
- Authentication flow changes
- New roles added
- Permissions modified
- Dashboard components changed

**Update Process**:
1. Edit `.puml` file
2. Regenerate PNG/SVG
3. Update this README if needed
4. Commit both `.puml` and images

---

## 📚 Additional Resources

### Authentication
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [OAuth 2.0 Guide](https://oauth.net/2/)
- [JWT Introduction](https://jwt.io/introduction)

### RBAC
- [RBAC Explained](https://en.wikipedia.org/wiki/Role-based_access_control)
- [RBAC Best Practices](https://www.okta.com/identity-101/role-based-access-control-rbac/)

### UI Components
- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)

---

## 🐛 Troubleshooting

### Diagram tidak muncul di VS Code
```bash
# Install Java
brew install openjdk

# Restart VS Code
```

### PlantUML syntax error
```
Cek:
1. Matching curly braces {}
2. Sequence arrows syntax
3. Component names (no spaces in IDs)
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

| Diagram | Elements | Flows | Complexity | Update Freq |
|---------|----------|-------|------------|-------------|
| Auth Flow | 8 flows | 80+ steps | High | Rarely |
| RBAC System | 4 roles, 40+ perms | 15+ checks | High | Sprint 2-3 |
| Super Admin | 25+ components | 10+ states | Medium | Sprint 2, 4 |

---

**Last Updated**: Sprint 2  
**Maintainer**: Tech Lead  
**Review Date**: End of Sprint 2

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
