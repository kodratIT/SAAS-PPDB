# Sprint 10: Setup Guide - Result Publication & Reports

## 🚀 Story 10.1: Result Publication

### Step 1: Create Result Publication Page

**File**: `app/(school-admin)/selection/publish/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { queueEmail } from '@/lib/email/queue';
import { createNotification } from '@/lib/notifications/createNotification';

export default function ResultPublicationPage() {
  const [scheduledAt, setScheduledAt] = useState(null);
  const [preview, setPreview] = useState({ selected: [], waitlist: [], rejected: [] });
  
  const loadPreview = async () => {
    const q = query(
      collection(db, 'applications'),
      where('periodId', '==', periodId)
    );
    
    const snapshot = await getDocs(q);
    const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    setPreview({
      selected: apps.filter(a => a.selectionResult?.status === 'selected'),
      waitlist: apps.filter(a => a.selectionResult?.status === 'waitlist'),
      rejected: apps.filter(a => a.selectionResult?.status === 'rejected'),
    });
  };
  
  const publishResults = async () => {
    // Update period status
    await updateDoc(doc(db, 'ppdb_periods', periodId), {
      'resultPublication.status': 'published',
      'resultPublication.publishedAt': new Date(),
      'resultPublication.publishedBy': currentUserId,
    });
    
    // Queue emails for all applicants
    const allApplicants = [...preview.selected, ...preview.waitlist, ...preview.rejected];
    
    for (const app of allApplicants) {
      // Queue email
      await queueEmail({
        to: app.email,
        subject: 'Hasil Seleksi PPDB',
        template: 'selection-result',
        variables: {
          name: app.studentName,
          status: app.selectionResult.status,
          school: schoolName,
          ...app,
        },
      });
      
      // Create notification
      await createNotification({
        userId: app.userId,
        type: app.selectionResult.status === 'selected' ? 'success' : 'info',
        title: 'Hasil Seleksi Telah Diumumkan',
        message: `Silakan cek hasil seleksi Anda`,
        link: '/result',
      });
    }
    
    alert('Results published successfully!');
  };
  
  const schedulePublication = async () => {
    await updateDoc(doc(db, 'ppdb_periods', periodId), {
      'resultPublication.scheduled': true,
      'resultPublication.scheduledAt': new Date(scheduledAt),
      'resultPublication.status': 'scheduled',
    });
    
    alert('Publication scheduled!');
  };
  
  return (
    <div>
      <h1>Publish Selection Results</h1>
      
      {/* Preview */}
      <div className="mb-8">
        <h2>Preview</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 p-4">
            <h3>Selected</h3>
            <p className="text-3xl">{preview.selected.length}</p>
          </div>
          <div className="bg-yellow-50 p-4">
            <h3>Waitlist</h3>
            <p className="text-3xl">{preview.waitlist.length}</p>
          </div>
          <div className="bg-red-50 p-4">
            <h3>Rejected</h3>
            <p className="text-3xl">{preview.rejected.length}</p>
          </div>
        </div>
      </div>
      
      {/* Schedule */}
      <div className="mb-4">
        <label>Schedule Publication (Optional)</label>
        <input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          className="border p-2"
        />
      </div>
      
      {/* Actions */}
      <div className="flex gap-4">
        <button onClick={loadPreview} className="bg-gray-600 text-white px-4 py-2">
          Load Preview
        </button>
        {scheduledAt ? (
          <button onClick={schedulePublication} className="bg-blue-600 text-white px-4 py-2">
            Schedule Publication
          </button>
        ) : (
          <button onClick={publishResults} className="bg-green-600 text-white px-4 py-2">
            Publish Now
          </button>
        )}
      </div>
    </div>
  );
}
```

### Step 2: Background Job for Scheduled Publications

**File**: `functions/src/publishScheduledResults.ts`

```typescript
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const publishScheduledResults = functions.pubsub
  .schedule('every 5 minutes')
  .onRun(async (context) => {
    const db = admin.firestore();
    const now = admin.firestore.Timestamp.now();
    
    // Find scheduled publications that are due
    const snapshot = await db
      .collection('ppdb_periods')
      .where('resultPublication.status', '==', 'scheduled')
      .where('resultPublication.scheduledAt', '<=', now)
      .get();
    
    for (const doc of snapshot.docs) {
      const periodId = doc.id;
      
      // Publish results
      await doc.ref.update({
        'resultPublication.status': 'published',
        'resultPublication.publishedAt': now,
      });
      
      // Queue emails & notifications
      // ... (same logic as publishResults above)
      
      console.log(`Published results for period: ${periodId}`);
    }
  });
```

---

## 🚀 Story 10.2: Student Result View

### Step 1: Create Result Page

**File**: `app/(student)/result/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export default function StudentResultPage() {
  const [application, setApplication] = useState(null);
  const [period, setPeriod] = useState(null);
  
  useEffect(() => {
    loadResult();
  }, []);
  
  const loadResult = async () => {
    // Get application
    const appDoc = await getDoc(doc(db, 'applications', applicationId));
    setApplication({ id: appDoc.id, ...appDoc.data() });
    
    // Get period
    const periodDoc = await getDoc(doc(db, 'ppdb_periods', appDoc.data().periodId));
    setPeriod({ id: periodDoc.id, ...periodDoc.data() });
  };
  
  if (!application || period?.resultPublication?.status !== 'published') {
    return <div>Results not yet published</div>;
  }
  
  const { selectionResult, scores, ranking } = application;
  
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Hasil Seleksi PPDB</h1>
      
      {/* Status */}
      <div className={`p-6 rounded-lg mb-8 ${
        selectionResult.status === 'selected' ? 'bg-green-100' :
        selectionResult.status === 'waitlist' ? 'bg-yellow-100' :
        'bg-red-100'
      }`}>
        <h2 className="text-2xl font-semibold mb-2">
          {selectionResult.status === 'selected' ? '🎉 SELAMAT! ANDA DITERIMA' :
           selectionResult.status === 'waitlist' ? '⏳ ANDA MASUK DAFTAR TUNGGU' :
           '😔 MOHON MAAF, ANDA BELUM DITERIMA'}
        </h2>
        <p>{selectionResult.reason}</p>
      </div>
      
      {/* Score Breakdown */}
      <div className="bg-white border rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Rincian Nilai</h3>
        <table className="w-full">
          <tbody>
            <tr>
              <td>Akademik</td>
              <td className="text-right font-semibold">{scores.akademik}</td>
            </tr>
            <tr>
              <td>Prestasi</td>
              <td className="text-right font-semibold">{scores.prestasi}</td>
            </tr>
            <tr>
              <td>Zonasi</td>
              <td className="text-right font-semibold">{scores.zonasi}</td>
            </tr>
            <tr>
              <td>Tes</td>
              <td className="text-right font-semibold">{scores.tes}</td>
            </tr>
            <tr className="border-t-2 font-bold">
              <td>Total</td>
              <td className="text-right">{scores.total}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Ranking */}
      {period.showRanking && (
        <div className="bg-white border rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Peringkat</h3>
          <p className="text-3xl font-bold text-center">
            {ranking.rank} / {ranking.totalApplicants}
          </p>
          <p className="text-center text-gray-600">
            Jalur: {ranking.jalur}
          </p>
        </div>
      )}
      
      {/* Acceptance Letter */}
      {selectionResult.status === 'selected' && (
        <div className="bg-white border rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Surat Penerimaan</h3>
          <button
            onClick={() => window.open(selectionResult.acceptanceLetterUrl)}
            className="bg-blue-600 text-white px-6 py-3 rounded w-full"
          >
            📄 Download Surat Penerimaan
          </button>
        </div>
      )}
      
      {/* Next Steps */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Langkah Selanjutnya</h3>
        {selectionResult.status === 'selected' ? (
          <div>
            <ol className="list-decimal list-inside space-y-2">
              <li>Download surat penerimaan di atas</li>
              <li>Lakukan daftar ulang sebelum: {period.reRegistrationDeadline}</li>
              <li>Lengkapi berkas yang diperlukan</li>
              <li>Lakukan pembayaran</li>
            </ol>
            <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded w-full">
              Daftar Ulang Sekarang
            </button>
          </div>
        ) : (
          <p>Terima kasih atas partisipasi Anda dalam seleksi PPDB kami.</p>
        )}
      </div>
    </div>
  );
}
```

---

## 🚀 Story 10.3: Reports Dashboard

### Step 1: Install Recharts

```bash
npm install recharts
```

### Step 2: Create Reports Page

**File**: `app/(school-admin)/reports/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [registrationData, setRegistrationData] = useState([]);
  const [demographicData, setDemographicData] = useState([]);
  const [jalurData, setJalurData] = useState([]);
  const [financialData, setFinancialData] = useState({});
  
  useEffect(() => {
    loadReports();
  }, [dateRange]);
  
  const loadReports = async () => {
    // Load registration trend
    const regData = await getRegistrationTrend(dateRange);
    setRegistrationData(regData);
    
    // Load demographic
    const demoData = await getDemographic();
    setDemographicData(demoData);
    
    // Load jalur distribution
    const jalurDist = await getJalurDistribution();
    setJalurData(jalurDist);
    
    // Load financial
    const financial = await getFinancialReport();
    setFinancialData(financial);
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Reports & Analytics</h1>
      
      {/* Date Range Filter */}
      <div className="mb-8 flex gap-4">
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
        />
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
        />
      </div>
      
      {/* Registration Trend */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Registration Trend</h2>
        <LineChart width={800} height={300} data={registrationData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </div>
      
      {/* Demographic Distribution */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Demographic Distribution</h2>
        <PieChart width={400} height={300}>
          <Pie data={demographicData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
            {demographicData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28'][index % 3]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
      
      {/* Jalur Distribution */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Jalur Distribution</h2>
        <BarChart width={600} height={300} data={jalurData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="jalur" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="applications" fill="#8884d8" />
          <Bar dataKey="selected" fill="#82ca9d" />
        </BarChart>
      </div>
      
      {/* Financial Summary */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Financial Summary</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-gray-600">Total Revenue</p>
            <p className="text-3xl font-bold">Rp {financialData.totalRevenue?.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Outstanding</p>
            <p className="text-3xl font-bold">Rp {financialData.outstanding?.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Paid Applications</p>
            <p className="text-3xl font-bold">{financialData.paidCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 🚀 Story 10.4: Data Export

### Step 1: Create Export Functions

**File**: `lib/export/excel.ts`

```typescript
import * as XLSX from 'xlsx';

export function exportToExcel(data: any[], filename: string) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}
```

**File**: `lib/export/csv.ts`

```typescript
import Papa from 'papaparse';

export function exportToCSV(data: any[], filename: string) {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
}
```

---

## ✅ Testing

```bash
npm run test -- publication
npm run test -- reports
npm run test -- export
```

---

**Version**: 1.0  
**Last Updated**: 2024
