# Sprint 5: Setup Guide - Implementation

Detailed implementation guide for Sprint 5: Document Upload & Payment Integration.

---

## 📋 Table of Contents

- [Story 5.1: Document Upload System](#story-51-document-upload-system-7-sp)
- [Story 5.2: File Processing](#story-52-file-processing-5-sp)
- [Story 5.3: Payment Gateway Integration](#story-53-payment-gateway-integration-8-sp)
- [Story 5.4: Payment Management](#story-54-payment-management-4-sp)
- [Story 5.5: Invoice & Receipt](#story-55-invoice--receipt-generation-2-sp)

---

# STORY 5.1: Document Upload System (7 SP)

**Assigned to**: FSD2 + DEV  
**Duration**: 2 days

---

## Task 5.1.1: File Upload Component

**Owner**: FSD2  
**Duration**: 3 hours

### Implementation:

**1. Install dependencies**:
```bash
npm install react-dropzone browser-image-compression
```

**2. Create FileUpload Component** (`src/components/documents/FileUpload.tsx`):
```typescript
'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import imageCompression from 'browser-image-compression'
import { uploadToStorage } from '@/lib/firebase/storage'

interface FileUploadProps {
  applicationId: string
  documentType: string
  onUploadComplete: (url: string) => void
  maxSizeMB?: number
}

export default function FileUpload({ 
  applicationId, 
  documentType, 
  onUploadComplete,
  maxSizeMB = 5 
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setUploading(true)
    setError('')
    setProgress(0)

    try {
      // Validate file
      if (file.size > maxSizeMB * 1024 * 1024) {
        throw new Error(`Ukuran file maksimal ${maxSizeMB}MB`)
      }

      let fileToUpload = file

      // Compress image if needed
      if (file.type.startsWith('image/')) {
        fileToUpload = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1600,
          useWebWorker: true,
          onProgress: (progress) => setProgress(progress * 0.5)
        })
      }

      // Upload to Firebase Storage
      const path = `applications/${applicationId}/${documentType}/${Date.now()}_${file.name}`
      const url = await uploadToStorage(fileToUpload, path, (progress) => {
        setProgress(50 + progress * 0.5)
      })

      setProgress(100)
      onUploadComplete(url)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }, [applicationId, documentType, maxSizeMB, onUploadComplete])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    disabled: uploading
  })

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-400'}
        `}
      >
        <input {...getInputProps()} />
        
        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        
        {isDragActive ? (
          <p className="text-blue-600">Drop file di sini...</p>
        ) : (
          <>
            <p className="text-gray-600 mb-2">
              Drag & drop file atau <span className="text-blue-600">browse</span>
            </p>
            <p className="text-sm text-gray-500">
              Format: JPG, PNG, PDF (Max {maxSizeMB}MB)
            </p>
          </>
        )}
      </div>

      {uploading && (
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Uploading...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  )
}
```

**3. Create Storage Utilities** (`src/lib/firebase/storage.ts`):
```typescript
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from './config'

export async function uploadToStorage(
  file: File,
  path: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  const storageRef = ref(storage, path)
  const uploadTask = uploadBytesResumable(storageRef, file)

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        onProgress?.(progress)
      },
      (error) => {
        reject(error)
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        resolve(downloadURL)
      }
    )
  })
}
```

---

# STORY 5.3: Payment Gateway Integration (8 SP)

**Assigned to**: TL + FSD2  
**Duration**: 2 days

---

## Task 5.3.1: Midtrans Integration

**Owner**: FSD2  
**Duration**: 3 hours

### Implementation:

**1. Install Midtrans SDK**:
```bash
npm install midtrans-client
```

**2. Create Midtrans Wrapper** (`src/lib/payment/midtrans.ts`):
```typescript
import midtransClient from 'midtrans-client'

const snap = new midtransClient.Snap({
  isProduction: process.env.NODE_ENV === 'production',
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
})

export interface PaymentRequest {
  orderId: string
  amount: number
  customerDetails: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  itemDetails: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
}

export async function createPaymentToken(data: PaymentRequest) {
  const parameter = {
    transaction_details: {
      order_id: data.orderId,
      gross_amount: data.amount,
    },
    customer_details: data.customerDetails,
    item_details: data.itemDetails,
  }

  const transaction = await snap.createTransaction(parameter)
  return transaction.token
}

export async function getTransactionStatus(orderId: string) {
  return await snap.transaction.status(orderId)
}
```

**3. Create Payment API** (`src/app/api/payment/create/route.ts`):
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createPaymentToken } from '@/lib/payment/midtrans'
import { adminDb } from '@/lib/firebase/admin'

export async function POST(request: NextRequest) {
  try {
    const { applicationId } = await request.json()

    // Get application data
    const appDoc = await adminDb!.collection('applications').doc(applicationId).get()
    const application = appDoc.data()

    // Get period data for fees
    const periodDoc = await adminDb!.collection('ppdb_periods').doc(application.periodId).get()
    const period = periodDoc.data()

    const orderId = `PPDB-${applicationId}-${Date.now()}`

    // Create payment token
    const token = await createPaymentToken({
      orderId,
      amount: period.fees.registrationFee,
      customerDetails: {
        firstName: application.formData.personal.fullName.split(' ')[0],
        lastName: application.formData.personal.fullName.split(' ').slice(1).join(' '),
        email: application.formData.personal.email,
        phone: application.formData.personal.phone,
      },
      itemDetails: [{
        id: 'registration',
        name: `Biaya Pendaftaran ${period.name}`,
        price: period.fees.registrationFee,
        quantity: 1,
      }]
    })

    // Save payment record
    await adminDb!.collection('payments').add({
      applicationId,
      orderId,
      amount: period.fees.registrationFee,
      status: 'pending',
      gatewayProvider: 'midtrans',
      token,
      createdAt: new Date(),
    })

    return NextResponse.json({ token, orderId })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

**4. Payment Webhook** (`src/app/api/payment/webhook/route.ts`):
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase/admin'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const notification = await request.json()

    // Verify signature
    const hash = crypto
      .createHash('sha512')
      .update(`${notification.order_id}${notification.status_code}${notification.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`)
      .digest('hex')

    if (hash !== notification.signature_key) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 })
    }

    // Update payment status
    const paymentsSnapshot = await adminDb!
      .collection('payments')
      .where('orderId', '==', notification.order_id)
      .get()

    if (paymentsSnapshot.empty) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    const paymentDoc = paymentsSnapshot.docs[0]
    const paymentData = paymentDoc.data()

    let status = 'pending'
    if (['capture', 'settlement'].includes(notification.transaction_status)) {
      status = 'success'
    } else if (['deny', 'cancel', 'expire'].includes(notification.transaction_status)) {
      status = 'failed'
    }

    await paymentDoc.ref.update({
      status,
      gatewayResponse: notification,
      paidAt: status === 'success' ? new Date() : null,
      updatedAt: new Date(),
    })

    // Update application status
    if (status === 'success') {
      await adminDb!.collection('applications').doc(paymentData.applicationId).update({
        status: 'paid',
        updatedAt: new Date(),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

---

# STORY 5.5: Invoice & Receipt Generation (2 SP)

**Assigned to**: FSD1  
**Duration**: 1 day

---

## Task 5.5.1: Invoice PDF Generation

**Owner**: FSD1  
**Duration**: 2 hours

### Implementation:

**1. Install jsPDF**:
```bash
npm install jspdf
```

**2. Create Invoice Generator** (`src/lib/pdf/invoiceGenerator.ts`):
```typescript
import jsPDF from 'jspdf'

export interface InvoiceData {
  invoiceNumber: string
  date: Date
  school: {
    name: string
    address: string
    phone: string
  }
  student: {
    name: string
    registrationNumber: string
  }
  items: Array<{
    description: string
    amount: number
  }>
  total: number
}

export function generateInvoice(data: InvoiceData): jsPDF {
  const doc = new jsPDF()

  // Header
  doc.setFontSize(20)
  doc.text('INVOICE', 105, 20, { align: 'center' })

  // School info
  doc.setFontSize(12)
  doc.text(data.school.name, 20, 40)
  doc.setFontSize(10)
  doc.text(data.school.address, 20, 47)
  doc.text(data.school.phone, 20, 54)

  // Invoice details
  doc.text(`Invoice: ${data.invoiceNumber}`, 140, 40)
  doc.text(`Date: ${data.date.toLocaleDateString('id-ID')}`, 140, 47)

  // Student info
  doc.text('Billed To:', 20, 70)
  doc.text(data.student.name, 20, 77)
  doc.text(`No. Pendaftaran: ${data.student.registrationNumber}`, 20, 84)

  // Items table
  doc.line(20, 95, 190, 95)
  doc.text('Description', 20, 102)
  doc.text('Amount', 160, 102)
  doc.line(20, 105, 190, 105)

  let yPos = 115
  data.items.forEach(item => {
    doc.text(item.description, 20, yPos)
    doc.text(`Rp ${item.amount.toLocaleString('id-ID')}`, 160, yPos)
    yPos += 10
  })

  // Total
  doc.line(20, yPos, 190, yPos)
  yPos += 10
  doc.setFontSize(12)
  doc.text('TOTAL:', 120, yPos)
  doc.text(`Rp ${data.total.toLocaleString('id-ID')}`, 160, yPos)

  return doc
}
```

---

## Troubleshooting

### Firebase Storage Upload Fails
```bash
# Update storage.rules
service firebase.storage {
  match /b/{bucket}/o {
    match /applications/{applicationId}/{document} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
                      request.resource.size < 5 * 1024 * 1024;
    }
  }
}
```

### Payment Webhook Not Receiving
```bash
# Use ngrok for local testing
ngrok http 3000

# Update webhook URL in Midtrans dashboard
# https://your-domain.ngrok.io/api/payment/webhook
```

---

**Continue to**: [SUMMARY.md](SUMMARY.md)
