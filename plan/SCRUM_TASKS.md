# 📊 SCRUM TASKS - APLIKASI SAAS PPDB SEKOLAH

## 📖 Daftar Isi
- [Overview](#overview)
- [Sprint Planning](#sprint-planning)
- [Epic List](#epic-list)
- [Phase 1: MVP (Sprint 1-6)](#phase-1-mvp-sprint-1-6)
- [Phase 2: Enhancement (Sprint 7-10)](#phase-2-enhancement-sprint-7-10)
- [Phase 3: Scale (Sprint 11+)](#phase-3-scale-sprint-11)
- [Story Points Reference](#story-points-reference)

---

## Overview

**Project**: SAAS PPDB Sekolah  
**Duration**: 6 months (3 phases)  
**Team Size**: 3-5 developers  
**Sprint Duration**: 2 weeks  
**Total Sprints**: 12-14 sprints

### Story Points Scale (Fibonacci)
- **1 point**: 1-2 hours
- **2 points**: 2-4 hours
- **3 points**: 4-8 hours (1 day)
- **5 points**: 1-2 days
- **8 points**: 2-3 days
- **13 points**: 3-5 days (need to break down)
- **21 points**: Too big, must break down

### Priority Levels
- **P0 (Critical)**: MVP blocker, must have
- **P1 (High)**: Important for MVP
- **P2 (Medium)**: Nice to have
- **P3 (Low)**: Future enhancement

---

## Sprint Planning

### Phase 1: MVP (Sprint 1-6) - 12 weeks
- **Sprint 1-2**: Setup & Infrastructure
- **Sprint 3-4**: Core Authentication & School Management
- **Sprint 5-6**: Student Registration & Payment

### Phase 2: Enhancement (Sprint 7-10) - 8 weeks
- **Sprint 7-8**: Advanced Features (Form Builder, Verification)
- **Sprint 9-10**: Scoring, Selection & Reports

### Phase 3: Scale (Sprint 11+) - Ongoing
- **Sprint 11+**: API, Mobile, White-label, Advanced Analytics

---

## Epic List

### Epic 1: Project Setup & Infrastructure
Setup development environment, database, authentication, and deployment pipeline.

### Epic 2: Super Admin Portal
Build super admin dashboard for managing schools, subscriptions, and system configuration.

### Epic 3: School Management
School registration, profile management, and tenant isolation.

### Epic 4: Authentication & Authorization
User authentication, role-based access control, and security.

### Epic 5: PPDB Period Management
Create and manage PPDB periods, quotas, and timeline.

### Epic 6: Student Registration
Student portal for registration, form filling, and document upload.

### Epic 7: Payment Integration
Integrate payment gateway (Midtrans/Xendit) for registration fees.

### Epic 8: Document Verification
Panitia dashboard for document verification and approval.

### Epic 9: Form Builder
Custom form builder for schools to create dynamic registration forms.

### Epic 10: Scoring & Selection
Scoring system, ranking, and automated selection.

### Epic 11: Reports & Analytics
Dashboard analytics, reports generation, and data export.

### Epic 12: Communication & Notifications
Email, SMS, WhatsApp notifications, and chat system.

### Epic 13: API & Integrations
Public API, webhooks, and third-party integrations.

### Epic 14: Mobile & PWA
Progressive Web App and mobile optimization.

### Epic 15: White-label & Custom Domain
White-label branding and custom domain support.

---

# PHASE 1: MVP (Sprint 1-6)

## SPRINT 1: Project Setup & Infrastructure (Week 1-2)

### Epic 1: Project Setup & Infrastructure

---

#### **USER STORY 1.1**: Project Initialization
**As a** Developer  
**I want** to setup the Next.js project with TypeScript and Tailwind CSS  
**So that** we have a solid foundation to build the application

**Priority**: P0 (Critical)  
**Story Points**: 5

**Tasks**:
- [ ] Initialize Next.js 14 project with TypeScript
- [ ] Setup Tailwind CSS configuration
- [ ] Install and configure shadcn/ui components
- [ ] Setup ESLint and Prettier
- [ ] Configure Git repository and .gitignore
- [ ] Create project folder structure

**Acceptance Criteria**:
- [x] Next.js project runs on localhost:3000
- [x] Tailwind CSS works correctly
- [x] shadcn/ui components can be imported
- [x] ESLint shows no errors
- [x] Git repository initialized with proper .gitignore

---

#### **USER STORY 1.2**: Firebase Setup
**As a** Developer  
**I want** to setup Firebase project with Firestore, Auth, and Storage  
**So that** we can use Firebase as our backend

**Priority**: P0 (Critical)  
**Story Points**: 8

**Tasks**:
- [ ] Create Firebase project in console
- [ ] Enable Firestore Database
- [ ] Enable Firebase Authentication (Email, Google, Phone)
- [ ] Enable Firebase Storage
- [ ] Create firebase config file (lib/firebase/config.ts)
- [ ] Setup Firebase Admin SDK for server-side operations
- [ ] Create Firestore collections structure
- [ ] Write basic Firestore security rules
- [ ] Write basic Storage security rules
- [ ] Setup Firebase emulator for local development

**Acceptance Criteria**:
- [x] Firebase project is created and configured
- [x] Can connect to Firestore from Next.js
- [x] Can authenticate users with email/password
- [x] Can upload files to Firebase Storage
- [x] Security rules are deployed
- [x] Firebase emulator runs locally

---

#### **USER STORY 1.3**: Database Schema Implementation
**As a** Developer  
**I want** to implement the Firestore database schema  
**So that** we have consistent data structure

**Priority**: P0 (Critical)  
**Story Points**: 8

**Tasks**:
- [ ] Create TypeScript interfaces for all collections
- [ ] Create helper functions for Firestore operations (CRUD)
- [ ] Implement tenant isolation logic
- [ ] Create composite indexes for common queries
- [ ] Write seed data script for development
- [ ] Document database schema in code comments

**Acceptance Criteria**:
- [x] All collection interfaces are typed
- [x] CRUD helper functions work correctly
- [x] Queries are optimized with indexes
- [x] Seed data script can populate test data
- [x] Data isolation works per schoolId

---

#### **USER STORY 1.4**: CI/CD Pipeline Setup
**As a** Developer  
**I want** to setup GitHub Actions for CI/CD  
**So that** we can automate testing and deployment

**Priority**: P1 (High)  
**Story Points**: 5

**Tasks**:
- [ ] Create .github/workflows/ci.yml
- [ ] Setup automated testing on pull requests
- [ ] Setup Vercel deployment integration
- [ ] Configure environment variables in Vercel
- [ ] Setup staging and production environments
- [ ] Create deployment documentation

**Acceptance Criteria**:
- [x] CI runs on every pull request
- [x] Failed tests block merging
- [x] Merging to main auto-deploys to production
- [x] Merging to develop auto-deploys to staging
- [x] Environment variables are properly set

---

#### **USER STORY 1.5**: Environment Configuration
**As a** Developer  
**I want** to setup environment variables and configuration  
**So that** we can manage different environments

**Priority**: P0 (Critical)  
**Story Points**: 3

**Tasks**:
- [ ] Create .env.local file
- [ ] Create .env.example with all required variables
- [ ] Setup Next.js environment variables
- [ ] Create config/site.ts for app configuration
- [ ] Document all environment variables

**Acceptance Criteria**:
- [x] All environment variables are documented
- [x] .env.example contains all variables
- [x] Environment variables load correctly
- [x] Sensitive data is not committed to Git

---

**SPRINT 1 TOTAL**: 29 Story Points

---

## SPRINT 2: Authentication & Super Admin Foundation (Week 3-4)

### Epic 4: Authentication & Authorization

---

#### **USER STORY 2.1**: User Authentication (Login/Register)
**As a** User  
**I want** to create an account and login  
**So that** I can access the platform

**Priority**: P0 (Critical)  
**Story Points**: 8

**Tasks**:
- [ ] Create login page UI (app/(auth)/login/page.tsx)
- [ ] Create register page UI (app/(auth)/register/page.tsx)
- [ ] Implement Firebase email/password authentication
- [ ] Implement Google Sign-In
- [ ] Create useAuth custom hook
- [ ] Implement session management
- [ ] Add email verification flow
- [ ] Create forgot password flow
- [ ] Add loading and error states
- [ ] Write unit tests for auth functions

**Acceptance Criteria**:
- [x] User can register with email/password
- [x] User can login with email/password
- [x] User can login with Google
- [x] Email verification is sent
- [x] Password reset works
- [x] Proper error messages are shown
- [x] User session persists on refresh

---

#### **USER STORY 2.2**: Role-Based Access Control (RBAC)
**As a** Developer  
**I want** to implement role-based access control  
**So that** users can only access authorized pages

**Priority**: P0 (Critical)  
**Story Points**: 8

**Tasks**:
- [ ] Create middleware.ts for route protection
- [ ] Implement Firebase Custom Claims for roles
- [ ] Create role checking utilities
- [ ] Create ProtectedRoute component
- [ ] Implement role-based navigation
- [ ] Create 403 Forbidden page
- [ ] Add role-based component visibility
- [ ] Write tests for RBAC

**Acceptance Criteria**:
- [x] Users are redirected based on roles
- [x] Super admins can access all routes
- [x] School admins can only access their school data
- [x] Panitia has limited access
- [x] Students can only see student portal
- [x] Unauthorized access shows 403 page

---

#### **USER STORY 2.3**: User Profile Management
**As a** User  
**I want** to view and edit my profile  
**So that** I can keep my information up to date

**Priority**: P1 (High)  
**Story Points**: 5

**Tasks**:
- [ ] Create profile page UI
- [ ] Implement profile view
- [ ] Implement profile edit form
- [ ] Add photo upload functionality
- [ ] Add change password functionality
- [ ] Add change email functionality (with re-verification)
- [ ] Implement profile update in Firestore
- [ ] Add validation and error handling

**Acceptance Criteria**:
- [x] User can view their profile
- [x] User can edit name, phone, photo
- [x] User can change password
- [x] User can change email (requires re-verification)
- [x] Changes are saved to Firestore
- [x] Proper validation and error messages

---

### Epic 2: Super Admin Portal

---

#### **USER STORY 2.4**: Super Admin Dashboard (Basic)
**As a** Super Admin  
**I want** to view a dashboard with key metrics  
**So that** I can monitor the platform

**Priority**: P1 (High)  
**Story Points**: 8

**Tasks**:
- [ ] Create super admin layout (app/(super-admin)/layout.tsx)
- [ ] Create dashboard page (app/(super-admin)/dashboard/page.tsx)
- [ ] Create stats cards component (total schools, users, revenue)
- [ ] Implement real-time data fetching
- [ ] Create charts component (school growth, revenue trend)
- [ ] Add recent activities section
- [ ] Make dashboard responsive
- [ ] Add loading skeletons

**Acceptance Criteria**:
- [x] Dashboard shows total schools, users, revenue
- [x] Data updates in real-time
- [x] Charts display correctly
- [x] Recent activities are shown
- [x] Dashboard is responsive on mobile
- [x] Loading states are smooth

---

#### **USER STORY 2.5**: School List & Management (Basic)
**As a** Super Admin  
**I want** to view and manage all schools  
**So that** I can oversee tenant operations

**Priority**: P0 (Critical)  
**Story Points**: 8

**Tasks**:
- [ ] Create schools list page (app/(super-admin)/schools/page.tsx)
- [ ] Create schools data table with shadcn/ui Table
- [ ] Implement pagination
- [ ] Add search functionality
- [ ] Add filters (status, type, subscription)
- [ ] Create school detail view
- [ ] Add activate/deactivate actions
- [ ] Create add school form
- [ ] Implement school creation in Firestore

**Acceptance Criteria**:
- [x] Can view all schools in table
- [x] Pagination works (20 per page)
- [x] Search by name/email works
- [x] Filters work correctly
- [x] Can view school details
- [x] Can activate/deactivate schools
- [x] Can add new school
- [x] Data is validated before saving

---

**SPRINT 2 TOTAL**: 37 Story Points

---

## SPRINT 3: School Admin Portal & School Management (Week 5-6)

### Epic 3: School Management

---

#### **USER STORY 3.1**: School Profile Setup
**As a** School Admin  
**I want** to setup my school profile  
**So that** students can see our school information

**Priority**: P0 (Critical)  
**Story Points**: 8

**Tasks**:
- [ ] Create school admin layout (app/(school-admin)/layout.tsx)
- [ ] Create school profile page (app/(school-admin)/profile/page.tsx)
- [ ] Create profile form (basic info, contact, social media)
- [ ] Add logo upload functionality
- [ ] Add cover image upload functionality
- [ ] Add gallery upload (multiple images)
- [ ] Implement profile update in Firestore
- [ ] Add validation and error handling

**Acceptance Criteria**:
- [x] School admin can view profile
- [x] Can edit all school information
- [x] Can upload logo (max 2MB)
- [x] Can upload cover image (max 5MB)
- [x] Can upload multiple gallery images
- [x] Images are optimized before upload
- [x] Changes are saved successfully
- [x] Proper validation messages

---

#### **USER STORY 3.2**: School Admin Dashboard
**As a** School Admin  
**I want** to view a dashboard with my school's metrics  
**So that** I can monitor registration progress

**Priority**: P1 (High)  
**Story Points**: 8

**Tasks**:
- [ ] Create school admin dashboard page
- [ ] Create stats cards (total applicants, pending, verified, paid)
- [ ] Create registration trend chart
- [ ] Add recent activities section
- [ ] Add quick actions buttons
- [ ] Implement real-time data fetching (filtered by schoolId)
- [ ] Add quota indicators
- [ ] Make dashboard responsive

**Acceptance Criteria**:
- [x] Dashboard shows school-specific metrics
- [x] Data is filtered by schoolId
- [x] Charts display registration trends
- [x] Quick actions are accessible
- [x] Data updates in real-time
- [x] Responsive on all devices

---

### Epic 5: PPDB Period Management

---

#### **USER STORY 3.3**: Create PPDB Period
**As a** School Admin  
**I want** to create a new PPDB period  
**So that** I can start accepting registrations

**Priority**: P0 (Critical)  
**Story Points**: 8

**Tasks**:
- [ ] Create periods list page (app/(school-admin)/periods/page.tsx)
- [ ] Create add period form (app/(school-admin)/periods/new/page.tsx)
- [ ] Implement multi-step form (basic info, timeline, quotas, fees)
- [ ] Add date picker for timeline
- [ ] Add quota configuration per jalur
- [ ] Add fee configuration
- [ ] Implement period creation in Firestore
- [ ] Add validation (dates, quotas)

**Acceptance Criteria**:
- [x] Can create new PPDB period
- [x] All fields are properly validated
- [x] Start date must be before end date
- [x] Quotas must be numbers > 0
- [x] Period is saved to Firestore with schoolId
- [x] Success message is shown
- [x] Redirected to periods list

---

#### **USER STORY 3.4**: Manage PPDB Periods
**As a** School Admin  
**I want** to view and manage my PPDB periods  
**So that** I can control registration availability

**Priority**: P0 (Critical)  
**Story Points**: 5

**Tasks**:
- [ ] Create periods list view
- [ ] Add status indicators (draft, active, closed)
- [ ] Implement edit period functionality
- [ ] Add activate/close period actions
- [ ] Add duplicate period functionality
- [ ] Show period statistics (applicants count)
- [ ] Add delete period (with confirmation)

**Acceptance Criteria**:
- [x] Can view all periods for school
- [x] Can edit period details
- [x] Can activate period (only one active at a time)
- [x] Can close period
- [x] Can duplicate from previous period
- [x] Can delete period (with warning)
- [x] Statistics are accurate

---

**SPRINT 3 TOTAL**: 29 Story Points

---

## SPRINT 4: Student Registration Portal (Week 7-8)

### Epic 6: Student Registration

---

#### **USER STORY 4.1**: School Landing Page
**As a** Prospective Student  
**I want** to view the school landing page  
**So that** I can learn about the school and PPDB process

**Priority**: P0 (Critical)  
**Story Points**: 8

**Tasks**:
- [ ] Create public layout (app/(public)/layout.tsx)
- [ ] Create landing page (app/(public)/[schoolSlug]/page.tsx)
- [ ] Implement tenant detection from URL (middleware)
- [ ] Create hero section component
- [ ] Create quick info cards (dates, fees, quotas)
- [ ] Create timeline section
- [ ] Create requirements section
- [ ] Create jalur pendaftaran section
- [ ] Create FAQ accordion
- [ ] Create contact section with map
- [ ] Implement data fetching (school + active period)
- [ ] Add CTA buttons (Login/Register)
- [ ] Make fully responsive

**Acceptance Criteria**:
- [x] Landing page loads for school slug
- [x] Shows correct school information
- [x] Shows active PPDB period info
- [x] All sections are visible
- [x] FAQ accordion works
- [x] Google Maps shows school location
- [x] CTA buttons navigate correctly
- [x] Responsive on mobile/tablet

---

#### **USER STORY 4.2**: Student Registration Form (Multi-step)
**As a** Student  
**I want** to fill out a registration form  
**So that** I can apply to the school

**Priority**: P0 (Critical)  
**Story Points**: 13 (Break down into 2 stories)

**Sub-story 4.2.1**: Basic Registration Form (Steps 1-4)
**Story Points**: 8

**Tasks**:
- [ ] Create student dashboard layout (app/(student)/layout.tsx)
- [ ] Create application page (app/(student)/application/page.tsx)
- [ ] Implement multi-step form component
- [ ] Create Step 1: Jalur selection
- [ ] Create Step 2: Personal data form
- [ ] Create Step 3: Address form (with Google Maps)
- [ ] Create Step 4: Parent data form
- [ ] Implement form validation with Zod
- [ ] Add auto-save draft functionality
- [ ] Add progress indicator
- [ ] Add previous/next navigation

**Acceptance Criteria**:
- [x] Multi-step form works smoothly
- [x] Each step has proper validation
- [x] Can select jalur pendaftaran
- [x] Can input personal data
- [x] Google Maps autocomplete works for address
- [x] Can input parent data
- [x] Form auto-saves every 30 seconds
- [x] Progress indicator is accurate
- [x] Can navigate between steps

---

**Sub-story 4.2.2**: Education & Achievement Form (Steps 5-8)
**Story Points**: 5

**Tasks**:
- [ ] Create Step 5: Previous education form
- [ ] Create Step 6: Achievement form (multiple entries)
- [ ] Create Step 7: Custom fields (dynamic based on form config)
- [ ] Create Step 8: Review & submit
- [ ] Add achievement entry management (add/remove)
- [ ] Calculate achievement points automatically
- [ ] Implement final submission
- [ ] Generate registration number
- [ ] Show success page

**Acceptance Criteria**:
- [x] Can input education history
- [x] Can add multiple achievements
- [x] Achievement points calculate automatically
- [x] Custom fields render correctly
- [x] Review page shows all data
- [x] Can edit from review page
- [x] Submit generates unique registration number
- [x] Success page shows next steps

---

#### **USER STORY 4.3**: Student Dashboard
**As a** Student  
**I want** to view my application dashboard  
**So that** I can track my registration status

**Priority**: P0 (Critical)  
**Story Points**: 5

**Tasks**:
- [ ] Create student dashboard page (app/(student)/dashboard/page.tsx)
- [ ] Create progress timeline component
- [ ] Show registration summary card
- [ ] Add status indicators
- [ ] Show document checklist
- [ ] Show payment status
- [ ] Add quick actions (continue form, upload docs, pay)
- [ ] Add notifications section

**Acceptance Criteria**:
- [x] Dashboard shows application status
- [x] Timeline shows completed steps
- [x] Registration number is visible
- [x] Document checklist is accurate
- [x] Payment status is correct
- [x] Quick actions navigate correctly
- [x] Notifications are displayed

---

**SPRINT 4 TOTAL**: 26 Story Points

---

## SPRINT 5: Document Upload & Payment Integration (Week 9-10)

### Epic 6: Student Registration (continued)

---

#### **USER STORY 5.1**: Document Upload
**As a** Student  
**I want** to upload required documents  
**So that** my application can be verified

**Priority**: P0 (Critical)  
**Story Points**: 8

**Tasks**:
- [ ] Create documents page (app/(student)/documents/page.tsx)
- [ ] Create FileUpload component with drag & drop
- [ ] Implement Firebase Storage upload
- [ ] Add image compression before upload
- [ ] Add PDF preview functionality
- [ ] Show upload progress
- [ ] Handle upload errors
- [ ] Show document status (pending, verified, rejected)
- [ ] Allow re-upload for rejected documents
- [ ] Add delete document functionality

**Acceptance Criteria**:
- [x] Can drag & drop files
- [x] Can click to browse files
- [x] Only allowed formats are accepted (PDF, JPG, PNG)
- [x] File size validation (max 5MB)
- [x] Images are compressed before upload
- [x] Upload progress is shown
- [x] Can preview uploaded documents
- [x] Document status is displayed
- [x] Can re-upload rejected documents
- [x] Can delete documents before verification

---

### Epic 7: Payment Integration

---

#### **USER STORY 5.2**: Payment Gateway Integration (Midtrans)
**As a** Developer  
**I want** to integrate Midtrans payment gateway  
**So that** students can pay registration fees

**Priority**: P0 (Critical)  
**Story Points**: 13 (Break down into 2 stories)

**Sub-story 5.2.1**: Midtrans Setup & Basic Payment
**Story Points**: 8

**Tasks**:
- [ ] Create Midtrans account and get API keys
- [ ] Install midtrans-client package
- [ ] Create lib/payment/midtrans.ts utility
- [ ] Create API route for creating transaction (api/payments/create)
- [ ] Implement Snap payment flow
- [ ] Create payment page (app/(student)/payment/page.tsx)
- [ ] Show available payment methods
- [ ] Generate payment link/embed
- [ ] Handle payment redirection

**Acceptance Criteria**:
- [x] Midtrans is configured correctly
- [x] Can create payment transaction
- [x] Payment page shows amount and methods
- [x] Can select payment method (VA, e-wallet, QRIS)
- [x] Payment link/popup opens correctly
- [x] User is redirected after payment

---

**Sub-story 5.2.2**: Payment Webhook & Verification
**Story Points**: 5

**Tasks**:
- [ ] Create webhook endpoint (api/payments/webhook)
- [ ] Implement webhook signature verification
- [ ] Update payment status in Firestore
- [ ] Update application status to "paid"
- [ ] Send payment confirmation email
- [ ] Create payment history page
- [ ] Generate invoice PDF
- [ ] Handle payment failures

**Acceptance Criteria**:
- [x] Webhook receives Midtrans notifications
- [x] Signature is verified correctly
- [x] Payment status updates automatically
- [x] Application status updates to "paid"
- [x] Confirmation email is sent
- [x] Invoice can be downloaded
- [x] Failed payments are handled gracefully

---

#### **USER STORY 5.3**: Manual Payment Verification
**As a** School Admin  
**I want** to manually verify bank transfer payments  
**So that** I can accept payments outside the gateway

**Priority**: P1 (High)  
**Story Points**: 5

**Tasks**:
- [ ] Create payment verification page for admin
- [ ] Show queue of pending manual payments
- [ ] Display uploaded proof of transfer
- [ ] Add approve/reject actions
- [ ] Update payment status
- [ ] Send notification to student
- [ ] Add notes field for rejection reason

**Acceptance Criteria**:
- [x] Admin can see pending payments
- [x] Can view proof of transfer
- [x] Can approve payment
- [x] Can reject with reason
- [x] Student receives notification
- [x] Payment status updates correctly

---

**SPRINT 5 TOTAL**: 31 Story Points

---

## SPRINT 6: Verification & Admin Features (Week 11-12)

### Epic 8: Document Verification

---

#### **USER STORY 6.1**: Panitia Dashboard
**As a** Panitia  
**I want** to view my dashboard  
**So that** I can see my tasks and performance

**Priority**: P1 (High)  
**Story Points**: 5

**Tasks**:
- [ ] Create panitia layout (app/(panitia)/layout.tsx)
- [ ] Create panitia dashboard (app/(panitia)/dashboard/page.tsx)
- [ ] Show task overview (pending verifications)
- [ ] Show performance metrics (documents verified)
- [ ] Add quick access to verification queue
- [ ] Show today's schedule (if applicable)

**Acceptance Criteria**:
- [x] Dashboard shows panitia-specific data
- [x] Task count is accurate
- [x] Performance metrics are displayed
- [x] Quick links work correctly
- [x] Data is filtered by panitia userId

---

#### **USER STORY 6.2**: Document Verification System
**As a** Panitia  
**I want** to verify applicant documents  
**So that** we can approve qualified applications

**Priority**: P0 (Critical)  
**Story Points**: 13 (Break down into 2 stories)

**Sub-story 6.2.1**: Verification Queue & Interface
**Story Points**: 8

**Tasks**:
- [ ] Create verification page (app/(panitia)/verification/page.tsx)
- [ ] Create verification queue table
- [ ] Add filters (document type, status)
- [ ] Implement document viewer component
- [ ] Create side-by-side view (document + application form)
- [ ] Add zoom/rotate controls for images
- [ ] Add verification checklist
- [ ] Implement claim document functionality

**Acceptance Criteria**:
- [x] Queue shows pending documents
- [x] Can filter by document type
- [x] Can view document in modal/side panel
- [x] Can see application form data
- [x] Zoom and rotate work for images
- [x] Can claim document for verification
- [x] Only shows unclaimed or my claimed documents

---

**Sub-story 6.2.2**: Approve/Reject Actions
**Story Points**: 5

**Tasks**:
- [ ] Add approve button with confirmation
- [ ] Add reject button with reason selector
- [ ] Create rejection reason dropdown
- [ ] Allow custom rejection note
- [ ] Update document status in Firestore
- [ ] Send notification to student
- [ ] Add to verification history
- [ ] Update panitia performance stats
- [ ] Implement batch approval (multiple docs)

**Acceptance Criteria**:
- [x] Can approve document
- [x] Can reject with reason
- [x] Custom notes are saved
- [x] Document status updates
- [x] Student receives notification
- [x] History is recorded
- [x] Can approve multiple documents at once

---

#### **USER STORY 6.3**: Applicants List & Detail View
**As a** School Admin  
**I want** to view all applicants  
**So that** I can monitor registrations

**Priority**: P0 (Critical)  
**Story Points**: 8

**Tasks**:
- [ ] Create applicants list page (app/(school-admin)/applicants/page.tsx)
- [ ] Implement data table with TanStack Table
- [ ] Add advanced filters (status, jalur, date, payment)
- [ ] Add search functionality (name, email, registration number)
- [ ] Add sorting by columns
- [ ] Implement pagination (server-side)
- [ ] Create applicant detail page
- [ ] Show complete application data
- [ ] Show document preview
- [ ] Show payment history
- [ ] Show activity timeline
- [ ] Add internal notes feature

**Acceptance Criteria**:
- [x] Table shows all applicants for school
- [x] Filters work correctly
- [x] Search works
- [x] Sorting works
- [x] Pagination loads data efficiently
- [x] Detail page shows complete info
- [x] Can view all documents
- [x] Can add internal notes
- [x] Timeline shows all activities

---

**SPRINT 6 TOTAL**: 31 Story Points

---

# PHASE 1 MVP COMPLETE
**Total Story Points**: 183 points (~12 weeks)

---

# PHASE 2: ENHANCEMENT (Sprint 7-10)

## SPRINT 7: Form Builder & Email System (Week 13-14)

### Epic 9: Form Builder

---

#### **USER STORY 7.1**: Custom Form Builder (Drag & Drop)
**As a** School Admin  
**I want** to create custom registration forms  
**So that** I can collect specific information from applicants

**Priority**: P2 (Medium)  
**Story Points**: 13 (Break down into 2 stories)

**Sub-story 7.1.1**: Form Builder Interface
**Story Points**: 8

**Tasks**:
- [ ] Create form builder page (app/(school-admin)/forms/builder/page.tsx)
- [ ] Implement drag & drop library (dnd-kit)
- [ ] Create field palette (text, number, select, etc.)
- [ ] Create form canvas (drop zone)
- [ ] Implement field property editor
- [ ] Add section/tab management
- [ ] Add conditional logic builder
- [ ] Implement preview mode
- [ ] Save form configuration to Firestore

**Acceptance Criteria**:
- [x] Can drag fields from palette to canvas
- [x] Can reorder fields
- [x] Can edit field properties
- [x] Can add multiple sections
- [x] Can set conditional visibility
- [x] Preview shows actual form
- [x] Form config is saved correctly

---

**Sub-story 7.1.2**: Form Renderer (Dynamic Form)
**Story Points**: 5

**Tasks**:
- [ ] Create dynamic form renderer component
- [ ] Implement all field types rendering
- [ ] Apply validation rules
- [ ] Handle conditional visibility
- [ ] Implement auto-save for drafts
- [ ] Handle form submission with dynamic data
- [ ] Store dynamic data in applications.formData.customFields

**Acceptance Criteria**:
- [x] Custom form renders correctly
- [x] All field types work
- [x] Validation rules are enforced
- [x] Conditional fields show/hide correctly
- [x] Data is saved in correct structure
- [x] Form submission works

---

### Epic 12: Communication & Notifications

---

#### **USER STORY 7.2**: Email System Setup (Resend)
**As a** Developer  
**I want** to setup email sending with Resend  
**So that** we can send transactional emails

**Priority**: P1 (High)  
**Story Points**: 8

**Tasks**:
- [ ] Create Resend account and get API key
- [ ] Install resend and @react-email/components packages
- [ ] Create lib/email/resend.ts utility
- [ ] Create email templates with React Email
- [ ] Create welcome email template
- [ ] Create email verification template
- [ ] Create password reset template
- [ ] Create payment confirmation template
- [ ] Create document status template
- [ ] Create selection result template
- [ ] Implement email sending function
- [ ] Add email to queue (Firestore)
- [ ] Create background job to process email queue
- [ ] Log email sending to email_logs collection

**Acceptance Criteria**:
- [x] Resend is configured correctly
- [x] Can send emails successfully
- [x] Templates render correctly in email clients
- [x] Emails are queued in Firestore
- [x] Background job processes queue
- [x] Email logs are created
- [x] Can track email delivery status

---

#### **USER STORY 7.3**: Notification System (In-app)
**As a** User  
**I want** to receive in-app notifications  
**So that** I stay informed about important updates

**Priority**: P1 (High)  
**Story Points**: 5

**Tasks**:
- [ ] Create notification icon in header
- [ ] Create notification dropdown component
- [ ] Implement real-time notifications (Firestore realtime)
- [ ] Create notification badge (unread count)
- [ ] Add mark as read functionality
- [ ] Create notifications page (view all)
- [ ] Implement notification creation helper
- [ ] Add notification on key events (payment, verification, etc.)

**Acceptance Criteria**:
- [x] Notification icon shows unread count
- [x] Dropdown shows recent notifications
- [x] Notifications update in real-time
- [x] Can mark as read
- [x] Can view all notifications
- [x] Notifications are created on events

---

**SPRINT 7 TOTAL**: 31 Story Points

---

## SPRINT 8: Advanced Verification & Communication (Week 15-16)

---

#### **USER STORY 8.1**: Email Templates Editor
**As a** School Admin  
**I want** to customize email templates  
**So that** I can personalize communications

**Priority**: P2 (Medium)  
**Story Points**: 8

**Tasks**:
- [ ] Create email templates page (app/(school-admin)/settings/emails/page.tsx)
- [ ] List all email templates
- [ ] Create template editor (rich text with Tiptap)
- [ ] Add variable insertion ({{name}}, {{school}}, etc.)
- [ ] Implement preview functionality
- [ ] Add test send feature
- [ ] Save custom templates per school
- [ ] Fall back to default templates if not customized

**Acceptance Criteria**:
- [x] Can view all email templates
- [x] Can edit template content
- [x] Can insert variables
- [x] Preview renders variables correctly
- [x] Can send test email
- [x] Custom templates are saved
- [x] Default templates are used as fallback

---

#### **USER STORY 8.2**: Broadcast Messaging
**As a** School Admin  
**I want** to send broadcast messages to applicants  
**So that** I can communicate important information

**Priority**: P2 (Medium)  
**Story Points**: 5

**Tasks**:
- [ ] Create broadcast page (app/(school-admin)/announcements/broadcast/page.tsx)
- [ ] Create message composer (rich text)
- [ ] Add recipient filter (status, jalur, etc.)
- [ ] Show recipient count
- [ ] Implement schedule send
- [ ] Send via email + in-app notification
- [ ] Log broadcast in audit_logs
- [ ] Show broadcast history

**Acceptance Criteria**:
- [x] Can compose message with rich text
- [x] Can filter recipients
- [x] Recipient count is accurate
- [x] Can schedule for later
- [x] Message is sent to all filtered users
- [x] Both email and in-app notification work
- [x] Broadcast is logged

---

#### **USER STORY 8.3**: Chat System (Admin-Student)
**As a** Student or Admin  
**I want** to chat with each other  
**So that** I can ask questions or get support

**Priority**: P2 (Medium)  
**Story Points**: 8

**Tasks**:
- [ ] Create chat page for student (app/(student)/chat/page.tsx)
- [ ] Create chat page for admin (app/(school-admin)/applicants/[id]/chat)
- [ ] Implement real-time chat with Firestore
- [ ] Create message list component
- [ ] Create message input component
- [ ] Add file attachment support
- [ ] Show typing indicator
- [ ] Show read receipts
- [ ] Add notification for new messages

**Acceptance Criteria**:
- [x] Messages appear in real-time
- [x] Can send text messages
- [x] Can attach files
- [x] Typing indicator works
- [x] Read receipts work
- [x] Notification is sent for new messages
- [x] Chat history is preserved

---

**SPRINT 8 TOTAL**: 21 Story Points

---

## SPRINT 9: Scoring, Selection & Ranking (Week 17-18)

### Epic 10: Scoring & Selection

---

#### **USER STORY 9.1**: Scoring Configuration
**As a** School Admin  
**I want** to configure scoring criteria  
**So that** I can define how applicants are evaluated

**Priority**: P0 (Critical)  
**Story Points**: 8

**Tasks**:
- [ ] Create selection settings page (app/(school-admin)/selection/settings/page.tsx)
- [ ] Create criteria configuration form (akademik, prestasi, zonasi, tes)
- [ ] Set bobot (weight) per criteria
- [ ] Validate total weight = 100%
- [ ] Define passing grade
- [ ] Configure tie-breaking rules
- [ ] Save configuration to period settings
- [ ] Show preview of how scoring works

**Acceptance Criteria**:
- [x] Can set weight for each criteria
- [x] Total weight must equal 100%
- [x] Can set passing grade
- [x] Can configure tie-breaking
- [x] Configuration is saved
- [x] Preview calculation is shown

---

#### **USER STORY 9.2**: Score Input & Calculation
**As a** Panitia  
**I want** to input scores for applicants  
**So that** they can be ranked

**Priority**: P0 (Critical)  
**Story Points**: 8

**Tasks**:
- [ ] Create scoring page (app/(panitia)/scoring/page.tsx)
- [ ] List applicants assigned to me
- [ ] Create score input form per criteria
- [ ] Add validation (min/max scores)
- [ ] Calculate total score automatically
- [ ] Allow bulk score import from Excel
- [ ] Save scores to applications.scores
- [ ] Lock scores after submission
- [ ] Show score history

**Acceptance Criteria**:
- [x] Can input scores for each criteria
- [x] Validation prevents invalid scores
- [x] Total score calculates correctly
- [x] Can import scores from Excel
- [x] Scores are saved to Firestore
- [x] Scores can't be changed after lock
- [x] History shows all changes

---

#### **USER STORY 9.3**: Ranking System
**As a** School Admin  
**I want** to view applicant rankings  
**So that** I can make selection decisions

**Priority**: P0 (Critical)  
**Story Points**: 8

**Tasks**:
- [ ] Create ranking page (app/(school-admin)/selection/ranking/page.tsx)
- [ ] Calculate rankings per jalur
- [ ] Apply tie-breaking rules
- [ ] Show ranking table (rank, name, jalur, score)
- [ ] Add passing grade line indicator
- [ ] Implement manual adjustment (for hybrid mode)
- [ ] Add lock ranking functionality
- [ ] Export ranking to Excel/PDF

**Acceptance Criteria**:
- [x] Rankings are calculated correctly
- [x] Tie-breaking rules are applied
- [x] Table shows all necessary info
- [x] Passing grade line is visible
- [x] Can manually adjust ranks (if allowed)
- [x] Can lock to prevent changes
- [x] Can export ranking

---

#### **USER STORY 9.4**: Automated Selection
**As a** School Admin  
**I want** to automatically select applicants  
**So that** I can process selections efficiently

**Priority**: P0 (Critical)  
**Story Points**: 5

**Tasks**:
- [ ] Create selection page (app/(school-admin)/selection/process/page.tsx)
- [ ] Implement auto-selection algorithm
- [ ] Select top N applicants per jalur (based on quota)
- [ ] Handle over-quota scenarios
- [ ] Create waitlist for near-miss applicants
- [ ] Update application status (selected/rejected/waitlist)
- [ ] Generate acceptance letters (PDF)
- [ ] Preview selection before confirm
- [ ] Confirm and finalize selection

**Acceptance Criteria**:
- [x] Algorithm selects correctly based on ranking
- [x] Quotas are respected
- [x] Waitlist is created
- [x] Application statuses update
- [x] Acceptance letters are generated
- [x] Can preview before finalizing
- [x] Selection is final after confirm

---

**SPRINT 9 TOTAL**: 29 Story Points

---

## SPRINT 10: Result Publication & Reports (Week 19-20)

---

#### **USER STORY 10.1**: Result Publication
**As a** School Admin  
**I want** to publish selection results  
**So that** applicants can check their status

**Priority**: P0 (Critical)  
**Story Points**: 8

**Tasks**:
- [ ] Create result publication page (app/(school-admin)/selection/publish/page.tsx)
- [ ] Preview accepted/rejected lists
- [ ] Schedule publication date/time
- [ ] Publish results (update period status)
- [ ] Send email notifications to all applicants
- [ ] Send SMS/WhatsApp (if configured)
- [ ] Make results visible on student portal
- [ ] Generate downloadable acceptance letters

**Acceptance Criteria**:
- [x] Can preview lists before publish
- [x] Can schedule publication
- [x] Results are published at scheduled time
- [x] All applicants receive email
- [x] SMS/WhatsApp sent (if enabled)
- [x] Students can view result on portal
- [x] Acceptance letter can be downloaded

---

#### **USER STORY 10.2**: Student Result View
**As a** Student  
**I want** to view my selection result  
**So that** I know if I'm accepted

**Priority**: P0 (Critical)  
**Story Points**: 5

**Tasks**:
- [ ] Create result page (app/(student)/result/page.tsx)
- [ ] Show result (accepted/rejected/waitlist)
- [ ] Display score breakdown
- [ ] Show ranking (if allowed by school)
- [ ] Show acceptance letter download button
- [ ] Show next steps (re-registration)
- [ ] Add re-registration CTA (if accepted)

**Acceptance Criteria**:
- [x] Result page shows correct status
- [x] Score breakdown is displayed
- [x] Ranking is shown (if allowed)
- [x] Can download acceptance letter
- [x] Next steps are clear
- [x] Re-registration link works (if accepted)

---

### Epic 11: Reports & Analytics

---

#### **USER STORY 10.3**: Reports Dashboard
**As a** School Admin  
**I want** to view comprehensive reports  
**So that** I can analyze PPDB performance

**Priority**: P1 (High)  
**Story Points**: 8

**Tasks**:
- [ ] Create reports page (app/(school-admin)/reports/page.tsx)
- [ ] Create registration report (daily count, trend)
- [ ] Create demographic report (gender, age, location)
- [ ] Create jalur report (distribution)
- [ ] Create financial report (revenue, outstanding)
- [ ] Create verification report (turnaround time)
- [ ] Add charts with Recharts
- [ ] Add date range filter
- [ ] Export reports to PDF/Excel

**Acceptance Criteria**:
- [x] All reports show correct data
- [x] Charts are interactive
- [x] Date range filter works
- [x] Can export to PDF
- [x] Can export to Excel
- [x] Reports are accurate and complete

---

#### **USER STORY 10.4**: Data Export
**As a** School Admin  
**I want** to export applicant data  
**So that** I can process it in other systems

**Priority**: P1 (High)  
**Story Points**: 5

**Tasks**:
- [ ] Add export button on applicants list
- [ ] Create export modal (select fields)
- [ ] Implement Excel export with XLSX
- [ ] Implement CSV export
- [ ] Include/exclude documents option
- [ ] Export filtered data only
- [ ] Show export progress
- [ ] Download file automatically

**Acceptance Criteria**:
- [x] Can select fields to export
- [x] Excel export works correctly
- [x] CSV export works correctly
- [x] Can export with/without documents
- [x] Filtered data is exported
- [x] Progress is shown
- [x] File downloads successfully

---

**SPRINT 10 TOTAL**: 26 Story Points

---

# PHASE 2 ENHANCEMENT COMPLETE
**Total Story Points**: 107 points (~8 weeks)

---

# PHASE 3: SCALE (Sprint 11+)

## SPRINT 11: API & Webhooks (Week 21-22)

### Epic 13: API & Integrations

---

#### **USER STORY 11.1**: Public REST API
**As a** School Admin  
**I want** to access applicant data via API  
**So that** I can integrate with other systems

**Priority**: P2 (Medium)  
**Story Points**: 13

**Tasks**:
- [ ] Design API endpoints structure
- [ ] Create API key generation system
- [ ] Implement API authentication middleware
- [ ] Create GET /api/v1/applications endpoint
- [ ] Create GET /api/v1/applications/:id endpoint
- [ ] Create POST /api/v1/applications endpoint
- [ ] Create PATCH /api/v1/applications/:id endpoint
- [ ] Implement rate limiting
- [ ] Add API documentation with Swagger
- [ ] Create API playground
- [ ] Add API logs
- [ ] Version API (v1)

**Acceptance Criteria**:
- [x] API key authentication works
- [x] All endpoints return correct data
- [x] Rate limiting prevents abuse
- [x] Documentation is complete
- [x] Playground allows testing
- [x] API is versioned properly

---

#### **USER STORY 11.2**: Webhooks System
**As a** School Admin  
**I want** to receive webhooks for events  
**So that** my system can react to changes

**Priority**: P2 (Medium)  
**Story Points**: 8

**Tasks**:
- [ ] Create webhook configuration UI
- [ ] Allow subscribing to events (new_application, payment_received, etc.)
- [ ] Implement webhook delivery system
- [ ] Add retry mechanism (exponential backoff)
- [ ] Add webhook signature for security
- [ ] Log webhook deliveries
- [ ] Create webhook testing tool
- [ ] Add webhook documentation

**Acceptance Criteria**:
- [x] Can configure webhook URL
- [x] Can select events to subscribe
- [x] Webhooks are delivered on events
- [x] Retry works for failures
- [x] Signature verification works
- [x] Logs are comprehensive
- [x] Test tool works

---

**SPRINT 11 TOTAL**: 21 Story Points

---

## SPRINT 12: PWA & Mobile Optimization (Week 23-24)

### Epic 14: Mobile & PWA

---

#### **USER STORY 12.1**: Progressive Web App (PWA)
**As a** User  
**I want** to install the app on my device  
**So that** I can access it like a native app

**Priority**: P2 (Medium)  
**Story Points**: 8

**Tasks**:
- [ ] Create manifest.json
- [ ] Add app icons (multiple sizes)
- [ ] Implement service worker
- [ ] Add offline page
- [ ] Add install prompt
- [ ] Enable push notifications
- [ ] Test on iOS and Android
- [ ] Add splash screens

**Acceptance Criteria**:
- [x] App can be installed
- [x] Icons display correctly
- [x] Works offline (cached pages)
- [x] Push notifications work
- [x] Install prompt shows appropriately
- [x] Works on iOS Safari and Chrome
- [x] Splash screens show on launch

---

#### **USER STORY 12.2**: Mobile UI Optimization
**As a** User  
**I want** the app to work great on mobile  
**So that** I can use it on my phone

**Priority**: P1 (High)  
**Story Points**: 8

**Tasks**:
- [ ] Audit all pages for mobile responsiveness
- [ ] Optimize touch targets (min 44px)
- [ ] Improve mobile navigation
- [ ] Add swipe gestures where appropriate
- [ ] Optimize form inputs for mobile keyboards
- [ ] Reduce bundle size for faster loading
- [ ] Optimize images for mobile
- [ ] Test on various screen sizes

**Acceptance Criteria**:
- [x] All pages are fully responsive
- [x] Touch targets are easy to tap
- [x] Navigation works well on mobile
- [x] Forms are easy to fill on mobile
- [x] Page load time < 3s on 3G
- [x] Works on iOS and Android browsers
- [x] No horizontal scrolling

---

**SPRINT 12 TOTAL**: 16 Story Points

---

## SPRINT 13: White-label & Custom Domain (Week 25-26)

### Epic 15: White-label & Custom Domain

---

#### **USER STORY 13.1**: White-label Branding
**As a** School Admin (Enterprise plan)  
**I want** to customize the branding  
**So that** the app looks like my school's app

**Priority**: P3 (Low)  
**Story Points**: 13

**Tasks**:
- [ ] Create branding settings page
- [ ] Add color picker for primary/secondary colors
- [ ] Add logo upload (light/dark mode)
- [ ] Add favicon upload
- [ ] Add custom fonts selection
- [ ] Apply branding dynamically (CSS variables)
- [ ] Remove "Powered by" footer (for Enterprise)
- [ ] Create brand preview
- [ ] Save branding to tenant config
- [ ] Load branding on app initialization

**Acceptance Criteria**:
- [x] Can customize colors
- [x] Can upload logo and favicon
- [x] Can select fonts
- [x] Changes apply immediately
- [x] Preview shows accurate branding
- [x] Branding persists across sessions
- [x] Powered by footer is removed (Enterprise only)

---

#### **USER STORY 13.2**: Custom Domain Support
**As a** School Admin (Enterprise plan)  
**I want** to use my own domain  
**So that** applicants access via my school's domain

**Priority**: P3 (Low)  
**Story Points**: 13

**Tasks**:
- [ ] Create custom domain settings page
- [ ] Implement domain verification (TXT record)
- [ ] Configure Vercel custom domains via API
- [ ] Setup SSL certificate (automatic via Vercel)
- [ ] Implement domain-based tenant detection
- [ ] Handle subdomain routing
- [ ] Create domain setup guide
- [ ] Add DNS validation
- [ ] Test with real domain

**Acceptance Criteria**:
- [x] Can add custom domain
- [x] Domain verification works
- [x] SSL certificate is issued
- [x] App loads on custom domain
- [x] Tenant is detected correctly
- [x] Setup guide is clear
- [x] Works for subdomains too

---

**SPRINT 13 TOTAL**: 26 Story Points

---

## SPRINT 14: Advanced Analytics & AI Features (Week 27-28)

---

#### **USER STORY 14.1**: Advanced Analytics Dashboard
**As a** Super Admin  
**I want** advanced analytics across all schools  
**So that** I can gain business insights

**Priority**: P2 (Medium)  
**Story Points**: 13

**Tasks**:
- [ ] Create advanced analytics page
- [ ] Implement cohort analysis
- [ ] Add conversion funnel visualization
- [ ] Create geographic heatmap
- [ ] Add school comparison tool
- [ ] Implement predictive analytics (trend forecasting)
- [ ] Add custom date range comparisons
- [ ] Export analytics reports
- [ ] Add real-time analytics stream

**Acceptance Criteria**:
- [x] Cohort analysis shows user behavior
- [x] Funnel shows drop-off points
- [x] Heatmap displays school distribution
- [x] Can compare schools side-by-side
- [x] Forecasts are reasonable
- [x] Custom date ranges work
- [x] Can export reports

---

#### **USER STORY 14.2**: AI-Powered Document Verification
**As a** Panitia  
**I want** AI to help verify documents  
**So that** verification is faster and more accurate

**Priority**: P3 (Low)  
**Story Points**: 13

**Tasks**:
- [ ] Research OCR libraries (Tesseract.js)
- [ ] Implement OCR for document text extraction
- [ ] Create document validation rules (name matching, dates)
- [ ] Add AI-powered quality check (blur detection, completeness)
- [ ] Auto-approve high-confidence documents
- [ ] Flag suspicious documents for manual review
- [ ] Add confidence score display
- [ ] Train/improve model over time

**Acceptance Criteria**:
- [x] OCR extracts text from documents
- [x] Validation rules detect issues
- [x] Quality check identifies problems
- [x] High-confidence docs auto-approve
- [x] Low-confidence docs flag for review
- [x] Confidence score is accurate
- [x] System improves with feedback

---

**SPRINT 14 TOTAL**: 26 Story Points

---

## Ongoing: Maintenance & Improvements

### Continuous Tasks (Every Sprint)

---

#### **USER STORY: Bug Fixes & Technical Debt**
**As a** Developer  
**I want** to fix bugs and reduce technical debt  
**So that** the app remains stable and maintainable

**Priority**: P1 (High)  
**Story Points**: 5 per sprint (reserved)

**Tasks**:
- [ ] Fix reported bugs
- [ ] Refactor code for better maintainability
- [ ] Update dependencies
- [ ] Improve test coverage
- [ ] Optimize performance bottlenecks
- [ ] Update documentation

---

#### **USER STORY: User Feedback & Improvements**
**As a** Product Owner  
**I want** to implement user feedback  
**So that** the product meets user needs

**Priority**: P1 (High)  
**Story Points**: 3 per sprint (reserved)

**Tasks**:
- [ ] Review user feedback
- [ ] Prioritize improvements
- [ ] Implement quick wins
- [ ] Update UI/UX based on feedback
- [ ] Add requested features (small)

---

#### **USER STORY: Security Updates**
**As a** Developer  
**I want** to keep the app secure  
**So that** user data is protected

**Priority**: P0 (Critical)  
**Story Points**: 2 per sprint (reserved)

**Tasks**:
- [ ] Monitor security advisories
- [ ] Update vulnerable packages
- [ ] Review and update security rules
- [ ] Conduct security audits
- [ ] Fix security issues

---

# Story Points Reference

## Complexity Guide

### 1 Point - Trivial (1-2 hours)
- Update text/copy
- Add simple UI component
- Fix minor CSS issue
- Update configuration

### 2 Points - Simple (2-4 hours)
- Add form field
- Create simple page
- Add basic validation
- Simple bug fix

### 3 Points - Moderate (4-8 hours)
- Create new page with logic
- Add feature to existing page
- Integrate third-party library
- Write unit tests

### 5 Points - Complex (1-2 days)
- Build complete feature
- Complex form with validation
- Database schema changes
- Integration with external API

### 8 Points - Very Complex (2-3 days)
- Multi-page feature
- Complex business logic
- Advanced UI component
- Performance optimization

### 13 Points - Epic (3-5 days)
- Large feature with multiple parts
- System-wide changes
- Complex integrations
- Should be broken down

### 21 Points - Too Large
- Must be broken down into smaller stories
- Indicates lack of clarity

---

## Velocity Planning

**Estimated Team Velocity**: 25-35 points per sprint (per developer)

**3 Developers**: 75-105 points per sprint
**4 Developers**: 100-140 points per sprint
**5 Developers**: 125-175 points per sprint

**Buffer**: Reserve 10-15% for bugs, tech debt, and unknowns

---

## Sprint Checklist

### Sprint Planning
- [ ] Review and groom backlog
- [ ] Estimate story points
- [ ] Assign stories to sprint
- [ ] Break down large stories
- [ ] Define acceptance criteria
- [ ] Set sprint goal

### Daily Standups
- [ ] What did I do yesterday?
- [ ] What will I do today?
- [ ] Any blockers?

### Sprint Review
- [ ] Demo completed features
- [ ] Get stakeholder feedback
- [ ] Update product backlog

### Sprint Retrospective
- [ ] What went well?
- [ ] What didn't go well?
- [ ] What can we improve?
- [ ] Action items for next sprint

---

## Definition of Done (DoD)

A story is considered "Done" when:

- [ ] Code is written and reviewed
- [ ] Unit tests are written and passing
- [ ] Integration tests are passing (if applicable)
- [ ] UI is responsive on mobile/tablet/desktop
- [ ] Acceptance criteria are met
- [ ] No critical bugs
- [ ] Code is merged to main branch
- [ ] Deployed to staging environment
- [ ] QA testing is complete
- [ ] Documentation is updated
- [ ] Approved by Product Owner

---

## Risk Management

### High-Risk Stories
Stories with high technical uncertainty or dependencies should be:
1. Tackled early in the sprint
2. Assigned to senior developers
3. Time-boxed with fallback plan
4. Split into smaller stories if possible

### Dependencies
- Identify dependencies during planning
- Ensure blocking stories are completed first
- Communicate dependencies across teams
- Have contingency plans

---

**Document Version**: 1.0  
**Last Updated**: 2024  
**Status**: Ready for Sprint Planning
