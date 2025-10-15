# Sprint 8: Setup Guide - Advanced Verification & Communication

## 🚀 Story 8.1: Email Templates Editor

### Step 1: Install Tiptap

```bash
npm install @tiptap/react @tiptap/starter-kit
```

### Step 2: Create Template Editor Component

**File**: `components/email-editor/TemplateEditor.tsx`

```typescript
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function TemplateEditor({ initialContent, onUpdate }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
  });

  const insertVariable = (variable: string) => {
    editor?.commands.insertContent(`{{${variable}}}`);
  };

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button onClick={() => insertVariable('name')}>{{name}}</button>
        <button onClick={() => insertVariable('school')}>{{school}}</button>
        <button onClick={() => insertVariable('amount')}>{{amount}}</button>
      </div>
      
      <EditorContent editor={editor} className="border p-4 min-h-[400px]" />
    </div>
  );
}
```

### Step 3: Create Templates Page

**File**: `app/(school-admin)/settings/emails/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import TemplateEditor from '@/components/email-editor/TemplateEditor';

export default function EmailTemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('welcome');
  const [content, setContent] = useState('');
  
  const loadTemplate = async (type: string) => {
    const docRef = doc(db, 'schools', schoolId, 'emailTemplates', type);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      setContent(docSnap.data().htmlContent);
    } else {
      // Load default template
      setContent(getDefaultTemplate(type));
    }
  };
  
  const saveTemplate = async () => {
    await setDoc(doc(db, 'schools', schoolId, 'emailTemplates', selectedTemplate), {
      htmlContent: content,
      customized: true,
      updatedAt: new Date(),
    });
  };
  
  return (
    <div>
      <h1>Email Templates</h1>
      
      <select value={selectedTemplate} onChange={(e) => {
        setSelectedTemplate(e.target.value);
        loadTemplate(e.target.value);
      }}>
        <option value="welcome">Welcome Email</option>
        <option value="payment">Payment Confirmation</option>
        <option value="document">Document Status</option>
      </select>
      
      <TemplateEditor initialContent={content} onUpdate={setContent} />
      
      <button onClick={saveTemplate}>Save Template</button>
    </div>
  );
}
```

---

## 🚀 Story 8.2: Broadcast Messaging

### Step 1: Create Broadcast Page

**File**: `app/(school-admin)/announcements/broadcast/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function BroadcastPage() {
  const [filters, setFilters] = useState({ status: [], jalur: [] });
  const [recipientCount, setRecipientCount] = useState(0);
  const [scheduledAt, setScheduledAt] = useState(null);
  
  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
  });
  
  const calculateRecipients = async () => {
    let q = query(collection(db, 'applications'), where('schoolId', '==', schoolId));
    
    if (filters.status.length > 0) {
      q = query(q, where('status', 'in', filters.status));
    }
    
    const snapshot = await getDocs(q);
    setRecipientCount(snapshot.size);
  };
  
  const sendBroadcast = async () => {
    const broadcastData = {
      schoolId,
      title: 'Announcement',
      message: editor?.getHTML(),
      recipients: { filters, count: recipientCount },
      scheduledAt: scheduledAt || null,
      status: scheduledAt ? 'scheduled' : 'sent',
      createdAt: new Date(),
    };
    
    await addDoc(collection(db, 'broadcasts'), broadcastData);
    
    // Queue emails and create notifications
    // ... implementation
  };
  
  return (
    <div>
      <h1>Broadcast Message</h1>
      
      {/* Recipient Filters */}
      <div>
        <h3>Recipients</h3>
        <label>
          <input type="checkbox" value="pending" onChange={(e) => {
            // Update filters
          }} />
          Pending Applications
        </label>
        {/* More filters */}
        <p>Recipients: {recipientCount}</p>
      </div>
      
      {/* Message Composer */}
      <EditorContent editor={editor} />
      
      {/* Schedule */}
      <input
        type="datetime-local"
        value={scheduledAt}
        onChange={(e) => setScheduledAt(e.target.value)}
      />
      
      <button onClick={sendBroadcast}>Send Broadcast</button>
    </div>
  );
}
```

---

## 🚀 Story 8.3: Chat System

### Step 1: Create Chat Schema

```typescript
// lib/chat/schema.ts
export interface Chat {
  id: string;
  participants: string[];
  participantInfo: Record<string, {
    name: string;
    role: string;
    photoUrl?: string;
  }>;
  lastMessage: {
    text: string;
    senderId: string;
    createdAt: Date;
  };
  unreadCount: Record<string, number>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  read: boolean;
  readAt?: Date;
  createdAt: Date;
}
```

### Step 2: Create Chat Component

**File**: `components/chat/ChatInterface.tsx`

```typescript
'use client';

import { useState, useEffect, useRef } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function ChatInterface({ chatId, currentUserId }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  
  useEffect(() => {
    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('createdAt', 'asc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
      
      // Mark messages as read
      snapshot.docs.forEach(doc => {
        if (!doc.data().read && doc.data().senderId !== currentUserId) {
          updateDoc(doc.ref, { read: true, readAt: new Date() });
        }
      });
    });
    
    return () => unsubscribe();
  }, [chatId, currentUserId]);
  
  const sendMessage = async (text: string, attachments?: File[]) => {
    // Upload attachments to Storage
    const attachmentUrls = await uploadAttachments(attachments);
    
    // Add message to Firestore
    await addDoc(collection(db, 'chats', chatId, 'messages'), {
      senderId: currentUserId,
      text,
      attachments: attachmentUrls,
      read: false,
      createdAt: new Date(),
    });
    
    // Update last message in chat
    await updateDoc(doc(db, 'chats', chatId), {
      lastMessage: { text, senderId: currentUserId, createdAt: new Date() },
      updatedAt: new Date(),
    });
    
    // Send notification
    // ... implementation
  };
  
  return (
    <div className="flex flex-col h-full">
      <MessageList messages={messages} currentUserId={currentUserId} />
      {isTyping && <div>Other user is typing...</div>}
      <MessageInput onSend={sendMessage} />
    </div>
  );
}
```

### Step 3: Implement Typing Indicator

```typescript
// In MessageInput component
const handleTyping = () => {
  // Update typing status in Firestore
  updateDoc(doc(db, 'chats', chatId), {
    [`typing.${currentUserId}`]: true,
  });
  
  // Clear after 3 seconds
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    updateDoc(doc(db, 'chats', chatId), {
      [`typing.${currentUserId}`]: false,
    });
  }, 3000);
};
```

---

## ✅ Testing

```bash
# Test email templates
npm run test -- EmailTemplates

# Test broadcast
npm run test -- Broadcast

# Test chat
npm run test -- Chat
```

---

## 🚀 Deployment

```bash
vercel --prod
```

---

**Version**: 1.0  
**Last Updated**: 2024
