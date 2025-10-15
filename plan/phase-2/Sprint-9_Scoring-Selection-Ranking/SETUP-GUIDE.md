# Sprint 9: Setup Guide - Scoring, Selection & Ranking

## 🚀 Story 9.1: Scoring Configuration

### Step 1: Create Selection Settings Page

**File**: `app/(school-admin)/selection/settings/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export default function SelectionSettingsPage() {
  const [criteria, setCriteria] = useState({
    akademik: { weight: 40, maxScore: 100 },
    prestasi: { weight: 30, maxScore: 100 },
    zonasi: { weight: 20, maxScore: 100 },
    tes: { weight: 10, maxScore: 100 },
  });
  
  const [passingGrade, setPassingGrade] = useState(70);
  const [tieBreaking, setTieBreaking] = useState('oldest_first');
  
  const totalWeight = Object.values(criteria).reduce((sum, c) => sum + c.weight, 0);
  
  const saveConfig = async () => {
    if (totalWeight !== 100) {
      alert('Total weight must equal 100%');
      return;
    }
    
    await updateDoc(doc(db, 'ppdb_periods', periodId), {
      selectionConfig: {
        criteria,
        passingGrade,
        tieBreaking,
        selectionMode: 'automatic',
      },
    });
  };
  
  return (
    <div>
      <h1>Selection Settings</h1>
      
      {/* Criteria Weights */}
      {Object.entries(criteria).map(([key, value]) => (
        <div key={key}>
          <label>{key}</label>
          <input
            type="range"
            min="0"
            max="100"
            value={value.weight}
            onChange={(e) => setCriteria({
              ...criteria,
              [key]: { ...value, weight: parseInt(e.target.value) },
            })}
          />
          <span>{value.weight}%</span>
        </div>
      ))}
      
      <p>Total Weight: {totalWeight}% {totalWeight === 100 ? '✓' : '✗'}</p>
      
      {/* Passing Grade */}
      <div>
        <label>Passing Grade</label>
        <input
          type="number"
          min="0"
          max="100"
          value={passingGrade}
          onChange={(e) => setPassingGrade(parseInt(e.target.value))}
        />
      </div>
      
      {/* Tie-Breaking */}
      <div>
        <label>Tie-Breaking Rule</label>
        <select value={tieBreaking} onChange={(e) => setTieBreaking(e.target.value)}>
          <option value="oldest_first">Oldest Registration First</option>
          <option value="lottery">Random Lottery</option>
          <option value="manual">Manual Review</option>
        </select>
      </div>
      
      <button onClick={saveConfig}>Save Configuration</button>
    </div>
  );
}
```

---

## 🚀 Story 9.2: Score Input & Calculation

### Step 1: Create Scoring Page

**File**: `app/(panitia)/scoring/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export default function ScoringPage() {
  const [applicants, setApplicants] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [scores, setScores] = useState({});
  
  const loadApplicants = async () => {
    const q = query(
      collection(db, 'applications'),
      where('schoolId', '==', schoolId),
      where('assignedTo', '==', currentUserId) // Assigned to current panitia
    );
    const snapshot = await getDocs(q);
    setApplicants(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };
  
  const calculateTotal = (scores, config) => {
    const total = 
      (scores.akademik * config.criteria.akademik.weight / 100) +
      (scores.prestasi * config.criteria.prestasi.weight / 100) +
      (scores.zonasi * config.criteria.zonasi.weight / 100) +
      (scores.tes * config.criteria.tes.weight / 100);
    return Math.round(total * 100) / 100;
  };
  
  const saveScores = async () => {
    const total = calculateTotal(scores, selectionConfig);
    
    await updateDoc(doc(db, 'applications', selectedApp.id), {
      scores: {
        ...scores,
        total,
        scoredBy: currentUserId,
        scoredAt: new Date(),
        locked: false,
      },
    });
    
    alert('Scores saved!');
  };
  
  return (
    <div>
      <h1>Score Applicants</h1>
      
      {/* Applicant List */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Registration Number</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map(app => (
            <tr key={app.id}>
              <td>{app.studentName}</td>
              <td>{app.registrationNumber}</td>
              <td>{app.scores ? 'Scored' : 'Pending'}</td>
              <td>
                <button onClick={() => setSelectedApp(app)}>Score</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Score Input Modal */}
      {selectedApp && (
        <div>
          <h2>Score: {selectedApp.studentName}</h2>
          
          <div>
            <label>Akademik (0-100)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={scores.akademik || 0}
              onChange={(e) => setScores({ ...scores, akademik: parseInt(e.target.value) })}
            />
          </div>
          
          <div>
            <label>Prestasi (0-100)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={scores.prestasi || 0}
              onChange={(e) => setScores({ ...scores, prestasi: parseInt(e.target.value) })}
            />
          </div>
          
          <div>
            <label>Zonasi (0-100)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={scores.zonasi || 0}
              onChange={(e) => setScores({ ...scores, zonasi: parseInt(e.target.value) })}
            />
          </div>
          
          <div>
            <label>Tes (0-100)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={scores.tes || 0}
              onChange={(e) => setScores({ ...scores, tes: parseInt(e.target.value) })}
            />
          </div>
          
          <p>Total Score: {calculateTotal(scores, selectionConfig)}</p>
          
          <button onClick={saveScores}>Save Scores</button>
        </div>
      )}
    </div>
  );
}
```

---

## 🚀 Story 9.3: Ranking System

### Step 1: Create Ranking Algorithm

**File**: `lib/scoring/ranking.ts`

```typescript
import { SelectionConfig, Application } from '@/types';

export function calculateRankings(
  applicants: Application[],
  config: SelectionConfig
): Application[] {
  // Group by jalur
  const byJalur = groupBy(applicants, 'jalur');
  
  Object.entries(byJalur).forEach(([jalur, apps]) => {
    // Sort by total score DESC
    apps.sort((a, b) => {
      if (b.scores.total !== a.scores.total) {
        return b.scores.total - a.scores.total;
      }
      
      // Apply tie-breaking
      if (config.tieBreaking === 'oldest_first') {
        return a.createdAt.getTime() - b.createdAt.getTime();
      } else if (config.tieBreaking === 'lottery') {
        return Math.random() - 0.5;
      }
      
      return 0;
    });
    
    // Assign ranks
    apps.forEach((app, index) => {
      app.ranking = {
        rank: index + 1,
        jalur,
        totalApplicants: apps.length,
        percentile: Math.round(((apps.length - index) / apps.length) * 100),
      };
    });
  });
  
  return applicants.flat();
}

function groupBy(array: any[], key: string) {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) result[group] = [];
    result[group].push(item);
    return result;
  }, {});
}
```

### Step 2: Create Ranking Page

**File**: `app/(school-admin)/selection/ranking/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { calculateRankings } from '@/lib/scoring/ranking';
import { exportToExcel, exportToPDF } from '@/lib/export';

export default function RankingPage() {
  const [rankings, setRankings] = useState([]);
  const [selectedJalur, setSelectedJalur] = useState('all');
  
  const loadRankings = async () => {
    const q = query(
      collection(db, 'applications'),
      where('schoolId', '==', schoolId),
      where('periodId', '==', periodId),
      where('scores.total', '>', 0)
    );
    
    const snapshot = await getDocs(q);
    const applications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    const ranked = calculateRankings(applications, selectionConfig);
    setRankings(ranked);
  };
  
  const filteredRankings = selectedJalur === 'all'
    ? rankings
    : rankings.filter(r => r.jalur === selectedJalur);
  
  return (
    <div>
      <h1>Rankings</h1>
      
      {/* Filter */}
      <select value={selectedJalur} onChange={(e) => setSelectedJalur(e.target.value)}>
        <option value="all">All Jalur</option>
        <option value="zonasi">Zonasi</option>
        <option value="prestasi">Prestasi</option>
        <option value="perpindahan">Perpindahan</option>
      </select>
      
      {/* Export */}
      <button onClick={() => exportToExcel(filteredRankings)}>Export Excel</button>
      <button onClick={() => exportToPDF(filteredRankings)}>Export PDF</button>
      
      {/* Rankings Table */}
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Registration Number</th>
            <th>Jalur</th>
            <th>Total Score</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRankings.map((app) => (
            <tr key={app.id} className={app.ranking.rank <= quotas[app.jalur] ? 'bg-green-50' : ''}>
              <td>{app.ranking.rank}</td>
              <td>{app.studentName}</td>
              <td>{app.registrationNumber}</td>
              <td>{app.jalur}</td>
              <td>{app.scores.total}</td>
              <td>
                {app.ranking.rank <= quotas[app.jalur] ? 'Above Quota' : 'Below Quota'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## 🚀 Story 9.4: Automated Selection

### Step 1: Create Selection Algorithm

**File**: `lib/scoring/selection.ts`

```typescript
export function autoSelect(rankedApplicants: Application[], quotas: Quotas) {
  const selected = [];
  const waitlist = [];
  const rejected = [];
  
  const byJalur = groupBy(rankedApplicants, 'jalur');
  
  Object.entries(byJalur).forEach(([jalur, apps]) => {
    const quota = quotas[jalur];
    
    apps.forEach((app, index) => {
      if (index < quota) {
        app.selectionResult = {
          status: 'selected',
          reason: 'Met quota requirement',
        };
        selected.push(app);
      } else if (index < quota + 10) { // Next 10 for waitlist
        app.selectionResult = {
          status: 'waitlist',
          reason: 'Waitlist candidate',
        };
        waitlist.push(app);
      } else {
        app.selectionResult = {
          status: 'rejected',
          reason: 'Quota exceeded',
        };
        rejected.push(app);
      }
    });
  });
  
  return { selected, waitlist, rejected };
}
```

### Step 2: Generate Acceptance Letters

**File**: `lib/pdf/acceptanceLetter.ts`

```typescript
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function generateAcceptanceLetter(applicant: Application, school: School) {
  const doc = new jsPDF();
  
  // Add school logo
  if (school.logoUrl) {
    doc.addImage(school.logoUrl, 'PNG', 20, 10, 30, 30);
  }
  
  // Header
  doc.setFontSize(16);
  doc.text(school.name, 105, 20, { align: 'center' });
  doc.setFontSize(12);
  doc.text(school.address, 105, 27, { align: 'center' });
  
  doc.setFontSize(14);
  doc.text('SURAT KEPUTUSAN PENERIMAAN', 105, 50, { align: 'center' });
  
  // Content
  doc.setFontSize(12);
  doc.text(`Nomor: ${applicant.registrationNumber}`, 20, 70);
  doc.text(`Kepada Yth,`, 20, 80);
  doc.text(`${applicant.studentName}`, 20, 87);
  doc.text(`${applicant.address}`, 20, 94);
  
  doc.text(`Dengan ini kami sampaikan bahwa:`, 20, 110);
  doc.text(`Anda DITERIMA sebagai siswa baru di ${school.name}`, 20, 120);
  doc.text(`untuk tahun ajaran ${period.academicYear}.`, 20, 127);
  
  doc.text(`Jalur Penerimaan: ${applicant.jalur}`, 20, 140);
  doc.text(`Peringkat: ${applicant.ranking.rank} dari ${applicant.ranking.totalApplicants}`, 20, 147);
  doc.text(`Nilai Akhir: ${applicant.scores.total}`, 20, 154);
  
  // Signature
  doc.text('Kepala Sekolah', 140, 200);
  doc.text('_________________', 135, 230);
  doc.text(school.principalName, 140, 237, { align: 'center' });
  
  return doc;
}
```

---

## ✅ Testing

```bash
npm run test -- scoring
npm run test -- ranking
npm run test -- selection
```

---

**Version**: 1.0  
**Last Updated**: 2024
