# Sprint 7: Form Builder & Email System

## 📋 Sprint Overview

**Duration**: Week 13-14 (2 weeks)  
**Story Points**: 31 SP  
**Team Size**: 4-5 developers  
**Sprint Goal**: Build custom form builder system dan implement comprehensive email communication system

---

## 🎯 Sprint Goals

1. ✅ Implement drag & drop form builder dengan dnd-kit
2. ✅ Create dynamic form renderer untuk custom forms
3. ✅ Setup email system dengan Resend
4. ✅ Build email templates dengan React Email
5. ✅ Implement in-app notification system

---

## 👥 Team Structure & Roles

### Development Team

**👨‍💼 Tech Lead (TL) - 1 person**
- Architecture for form builder system
- Email system integration
- Complex features implementation
- Code review & quality assurance

**👨‍💻 Full Stack Developer 1 (FSD1)**
- Form builder interface
- Drag & drop implementation
- Form renderer component

**👨‍💻 Full Stack Developer 2 (FSD2)**
- Email system setup
- Email templates creation
- Notification system

**🎨 Frontend Developer (FED)**
- Form builder UI/UX
- Email template design
- Notification UI components

**⚙️ DevOps Engineer (DEV) - Part time**
- Email service configuration
- Queue system for emails
- Monitoring setup

**🧪 QA Engineer (QA) - Part time**
- Form builder testing
- Email delivery testing
- Notification testing

---

## 📚 Stories & Tasks

### Story 7.1.1: Form Builder Interface (8 SP)
**Assigned**: TL + FSD1  
**Duration**: 2 days

#### Tasks:
1. **Task 7.1.1.1**: Install & Setup dnd-kit (FSD1, 1h)
2. **Task 7.1.1.2**: Create Form Builder Page UI (FSD1, 3h)
3. **Task 7.1.1.3**: Implement Field Palette Component (FSD1, 2h)
4. **Task 7.1.1.4**: Implement Form Canvas (Drop Zone) (TL, 3h)
5. **Task 7.1.1.5**: Create Field Property Editor (FSD1, 4h)
6. **Task 7.1.1.6**: Add Section Management (FSD1, 2h)
7. **Task 7.1.1.7**: Implement Conditional Logic Builder (TL, 4h)
8. **Task 7.1.1.8**: Add Preview Mode (FSD1, 2h)
9. **Task 7.1.1.9**: Save Form Configuration (FSD1, 2h)

**Deliverables**:
- Form builder page functional
- Drag & drop working smoothly
- Field properties editable
- Form configuration saved to Firestore

**Acceptance Criteria**:
- ✅ Can drag fields from palette to canvas
- ✅ Can reorder fields
- ✅ Can edit field properties (label, placeholder, validation)
- ✅ Can add multiple sections/tabs
- ✅ Can set conditional visibility rules
- ✅ Preview shows actual form
- ✅ Form config saved in `schools/{schoolId}/formTemplates/{templateId}`

---

### Story 7.1.2: Form Renderer (Dynamic Form) (5 SP)
**Assigned**: FSD1 + FED  
**Duration**: 1.5 days

#### Tasks:
1. **Task 7.1.2.1**: Create Dynamic Form Renderer Component (FSD1, 3h)
2. **Task 7.1.2.2**: Implement All Field Types (FSD1, 4h)
3. **Task 7.1.2.3**: Apply Validation Rules (FSD1, 2h)
4. **Task 7.1.2.4**: Handle Conditional Visibility (FSD1, 3h)
5. **Task 7.1.2.5**: Implement Auto-save for Drafts (FSD1, 2h)
6. **Task 7.1.2.6**: Handle Form Submission (FSD1, 2h)

**Deliverables**:
- Dynamic form component
- All field types rendering correctly
- Form data saved to applications.formData.customFields

**Acceptance Criteria**:
- ✅ Custom form renders from config
- ✅ All field types work (text, number, select, radio, checkbox, textarea, file, date)
- ✅ Validation rules enforced
- ✅ Conditional fields show/hide correctly
- ✅ Draft auto-saves every 30 seconds
- ✅ Data saved in correct Firestore structure

---

### Story 7.2: Email System Setup (Resend) (8 SP)
**Assigned**: TL + FSD2  
**Duration**: 2 days

#### Tasks:
1. **Task 7.2.1**: Create Resend Account & Get API Key (TL, 30min)
2. **Task 7.2.2**: Install Resend & React Email Packages (FSD2, 30min)
3. **Task 7.2.3**: Create Email Utility Functions (FSD2, 2h)
4. **Task 7.2.4**: Create Welcome Email Template (FSD2, 1h)
5. **Task 7.2.5**: Create Email Verification Template (FSD2, 1h)
6. **Task 7.2.6**: Create Password Reset Template (FSD2, 1h)
7. **Task 7.2.7**: Create Payment Confirmation Template (FSD2, 1h)
8. **Task 7.2.8**: Create Document Status Template (FSD2, 1h)
9. **Task 7.2.9**: Create Selection Result Template (FSD2, 1h)
10. **Task 7.2.10**: Implement Email Queue System (TL, 3h)
11. **Task 7.2.11**: Create Background Job for Email Processing (TL, 3h)
12. **Task 7.2.12**: Add Email Logging (FSD2, 2h)

**Deliverables**:
- Resend configured
- 6+ email templates
- Email queue system
- Background job for processing
- Email logs in Firestore

**Acceptance Criteria**:
- ✅ Resend API configured correctly
- ✅ Can send emails successfully
- ✅ Templates render correctly in email clients
- ✅ Emails queued in `email_queue` collection
- ✅ Background job processes queue
- ✅ Email logs created in `email_logs` collection
- ✅ Can track delivery status

---

### Story 7.3: Notification System (In-app) (5 SP)
**Assigned**: FSD2 + FED  
**Duration**: 1.5 days

#### Tasks:
1. **Task 7.3.1**: Create Notification Icon Component (FED, 2h)
2. **Task 7.3.2**: Create Notification Dropdown (FED, 3h)
3. **Task 7.3.3**: Implement Real-time Listener (FSD2, 2h)
4. **Task 7.3.4**: Create Notification Badge (FED, 1h)
5. **Task 7.3.5**: Add Mark as Read Functionality (FSD2, 2h)
6. **Task 7.3.6**: Create Notifications Page (FED, 2h)
7. **Task 7.3.7**: Implement Notification Helper (FSD2, 2h)
8. **Task 7.3.8**: Add Notifications on Key Events (FSD2, 3h)

**Deliverables**:
- Notification icon in header
- Dropdown with recent notifications
- Real-time updates
- Notifications page

**Acceptance Criteria**:
- ✅ Notification icon shows unread count
- ✅ Dropdown shows recent 5 notifications
- ✅ Notifications update in real-time
- ✅ Can mark as read (individual & all)
- ✅ Notifications page shows all history
- ✅ Notifications created on events:
  - New application submitted
  - Payment received
  - Document verified/rejected
  - Selection result announced

---

### Story 7.4: Email Templates (Additional) (5 SP)
**Assigned**: FSD2 + FED  
**Duration**: 1.5 days

#### Tasks:
1. **Task 7.4.1**: Create Application Received Template (FSD2, 1h)
2. **Task 7.4.2**: Create Document Uploaded Template (FSD2, 1h)
3. **Task 7.4.3**: Create Verification Reminder Template (FSD2, 1h)
4. **Task 7.4.4**: Create Payment Reminder Template (FSD2, 1h)
5. **Task 7.4.5**: Create Interview Schedule Template (FSD2, 1h)
6. **Task 7.4.6**: Create Waitlist Notification Template (FSD2, 1h)
7. **Task 7.4.7**: Test All Templates in Various Clients (QA, 2h)
8. **Task 7.4.8**: Document Email Variables (FSD2, 1h)

**Deliverables**:
- 6+ additional email templates
- Template documentation
- Tested in major email clients

**Acceptance Criteria**:
- ✅ All templates render correctly
- ✅ Templates support variables ({{name}}, {{school}}, etc.)
- ✅ Tested in Gmail, Outlook, Apple Mail
- ✅ Responsive on mobile devices
- ✅ Proper fallbacks for unsupported clients
- ✅ Documentation complete

---

## 🛠️ Tech Stack

### New Libraries/Services

| Library/Service | Purpose | Version |
|----------------|---------|---------|
| `@dnd-kit/core` | Drag & drop functionality | ^6.0.8 |
| `@dnd-kit/sortable` | Sortable lists | ^8.0.0 |
| `@dnd-kit/utilities` | DnD utilities | ^3.2.2 |
| `resend` | Email sending service | ^3.0.0 |
| `@react-email/components` | Email templates | ^0.0.11 |
| `zod` | Form validation | ^3.22.4 |
| `react-hook-form` | Form state management | ^7.48.2 |

### Existing Stack
- Next.js 14 (App Router)
- TypeScript 5+
- Tailwind CSS
- shadcn/ui
- Firebase (Firestore, Auth, Storage)

---

## 📐 Architecture

### Form Builder Architecture

```
Form Builder Flow:
1. School Admin creates form template
2. Drag & drop fields to canvas
3. Configure field properties
4. Set conditional logic
5. Preview form
6. Save to Firestore: schools/{schoolId}/formTemplates/{templateId}

Form Rendering Flow:
1. Student starts application
2. Fetch form template for period
3. Render dynamic form based on config
4. Apply validation rules
5. Show/hide conditional fields
6. Auto-save draft every 30s
7. Submit: Save to applications/{applicationId}/formData.customFields
```

### Email System Architecture

```
Email Sending Flow:
1. Event triggers email (payment received, etc.)
2. Create email job in email_queue collection
3. Background Cloud Function processes queue
4. Send email via Resend API
5. Log result in email_logs collection
6. Update email_queue status (sent/failed)
7. Retry failed emails (max 3 attempts)
```

### Notification System Architecture

```
Notification Flow:
1. Event triggers notification
2. Create notification doc in notifications collection
3. Real-time listener updates UI
4. Show badge count (unread)
5. User clicks to view
6. Mark as read (update Firestore)
7. Notification history preserved
```

---

## 📊 Database Schema Changes

### New Collections

#### formTemplates
```typescript
{
  id: string;
  schoolId: string;
  periodId?: string; // Optional, null for reusable templates
  name: string;
  description?: string;
  version: number;
  status: 'draft' | 'active' | 'archived';
  config: {
    sections: Array<{
      id: string;
      title: string;
      description?: string;
      fields: Array<{
        id: string;
        type: 'text' | 'number' | 'email' | 'select' | 'radio' | 'checkbox' | 'textarea' | 'file' | 'date';
        label: string;
        placeholder?: string;
        defaultValue?: any;
        required: boolean;
        validation?: {
          min?: number;
          max?: number;
          pattern?: string;
          message?: string;
        };
        options?: Array<{ label: string; value: string }>;
        conditionalLogic?: {
          show: boolean; // true = show if match, false = hide if match
          rules: Array<{
            fieldId: string;
            operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
            value: any;
          }>;
          logic: 'and' | 'or';
        };
      }>;
    }>;
  };
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

#### email_queue
```typescript
{
  id: string;
  to: string | string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  template: string; // Template identifier
  variables: Record<string, any>;
  priority: 'high' | 'normal' | 'low';
  status: 'pending' | 'processing' | 'sent' | 'failed';
  attempts: number;
  maxAttempts: number;
  error?: string;
  scheduledAt?: Timestamp; // For scheduled emails
  processedAt?: Timestamp;
  sentAt?: Timestamp;
  createdAt: Timestamp;
}
```

#### email_logs
```typescript
{
  id: string;
  queueId: string;
  to: string;
  subject: string;
  template: string;
  status: 'delivered' | 'bounced' | 'complained' | 'failed';
  provider: 'resend';
  providerId?: string; // Provider's message ID
  response?: any;
  error?: string;
  sentAt: Timestamp;
  deliveredAt?: Timestamp;
}
```

#### notifications
```typescript
{
  id: string;
  userId: string;
  schoolId?: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  icon?: string;
  link?: string; // URL to navigate on click
  read: boolean;
  readAt?: Timestamp;
  createdAt: Timestamp;
  expiresAt?: Timestamp; // Optional, for auto-expiring notifications
}
```

### Modified Collections

#### applications
Add `formData.customFields`:
```typescript
{
  // ... existing fields
  formData: {
    // ... existing fields
    customFields: Record<string, any>; // Dynamic data from custom form
  }
}
```

#### ppdb_periods
Add `formTemplateId`:
```typescript
{
  // ... existing fields
  formTemplateId?: string; // Reference to formTemplates collection
}
```

---

## 🔒 Security Rules

### Firestore Security Rules

```javascript
// formTemplates
match /schools/{schoolId}/formTemplates/{templateId} {
  allow read: if request.auth != null;
  allow write: if request.auth != null && 
               request.auth.token.schoolId == schoolId &&
               (request.auth.token.role == 'school_admin' || 
                request.auth.token.role == 'super_admin');
}

// email_queue (internal only)
match /email_queue/{queueId} {
  allow read, write: if request.auth.token.role == 'super_admin';
}

// email_logs (admin only)
match /email_logs/{logId} {
  allow read: if request.auth != null && 
              (request.auth.token.role == 'super_admin' ||
               request.auth.token.role == 'school_admin');
  allow write: if false; // Only Cloud Functions can write
}

// notifications
match /notifications/{notificationId} {
  allow read: if request.auth != null && 
              resource.data.userId == request.auth.uid;
  allow update: if request.auth != null && 
                resource.data.userId == request.auth.uid &&
                request.resource.data.diff(resource.data).affectedKeys()
                  .hasOnly(['read', 'readAt']);
  allow write: if false; // Only server can create
}
```

---

## 🎨 UI/UX Requirements

### Form Builder Interface
- Drag & drop should be smooth (60fps)
- Visual feedback during drag
- Undo/redo functionality
- Keyboard shortcuts
- Responsive on tablet (minimum)

### Email Templates
- Mobile-responsive
- Dark mode support (where applicable)
- Accessible (WCAG 2.1 AA)
- Proper fallbacks for old email clients

### Notifications
- Non-intrusive
- Auto-dismiss after 5s (optional)
- Toast notifications for important events
- Badge shows unread count

---

## ✅ Sprint 7 Acceptance Criteria

### Form Builder
- ✅ School admin can create custom forms
- ✅ All field types available
- ✅ Conditional logic works
- ✅ Preview shows exact form
- ✅ Form saves and loads correctly

### Email System
- ✅ Emails sent successfully
- ✅ Templates render in all major clients
- ✅ Queue system processes emails
- ✅ Failed emails retry
- ✅ Logs track delivery

### Notifications
- ✅ Real-time updates
- ✅ Unread count accurate
- ✅ Mark as read works
- ✅ Notification history accessible

---

## 🧪 Testing Requirements

### Form Builder Tests
- Unit tests for form builder logic
- Integration tests for drag & drop
- E2E tests for complete form creation flow

### Email Tests
- Template rendering tests
- Queue processing tests
- Delivery tracking tests
- Retry logic tests

### Notification Tests
- Real-time listener tests
- Badge count tests
- Mark as read tests

---

## 📈 Success Metrics

### Form Builder
- Form creation time < 10 minutes
- 80%+ schools create custom forms
- 0 data loss incidents

### Email System
- Email delivery rate > 95%
- Average send time < 5 seconds
- Queue processing < 1 minute

### Notifications
- Real-time latency < 1 second
- 0 missed notifications
- User engagement > 70%

---

## 🚀 Deployment Strategy

1. Deploy form builder (feature flag)
2. Test with pilot schools
3. Deploy email system
4. Test email delivery
5. Deploy notifications
6. Monitor for 48 hours
7. Enable for all users

---

**Sprint Status**: 🚀 Ready to Start  
**Version**: 1.0  
**Last Updated**: 2024
