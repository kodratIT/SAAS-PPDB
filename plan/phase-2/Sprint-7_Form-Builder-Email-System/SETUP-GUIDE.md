# Sprint 7: Form Builder & Email System - Setup Guide

## 📋 Prerequisites

Before starting Sprint 7:
- ✅ Phase 1 MVP completed
- ✅ Node.js 18+ installed
- ✅ Firebase project configured
- ✅ Development environment setup

---

## 🚀 Story 7.1.1: Form Builder Interface (8 SP)

### Step 1: Install & Setup dnd-kit

```bash
# Install dnd-kit packages
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# Install form packages
npm install react-hook-form zod @hookform/resolvers
```

### Step 2: Create Form Builder Page

**File**: `app/(school-admin)/forms/builder/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import FieldPalette from '@/components/form-builder/FieldPalette';
import FormCanvas from '@/components/form-builder/FormCanvas';
import FieldPropertyEditor from '@/components/form-builder/FieldPropertyEditor';

export default function FormBuilderPage() {
  const [fields, setFields] = useState<FormField[]>([]);
  const [selectedField, setSelectedField] = useState<FormField | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    // Handle field drop logic
    // ...
  };

  return (
    <div className="flex h-screen">
      {/* Field Palette */}
      <FieldPalette />
      
      {/* Form Canvas */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <FormCanvas fields={fields} onFieldClick={setSelectedField} />
      </DndContext>
      
      {/* Property Editor */}
      {selectedField && (
        <FieldPropertyEditor field={selectedField} onUpdate={updateField} />
      )}
    </div>
  );
}
```

### Step 3: Create Field Palette Component

**File**: `components/form-builder/FieldPalette.tsx`

```typescript
'use client';

import { useDraggable } from '@dnd-kit/core';

const fieldTypes = [
  { type: 'text', label: 'Text Input', icon: 'T' },
  { type: 'number', label: 'Number', icon: '#' },
  { type: 'email', label: 'Email', icon: '@' },
  { type: 'select', label: 'Dropdown', icon: '▼' },
  { type: 'radio', label: 'Radio Buttons', icon: '○' },
  { type: 'checkbox', label: 'Checkboxes', icon: '☑' },
  { type: 'textarea', label: 'Textarea', icon: '≡' },
  { type: 'file', label: 'File Upload', icon: '📎' },
  { type: 'date', label: 'Date Picker', icon: '📅' },
];

function DraggableField({ type, label, icon }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `palette-${type}`,
    data: { type },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-4 border rounded cursor-move hover:bg-gray-50"
    >
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-sm">{label}</div>
    </div>
  );
}

export default function FieldPalette() {
  return (
    <div className="w-64 bg-white border-r p-4 overflow-y-auto">
      <h3 className="font-semibold mb-4">Field Types</h3>
      <div className="space-y-2">
        {fieldTypes.map((field) => (
          <DraggableField key={field.type} {...field} />
        ))}
      </div>
    </div>
  );
}
```

### Step 4: Create Form Canvas

**File**: `components/form-builder/FormCanvas.tsx`

```typescript
'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableField from './SortableField';

export default function FormCanvas({ fields, onFieldClick }) {
  const { setNodeRef } = useDroppable({ id: 'canvas' });

  return (
    <div ref={setNodeRef} className="flex-1 bg-gray-50 p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Form Preview</h2>
        
        {fields.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            Drag fields here to build your form
          </div>
        ) : (
          <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
            {fields.map((field) => (
              <SortableField
                key={field.id}
                field={field}
                onClick={() => onFieldClick(field)}
              />
            ))}
          </SortableContext>
        )}
      </div>
    </div>
  );
}
```

### Step 5: Create Property Editor

**File**: `components/form-builder/FieldPropertyEditor.tsx`

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const fieldSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  placeholder: z.string().optional(),
  required: z.boolean(),
  defaultValue: z.any().optional(),
});

export default function FieldPropertyEditor({ field, onUpdate }) {
  const form = useForm({
    resolver: zodResolver(fieldSchema),
    defaultValues: field,
  });

  return (
    <div className="w-80 bg-white border-l p-4 overflow-y-auto">
      <h3 className="font-semibold mb-4">Field Properties</h3>
      
      <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Label</label>
          <input {...form.register('label')} className="w-full border rounded px-3 py-2" />
          {form.formState.errors.label && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.label.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Placeholder</label>
          <input {...form.register('placeholder')} className="w-full border rounded px-3 py-2" />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            {...form.register('required')}
            className="mr-2"
          />
          <label className="text-sm">Required field</label>
        </div>
        
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Update Field
        </button>
      </form>
    </div>
  );
}
```

### Step 6: Save Form Configuration

**File**: `lib/forms/saveFormTemplate.ts`

```typescript
import { db } from '@/lib/firebase/config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export async function saveFormTemplate(schoolId: string, template: any) {
  const templateId = template.id || doc(db, 'schools', schoolId, 'formTemplates', 'new').id;
  
  const templateData = {
    ...template,
    schoolId,
    updatedAt: serverTimestamp(),
    ...(template.id ? {} : { createdAt: serverTimestamp() }),
  };
  
  await setDoc(
    doc(db, 'schools', schoolId, 'formTemplates', templateId),
    templateData,
    { merge: true }
  );
  
  return templateId;
}
```

---

## 🚀 Story 7.1.2: Form Renderer (5 SP)

### Step 1: Create Dynamic Form Renderer

**File**: `components/forms/DynamicFormRenderer.tsx`

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { buildValidationSchema, renderField } from '@/lib/forms/formUtils';

export default function DynamicFormRenderer({ template, onSubmit }) {
  const schema = buildValidationSchema(template.config);
  const form = useForm({ resolver: zodResolver(schema) });
  
  const watchedValues = form.watch();
  
  const shouldShowField = (field: FormField) => {
    if (!field.conditionalLogic) return true;
    
    // Evaluate conditional logic
    const { show, rules, logic } = field.conditionalLogic;
    const results = rules.map(rule => {
      const fieldValue = watchedValues[rule.fieldId];
      return evaluateRule(fieldValue, rule.operator, rule.value);
    });
    
    const match = logic === 'and' 
      ? results.every(r => r)
      : results.some(r => r);
    
    return show ? match : !match;
  };
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {template.config.sections.map((section) => (
        <div key={section.id} className="space-y-4">
          <h3 className="text-lg font-semibold">{section.title}</h3>
          {section.description && (
            <p className="text-gray-600">{section.description}</p>
          )}
          
          {section.fields.map((field) => (
            shouldShowField(field) && (
              <div key={field.id}>
                {renderField(field, form)}
              </div>
            )
          ))}
        </div>
      ))}
      
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
```

---

## 🚀 Story 7.2: Email System Setup (8 SP)

### Step 1: Setup Resend

```bash
# Install Resend
npm install resend @react-email/components
```

**File**: `.env.local`
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### Step 2: Create Email Utility

**File**: `lib/email/resend.ts`

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  template,
  variables,
}: {
  to: string | string[];
  subject: string;
  template: React.ReactElement;
  variables: Record<string, any>;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'PPDB <noreply@ppdb.id>',
      to,
      subject,
      react: template,
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
}
```

### Step 3: Create Email Templates

**File**: `emails/WelcomeEmail.tsx`

```typescript
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
} from '@react-email/components';

interface WelcomeEmailProps {
  name: string;
  schoolName: string;
  loginUrl: string;
}

export default function WelcomeEmail({ name, schoolName, loginUrl }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f6f9fc', fontFamily: 'sans-serif' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <Section style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '40px' }}>
            <Heading style={{ color: '#333', fontSize: '24px' }}>
              Selamat Datang di {schoolName}!
            </Heading>
            
            <Text style={{ color: '#666', fontSize: '16px', lineHeight: '24px' }}>
              Halo {name},
            </Text>
            
            <Text style={{ color: '#666', fontSize: '16px', lineHeight: '24px' }}>
              Terima kasih telah mendaftar di sistem PPDB kami. 
              Akun Anda telah berhasil dibuat.
            </Text>
            
            <Button
              href={loginUrl}
              style={{
                backgroundColor: '#0070f3',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '6px',
                textDecoration: 'none',
                display: 'inline-block',
                marginTop: '16px',
              }}
            >
              Login Sekarang
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
```

### Step 4: Create Email Queue System

**File**: `lib/email/queue.ts`

```typescript
import { db } from '@/lib/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function queueEmail({
  to,
  subject,
  template,
  variables,
  priority = 'normal',
  scheduledAt,
}: QueueEmailParams) {
  const queueData = {
    to,
    subject,
    template,
    variables,
    priority,
    status: 'pending',
    attempts: 0,
    maxAttempts: 3,
    scheduledAt: scheduledAt || null,
    createdAt: serverTimestamp(),
  };
  
  const docRef = await addDoc(collection(db, 'email_queue'), queueData);
  return docRef.id;
}
```

### Step 5: Create Background Email Processor

**File**: `functions/src/processEmailQueue.ts`

```typescript
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const processEmailQueue = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(async (context) => {
    const db = admin.firestore();
    
    // Get pending emails
    const snapshot = await db
      .collection('email_queue')
      .where('status', '==', 'pending')
      .where('attempts', '<', 3)
      .limit(10)
      .get();
    
    const promises = snapshot.docs.map(async (doc) => {
      const data = doc.data();
      
      try {
        // Send email
        const result = await resend.emails.send({
          from: 'PPDB <noreply@ppdb.id>',
          to: data.to,
          subject: data.subject,
          react: getEmailTemplate(data.template, data.variables),
        });
        
        // Update status
        await doc.ref.update({
          status: 'sent',
          sentAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        
        // Log success
        await db.collection('email_logs').add({
          queueId: doc.id,
          to: data.to,
          subject: data.subject,
          status: 'delivered',
          providerId: result.data?.id,
          sentAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      } catch (error) {
        // Update attempts
        await doc.ref.update({
          attempts: admin.firestore.FieldValue.increment(1),
          error: error.message,
          status: data.attempts >= 2 ? 'failed' : 'pending',
        });
        
        // Log failure
        await db.collection('email_logs').add({
          queueId: doc.id,
          to: data.to,
          subject: data.subject,
          status: 'failed',
          error: error.message,
          sentAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      }
    });
    
    await Promise.all(promises);
  });
```

---

## 🚀 Story 7.3: Notification System (5 SP)

### Step 1: Create Notification Helper

**File**: `lib/notifications/createNotification.ts`

```typescript
import { db } from '@/lib/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function createNotification({
  userId,
  schoolId,
  type = 'info',
  title,
  message,
  link,
}: CreateNotificationParams) {
  await addDoc(collection(db, 'notifications'), {
    userId,
    schoolId,
    type,
    title,
    message,
    link,
    read: false,
    createdAt: serverTimestamp(),
  });
}
```

### Step 2: Create Notification Icon & Dropdown

**File**: `components/notifications/NotificationDropdown.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useAuth } from '@/hooks/useAuth';

export default function NotificationDropdown() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    if (!user) return;
    
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(5)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotifications(notifs);
      setUnreadCount(notifs.filter(n => !n.read).length);
    });
    
    return () => unsubscribe();
  }, [user]);
  
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2">
        🔔
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    !notif.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <h4 className="font-medium">{notif.title}</h4>
                  <p className="text-sm text-gray-600">{notif.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## ✅ Testing

### Form Builder Tests
```bash
npm run test -- FormBuilder
```

### Email Tests
```bash
npm run test:email
```

### Notification Tests
```bash
npm run test -- Notifications
```

---

## 🚀 Deployment

```bash
# Deploy email Cloud Function
firebase deploy --only functions:processEmailQueue

# Deploy to Vercel
vercel --prod
```

---

**Version**: 1.0  
**Last Updated**: 2024
