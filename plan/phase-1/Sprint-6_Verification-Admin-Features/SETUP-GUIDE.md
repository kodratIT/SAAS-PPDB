# Sprint 6: Setup Guide - Implementation

Detailed implementation guide for Sprint 6: Verification & Admin Features - The Final Sprint! 🚀

---

## 📋 Table of Contents

- [Story 6.1: Application Verification](#story-61-application-verification-7-sp)
- [Story 6.2: Admin Dashboard](#story-62-admin-dashboard-6-sp)
- [Story 6.3: Reporting System](#story-63-reporting-system-4-sp)
- [Story 6.4: Configuration Management](#story-64-configuration-management-2-sp)
- [Story 6.5: Testing & Deployment](#story-65-testing--deployment-1-sp)

---

# STORY 6.1: Application Verification (7 SP)

**Assigned to**: FSD1 + FSD2  
**Duration**: 2 days

---

## Task 6.1.1: Verification List Page

**Owner**: FSD1  
**Duration**: 3 hours

### Implementation:

**1. Create Verification Page** (`src/app/(school-admin)/verification/page.tsx`):
```typescript
import { Suspense } from 'react'
import VerificationList from '@/components/admin/VerificationList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function VerificationPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Verifikasi Pendaftar</h1>
        <p className="text-gray-600 mt-1">
          Review dan verifikasi aplikasi pendaftaran
        </p>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Suspense fallback={<div>Loading...</div>}>
            <VerificationList status="submitted" />
          </Suspense>
        </TabsContent>

        <TabsContent value="approved">
          <Suspense fallback={<div>Loading...</div>}>
            <VerificationList status="approved" />
          </Suspense>
        </TabsContent>

        <TabsContent value="rejected">
          <Suspense fallback={<div>Loading...</div>}>
            <VerificationList status="rejected" />
          </Suspense>
        </TabsContent>

        <TabsContent value="all">
          <Suspense fallback={<div>Loading...</div>}>
            <VerificationList />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

**2. Create Verification List Component** (`src/components/admin/VerificationList.tsx`):
```typescript
'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import ApplicationCard from './ApplicationCard'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface VerificationListProps {
  status?: string
}

export default function VerificationList({ status }: VerificationListProps) {
  const { user } = useAuth()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    fetchApplications()
  }, [status])

  const fetchApplications = async () => {
    try {
      const params = new URLSearchParams()
      if (status) params.append('status', status)
      
      const response = await fetch(`/api/admin/applications?${params}`)
      const data = await response.json()
      setApplications(data.applications)
    } catch (error) {
      console.error('Failed to fetch applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredApplications = applications
    .filter(app => 
      app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.registrationNumber.includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.submittedAt) - new Date(a.submittedAt)
      }
      return new Date(a.submittedAt) - new Date(b.submittedAt)
    })

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-4">
        <Input
          placeholder="Search by name or number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Application List */}
      <div className="grid gap-4">
        {filteredApplications.map(app => (
          <ApplicationCard key={app.id} application={app} onUpdate={fetchApplications} />
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No applications found
        </div>
      )}
    </div>
  )
}
```

---

## Task 6.1.2: Application Detail & Approval

**Owner**: FSD2  
**Duration**: 4 hours

### Implementation:

**1. Create Application Detail Page** (`src/app/(school-admin)/verification/[id]/page.tsx`):
```typescript
import { getApplication } from '@/lib/firebase/collections/applications'
import { notFound } from 'next/navigation'
import DocumentViewer from '@/components/admin/DocumentViewer'
import ApprovalActions from '@/components/admin/ApprovalActions'
import ApplicationInfo from '@/components/admin/ApplicationInfo'

export default async function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const application = await getApplication(params.id)
  
  if (!application) {
    notFound()
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {application.formData.personal.fullName}
        </h1>
        <p className="text-gray-600">
          No. Pendaftaran: {application.registrationNumber}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <ApplicationInfo application={application} />
          <DocumentViewer documents={application.documents} />
        </div>

        {/* Sidebar */}
        <div>
          <ApprovalActions applicationId={params.id} currentStatus={application.status} />
        </div>
      </div>
    </div>
  )
}
```

**2. Create Approval Actions Component** (`src/components/admin/ApprovalActions.tsx`):
```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Check, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ApprovalActionsProps {
  applicationId: string
  currentStatus: string
}

export default function ApprovalActions({ applicationId, currentStatus }: ApprovalActionsProps) {
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleApprove = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId,
          approved: true,
          comment
        })
      })

      if (response.ok) {
        router.push('/school-admin/verification')
        router.refresh()
      }
    } catch (error) {
      console.error('Approval failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReject = async () => {
    if (!comment) {
      alert('Please provide a reason for rejection')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId,
          approved: false,
          comment
        })
      })

      if (response.ok) {
        router.push('/school-admin/verification')
        router.refresh()
      }
    } catch (error) {
      console.error('Rejection failed:', error)
    } finally {
      setLoading(false)
    }
  }

  if (currentStatus !== 'submitted') {
    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">
          Status: <span className="font-semibold">{currentStatus}</span>
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border rounded-lg p-6 space-y-4">
      <h3 className="font-semibold">Verification Actions</h3>

      <Textarea
        placeholder="Add comment or reason..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
      />

      <div className="space-y-2">
        <Button
          onClick={handleApprove}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          <Check className="w-4 h-4 mr-2" />
          Approve Application
        </Button>

        <Button
          onClick={handleReject}
          disabled={loading}
          variant="destructive"
          className="w-full"
        >
          <X className="w-4 h-4 mr-2" />
          Reject Application
        </Button>
      </div>
    </div>
  )
}
```

**3. Create Verification API** (`src/app/api/admin/verify/route.ts`):
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase/admin'
import { sendEmail } from '@/lib/email/sendEmail'

export async function POST(request: NextRequest) {
  try {
    const { applicationId, approved, comment } = await request.json()

    const appRef = adminDb!.collection('applications').doc(applicationId)
    const appDoc = await appRef.get()

    if (!appDoc.exists) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    const newStatus = approved ? 'approved' : 'rejected'

    await appRef.update({
      status: newStatus,
      verificationComment: comment,
      verifiedAt: new Date(),
      verifiedBy: 'admin-id', // Get from auth
      updatedAt: new Date()
    })

    // Send notification email
    const appData = appDoc.data()
    await sendEmail({
      to: appData.formData.personal.email,
      subject: `Pendaftaran ${approved ? 'Diterima' : 'Ditolak'}`,
      html: `
        <h2>Status Pendaftaran: ${newStatus.toUpperCase()}</h2>
        <p>${comment || ''}</p>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

---

# STORY 6.2: Admin Dashboard (6 SP)

**Assigned to**: FSD2 + FED  
**Duration**: 2 days

---

## Task 6.2.1: Dashboard with Analytics

**Owner**: FSD2  
**Duration**: 4 hours

### Implementation:

**1. Install Chart Library**:
```bash
npm install recharts
```

**2. Create Dashboard Page** (`src/app/(school-admin)/dashboard/page.tsx`):
```typescript
import StatsCards from '@/components/dashboard/StatsCards'
import ChartsSection from '@/components/dashboard/ChartsSection'
import RecentActivity from '@/components/dashboard/RecentActivity'

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Overview dan statistik pendaftaran
        </p>
      </div>

      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartsSection />
        <RecentActivity />
      </div>
    </div>
  )
}
```

**3. Create Stats Cards** (`src/components/dashboard/StatsCards.tsx`):
```typescript
'use client'

import { useEffect, useState } from 'react'
import { Users, FileText, CreditCard, CheckCircle } from 'lucide-react'

export default function StatsCards() {
  const [stats, setStats] = useState({
    totalApplications: 0,
    pending: 0,
    approved: 0,
    totalPayments: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    const response = await fetch('/api/admin/stats')
    const data = await response.json()
    setStats(data)
  }

  const cards = [
    {
      title: 'Total Applications',
      value: stats.totalApplications,
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Pending Review',
      value: stats.pending,
      icon: Users,
      color: 'bg-yellow-500'
    },
    {
      title: 'Approved',
      value: stats.approved,
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      title: 'Total Payments',
      value: `Rp ${stats.totalPayments.toLocaleString('id-ID')}`,
      icon: CreditCard,
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <div key={index} className="bg-white border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
```

---

# STORY 6.3: Reporting System (4 SP)

**Assigned to**: FSD1  
**Duration**: 1 day

---

## Task 6.3.1: Report Export

**Owner**: FSD1  
**Duration**: 3 hours

### Implementation:

**1. Install Export Libraries**:
```bash
npm install xlsx jspdf jspdf-autotable
```

**2. Create Report Generator** (`src/lib/reports/applicationReport.ts`):
```typescript
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export function exportToExcel(applications: any[]) {
  const data = applications.map(app => ({
    'No. Pendaftaran': app.registrationNumber,
    'Nama': app.formData.personal.fullName,
    'NIK': app.formData.personal.nik,
    'Email': app.formData.personal.email,
    'Phone': app.formData.personal.phone,
    'Status': app.status,
    'Tanggal Daftar': new Date(app.submittedAt).toLocaleDateString('id-ID')
  }))

  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Applications')
  
  XLSX.writeFile(wb, `applications_${Date.now()}.xlsx`)
}

export function exportToPDF(applications: any[], schoolInfo: any) {
  const doc = new jsPDF()

  // Header
  doc.setFontSize(16)
  doc.text('Laporan Pendaftaran', 14, 20)
  doc.setFontSize(10)
  doc.text(schoolInfo.name, 14, 28)
  doc.text(`Generated: ${new Date().toLocaleDateString('id-ID')}`, 14, 34)

  // Table
  const tableData = applications.map(app => [
    app.registrationNumber,
    app.formData.personal.fullName,
    app.formData.personal.email,
    app.status,
    new Date(app.submittedAt).toLocaleDateString('id-ID')
  ])

  autoTable(doc, {
    startY: 40,
    head: [['No. Pendaftaran', 'Nama', 'Email', 'Status', 'Tanggal']],
    body: tableData,
  })

  doc.save(`applications_${Date.now()}.pdf`)
}
```

---

# STORY 6.5: Testing & Deployment (1 SP)

**Assigned to**: All  
**Duration**: 3 days

---

## Task 6.5.1: Production Deployment

**Owner**: DevOps  
**Duration**: 2 hours

### Steps:

**1. Configure Environment Variables** (`.env.production`):
```bash
# Firebase Production
NEXT_PUBLIC_FIREBASE_API_KEY=your_prod_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_prod_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_prod_project

# Midtrans Production
MIDTRANS_SERVER_KEY=your_prod_server_key
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_prod_client_key

# Sentry
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

**2. Deploy to Vercel**:
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

**3. Post-Deployment Checklist**:
```bash
# Verify deployment
curl https://your-domain.com/api/health

# Test authentication
# Test registration flow
# Test payment flow
# Test admin panel

# Monitor errors in Sentry
# Check Firebase logs
# Monitor Vercel analytics
```

---

## Troubleshooting

### Verification API Not Working
```bash
# Check Firestore rules
# Verify admin role in token
# Check API route middleware
# Test with Postman first
```

### Dashboard Charts Not Rendering
```bash
# Install recharts
npm install recharts

# Check data format
# Add error boundary
# Check browser console
```

---

**Continue to**: [SUMMARY.md](./SUMMARY.md)
