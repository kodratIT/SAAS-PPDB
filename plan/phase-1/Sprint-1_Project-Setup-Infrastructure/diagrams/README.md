# Sprint 1 Diagrams - PPDB SaaS Platform

## 📐 Overview

Dokumentasi ini berisi diagram C4 Model untuk Sprint 1: Project Setup & Infrastructure.

Total: **5 diagram PlantUML** yang menjelaskan arsitektur sistem dari berbagai perspektif.

---

## 📚 Diagram List

### 1. System Context Diagram
**File**: [01-system-context.puml](01-system-context.puml)

**Purpose**: Big picture view - menunjukkan PPDB SaaS system dan interaksinya dengan users dan external systems.

**Shows**:
- 5 tipe user: Super Admin, School Admin, Panitia, Student, Parent
- PPDB SaaS Platform sebagai system utama
- 6 external systems: Firebase Auth, Firestore, Storage, Payment Gateway, Email Service, Maps API
- Interaksi antara users dan systems

**Best for**: Product Owners, Stakeholders, Business Analysts

---

### 2. Container Diagram
**File**: [02-container.puml](02-container.puml)

**Purpose**: Architecture components - menunjukkan container-container dalam system dan bagaimana mereka berkomunikasi.

**Shows**:
- Next.js Web Application (containers: web app, API routes, auth context, UI components, client state)
- Firebase Platform (containers: Firestore, Auth, Storage, Cloud Functions)
- External platforms: Vercel, GitHub, Payment Gateway, Email Service
- Data flow dan dependencies antar containers

**Best for**: Tech Lead, Solution Architects, DevOps Engineers

---

### 3. Component Diagram
**File**: [03-component.puml](03-component.puml)

**Purpose**: Internal structure - menunjukkan components dalam Next.js application yang disetup di Sprint 1.

**Shows**:
- App Router dengan route groups
- API Routes layer (auth, schools, periods, applications, payments, upload)
- Components layer (UI, layout, auth, dashboard, forms)
- Library layer (Firebase config, helpers, utilities)
- State management (contexts)
- Custom hooks
- TypeScript types
- Relationships antar components

**Best for**: Full Stack Developers, Frontend Developers

---

### 4. Deployment Diagram
**File**: [04-deployment.puml](04-deployment.puml)

**Purpose**: Infrastructure & deployment - menunjukkan bagaimana system di-deploy di development dan production environments.

**Shows**:
- **Development environment**: 
  - Developer machine dengan VS Code, Node.js, Firebase Emulators
  - Local development setup
- **CI/CD pipeline**:
  - GitHub repository dan Actions
  - Automated checks dan deployment
- **Production environment**:
  - Vercel Platform (Edge Network, Serverless Functions, Static Hosting)
  - Firebase Cloud (Firestore, Auth, Storage)
  - Security layer (rules)
  - Monitoring & Analytics
- User browser interaction

**Best for**: DevOps Engineers, Infrastructure Engineers, Tech Lead

---

### 5. Database Schema Diagram
**File**: [05-database-schema.puml](05-database-schema.puml)

**Purpose**: Database structure - menunjukkan Firestore collections, fields, relationships, dan indexes.

**Shows**:
- **9 main collections**:
  - tenants (schools)
  - users
  - subscription_plans
  - ppdb_periods
  - form_configs
  - applications
  - payments
  - notifications
  - audit_logs
- Field types dan constraints
- Relationships (Foreign Keys)
- Nested objects structure
- Composite indexes requirements

**Best for**: Backend Developers, Database Designers, Full Stack Developers

---

## 🎨 How to View Diagrams

### Option 1: Online PlantUML Server (Easiest)

1. Go to [PlantUML Online Server](https://www.plantuml.com/plantuml/uml/)
2. Copy paste content dari file `.puml`
3. Klik "Submit" untuk generate diagram
4. Download as PNG/SVG if needed

### Option 2: VS Code Extension (Recommended for Development)

1. Install extension: **PlantUML** by jebbs
2. Open `.puml` file
3. Press `Alt + D` (Windows/Linux) or `Option + D` (Mac)
4. Preview akan muncul di side panel

**Prerequisites**:
- Java Runtime (untuk PlantUML)
- Atau install Graphviz: `brew install graphviz` (Mac) / `sudo apt install graphviz` (Linux)

### Option 3: Generate PNG/SVG Locally

```bash
# Install PlantUML
brew install plantuml  # Mac
# atau download dari https://plantuml.com/download

# Generate PNG
plantuml 01-system-context.puml
plantuml 02-container.puml
plantuml 03-component.puml
plantuml 04-deployment.puml
plantuml 05-database-schema.puml

# Generate SVG (vector, better quality)
plantuml -tsvg *.puml

# Generate all in folder
plantuml ./diagrams/*.puml
```

### Option 4: IntelliJ IDEA / WebStorm

1. Install plugin: **PlantUML integration**
2. Right-click `.puml` file → "View PlantUML Diagram"

---

## 📖 Reading Order

### For New Team Members
1. **Start**: 01-system-context.puml - Understand the big picture
2. **Then**: 02-container.puml - See architecture layers
3. **Next**: 03-component.puml - Learn internal structure
4. **After**: 04-deployment.puml - Understand how it's deployed
5. **Finally**: 05-database-schema.puml - Study data model

### For Developers Starting Sprint 1
1. **03-component.puml** - Lihat struktur project yang akan dibuat
2. **05-database-schema.puml** - Understand database schema
3. **02-container.puml** - See how components interact
4. **04-deployment.puml** - Setup local development

### For DevOps/Infrastructure
1. **04-deployment.puml** - Main focus
2. **02-container.puml** - Understand what needs to be deployed
3. **01-system-context.puml** - See external dependencies

---

## 🔄 Diagram Updates

Diagrams should be updated when:
- Architecture changes
- New components added
- New external dependencies
- Deployment infrastructure changes
- Database schema evolves

**Update Process**:
1. Edit `.puml` file
2. Regenerate PNG/SVG
3. Commit both `.puml` and image files
4. Update this README if needed

---

## 🎯 Diagram Standards

### C4 Model Levels
- **Level 1**: System Context (01) - Highest level, big picture
- **Level 2**: Container (02) - Runtime containers
- **Level 3**: Component (03) - Components within containers
- **Level 4**: Code (not included) - Class diagrams, too detailed for architecture docs

### Color Coding (C4 Standard)
- **Blue**: Internal system components
- **Gray**: External systems
- **Person icons**: Users/personas

### Naming Conventions
- Use clear, descriptive names
- Avoid technical jargon in System Context
- Use actual technology names in Container/Component diagrams
- Include technology stack in descriptions

---

## 📚 Additional Resources

### C4 Model
- [C4 Model Official Site](https://c4model.com/)
- [C4-PlantUML GitHub](https://github.com/plantuml-stdlib/C4-PlantUML)

### PlantUML
- [PlantUML Official](https://plantuml.com/)
- [PlantUML Language Reference](https://plantuml.com/guide)
- [PlantUML C4 Examples](https://github.com/plantuml-stdlib/C4-PlantUML/tree/master/samples)

### Architecture Documentation
- [Software Architecture Guide](https://martinfowler.com/architecture/)
- [Arc42 Template](https://arc42.org/)

---

## 🐛 Troubleshooting

### Diagram tidak muncul di VS Code
- Install Java Runtime: `brew install openjdk`
- Restart VS Code
- Check extension settings

### PlantUML syntax error
- Verify `!include` statement works (need internet)
- Check for typos in relationship syntax
- Validate with online server first

### Image quality rendah
- Use SVG instead of PNG: `plantuml -tsvg file.puml`
- Increase DPI: `plantuml -DPLANTUML_LIMIT_SIZE=8192 file.puml`

---

## 📊 Diagram Statistics

| Diagram | Elements | Relationships | Complexity | Update Freq |
|---------|----------|---------------|------------|-------------|
| System Context | 11 | 15 | Low | Rarely |
| Container | 20 | 25 | Medium | Sprint 1-2 |
| Component | 35+ | 40+ | High | Every sprint |
| Deployment | 25 | 20 | Medium | Sprint 1, 4 |
| Database Schema | 9 collections | 12 relations | High | Every sprint |

---

**Last Updated**: Sprint 1  
**Maintainer**: Tech Lead  
**Review Date**: End of each sprint

---

## 🚀 Quick Commands

```bash
# View all diagrams (VS Code)
code *.puml

# Generate all diagrams as PNG
plantuml *.puml

# Generate all as SVG (better quality)
plantuml -tsvg *.puml

# Watch for changes and auto-regenerate
plantuml -watch *.puml

# Generate with custom output folder
plantuml -o ../exports *.puml
```

---

**Happy Diagramming! 📐✨**
