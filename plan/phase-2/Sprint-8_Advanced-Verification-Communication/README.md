# Sprint 8: Advanced Verification & Communication

## 📋 Sprint Overview

**Duration**: Week 15-16 (2 weeks)  
**Story Points**: 21 SP  
**Team Size**: 4-5 developers  
**Sprint Goal**: Enhance communication tools dengan email templates editor, broadcast messaging, dan real-time chat system

---

## 🎯 Sprint Goals

1. ✅ Build email templates editor untuk school customization
2. ✅ Implement broadcast messaging system
3. ✅ Create real-time chat between admin dan student
4. ✅ Enhance document verification workflow

---

## 👥 Team Structure & Roles

**👨‍💼 Tech Lead (TL)** - Real-time chat architecture & WebSocket setup  
**👨‍💻 Full Stack Developer 1 (FSD1)** - Email templates editor & broadcast system  
**👨‍💻 Full Stack Developer 2 (FSD2)** - Chat implementation  
**🎨 Frontend Developer (FED)** - UI for editor, chat, broadcast  
**🧪 QA Engineer (QA)** - Testing all features  

---

## 📚 Stories & Tasks

### Story 8.1: Email Templates Editor (8 SP)
**Assigned**: FSD1 + FED  
**Duration**: 2 days

#### Tasks:
1. **Task 8.1.1**: Create Templates List Page (FED, 2h)
2. **Task 8.1.2**: Setup Tiptap Rich Text Editor (FSD1, 2h)
3. **Task 8.1.3**: Create Template Editor Component (FSD1, 3h)
4. **Task 8.1.4**: Implement Variable Insertion (FSD1, 2h)
5. **Task 8.1.5**: Build Preview Functionality (FSD1, 2h)
6. **Task 8.1.6**: Add Test Send Feature (FSD1, 2h)
7. **Task 8.1.7**: Save Custom Templates per School (FSD1, 2h)
8. **Task 8.1.8**: Implement Fallback Logic (FSD1, 1h)

**Deliverables**:
- Email templates editor page
- Rich text editor dengan variable support
- Preview & test send
- Custom templates saved per school

**Acceptance Criteria**:
- ✅ Can view all email templates
- ✅ Can edit template content with rich text
- ✅ Can insert variables ({{name}}, {{school}}, etc.)
- ✅ Preview renders variables correctly
- ✅ Can send test email
- ✅ Custom templates saved to Firestore
- ✅ Falls back to default if not customized

---

### Story 8.2: Broadcast Messaging (5 SP)
**Assigned**: FSD1 + FED  
**Duration**: 1.5 days

#### Tasks:
1. **Task 8.2.1**: Create Broadcast Page UI (FED, 2h)
2. **Task 8.2.2**: Build Message Composer (FED, 2h)
3. **Task 8.2.3**: Implement Recipient Filter (FSD1, 3h)
4. **Task 8.2.4**: Add Recipient Count Display (FSD1, 1h)
5. **Task 8.2.5**: Implement Schedule Send (FSD1, 2h)
6. **Task 8.2.6**: Send via Email + In-app (FSD1, 3h)
7. **Task 8.2.7**: Add Broadcast Logging (FSD1, 1h)
8. **Task 8.2.8**: Show Broadcast History (FED, 2h)

**Deliverables**:
- Broadcast messaging page
- Rich text message composer
- Recipient filtering
- Schedule & send functionality
- Broadcast history

**Acceptance Criteria**:
- ✅ Can compose message with rich text
- ✅ Can filter recipients (by status, jalur, etc.)
- ✅ Recipient count accurate
- ✅ Can schedule for later
- ✅ Message sent to all filtered users
- ✅ Both email + in-app notification sent
- ✅ Broadcast logged in audit_logs
- ✅ History viewable

---

### Story 8.3: Chat System (Admin-Student) (8 SP)
**Assigned**: TL + FSD2 + FED  
**Duration**: 2 days

#### Tasks:
1. **Task 8.3.1**: Design Chat Schema (TL, 1h)
2. **Task 8.3.2**: Create Chat Page for Student (FED, 3h)
3. **Task 8.3.3**: Create Chat Page for Admin (FED, 3h)
4. **Task 8.3.4**: Implement Firestore Real-time Chat (FSD2, 4h)
5. **Task 8.3.5**: Build Message List Component (FED, 2h)
6. **Task 8.3.6**: Build Message Input Component (FED, 2h)
7. **Task 8.3.7**: Add File Attachment Support (FSD2, 3h)
8. **Task 8.3.8**: Implement Typing Indicator (FSD2, 2h)
9. **Task 8.3.9**: Add Read Receipts (FSD2, 2h)
10. **Task 8.3.10**: Send Notification for New Messages (FSD2, 1h)

**Deliverables**:
- Chat interface for students
- Chat interface for admins
- Real-time messaging
- File attachments
- Typing indicators & read receipts

**Acceptance Criteria**:
- ✅ Messages appear in real-time
- ✅ Can send text messages
- ✅ Can attach files
- ✅ Typing indicator shows when typing
- ✅ Read receipts show message status
- ✅ Notification sent for new messages
- ✅ Chat history preserved

---

## 🛠️ Tech Stack

### New Libraries

| Library | Purpose | Version |
|---------|---------|---------|
| `@tiptap/react` | Rich text editor | ^2.1.13 |
| `@tiptap/starter-kit` | Tiptap extensions | ^2.1.13 |
| `date-fns` | Date formatting | ^2.30.0 |

---

## 📐 Architecture

### Email Templates System
```
School Admin
  └─> Edit Template
       ├─> Select template type
       ├─> Edit content (Tiptap)
       ├─> Insert variables
       ├─> Preview
       ├─> Test send
       └─> Save to schools/{schoolId}/emailTemplates/{type}

Email Sending
  └─> Check custom template exists?
       ├─> Yes: Use custom template
       └─> No: Use default template
```

### Broadcast System
```
School Admin
  └─> Create Broadcast
       ├─> Compose message
       ├─> Filter recipients
       ├─> Schedule (optional)
       └─> Send
            ├─> Queue emails
            └─> Create notifications
```

### Chat System
```
Firestore Structure:
chats/{chatId}
  ├── participants: [studentId, adminId]
  ├── lastMessage: {...}
  ├── unreadCount: { studentId: 0, adminId: 1 }
  └── updatedAt: Timestamp

chats/{chatId}/messages/{messageId}
  ├── senderId: string
  ├── text: string
  ├── attachments?: File[]
  ├── read: boolean
  ├── createdAt: Timestamp
```

---

## 📊 Database Schema Changes

### New Collections

#### emailTemplates
```typescript
schools/{schoolId}/emailTemplates/{type}
{
  type: 'welcome' | 'payment-confirmation' | 'document-status' | ...;
  subject: string;
  htmlContent: string; // From Tiptap editor
  variables: string[]; // Available variables
  customized: boolean;
  updatedBy: string;
  updatedAt: Timestamp;
}
```

#### broadcasts
```typescript
broadcasts/{broadcastId}
{
  schoolId: string;
  title: string;
  message: string;
  recipients: {
    filters: {
      status?: string[];
      jalur?: string[];
      periodId?: string;
    };
    count: number;
  };
  scheduledAt?: Timestamp;
  sentAt?: Timestamp;
  status: 'draft' | 'scheduled' | 'sent';
  createdBy: string;
  createdAt: Timestamp;
}
```

#### chats
```typescript
chats/{chatId}
{
  participants: string[]; // [studentId, adminId]
  participantInfo: {
    [userId]: {
      name: string;
      role: string;
      photoUrl?: string;
    };
  };
  lastMessage: {
    text: string;
    senderId: string;
    createdAt: Timestamp;
  };
  unreadCount: {
    [userId]: number;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

#### messages
```typescript
chats/{chatId}/messages/{messageId}
{
  senderId: string;
  text: string;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
  read: boolean;
  readAt?: Timestamp;
  createdAt: Timestamp;
}
```

---

## ✅ Sprint 8 Acceptance Criteria

### Email Templates Editor
- ✅ Can edit all template types
- ✅ Rich text editing works
- ✅ Variable insertion functional
- ✅ Preview accurate
- ✅ Test emails delivered
- ✅ Custom templates saved

### Broadcast Messaging
- ✅ Can compose rich text messages
- ✅ Filters work correctly
- ✅ Recipient count accurate
- ✅ Scheduled broadcasts send on time
- ✅ All recipients receive message
- ✅ History accessible

### Chat System
- ✅ Real-time messaging works
- ✅ File attachments functional
- ✅ Typing indicator shows
- ✅ Read receipts accurate
- ✅ Notifications sent
- ✅ Chat history preserved

---

## 🧪 Testing Requirements

### Email Templates
- Template editing tests
- Variable replacement tests
- Preview rendering tests
- Test send functionality

### Broadcast
- Recipient filtering tests
- Scheduled send tests
- Delivery tests

### Chat
- Real-time message tests
- File upload tests
- Read receipt tests
- Notification tests

---

## 📈 Success Metrics

### Email Templates
- Customization rate > 60%
- Template edit time < 5 minutes
- Preview accuracy 100%

### Broadcast
- Delivery rate > 95%
- Average compose time < 3 minutes
- Scheduled accuracy 100%

### Chat
- Message latency < 500ms
- File upload success > 98%
- User engagement > 50%

---

**Sprint Status**: 🚀 Ready to Start  
**Version**: 1.0  
**Last Updated**: 2024
