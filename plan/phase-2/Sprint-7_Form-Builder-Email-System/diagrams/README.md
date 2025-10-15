# Sprint 7 - Architecture Diagrams

## 📐 Diagram Overview

Sprint 7 introduces:
1. **Form Builder System** - Drag & drop form creation
2. **Email System** - Queue-based email delivery
3. **Notification System** - Real-time in-app notifications

---

## 🏗️ Form Builder Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Form Builder Flow                          │
└─────────────────────────────────────────────────────────┘

School Admin
     │
     ├─> 1. Open Form Builder Page
     │        /forms/builder
     │
     ├─> 2. Drag Field from Palette
     │        (Text, Number, Select, etc.)
     │
     ├─> 3. Drop on Canvas
     │        dnd-kit handles drag & drop
     │
     ├─> 4. Configure Field Properties
     │        - Label, placeholder
     │        - Validation rules
     │        - Conditional logic
     │
     ├─> 5. Add More Fields & Sections
     │
     ├─> 6. Preview Form
     │        See how students will see it
     │
     └─> 7. Save Template
              Firestore: schools/{schoolId}/formTemplates/{id}


┌─────────────────────────────────────────────────────────┐
│              Form Rendering Flow                        │
└─────────────────────────────────────────────────────────┘

Student
     │
     ├─> 1. Start Application
     │        /application
     │
     ├─> 2. Fetch Form Template
     │        From Firestore based on periodId
     │
     ├─> 3. DynamicFormRenderer Component
     │        - Reads form config
     │        - Renders all field types
     │        - Applies validation
     │        - Handles conditional logic
     │
     ├─> 4. Fill Form
     │        Auto-save every 30 seconds
     │
     └─> 5. Submit
              Data saved to applications/{id}/formData.customFields
```

---

## 📧 Email System Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Email Sending Flow                         │
└─────────────────────────────────────────────────────────┘

Event Trigger
(Payment received, Document verified, etc.)
     │
     ├─> 1. queueEmail()
     │        Create job in email_queue collection
     │        {
     │          to: "student@email.com",
     │          subject: "Payment Received",
     │          template: "payment-confirmation",
     │          variables: { name, amount, ... }
     │        }
     │
     ├─> 2. Cloud Function Scheduled Job
     │        Runs every 1 minute
     │        Firebase Functions: processEmailQueue
     │
     ├─> 3. Fetch Pending Emails
     │        WHERE status = 'pending'
     │        AND attempts < 3
     │        LIMIT 10
     │
     ├─> 4. Send via Resend API
     │        resend.emails.send({
     │          from: 'PPDB <noreply@ppdb.id>',
     │          to: recipient,
     │          react: EmailTemplate
     │        })
     │
     ├─> 5. Update Status
     │        email_queue: status = 'sent'
     │
     ├─> 6. Log Result
     │        email_logs: { status, sentAt, ... }
     │
     └─> 7. Retry on Failure
              Increment attempts
              Retry max 3 times


┌─────────────────────────────────────────────────────────┐
│              Email Templates                            │
└─────────────────────────────────────────────────────────┘

React Email Components
     ├─> WelcomeEmail.tsx
     ├─> EmailVerification.tsx
     ├─> PasswordReset.tsx
     ├─> PaymentConfirmation.tsx
     ├─> DocumentStatus.tsx
     ├─> SelectionResult.tsx
     ├─> ApplicationReceived.tsx
     ├─> PaymentReminder.tsx
     └─> InterviewSchedule.tsx

Each template:
- Uses @react-email/components
- Renders HTML for email clients
- Supports variables: {{name}}, {{schoolName}}, etc.
- Responsive design
- Tested in Gmail, Outlook, Apple Mail
```

---

## 🔔 Notification System Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Notification Flow                          │
└─────────────────────────────────────────────────────────┘

Event Trigger
(New application, Payment received, etc.)
     │
     ├─> 1. createNotification()
     │        Add to notifications collection
     │        {
     │          userId: "user123",
     │          type: "success",
     │          title: "Payment Received",
     │          message: "Your payment has been confirmed",
     │          read: false
     │        }
     │
     ├─> 2. Firestore Real-time Listener
     │        onSnapshot() in NotificationDropdown
     │        WHERE userId = current user
     │        ORDER BY createdAt DESC
     │
     ├─> 3. UI Updates Automatically
     │        - Badge shows unread count
     │        - Dropdown shows recent 5
     │        - New notification appears instantly
     │
     ├─> 4. User Clicks Notification
     │        Optional: Navigate to link
     │
     └─> 5. Mark as Read
              Update: { read: true, readAt: now }


┌─────────────────────────────────────────────────────────┐
│              Notification UI Components                 │
└─────────────────────────────────────────────────────────┘

Header
  └─> NotificationDropdown
       ├─> Icon (🔔)
       ├─> Badge (unread count)
       └─> Dropdown
            ├─> Recent 5 notifications
            ├─> Mark all as read
            └─> View all link

/notifications
  └─> NotificationsPage
       ├─> All notifications
       ├─> Filter (read/unread)
       └─> Pagination
```

---

## 🗄️ Database Collections

### formTemplates
```
schools/{schoolId}/formTemplates/{templateId}
├── id: string
├── name: string
├── status: 'draft' | 'active' | 'archived'
├── config: {
│   sections: [
│     {
│       id: string,
│       title: string,
│       fields: [
│         {
│           id: string,
│           type: 'text' | 'number' | 'select' | ...,
│           label: string,
│           required: boolean,
│           validation: {...},
│           conditionalLogic: {...}
│         }
│       ]
│     }
│   ]
│ }
├── createdAt: Timestamp
└── updatedAt: Timestamp
```

### email_queue
```
email_queue/{queueId}
├── to: string | string[]
├── subject: string
├── template: string
├── variables: Record<string, any>
├── status: 'pending' | 'sent' | 'failed'
├── attempts: number
├── error?: string
├── createdAt: Timestamp
└── sentAt?: Timestamp
```

### email_logs
```
email_logs/{logId}
├── queueId: string
├── to: string
├── status: 'delivered' | 'bounced' | 'failed'
├── providerId: string (Resend message ID)
├── sentAt: Timestamp
└── error?: string
```

### notifications
```
notifications/{notificationId}
├── userId: string (indexed)
├── type: 'info' | 'success' | 'warning' | 'error'
├── title: string
├── message: string
├── link?: string
├── read: boolean (indexed)
├── readAt?: Timestamp
└── createdAt: Timestamp (indexed)
```

---

## 🔒 Security Considerations

### Form Builder
- Only school admin can create/edit forms
- Form configs validated before saving
- XSS prevention in form rendering

### Email System
- API key stored securely in environment
- Email queue only accessible by Cloud Functions
- Rate limiting to prevent spam

### Notifications
- Users can only see their own notifications
- Server-side creation only
- No sensitive data in notification body

---

## 📊 Performance Optimizations

### Form Builder
- Virtualized lists for large forms
- Debounced auto-save
- Optimistic UI updates

### Email System
- Batch processing (10 emails/minute)
- Queue prevents overwhelming API
- Retry mechanism for failures

### Notifications
- Indexed Firestore queries
- Limit real-time listeners
- Pagination for history

---

**Version**: 1.0  
**Last Updated**: 2024
