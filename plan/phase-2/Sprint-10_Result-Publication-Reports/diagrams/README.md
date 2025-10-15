# Sprint 10 - Architecture Diagrams

## 📢 Result Publication System

```
┌──────────────────────────────────────────────────────────────┐
│            Result Publication Flow                           │
└──────────────────────────────────────────────────────────────┘

School Admin
     │
     ├─> 1. Navigate to Selection > Publish
     │
     ├─> 2. Load Preview
     │        Query all applications for period
     │        Group by selectionResult.status:
     │        - Selected: X students
     │        - Waitlist: Y students
     │        - Rejected: Z students
     │
     ├─> 3. Choose Publication Method:
     │    
     │    Option A: Publish Now
     │        ├─> Update period: status = 'published'
     │        ├─> Queue emails for all applicants
     │        ├─> Create notifications
     │        └─> Make results visible on student portal
     │
     │    Option B: Schedule Publication
     │        ├─> Set scheduledAt timestamp
     │        ├─> Update period: status = 'scheduled'
     │        └─> Background job will publish at scheduled time
     │
     └─> 4. Confirmation & Monitoring
              Monitor email delivery
              Track notification sends
              View publication status


Background Job (Every 5 minutes):
     └─> Check for scheduled publications
          WHERE status = 'scheduled'
          AND scheduledAt <= NOW
          
          FOR each due publication:
            ├─> Publish results
            ├─> Send notifications
            └─> Update status to 'published'
```

---

## 🎓 Student Result View

```
┌──────────────────────────────────────────────────────────────┐
│              Student Result Access                           │
└──────────────────────────────────────────────────────────────┘

Student
     │
     ├─> 1. Login to Portal
     │
     ├─> 2. Navigate to Result Page
     │
     ├─> 3. Check if Results Published
     │        Query ppdb_periods.resultPublication.status
     │        
     │        IF status != 'published':
     │          Show "Results not yet published"
     │          Return
     │
     ├─> 4. Load Application Data
     │        - Selection result
     │        - Score breakdown
     │        - Ranking (if school allows)
     │        - Acceptance letter URL
     │
     ├─> 5. Display Result
     │    
     │        IF status = 'selected':
     │          🎉 CONGRATULATIONS! YOU ARE ACCEPTED
     │          - Score breakdown
     │          - Ranking
     │          - Download acceptance letter button
     │          - Next steps (re-registration)
     │          - Re-registration CTA button
     │    
     │        ELSE IF status = 'waitlist':
     │          ⏳ YOU ARE ON THE WAITLIST
     │          - Score breakdown
     │          - Ranking
     │          - Waitlist position
     │          - Next steps (wait for updates)
     │    
     │        ELSE IF status = 'rejected':
     │          😔 SORRY, YOU WERE NOT ACCEPTED
     │          - Score breakdown
     │          - Ranking
     │          - Thank you message
     │
     └─> 6. Track View
              Log to result_views collection
              - viewedAt timestamp
              - letterDownloaded (if downloaded)
```

---

## 📊 Reports System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│              Reports Dashboard                               │
└──────────────────────────────────────────────────────────────┘

1. REGISTRATION REPORT
   Purpose: Track application trend over time
   
   Data Query:
   - Group applications by createdAt date
   - Count per day
   - Calculate cumulative total
   
   Visualization:
   - Line chart (time series)
   - X-axis: Date
   - Y-axis: Application count
   
   Metrics:
   - Total applications
   - Daily average
   - Peak registration date
   - Completion rate


2. DEMOGRAPHIC REPORT
   Purpose: Understand applicant demographics
   
   Data Query:
   - Group by gender
   - Group by age range
   - Group by location (city/district)
   
   Visualization:
   - Pie charts for gender & age
   - Map for location distribution
   
   Metrics:
   - Gender ratio
   - Average age
   - Top 5 locations


3. JALUR DISTRIBUTION REPORT
   Purpose: Analyze jalur effectiveness
   
   Data Query:
   - Count applications per jalur
   - Count selected per jalur
   - Calculate selection rate
   
   Visualization:
   - Bar chart (grouped)
   - X-axis: Jalur
   - Y-axis: Count
   - Two bars: Applications & Selected
   
   Metrics:
   - Most popular jalur
   - Highest selection rate
   - Quota utilization


4. FINANCIAL REPORT
   Purpose: Track revenue & payments
   
   Data Query:
   - Sum payments WHERE status = 'paid'
   - Sum outstanding WHERE status = 'pending'
   - Count payment methods
   
   Visualization:
   - Cards for metrics
   - Pie chart for payment methods
   - Line chart for revenue trend
   
   Metrics:
   - Total revenue
   - Outstanding amount
   - Payment completion rate
   - Average payment time


5. VERIFICATION REPORT
   Purpose: Monitor verification efficiency
   
   Data Query:
   - Calculate average time:
     verifiedAt - uploadedAt
   - Count verified vs pending
   - Group rejection reasons
   
   Visualization:
   - Bar chart for turnaround time
   - Pie chart for status
   - Bar chart for rejection reasons
   
   Metrics:
   - Average turnaround time
   - Verification rate
   - Top rejection reasons
   - Panitia performance
```

---

## 📤 Data Export System

```
┌──────────────────────────────────────────────────────────────┐
│              Export Functionality                            │
└──────────────────────────────────────────────────────────────┘

School Admin
     │
     ├─> 1. Open Export Modal
     │        From Reports page or Applicants list
     │
     ├─> 2. Select Fields
     │        Checkboxes for:
     │        ├─ Basic Info (name, email, phone)
     │        ├─ Registration Details
     │        ├─ Scores & Ranking
     │        ├─ Payment Info
     │        ├─ Documents (include/exclude)
     │        └─ Custom Fields
     │
     ├─> 3. Select Export Format
     │    
     │    Option A: Excel (.xlsx)
     │        ├─> Uses XLSX library
     │        ├─> Creates formatted spreadsheet
     │        ├─> Multiple sheets if needed
     │        └─> Downloads .xlsx file
     │    
     │    Option B: CSV (.csv)
     │        ├─> Uses Papa Parse
     │        ├─> Plain text format
     │        ├─> Easy to import to other systems
     │        └─> Downloads .csv file
     │    
     │    Option C: PDF (.pdf)
     │        ├─> Uses jsPDF
     │        ├─> Formatted document
     │        ├─> Table with selected fields
     │        ├─> School branding
     │        └─> Downloads .pdf file
     │
     ├─> 4. Generate Export
     │        Show progress indicator
     │        
     │        Process:
     │        1. Fetch filtered data
     │        2. Format data based on selected fields
     │        3. Generate file
     │        4. Trigger download
     │
     └─> 5. Download Complete
              File saved to downloads folder


Export Optimization:
- Batch processing for large datasets (1000+ rows)
- Stream data instead of loading all at once
- Show progress: "Processing 500/1000 records..."
- Cancel option for long exports
```

---

## 🗄️ Database Schema

```
ppdb_periods/{periodId}
├── resultPublication: {
│     scheduled: boolean,
│     scheduledAt: Timestamp | null,
│     publishedAt: Timestamp | null,
│     publishedBy: string | null,
│     status: 'draft' | 'scheduled' | 'published'
│   }
├── showRanking: boolean     # Allow students to see ranking?
└── reRegistrationDeadline: Timestamp

applications/{applicationId}
├── selectionResult: {
│     status: 'selected' | 'waitlist' | 'rejected',
│     reason: string,
│     acceptanceLetterUrl: string | null,
│     resultPublishedAt: Timestamp | null
│   }
├── scores: { ... }
└── ranking: { ... }

result_views/{viewId}
├── applicationId: string
├── userId: string
├── viewedAt: Timestamp
├── letterDownloaded: boolean
└── downloadedAt: Timestamp | null
```

---

## 📈 Report Queries Examples

### Registration Trend
```typescript
// Daily registration count
SELECT 
  DATE(createdAt) as date,
  COUNT(*) as count
FROM applications
WHERE schoolId = 'school123'
  AND createdAt BETWEEN startDate AND endDate
GROUP BY DATE(createdAt)
ORDER BY date ASC
```

### Jalur Distribution
```typescript
// Applications & selections per jalur
SELECT 
  jalur,
  COUNT(*) as applications,
  SUM(CASE WHEN selectionResult.status = 'selected' THEN 1 ELSE 0 END) as selected
FROM applications
WHERE schoolId = 'school123'
GROUP BY jalur
```

### Financial Summary
```typescript
// Revenue & outstanding
SELECT 
  SUM(CASE WHEN paymentStatus = 'paid' THEN amount ELSE 0 END) as totalRevenue,
  SUM(CASE WHEN paymentStatus = 'pending' THEN amount ELSE 0 END) as outstanding,
  COUNT(CASE WHEN paymentStatus = 'paid' THEN 1 END) as paidCount
FROM applications
WHERE schoolId = 'school123'
```

---

**Version**: 1.0  
**Last Updated**: 2024
