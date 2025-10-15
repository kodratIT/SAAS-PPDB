# Sprint 9: Scoring, Selection & Ranking

## 📋 Sprint Overview

**Duration**: Week 17-18 (2 weeks)  
**Story Points**: 29 SP  
**Team Size**: 4-5 developers  
**Sprint Goal**: Implement complete scoring system, automated ranking algorithm, dan automated selection process

---

## 🎯 Sprint Goals

1. ✅ Build scoring configuration system
2. ✅ Implement score input interface
3. ✅ Create automated ranking algorithm
4. ✅ Build automated selection process
5. ✅ Implement waitlist management

---

## 👥 Team Structure & Roles

**👨‍💼 Tech Lead (TL)** - Ranking algorithm & selection logic  
**👨‍💻 Full Stack Developer 1 (FSD1)** - Scoring configuration & input  
**👨‍💻 Full Stack Developer 2 (FSD2)** - Selection process & automation  
**🎨 Frontend Developer (FED)** - UI for scoring & ranking  
**🧪 QA Engineer (QA)** - Algorithm testing & validation  

---

## 📚 Stories & Tasks

### Story 9.1: Scoring Configuration (8 SP)
**Assigned**: TL + FSD1 + FED  
**Duration**: 2 days

#### Tasks:
1. **Task 9.1.1**: Create Selection Settings Page (FED, 2h)
2. **Task 9.1.2**: Build Criteria Configuration Form (FED, 3h)
3. **Task 9.1.3**: Implement Weight Slider (FED, 2h)
4. **Task 9.1.4**: Add Weight Validation (Total = 100%) (FSD1, 2h)
5. **Task 9.1.5**: Create Passing Grade Config (FSD1, 2h)
6. **Task 9.1.6**: Implement Tie-Breaking Rules Config (TL, 3h)
7. **Task 9.1.7**: Save Configuration to Period Settings (FSD1, 2h)
8. **Task 9.1.8**: Show Scoring Preview/Calculator (FED, 3h)

**Deliverables**:
- Selection settings page
- Criteria configuration (akademik, prestasi, zonasi, tes)
- Weight management dengan validation
- Passing grade configuration
- Tie-breaking rules

**Acceptance Criteria**:
- ✅ Can set weight for each criteria
- ✅ Total weight must equal 100%
- ✅ Can set passing grade (0-100)
- ✅ Can configure tie-breaking rules (oldest first, lottery, etc.)
- ✅ Configuration saved to ppdb_periods/{periodId}/selectionConfig
- ✅ Preview calculator shows example scoring

---

### Story 9.2: Score Input & Calculation (8 SP)
**Assigned**: FSD1 + FED  
**Duration**: 2 days

#### Tasks:
1. **Task 9.2.1**: Create Scoring Page for Panitia (FED, 3h)
2. **Task 9.2.2**: List Applicants Assigned to Panitia (FSD1, 2h)
3. **Task 9.2.3**: Build Score Input Form per Criteria (FED, 3h)
4. **Task 9.2.4**: Add Score Validation (Min/Max) (FSD1, 2h)
5. **Task 9.2.5**: Calculate Total Score Automatically (FSD1, 3h)
6. **Task 9.2.6**: Implement Bulk Score Import (Excel) (FSD1, 4h)
7. **Task 9.2.7**: Save Scores to Firestore (FSD1, 2h)
8. **Task 9.2.8**: Lock Scores After Submission (FSD1, 2h)
9. **Task 9.2.9**: Show Score History/Audit Trail (FED, 2h)

**Deliverables**:
- Scoring interface for panitia
- Score input forms
- Auto-calculation logic
- Excel import functionality
- Score locking mechanism

**Acceptance Criteria**:
- ✅ Can input scores for each criteria
- ✅ Validation prevents invalid scores (0-100)
- ✅ Total score calculates correctly based on weights
- ✅ Can import scores from Excel (bulk)
- ✅ Scores saved to applications/{id}/scores
- ✅ Scores can't be changed after lock
- ✅ History shows all score changes with timestamp

---

### Story 9.3: Ranking System (8 SP)
**Assigned**: TL + FSD1 + FED  
**Duration**: 2 days

#### Tasks:
1. **Task 9.3.1**: Create Ranking Page (FED, 3h)
2. **Task 9.3.2**: Implement Ranking Algorithm (TL, 4h)
3. **Task 9.3.3**: Calculate Rankings per Jalur (TL, 3h)
4. **Task 9.3.4**: Apply Tie-Breaking Rules (TL, 3h)
5. **Task 9.3.5**: Show Ranking Table (FED, 2h)
6. **Task 9.3.6**: Add Passing Grade Line Indicator (FED, 2h)
7. **Task 9.3.7**: Implement Manual Rank Adjustment (FSD1, 3h)
8. **Task 9.3.8**: Add Lock Ranking Functionality (FSD1, 1h)
9. **Task 9.3.9**: Export Ranking to Excel/PDF (FSD1, 3h)

**Deliverables**:
- Ranking page
- Automated ranking algorithm
- Ranking table dengan indicators
- Manual adjustment (optional)
- Export functionality

**Acceptance Criteria**:
- ✅ Rankings calculated correctly per jalur
- ✅ Tie-breaking rules applied automatically
- ✅ Table shows: rank, name, jalur, total score, status
- ✅ Passing grade line visible
- ✅ Can manually adjust ranks (if hybrid mode enabled)
- ✅ Can lock to prevent further changes
- ✅ Can export to Excel & PDF

---

### Story 9.4: Automated Selection (5 SP)
**Assigned**: TL + FSD2  
**Duration**: 1.5 days

#### Tasks:
1. **Task 9.4.1**: Create Selection Process Page (FED, 2h)
2. **Task 9.4.2**: Implement Auto-Selection Algorithm (TL, 4h)
3. **Task 9.4.3**: Select Top N Applicants per Jalur (TL, 2h)
4. **Task 9.4.4**: Handle Over-Quota Scenarios (TL, 2h)
5. **Task 9.4.5**: Create Waitlist Logic (FSD2, 3h)
6. **Task 9.4.6**: Update Application Statuses (FSD2, 2h)
7. **Task 9.4.7**: Generate Acceptance Letters (PDF) (FSD2, 3h)
8. **Task 9.4.8**: Preview Selection Before Confirm (FED, 2h)
9. **Task 9.4.9**: Confirm & Finalize Selection (FSD2, 2h)

**Deliverables**:
- Selection process page
- Auto-selection algorithm
- Waitlist creation
- Acceptance letter generation
- Finalization mechanism

**Acceptance Criteria**:
- ✅ Algorithm selects correctly based on ranking
- ✅ Quotas per jalur respected
- ✅ Waitlist created for near-miss applicants
- ✅ Application statuses update (selected/rejected/waitlist)
- ✅ Acceptance letters generated (PDF with school letterhead)
- ✅ Can preview selection results before finalizing
- ✅ Selection is final and locked after confirmation

---

## 🛠️ Tech Stack

### New Libraries

| Library | Purpose | Version |
|---------|---------|---------|
| `xlsx` | Excel import/export | ^0.18.5 |
| `jsPDF` | PDF generation | ^2.5.1 |
| `jspdf-autotable` | PDF tables | ^3.8.2 |

---

## 📐 Architecture

### Scoring System Flow
```
1. Admin configures scoring criteria & weights
   └─> Save to ppdb_periods/{periodId}/selectionConfig

2. Panitia inputs scores for applicants
   └─> Save to applications/{id}/scores

3. System calculates total score
   totalScore = (akademik * weightAkademik) + 
                (prestasi * weightPrestasi) + 
                (zonasi * weightZonasi) + 
                (tes * weightTes)

4. Rankings generated per jalur
   └─> Sort by totalScore DESC
   └─> Apply tie-breaking rules

5. Selection algorithm runs
   └─> Select top N per jalur
   └─> Create waitlist
   └─> Update statuses
```

### Ranking Algorithm
```typescript
function calculateRankings(applicants: Application[], config: SelectionConfig) {
  // Group by jalur
  const byJalur = groupBy(applicants, 'jalur');
  
  Object.entries(byJalur).forEach(([jalur, apps]) => {
    // Sort by total score DESC
    apps.sort((a, b) => b.scores.total - a.scores.total);
    
    // Apply tie-breaking
    apps.forEach((app, index) => {
      if (index > 0 && app.scores.total === apps[index-1].scores.total) {
        // Same score, apply tie-breaking rule
        if (config.tieBreaking === 'oldest_first') {
          // Sort by registration date
        } else if (config.tieBreaking === 'lottery') {
          // Random
        }
      }
      
      app.rank = index + 1;
      app.status = app.rank <= quotas[jalur] ? 'above_passing' : 'below_passing';
    });
  });
  
  return applicants;
}
```

### Selection Algorithm
```typescript
function autoSelect(rankedApplicants: Application[], quotas: Quotas) {
  const selected = [];
  const waitlist = [];
  const rejected = [];
  
  Object.entries(groupBy(rankedApplicants, 'jalur')).forEach(([jalur, apps]) => {
    const quota = quotas[jalur];
    
    apps.forEach((app, index) => {
      if (index < quota) {
        app.status = 'selected';
        selected.push(app);
      } else if (index < quota + 10) { // Waitlist = next 10
        app.status = 'waitlist';
        waitlist.push(app);
      } else {
        app.status = 'rejected';
        rejected.push(app);
      }
    });
  });
  
  return { selected, waitlist, rejected };
}
```

---

## 📊 Database Schema Changes

### ppdb_periods (add selectionConfig)
```typescript
{
  // ... existing fields
  selectionConfig: {
    criteria: {
      akademik: { weight: 40, maxScore: 100 };
      prestasi: { weight: 30, maxScore: 100 };
      zonasi: { weight: 20, maxScore: 100 };
      tes: { weight: 10, maxScore: 100 };
    };
    passingGrade: 70;
    tieBreaking: 'oldest_first' | 'lottery' | 'manual';
    selectionMode: 'automatic' | 'hybrid' | 'manual';
  };
  selectionLocked: boolean;
}
```

### applications (add scores & ranking)
```typescript
{
  // ... existing fields
  scores: {
    akademik: number;
    prestasi: number;
    zonasi: number;
    tes: number;
    total: number;
    scoredBy: string;
    scoredAt: Timestamp;
    locked: boolean;
  };
  ranking: {
    rank: number;
    jalur: string;
    totalApplicants: number;
    percentile: number;
  };
  selectionResult?: {
    status: 'selected' | 'waitlist' | 'rejected';
    reason?: string;
    acceptanceLetterUrl?: string;
    resultPublishedAt?: Timestamp;
  };
}
```

---

## ✅ Sprint 9 Acceptance Criteria

### Scoring Configuration
- ✅ Can configure all criteria
- ✅ Weight validation works (total = 100%)
- ✅ Passing grade configurable
- ✅ Tie-breaking rules saveable
- ✅ Preview calculator functional

### Score Input
- ✅ Can input scores for all criteria
- ✅ Validation enforces 0-100 range
- ✅ Total calculates correctly
- ✅ Excel import works
- ✅ Score locking prevents changes
- ✅ Audit trail preserved

### Ranking
- ✅ Rankings accurate per jalur
- ✅ Tie-breaking applied correctly
- ✅ Table displays all info
- ✅ Manual adjustment works (if enabled)
- ✅ Export generates correct files

### Selection
- ✅ Auto-selection follows algorithm
- ✅ Quotas respected
- ✅ Waitlist created correctly
- ✅ PDFs generated with school branding
- ✅ Preview accurate
- ✅ Finalization irreversible

---

## 🧪 Testing Requirements

### Algorithm Tests
- Ranking correctness tests
- Tie-breaking logic tests
- Selection algorithm tests
- Quota enforcement tests

### Integration Tests
- Score input to ranking flow
- Ranking to selection flow
- PDF generation tests

### Edge Cases
- Tied scores handling
- Over/under quota scenarios
- Empty jalur handling

---

## 📈 Success Metrics

- ✅ Ranking accuracy 100%
- ✅ Selection time < 5 seconds
- ✅ PDF generation < 10 seconds per letter
- ✅ 0 manual interventions needed (automatic mode)

---

**Sprint Status**: 🚀 Ready to Start  
**Version**: 1.0  
**Last Updated**: 2024
