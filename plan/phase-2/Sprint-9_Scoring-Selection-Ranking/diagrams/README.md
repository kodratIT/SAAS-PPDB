# Sprint 9 - Architecture Diagrams

## 📊 Scoring, Selection & Ranking System

```
┌──────────────────────────────────────────────────────────────┐
│                Complete Selection Flow                       │
└──────────────────────────────────────────────────────────────┘

PHASE 1: Configuration
School Admin
     └─> Configure Selection Settings
          ├─> Set criteria weights (akademik, prestasi, zonasi, tes)
          ├─> Set passing grade
          ├─> Configure tie-breaking rules
          └─> Save to ppdb_periods/{periodId}/selectionConfig


PHASE 2: Scoring
Panitia
     └─> Score Applicants
          ├─> Input scores for each criteria (0-100)
          ├─> System calculates total score:
          │    total = (akademik × weight) + (prestasi × weight) + ...
          ├─> Lock scores after submission
          └─> Save to applications/{id}/scores


PHASE 3: Ranking
System Automated
     └─> Calculate Rankings
          ├─> Group applicants by jalur
          ├─> Sort by total score (DESC)
          ├─> Apply tie-breaking rules:
          │    - oldest_first: Sort by registration date
          │    - lottery: Random assignment
          │    - manual: Admin decides
          ├─> Assign ranks (1, 2, 3, ...)
          └─> Save to applications/{id}/ranking


PHASE 4: Selection
School Admin
     └─> Run Auto-Selection
          ├─> For each jalur:
          │    ├─> Select top N (based on quota)
          │    ├─> Next 10: Waitlist
          │    └─> Rest: Rejected
          ├─> Generate acceptance letters (PDF)
          ├─> Preview results
          └─> Confirm & finalize


PHASE 5: Publication
School Admin
     └─> Publish Results
          ├─> Send acceptance letters
          ├─> Send notifications
          └─> Make results visible to students
```

---

## 🧮 Scoring Algorithm

```
┌──────────────────────────────────────────────────────────────┐
│                Scoring Calculation                           │
└──────────────────────────────────────────────────────────────┘

Configuration Example:
{
  akademik: { weight: 40%, maxScore: 100 },
  prestasi: { weight: 30%, maxScore: 100 },
  zonasi:   { weight: 20%, maxScore: 100 },
  tes:      { weight: 10%, maxScore: 100 }
}

Applicant Scores:
{
  akademik: 85,
  prestasi: 90,
  zonasi: 100,
  tes: 80
}

Total Calculation:
total = (85 × 40/100) + (90 × 30/100) + (100 × 20/100) + (80 × 10/100)
      = 34 + 27 + 20 + 8
      = 89

Result: 89 points
```

---

## 📈 Ranking Algorithm

```
┌──────────────────────────────────────────────────────────────┐
│                Ranking Algorithm                             │
└──────────────────────────────────────────────────────────────┘

Input: Applications with scores
Output: Ranked applications per jalur

Algorithm:
1. Group applications by jalur

2. For each jalur:
   a. Sort by total score (DESC)
   
   b. Handle ties:
      IF tieBreaking = 'oldest_first':
        THEN sort tied apps by createdAt (ASC)
      ELSE IF tieBreaking = 'lottery':
        THEN random shuffle tied apps
      ELSE IF tieBreaking = 'manual':
        THEN flag for admin review
   
   c. Assign ranks:
      FOR each app in sorted list:
        app.ranking.rank = index + 1
        app.ranking.totalApplicants = list.length
        app.ranking.percentile = ((length - index) / length) × 100

3. Return ranked applications


Example Output:
Jalur: Zonasi
  1. Ali (95.5)
  2. Budi (92.3)
  3. Citra (92.3) <- Tied with #2, resolved by tie-breaking
  4. Dina (88.7)
  ...
  50. Zain (65.2)

Passing Grade: 70
Quota: 30

Status:
  Rank 1-30: Above Quota (Selected)
  Rank 31-50: Below Quota (Rejected/Waitlist)
```

---

## 🎯 Selection Algorithm

```
┌──────────────────────────────────────────────────────────────┐
│                Selection Algorithm                           │
└──────────────────────────────────────────────────────────────┘

Input:
- Ranked applications
- Quotas per jalur: { zonasi: 30, prestasi: 15, perpindahan: 5 }
- Waitlist size: 10

Algorithm:
1. Group ranked applications by jalur

2. For each jalur:
   quota = quotas[jalur]
   
   FOR each app in sorted order:
     IF index < quota:
       app.status = 'selected'
       Generate acceptance letter PDF
     ELSE IF index < quota + 10:
       app.status = 'waitlist'
       Generate waitlist notification
     ELSE:
       app.status = 'rejected'
       Generate rejection notification

3. Update all application statuses in Firestore

4. Return selection summary


Example:
Jalur: Zonasi (Quota: 30, Total Applicants: 50)

Selected (1-30):
  1. Ali (95.5) ✅
  2. Budi (92.3) ✅
  ...
  30. Ahmad (75.2) ✅

Waitlist (31-40):
  31. Farhan (74.8) ⏳
  32. Gita (74.5) ⏳
  ...
  40. Omar (72.1) ⏳

Rejected (41-50):
  41. Pandu (71.8) ❌
  ...
  50. Zain (65.2) ❌
```

---

## 📄 Acceptance Letter Generation

```
┌──────────────────────────────────────────────────────────────┐
│            Acceptance Letter Structure                       │
└──────────────────────────────────────────────────────────────┘

[School Logo]           [School Name]
                    [School Address]
                  [Phone & Email]


        SURAT KEPUTUSAN PENERIMAAN
         PESERTA DIDIK BARU
       TAHUN AJARAN 2024/2025

Nomor: PPDB/2024/001234

─────────────────────────────────────────────

Kepada Yth,
[Student Name]
[Student Address]

Dengan ini kami sampaikan bahwa:

Anda DITERIMA sebagai siswa baru di [School Name]
untuk tahun ajaran 2024/2025.

Detail:
• Jalur Penerimaan    : [Jalur]
• Peringkat           : [Rank] dari [Total Applicants]
• Nilai Akhir         : [Total Score]

Langkah Selanjutnya:
1. Daftar ulang tanggal: [Re-registration Date]
2. Melengkapi berkas: [Document List]
3. Pembayaran: [Payment Details]

Terima kasih atas partisipasi Anda dalam
seleksi PPDB kami.


                          [Date]

                     Kepala Sekolah,



                    _________________
                   [Principal Name]
                   NIP. [Principal NIP]

─────────────────────────────────────────────
```

---

## 🗄️ Database Schema

```
ppdb_periods/{periodId}
├── selectionConfig: {
│     criteria: {
│       akademik: { weight: 40, maxScore: 100 },
│       prestasi: { weight: 30, maxScore: 100 },
│       zonasi: { weight: 20, maxScore: 100 },
│       tes: { weight: 10, maxScore: 100 }
│     },
│     passingGrade: 70,
│     tieBreaking: 'oldest_first',
│     selectionMode: 'automatic'
│   }
└── selectionLocked: boolean

applications/{applicationId}
├── scores: {
│     akademik: 85,
│     prestasi: 90,
│     zonasi: 100,
│     tes: 80,
│     total: 89,
│     scoredBy: 'userId',
│     scoredAt: Timestamp,
│     locked: false
│   }
├── ranking: {
│     rank: 5,
│     jalur: 'zonasi',
│     totalApplicants: 50,
│     percentile: 90
│   }
└── selectionResult: {
      status: 'selected',
      reason: 'Met quota requirement',
      acceptanceLetterUrl: 'https://...',
      resultPublishedAt: Timestamp
    }
```

---

**Version**: 1.0  
**Last Updated**: 2024
