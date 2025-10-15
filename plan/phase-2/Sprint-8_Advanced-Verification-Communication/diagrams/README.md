# Sprint 8 - Architecture Diagrams

## 📧 Email Templates Editor Architecture

```
┌─────────────────────────────────────────────────────────┐
│          Email Templates Editor Flow                    │
└─────────────────────────────────────────────────────────┘

School Admin
     │
     ├─> 1. Navigate to Settings > Emails
     │
     ├─> 2. Select Template Type
     │        (Welcome, Payment, Document Status, etc.)
     │
     ├─> 3. Load Template
     │        - Check for custom template
     │        - Fallback to default if not customized
     │
     ├─> 4. Edit Content (Tiptap Editor)
     │        - Rich text formatting
     │        - Bold, italic, links, lists
     │
     ├─> 5. Insert Variables
     │        Click button to insert: {{name}}, {{school}}, {{amount}}
     │
     ├─> 6. Preview
     │        See how email will look with sample data
     │
     ├─> 7. Test Send
     │        Send to admin's email for testing
     │
     └─> 8. Save Template
              Firestore: schools/{schoolId}/emailTemplates/{type}
```

---

## 📢 Broadcast Messaging Architecture

```
┌─────────────────────────────────────────────────────────┐
│          Broadcast Messaging Flow                       │
└─────────────────────────────────────────────────────────┘

School Admin
     │
     ├─> 1. Navigate to Announcements > Broadcast
     │
     ├─> 2. Compose Message
     │        Rich text editor (Tiptap)
     │
     ├─> 3. Filter Recipients
     │        ├─> By Status: pending, verified, paid, selected
     │        ├─> By Jalur: zonasi, prestasi, perpindahan
     │        └─> By Period: 2024/2025
     │
     ├─> 4. Calculate Recipient Count
     │        Query Firestore with filters
     │        Display: "Will be sent to 150 applicants"
     │
     ├─> 5. Schedule (Optional)
     │        Select date & time for delayed send
     │
     ├─> 6. Send Broadcast
     │        ├─> Create broadcast record
     │        ├─> Queue emails for each recipient
     │        └─> Create in-app notification for each
     │
     └─> 7. View History
              See all past broadcasts


Background Job (Scheduled Broadcasts):
every 5 minutes
  └─> Check broadcasts WHERE status='scheduled' AND scheduledAt <= now
       └─> Process each: queue emails + create notifications
```

---

## 💬 Chat System Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Chat System Flow                           │
└─────────────────────────────────────────────────────────┘

Student <────────────────────────────────> School Admin
   │                                              │
   ├─> 1. Click "Chat with School"               │
   │                                              │
   ├─> 2. Check if chat exists                   │
   │        Query: chats WHERE participants       │
   │                contains [studentId, adminId] │
   │                                              │
   ├─> 3. Create chat if not exists              │
   │        chats/{chatId}                        │
   │                                              │
   ├─> 4. Subscribe to Real-time Listener        │
   │        onSnapshot(chats/{chatId}/messages)   │
   │                                              │
   ├─> 5. Type Message                           ├─> Sees "Student is typing..."
   │        Update: chats/{chatId}/typing         │
   │                                              │
   ├─> 6. Send Message                           │
   │        ├─> Add to messages subcollection    │
   │        ├─> Update lastMessage in chat       │
   │        └─> Send notification                │
   │                                              │
   │   <── Message appears instantly ──────────> ├─> Message received
   │                                              │
   │                                              ├─> Mark as Read
   │                                              │    Update: message.read = true
   │                                              │
   ├─> 7. Attach File                            │
   │        ├─> Upload to Storage                │
   │        ├─> Get download URL                 │
   │        └─> Send message with attachment     │
   │                                              │
   │   <── File received ────────────────────────┤


Firestore Structure:

chats/{chatId}
├── participants: [studentId, adminId]
├── participantInfo: {
│     studentId: { name, role, photoUrl },
│     adminId: { name, role, photoUrl }
│   }
├── lastMessage: {
│     text: "Hello...",
│     senderId: studentId,
│     createdAt: Timestamp
│   }
├── unreadCount: {
│     studentId: 0,
│     adminId: 2
│   }
├── typing: {
│     studentId: false,
│     adminId: true
│   }
└── updatedAt: Timestamp

chats/{chatId}/messages/{messageId}
├── senderId: string
├── text: string
├── attachments?: [
│     { name: "file.pdf", url: "https://...", type: "application/pdf" }
│   ]
├── read: boolean
├── readAt?: Timestamp
└── createdAt: Timestamp
```

---

## 🔒 Security Rules

```javascript
// Email Templates
match /schools/{schoolId}/emailTemplates/{type} {
  allow read: if request.auth != null;
  allow write: if request.auth != null &&
               request.auth.token.schoolId == schoolId &&
               request.auth.token.role == 'school_admin';
}

// Broadcasts
match /broadcasts/{broadcastId} {
  allow read: if request.auth != null &&
              request.auth.token.schoolId == resource.data.schoolId;
  allow write: if request.auth != null &&
               request.auth.token.role == 'school_admin';
}

// Chats
match /chats/{chatId} {
  allow read: if request.auth != null &&
              request.auth.uid in resource.data.participants;
  allow create: if request.auth != null;
  allow update: if request.auth != null &&
                request.auth.uid in resource.data.participants;
}

// Messages
match /chats/{chatId}/messages/{messageId} {
  allow read: if request.auth != null &&
              request.auth.uid in get(/databases/$(database)/documents/chats/$(chatId)).data.participants;
  allow create: if request.auth != null &&
                request.auth.uid in get(/databases/$(database)/documents/chats/$(chatId)).data.participants;
  allow update: if request.auth != null &&
                request.resource.data.diff(resource.data).affectedKeys()
                  .hasOnly(['read', 'readAt']);
}
```

---

## 📊 Performance Optimizations

### Email Templates
- Cache default templates in memory
- Debounce editor updates
- Preview in iframe for isolation

### Broadcast
- Batch email queueing (100 at a time)
- Index filters for fast queries
- Schedule large broadcasts

### Chat
- Limit messages loaded (50 at a time)
- Pagination for history
- Compress file attachments before upload

---

**Version**: 1.0  
**Last Updated**: 2024
