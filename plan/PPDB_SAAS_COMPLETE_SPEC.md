# 📋 SPESIFIKASI LENGKAP APLIKASI SAAS PPDB SEKOLAH

## 📖 Daftar Isi
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Arsitektur Multi-Tenant](#arsitektur-multi-tenant)
- [Role & User Management](#role--user-management)
- [Fitur Super Admin](#fitur-super-admin)
- [Fitur School Admin](#fitur-school-admin)
- [Fitur Panitia PPDB](#fitur-panitia-ppdb)
- [Fitur Portal Pendaftar](#fitur-portal-pendaftar)
- [Additional Features & Integrations](#additional-features--integrations)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Deployment Strategy](#deployment-strategy)

---

## Overview

Aplikasi SAAS PPDB (Penerimaan Peserta Didik Baru) adalah platform multi-tenant untuk membantu sekolah mengelola proses pendaftaran siswa baru secara online.

### Key Features
- ✅ Multi-tenancy (satu aplikasi untuk banyak sekolah)
- ✅ Firebase + Next.js Fullstack
- ✅ Subscription-based SAAS model
- ✅ Payment gateway integration (Midtrans/Xendit)
- ✅ Custom form builder
- ✅ Document verification system
- ✅ Automated scoring & ranking
- ✅ Email/SMS/WhatsApp notifications
- ✅ White-label support
- ✅ Comprehensive analytics & reporting

---

## Tech Stack

### Framework & Database
- **Frontend & Backend**: Next.js 14+ (App Router, Server Components)
- **Database**: Firebase Firestore (NoSQL)
- **Authentication**: Firebase Authentication
- **Storage**: Firebase Storage
- **Functions**: Firebase Functions (background jobs)

### UI/UX
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Tables**: TanStack Table
- **Charts**: Recharts
- **Rich Text**: Tiptap

### State & Data
- **State Management**: Zustand
- **Server State**: TanStack Query (React Query)
- **Date Handling**: date-fns

### Integrations
- **Email**: Resend + React Email
- **Payment**: Midtrans / Xendit
- **Maps**: Google Maps API
- **SMS/WhatsApp**: Twilio / WhatsApp Business API
- **Analytics**: Google Analytics, Vercel Analytics
- **Error Tracking**: Sentry

### Development Tools
- **Language**: TypeScript
- **Linting**: ESLint
- **Formatting**: Prettier
- **Testing**: Jest, React Testing Library, Cypress
- **Git Hooks**: Husky, lint-staged

### Deployment
- **Hosting**: Vercel
- **CDN**: Vercel CDN / Cloudflare
- **Database**: Firebase (Google Cloud)

---

## Arsitektur Multi-Tenant

### Strategi Multi-tenancy dengan Firestore

**Approach**: Database-per-tenant dengan shared infrastructure

**Tenant Identification**:
- Setiap sekolah memiliki unique `schoolId` sebagai tenant identifier
- URL routing: `app.ppdb.com/{schoolSlug}` atau custom domain `ppdb.sekolah.id`
- Middleware Next.js untuk tenant detection dari URL/domain

**Data Isolation**:
- Semua collections memiliki field `schoolId` (indexed)
- Firestore Security Rules enforce data isolation berdasarkan `schoolId`
- Firebase Custom Claims untuk role-based access control

**Example Security Rule**:
```javascript
match /applications/{docId} {
  allow read, write: if request.auth != null 
    && request.auth.token.schoolId == resource.data.schoolId;
}
```

---

## Role & User Management

### 4 Level Akses

1. **Super Admin** (Owner SAAS)
   - Akses ke semua sekolah
   - Manajemen subscription & billing
   - System configuration
   - Analytics global

2. **School Admin** (Admin Sekolah)
   - Akses penuh untuk sekolahnya
   - Manajemen PPDB
   - Manajemen panitia
   - Reports & analytics sekolah

3. **Panitia PPDB** (Tim Seleksi)
   - Verifikasi dokumen
   - Input nilai/scoring
   - View applicants
   - Limited access

4. **Student/Parent** (Pendaftar)
   - Registrasi akun
   - Isi formulir
   - Upload dokumen
   - Track status
   - View hasil seleksi

---

## Fitur Super Admin

### A. Dashboard & Analytics

**Real-time Metrics**
- Total sekolah (aktif, trial, expired, suspended)
- Total pendaftar across all schools (hari ini, minggu ini, bulan ini)
- Total revenue (MRR, ARR, lifetime value)
- Conversion rate (trial to paid)
- Churn rate
- Active sessions real-time
- Server health & uptime monitoring

**Advanced Analytics**
- Growth chart (sekolah baru per bulan)
- Revenue trends & forecasting
- Geographic distribution schools (map view)
- Popular features usage tracking
- User engagement metrics
- Performance metrics (page load, API response time)
- Error tracking & logs

**Comparison Reports**
- School A vs School B performance
- Plan comparison (which features most used)
- Monthly/Yearly comparison

---

### B. School Management (Tenant Management)

**Registrasi Sekolah**
- Manual add school
- Self-registration approval workflow
- Bulk import schools from Excel
- School verification (NPSN check)
- Set initial admin credentials
- Welcome email automation

**School Profile Management**
- Edit school details (nama, alamat, kontak)
- NPSN, NSS, Akreditasi
- Logo, cover image, gallery (multiple images)
- Social media links
- School type (SD, SMP, SMA, SMK)
- Status (Negeri/Swasta)
- Coordinates (untuk peta zonasi)

**School Actions**
- Activate/Deactivate school
- Suspend school (pelanggaran TOS)
- Delete school (soft delete with backup)
- Reset school data (per periode PPDB)
- Impersonate login (for support)
- Transfer ownership

**School Settings Override**
- Force enable/disable features
- Set custom limits (override subscription)
- White-label settings
- Custom domain mapping
- SSL certificate management

---

### C. Subscription & Billing Management

**Subscription Plans**
- Create/Edit/Delete plans
- Plan features matrix:
  - Max students per period
  - Max storage (GB)
  - Max admins/panitia accounts
  - Max custom forms
  - Max email sends per month
  - WhatsApp notifications (included/not)
  - Priority support (yes/no)
  - White-label (yes/no)
  - API access (yes/no)
  - Custom domain (yes/no)
  - Remove branding (yes/no)
- Pricing tiers: Free, Starter, Professional, Enterprise
- Billing cycle: Monthly/Yearly (discount untuk yearly)
- Trial period settings (7/14/30 days)

**Billing Management**
- Invoice generation & tracking
- Payment history per school
- Overdue payments alert
- Auto-suspend on payment failure
- Refund processing
- Credit notes
- Tax calculation (PPN)
- Receipt/invoice email automation

**Coupon & Discount**
- Create promo codes
- Percentage/fixed discount
- Usage limit & expiry date
- Apply to specific plans
- Track coupon usage

**Payment Gateway Config**
- Midtrans API keys
- Xendit settings
- Payment methods enabled
- Webhook URL configuration
- Test mode toggle

---

### D. User & Role Management

**Super Admin Team**
- Add/remove super admins
- Role-based access control:
  - Full Admin (semua akses)
  - Support (read-only + impersonate)
  - Finance (billing only)
  - Developer (system config)
- Activity log per admin
- Two-factor authentication (2FA)

**User Management Global**
- Search all users across schools
- View user details & activity
- Ban/unban users
- Merge duplicate accounts
- Password reset assistance
- Email verification resend

---

### E. System Configuration

**Email Settings**
- SMTP configuration
- Email templates editor:
  - Welcome email
  - Password reset
  - Payment confirmation
  - Subscription renewal
  - System notifications
- Email logs & tracking
- Bounce rate monitoring

**SMS/WhatsApp Settings**
- WhatsApp Business API config
- SMS gateway (Twilio, Vonage)
- Message templates
- Credit balance tracking
- Usage logs

**Storage Management**
- Total storage used across all schools
- Storage quotas per school
- Cleanup old files automation
- CDN configuration
- Backup settings

**Feature Flags**
- Enable/disable features globally
- Beta features rollout
- A/B testing configuration
- Kill switch for problematic features

**Maintenance & Updates**
- Maintenance mode (scheduled/emergency)
- Custom maintenance page
- System announcements
- Release notes management
- Update notifications to schools

**Security Settings**
- Rate limiting config
- IP whitelist/blacklist
- Failed login attempt threshold
- Session timeout settings
- CORS configuration
- API key management

---

### F. Content Management

**Landing Page Builder**
- Hero section editor
- Features showcase
- Pricing table
- Testimonials
- FAQ management
- Blog posts (untuk SEO)
- Media library

**Help Center**
- Knowledge base articles
- Video tutorials
- Category management
- Search functionality
- User feedback on articles

---

### G. Support & Communication

**Ticketing System**
- View all support tickets
- Assign to team members
- Priority levels (low, medium, high, urgent)
- Status tracking (open, in-progress, resolved, closed)
- Canned responses
- Internal notes

**Announcement System**
- Broadcast to all schools
- Scheduled announcements
- Target specific plans/schools
- Email + in-app notification

**Live Chat**
- Chat with school admins
- Chat history
- Online/offline status

---

### H. Reports & Export

**System Reports**
- Monthly revenue report
- School growth report
- User activity report
- Feature usage report
- Error logs report
- Export to PDF/Excel/CSV

**Audit Logs**
- All super admin actions
- School creation/deletion
- Subscription changes
- System configuration changes
- Filter by date, user, action type

---

## Fitur School Admin

### A. Dashboard & Overview

**Quick Stats**
- Total pendaftar (periode aktif)
- Pendaftar hari ini (real-time)
- Pending verifikasi
- Total pembayaran masuk
- Kuota tersisa per jalur
- Conversion rate (visitor → submit)

**Charts & Graphs**
- Pendaftar trend (line chart)
- Jalur pendaftaran (pie chart)
- Status pendaftaran (bar chart)
- Demografi: Jenis kelamin, usia, asal sekolah
- Peak registration hours

**Recent Activities**
- Pendaftaran terbaru
- Pembayaran terbaru
- Dokumen yang perlu diverifikasi
- Chat messages dari pendaftar

**Quick Actions**
- Buat periode PPDB baru
- Verifikasi dokumen
- Broadcast message
- Export data

---

### B. School Profile Management

**Basic Information**
- Nama sekolah, alamat lengkap
- Koordinat (untuk map)
- Telepon, email, website
- Logo, cover image, gallery (multiple images)
- Motto, visi, misi sekolah
- Akreditasi, NPSN, NSS
- Tahun berdiri

**Social Media**
- Facebook, Instagram, Twitter, YouTube
- WhatsApp official number
- Display on landing page

**Facilities & Achievements**
- Fasilitas sekolah (lab, perpustakaan, dll)
- Prestasi sekolah
- Ekstrakurikuler available
- Show on landing page

**Branding** (if plan allows)
- Custom colors (primary, secondary)
- Custom fonts
- Favicon
- Email header/footer

---

### C. PPDB Period Management

**Create Period**
- Nama periode (e.g., "PPDB 2024/2025")
- Tahun ajaran
- Batch/gelombang (1, 2, 3, dst)
- Tanggal mulai - selesai pendaftaran
- Tanggal seleksi
- Tanggal pengumuman
- Status: Draft/Active/Closed
- Duplicate from previous period

**Quota Settings**
- Total kuota keseluruhan
- Breakdown per jalur:
  - Jalur Prestasi (akademik/non-akademik)
  - Jalur Zonasi (jarak dari sekolah)
  - Jalur Umum
  - Jalur Afirmasi (kurang mampu)
  - Jalur Perpindahan Tugas Orang Tua
- Kuota per kelas (jika ada penjurusan)
- Kuota per gender (opsional)

**Fee Configuration**
- Biaya pendaftaran
- Biaya daftar ulang (jika diterima)
- Payment methods allowed
- Payment deadline
- Late payment policy
- Discount untuk early bird

**Timeline Settings**
- Tanggal buka - tutup pendaftaran
- Batas edit formulir
- Batas upload dokumen
- Periode verifikasi
- Tanggal tes/seleksi (jika ada)
- Tanggal pengumuman
- Periode daftar ulang
- Auto-close registration when quota full (toggle)

---

### D. Form Builder (Custom Formulir)

**Form Designer**
- Drag & drop interface
- Sections/tabs: Biodata, Orang Tua, Alamat, Pendidikan, Prestasi
- Field types:
  - Text input (short/long)
  - Number
  - Email
  - Phone number
  - Date picker
  - Dropdown/Select
  - Radio buttons
  - Checkbox
  - File upload
  - Address (auto-complete)
  - Map picker (koordinat)
- Field properties:
  - Label & placeholder
  - Required/optional
  - Validation rules (min/max, regex)
  - Help text
  - Default value
  - Conditional visibility (show if...)

**Pre-defined Templates**
- Template SD (basic)
- Template SMP
- Template SMA
- Template SMK (dengan jurusan)
- Duplicate from previous period

**Form Settings**
- Multi-step atau single page
- Progress indicator style
- Auto-save draft (interval)
- Allow edit after submit (toggle + deadline)
- Confirmation message
- Redirect after submit

**Preview & Test**
- Preview form as user
- Test submit
- Mobile responsive preview

---

### E. Document Requirements

**Document Configuration**
- Add dokumen wajib:
  - Pas foto 3x4
  - Kartu Keluarga (KK)
  - Akta Kelahiran
  - Ijazah/SKHUN (jika pindahan)
  - Rapor semester terakhir
  - Surat keterangan tidak mampu (jalur afirmasi)
  - Sertifikat prestasi (jalur prestasi)
  - Surat tugas orang tua (jalur perpindahan)
  - KTP orang tua
  - KIP/PKH (jika ada)
- Per dokumen settings:
  - Nama dokumen
  - Deskripsi & contoh
  - Required/optional
  - File format (PDF, JPG, PNG)
  - Max file size (MB)
  - Multiple files allowed (toggle)

**Document Verification Rules**
- Auto-verify (by file size/format)
- Manual verification required
- AI-powered document verification (OCR)
- Reject reason templates

---

### F. Jalur Seleksi & Penilaian

**Jalur Pendaftaran Setup**
- Define jalur yang dibuka
- Per jalur configuration:
  - Nama jalur
  - Deskripsi & requirements
  - Kuota
  - Biaya (bisa beda per jalur)
  - Kriteria penilaian
  - Bobot nilai

**Kriteria Penilaian**
- Nilai Akademik:
  - Rata-rata rapor
  - Bobot per mata pelajaran
  - Bobot per semester
- Nilai Tes (jika ada):
  - Tes tertulis
  - Tes wawancara
  - Tes praktik
- Prestasi:
  - Tingkat: Kecamatan, Kab/Kota, Provinsi, Nasional, Internasional
  - Jenis: Akademik, Olahraga, Seni, Lainnya
  - Point per tingkat
- Zonasi:
  - Jarak dari sekolah (radius km)
  - Point berdasarkan jarak
  - Verifikasi alamat via map
- Usia:
  - Min/max usia
  - Point usia

**Scoring System**
- Total bobot = 100%
- Akademik: ___%
- Prestasi: ___%
- Zonasi: ___%
- Tes: ___%
- Auto-calculate atau manual input
- Passing grade setting

**Selection Method**
- Otomatis (by ranking)
- Manual selection
- Hybrid (sistem ranking + manual adjustment)

---

### G. User Management (Internal)

**Admin Management**
- Tambah admin sekolah
- Permissions:
  - Full access
  - View only
  - Manage PPDB
  - Manage users
  - Financial access
- Activity log per admin
- Deactivate/remove admin

**Panitia PPDB**
- Invite panitia (via email)
- Role assignment:
  - Verifikator dokumen
  - Penilai tes
  - Customer support
- Workload distribution
- Performance tracking (berapa dokumen diverifikasi)
- Shift/schedule management (opsional)

---

### H. Announcement & Communication

**Public Announcements**
- Buat pengumuman di landing page
- Urgent/important badge
- Schedule publish
- Archive old announcements

**Broadcast Messages**
- Kirim ke semua pendaftar (email + in-app)
- Filter penerima:
  - By status (pending, verified, dll)
  - By jalur pendaftaran
  - By verification status
- Schedule broadcast
- SMS/WhatsApp broadcast (if quota available)

**Email Templates**
- Customize template:
  - Welcome/confirmation email
  - Payment reminder
  - Document verification status
  - Selection result (lulus/tidak lulus)
  - Interview invitation
- Variables: {{name}}, {{registration_number}}, dll
- Preview & test send

**Automated Notifications**
- Auto-send on trigger:
  - Form submitted
  - Payment received
  - Document verified/rejected
  - Selection result
- Enable/disable per notification type

---

### I. Payment Management

**Payment Dashboard**
- Total pembayaran hari ini
- Pending payments
- Failed payments
- Payment methods breakdown
- Outstanding payments list

**Payment Configuration**
- Bank accounts (manual transfer)
- Payment gateway (otomatis)
- Payment deadline per application
- Grace period
- Late payment fee

**Manual Verification**
- Queue bukti transfer yang perlu dicek
- Approve/reject payment
- Note untuk reject
- Upload receipt/invoice

**Refund Processing**
- Initiate refund
- Refund reason
- Refund amount (full/partial)
- Track refund status

**Financial Reports**
- Daily/weekly/monthly revenue
- Payment methods comparison
- Outstanding payments report
- Refund report
- Export to Excel
- Integration ke accounting software (opsional)

---

### J. Applicant Management

**Applicant List**
- All applicants table (with pagination)
- Columns: No. Daftar, Nama, Jalur, Status, Tanggal, Actions
- Advanced filters:
  - By status (draft, submitted, paid, verified, selected, accepted, rejected)
  - By jalur pendaftaran
  - By date range
  - By verification status
  - By payment status
  - By score range
  - By gender
  - By asal sekolah
- Search: by nama, email, no. pendaftaran, NISN
- Sorting: by tanggal, nama, score
- Bulk actions:
  - Export selected
  - Send broadcast message
  - Change status
  - Delete

**Applicant Detail View**
- Personal information
- Parent information
- Contact information
- Education history
- Achievement list
- Document preview (in-modal)
- Payment history
- Activity timeline
- Notes/comments (internal)
- Verification history
- Score calculation breakdown
- Actions:
  - Edit application (manual)
  - Verify documents
  - Input score
  - Send message
  - Print application
  - Download documents (zip)

**Document Verification Queue**
- All pending documents
- Filter by document type
- Priority sorting (oldest first)
- Bulk verification (approve all)
- View document + form side-by-side
- Approve/reject per document
- Reject reason (predefined + custom)
- Auto-notify applicant after verify

**Import/Export**
- Import applicants from Excel (bulk)
- Export to Excel/CSV:
  - All fields
  - Selected fields only
  - With/without documents
- Export templates

---

### K. Selection & Ranking

**Scoring Input**
- Manual score input (if test dilakukan)
- Bulk import scores from Excel
- Score validation (max/min)
- Score history & audit log

**Ranking System**
- Auto-calculate ranking based on criteria
- Real-time ranking update
- View ranking table:
  - No. Rank, Nama, Jalur, Total Score, Status
- Filter ranking by jalur
- Passing grade line indicator
- Manual adjustment (if hybrid mode)
- Lock ranking (prevent changes)

**Selection Process**
- Set cut-off score (passing grade)
- Auto-select top N applicants per jalur
- Handle tie-breaking rules:
  - By age (older/younger)
  - By registration date (first come)
  - By specific criteria
- Reserve list (cadangan)
- Manual accept/reject override

**Quota Management**
- Visual quota indicator per jalur
- Over-quota handling
- Transfer quota antar jalur (if allowed)
- Waitlist management

---

### L. Announcement & Result Publication

**Generate Result**
- Preview result before publish
- Accepted list
- Rejected list
- Waitlist
- Export result (PDF, Excel)

**Publish Result**
- Publish to portal (applicants can check)
- Schedule publish date & time
- Auto-send email notification
- SMS/WhatsApp notification (if quota)
- Generate certificate/acceptance letter (auto)

**Re-registration Process**
- Enable re-registration form
- Set deadline
- Required documents for re-reg
- Payment for re-registration (if any)
- Track who already re-registered
- Auto-forfeit if not re-register
- Offer waitlist to fill forfeited slots

---

### M. Testing & Examination (Optional)

**Test Scheduling**
- Set test date, time, location
- Multiple sessions
- Capacity per session
- Allow applicants to choose session

**Test Management**
- Create test questions (jika online)
- Question bank
- Multiple choice, essay, upload answer
- Timer settings
- Proctor mode

**Exam Card**
- Generate exam card/admission ticket
- Barcode/QR code
- Print layout
- Bulk generate & send via email

**Attendance Tracking**
- Check-in system (scan QR)
- Attendance list
- Mark present/absent

---

### N. Reports & Analytics

**Registration Reports**
- Daily registration count
- Cumulative registration
- Registration by jalur
- Registration by source (how they found us)
- Completion rate (start → submit)
- Drop-off analysis (where users abandon)

**Demographic Reports**
- Gender distribution
- Age distribution
- Geographic distribution (map)
- Previous school distribution
- Parent education level
- Parent occupation
- Family income range

**Performance Reports**
- Average score by jalur
- Score distribution (histogram)
- Top performers
- Achievement analysis

**Financial Reports**
- Revenue summary
- Payment collection rate
- Outstanding payments
- Payment method distribution
- Refund summary

**Operational Reports**
- Verification turnaround time
- Panitia performance (documents verified)
- Support tickets resolved
- Email open rate
- SMS delivery rate

**Export & Scheduling**
- Export all reports to PDF/Excel
- Schedule email report (daily, weekly, monthly)
- Custom report builder

---

### O. Settings & Configuration

**General Settings**
- School timezone
- Date format
- Number format
- Default language

**Notification Preferences**
- Enable/disable email notifications
- Enable/disable SMS
- Enable/disable WhatsApp
- Notification sound

**Email Signature**
- Custom email signature for school
- Contact info footer

**Integration Settings**
- Google Analytics tracking ID
- Facebook Pixel
- WhatsApp Business API
- SMS gateway credentials
- Payment gateway keys (school-specific)

**Security Settings**
- Change password
- Two-factor authentication
- Session timeout
- IP whitelist (restrict admin access)

**Data Management**
- Export all data
- Archive old periods
- Delete period (with confirmation)
- Data retention policy

---

### P. Support & Help

**Help Center Access**
- Searchable knowledge base
- Video tutorials
- Contact support

**Ticket System**
- Create support ticket
- View ticket history
- Chat with support

**Feedback**
- Feature request
- Bug report
- Rate our service

---

## Fitur Panitia PPDB

### A. Dashboard

**My Tasks Overview**
- Pending verifications assigned to me
- Pending scores to input
- Unread messages
- Today's schedule

**Performance Metrics**
- Documents verified today/total
- Average verification time
- Accuracy rate (if there's QA)

---

### B. Document Verification

**Verification Queue**
- All pending documents (assigned to me)
- Filter by document type
- Sort by oldest/newest/priority
- Claim document to verify (from shared pool)

**Verification Interface**
- Side-by-side: Document preview + Application form
- Zoom in/out document
- Rotate image
- Verify checklist:
  - Document is clear/readable
  - Name matches
  - Date is valid
  - Signature present (if required)
- Actions:
  - Approve
  - Reject (with reason)
  - Request re-upload
- Add internal note
- Flag for supervisor review

**Batch Verification**
- Approve multiple documents at once
- Reject multiple with same reason

---

### C. Scoring & Assessment

**Score Input Interface**
- List of applicants assigned to me
- Input form per criteria
- Score validation (prevent over max)
- Save as draft
- Submit score (locked)
- Score history

**Interview Assessment** (if applicable)
- Interview schedule
- Interview checklist
- Rating per aspect
- Notes
- Recommendation: Accept/Reject/Maybe

---

### D. Applicant Management

**View Applicants**
- Assigned to me (if workload distributed)
- Search & filter
- View applicant details
- View documents
- Read-only access (can't edit)

**Communication**
- Send message to applicant
- View message history
- Canned responses (quick reply)

---

### E. Reports (Limited)

**My Performance**
- Documents verified (daily, weekly, monthly)
- Average time per verification
- Scores inputted

**Export Data**
- Export my assigned applicants

---

### F. Calendar & Schedule

**My Schedule**
- Interview schedule
- Test proctoring schedule
- Verification shifts (if applicable)

**Availability**
- Set available/unavailable dates
- Request time off

---

## Fitur Portal Pendaftar

### A. Landing Page (per School)

**Hero Section**
- School logo & name
- Hero image/video
- CTA: "Daftar Sekarang"
- Status indicator: Pendaftaran Dibuka/Ditutup
- Countdown timer (to deadline)

**Quick Info Cards**
- Periode pendaftaran
- Kuota tersedia (real-time)
- Biaya pendaftaran
- Jalur yang dibuka

**Alur Pendaftaran** (Step-by-step)
- 1. Buat akun
- 2. Isi formulir
- 3. Upload dokumen
- 4. Bayar
- 5. Verifikasi
- 6. Seleksi
- 7. Pengumuman

**Persyaratan**
- List dokumen yang diperlukan
- Kriteria umur, nilai, dll

**Timeline PPDB**
- Visual timeline
- Tanggal-tanggal penting

**Jalur Pendaftaran**
- Penjelasan setiap jalur
- Persyaratan per jalur
- Kuota per jalur

**About School**
- Visi, misi
- Fasilitas
- Ekstrakurikuler
- Prestasi sekolah
- Gallery foto

**FAQ**
- Accordion style
- Categories
- Search FAQ

**Pengumuman**
- Recent announcements
- Urgent alerts

**Contact**
- Alamat sekolah (Google Maps embed)
- Telepon, email, WhatsApp
- Contact form
- Social media links

**Testimonials**
- Alumni/orang tua testimonials
- Star rating

**Footer**
- Links (Syarat & Ketentuan, Kebijakan Privasi)
- Copyright
- Powered by [Your SAAS Brand] (jika bukan white-label)

---

### B. Authentication

**Register Account**
- Sign up via email
- Sign up via Google
- Sign up via phone number (OTP)
- Email verification required
- Password requirements (min 8 char, etc)
- Terms & conditions checkbox

**Login**
- Email/phone + password
- Remember me
- Forgot password
- Social login (Google, Facebook)
- Auto-login after register

**Profile Management**
- Edit profile (name, email, phone, photo)
- Change password
- Email notification preferences
- Logout
- Delete account (with warning)

---

### C. Application Dashboard (After Login)

**Dashboard Overview**
- Welcome message
- Registration status indicator
- Progress bar (steps completed)
- Quick stats:
  - Formulir: Complete/Incomplete
  - Dokumen: X/Y uploaded
  - Pembayaran: Lunas/Belum
  - Verifikasi: Status
- Important alerts/notifications
- Timeline dengan checklist

**Quick Actions**
- Lanjutkan pengisian formulir
- Upload dokumen
- Bayar sekarang
- Download kartu peserta
- Chat dengan admin

---

### D. Registration Form (Multi-step)

**Step 1: Jalur Pendaftaran**
- Pilih jalur (Prestasi, Zonasi, Umum, dll)
- Info per jalur
- Cannot change after submit (warning)

**Step 2: Data Pribadi**
- Nama lengkap (sesuai akta)
- NIK (validasi 16 digit)
- NISN (opsional)
- Tempat, tanggal lahir
- Jenis kelamin
- Agama
- Anak ke- (dari berapa bersaudara)
- Tinggi badan, berat badan
- Email, no. HP (auto-filled from account)
- Foto profil (crop tool)

**Step 3: Alamat**
- Alamat lengkap (textarea)
- RT/RW, Kelurahan, Kecamatan, Kab/Kota, Provinsi
- Kode pos
- Auto-complete address API (Google Maps)
- Koordinat (untuk zonasi) - drag pin on map
- Jarak dari sekolah (auto-calculate)
- Status tempat tinggal (Orang tua, Wali, Kost, dll)

**Step 4: Data Orang Tua**
- Data Ayah:
  - Nama lengkap
  - NIK
  - Tempat, tanggal lahir
  - Pendidikan terakhir
  - Pekerjaan
  - Penghasilan per bulan
  - No. HP
- Data Ibu: (sama seperti ayah)
- Data Wali (jika ada):
  - Nama lengkap
  - Hubungan dengan siswa
  - NIK
  - No. HP
  - Pekerjaan

**Step 5: Pendidikan Sebelumnya**
- Asal sekolah
- NPSN sekolah asal
- Tahun lulus
- Nomor Ijazah (jika sudah lulus)
- Upload nilai rapor:
  - Semester 1-6 (untuk SD ke SMP)
  - Semester 1-5 (untuk SMP ke SMA)
  - Input per mata pelajaran atau upload rapor
- Rata-rata nilai

**Step 6: Prestasi** (jika jalur prestasi)
- Tambah prestasi (multiple)
- Per prestasi:
  - Jenis prestasi (Akademik, Olahraga, Seni, dll)
  - Nama lomba/kejuaraan
  - Tingkat (Kecamatan, Kab/Kota, Provinsi, Nasional, Internasional)
  - Juara/peringkat
  - Tahun perolehan
  - Penyelenggara
  - Upload sertifikat
- Sistem poin otomatis (berdasarkan tingkat)

**Step 7: Informasi Tambahan** (Custom by school)
- Custom fields dari form builder
- Conditional fields

**Step 8: Review & Submit**
- Preview semua data
- Edit button per section
- Declaration/pernyataan:
  - "Saya menyatakan bahwa data di atas adalah benar"
  - Checkbox agreement
- Submit button
- Download draft (PDF)

**Form Features**
- Auto-save every 30 seconds (draft)
- Manual save draft button
- Progress indicator (step 1 of 8)
- Previous/Next navigation
- Required field validation
- Inline error messages
- Character counter (untuk textarea)
- Tooltip help text
- Mobile-responsive
- Accessibility (keyboard navigation)

---

### E. Document Upload

**Upload Interface**
- List of required documents dengan status:
  - Not uploaded (warning icon)
  - Uploaded - pending verification (clock icon)
  - Verified (check icon)
  - Rejected (X icon) + reason
- Per document:
  - Document name & description
  - Example/sample document
  - Max file size indicator
  - Allowed formats
  - Upload button (drag & drop)
  - Preview uploaded file
  - Re-upload button (if rejected)
  - Delete button

**Upload Features**
- Drag & drop area
- Click to browse
- Multiple files at once
- Progress bar per file
- Image preview (before upload)
- PDF preview (in-browser)
- Compress large images (auto)
- File naming convention (auto-rename)
- Upload from camera (mobile)

**Document Status Tracking**
- Real-time status update
- Notification when verified/rejected
- View rejection reason
- Chat with verifier (if question)

---

### F. Payment

**Payment Information**
- Total amount to pay
- Payment deadline (countdown)
- Late payment warning

**Payment Methods**
- Virtual Account (BCA, Mandiri, BNI, BRI, Permata)
- E-Wallet (GoPay, OVO, DANA, LinkAja, ShopeePay)
- QRIS (scan QR)
- Credit/Debit Card
- COD/Bank Transfer (manual verification)
- Installment (if allowed)

**Payment Process**
- Choose payment method
- Generate payment code/VA/QRIS
- Display instructions:
  - How to pay via ATM
  - How to pay via mobile banking
  - How to scan QRIS
- Payment expiry time (usually 24 hours)
- Copy button for VA number
- Download payment instruction (PDF)

**Payment Confirmation**
- Auto-verify (via webhook dari gateway)
- Manual: Upload bukti transfer
- Payment receipt (download PDF)
- Email confirmation

**Payment History**
- List of all payment attempts
- Status: Pending, Success, Failed, Expired
- Retry payment (if failed/expired)

---

### G. Application Tracking

**Status Timeline**
- Visual timeline dengan checkpoints:
  1. ✅ Akun dibuat
  2. ✅ Formulir submitted
  3. ⏳ Menunggu pembayaran
  4. ⏳ Verifikasi dokumen
  5. ⏳ Proses seleksi
  6. ⏳ Pengumuman
- Timestamp per checkpoint
- Estimated time per step

**Registration Summary Card**
- No. Pendaftaran (unique ID)
- Jalur pendaftaran
- Tanggal daftar
- Status: Draft, Submitted, Paid, Verified, Selected, Accepted, Rejected
- Badge/label dengan warna

**Document Status**
- Checklist dokumen
- Status per dokumen: Pending, Approved, Rejected
- Action required indicator

**Payment Status**
- Paid/Unpaid
- Amount
- Payment method used
- Date paid

**Selection Status**
- If selection already done:
  - View score breakdown
  - View ranking (if allowed)
  - Pass/Fail indicator

---

### H. Examination/Test

**Test Scheduling** (if test required)
- Available test sessions
- Choose session (date, time, location)
- Capacity indicator per session
- Confirm booking

**Exam Card/Admission Ticket**
- Download exam card (PDF)
- Print-friendly format
- Contains:
  - Nama, no. daftar, foto
  - Test date, time, location
  - Room/seat number (if assigned)
  - QR code (for check-in)
  - Rules & regulations

**Online Test** (if applicable)
- Login to test platform
- Identity verification (photo capture)
- Test instructions
- Timer (countdown)
- Questions (multiple choice, essay, upload)
- Mark for review
- Submit test
- Cannot re-enter after submit

**Test Result**
- View test score (if published)
- Answer key (if published)
- Review wrong answers

---

### I. Announcement & Result

**Check Result**
- Enter registration number (if not logged in)
- Or auto-show (if logged in)
- Result page:
  - SELAMAT/MOHON MAAF message
  - Final score
  - Ranking (if allowed)
  - Status: DITERIMA / TIDAK DITERIMA / CADANGAN

**Acceptance Letter**
- Download acceptance letter (PDF)
- Official format dengan kop sekolah
- Signed (digital signature)
- Contains:
  - Nama siswa
  - Accepted to class/program
  - Re-registration instructions
  - Deadline

**Re-registration Process** (if accepted)
- Konfirmasi kehadiran (Ya/Tidak)
- If Ya:
  - Fill additional form (if any)
  - Upload additional documents
  - Pay re-registration fee
  - Schedule to visit school
- Deadline indicator
- Forfeit warning (if not re-register)

---

### J. Communication

**Notification Center**
- In-app notifications
- Badge count on icon
- Mark as read
- Notification types:
  - Payment confirmation
  - Document verified/rejected
  - Announcement from school
  - Selection result
  - Deadline reminder
- Push notification (if PWA)

**Messages/Chat**
- Chat with school admin
- Chat history
- Attach file
- Typing indicator
- Read receipt
- Canned responses dari admin

**Email Notifications**
- Auto-email for:
  - Registration confirmation
  - Payment received
  - Document status update
  - Selection result
  - Deadline reminders
- Email preferences (opt-out)

**SMS/WhatsApp Notifications** (if enabled)
- Important updates via SMS/WA
- OTP verification

---

### K. Downloads & Prints

**Downloadable Documents**
- Registration form (PDF)
- Payment receipt
- Exam card
- Acceptance letter
- All uploaded documents (zip)

**Print-friendly Format**
- Optimized for A4 printing
- Remove unnecessary elements
- QR code included

---

### L. Help & Support

**FAQ Page**
- Common questions
- Search functionality
- Categories
- Was this helpful? (feedback)

**Help Center**
- How-to guides
- Video tutorials
- Contact info

**Live Chat** (if available)
- Chat widget
- Business hours indicator
- Queue position (if busy)

**Contact Form**
- Subject dropdown
- Message textarea
- Attach screenshot
- Submit ticket
- Track ticket status

---

### M. Account Settings

**Profile**
- Edit personal info
- Change email (re-verification required)
- Change phone (OTP verification)
- Upload profile photo

**Security**
- Change password
- Two-factor authentication (optional)
- Active sessions
- Login history

**Notifications**
- Email notification preferences
- SMS preferences
- Push notification toggle

**Privacy**
- Download my data (GDPR)
- Delete account (with confirmation)

---

### N. Accessibility Features

**Responsive Design**
- Mobile-first approach
- Tablet optimized
- Desktop layout

**PWA (Progressive Web App)**
- Install to home screen
- Offline mode (for viewing data)
- Push notifications

**Multi-language** (optional)
- Bahasa Indonesia
- English
- Language switcher

**Accessibility**
- ARIA labels
- Keyboard navigation
- Screen reader friendly
- High contrast mode
- Font size adjustment

---

## Additional Features & Integrations

### A. Email System

**Transactional Emails**
- Welcome email
- Email verification
- Password reset
- Payment confirmation
- Document status update
- Selection result
- Deadline reminders
- Re-registration reminder

**Marketing Emails** (for Super Admin)
- Newsletter to schools
- Feature announcements
- Tips & best practices
- Promotional emails

**Email Service Provider**
- Resend / SendGrid / AWS SES
- Email templates (React Email)
- Tracking: open rate, click rate
- Bounce handling
- Unsubscribe management
- SPF, DKIM, DMARC configuration

---

### B. SMS & WhatsApp

**SMS Gateway**
- Twilio / Vonage / local provider
- OTP verification
- Important notifications
- Credit-based system
- Delivery report

**WhatsApp Business API**
- Template messages
- Interactive buttons
- Document sharing
- Broadcast messages
- Chatbot (auto-reply FAQ)
- Queue system

**Notification Strategy**
- Critical: Email + SMS + WhatsApp
- Important: Email + push notification
- Info: Email only

---

### C. Payment Gateway Integration

**Midtrans**
- Snap (redirect/embed/popup)
- Core API (VA, E-wallet, QRIS)
- Subscription billing (for schools)
- Webhook callback
- 3D Secure
- Refund API

**Xendit** (alternative)
- Virtual Account
- E-Wallet (GoPay, OVO, DANA, LinkAja)
- Retail outlets (Alfamart, Indomaret)
- Credit card
- QRIS
- Disbursement (untuk refund)

**Payment Features**
- Payment link generation
- QR code generation
- Invoice generation
- Payment reminder automation
- Failed payment retry
- Installment (if needed)
- Multi-currency (for international schools)

---

### D. Storage & CDN

**Firebase Storage**
- Document uploads
- Image optimization
- Folder structure by school/user
- Access control (signed URLs)
- Storage quota per school
- Auto-delete old files

**CDN** (Cloudflare / Vercel CDN)
- Static assets (images, CSS, JS)
- Caching strategy
- Image optimization (WebP, AVIF)
- Responsive images

---

### E. Analytics & Monitoring

**Google Analytics**
- Page views
- User journey
- Conversion tracking
- Event tracking (form submit, payment, dll)

**Vercel Analytics**
- Real user metrics
- Web vitals (LCP, FID, CLS)
- Audience insights

**Sentry** (Error Tracking)
- Frontend errors
- Backend errors
- Performance monitoring
- Release tracking

**Custom Analytics Dashboard**
- Real-time visitors
- Popular pages
- Conversion funnel
- Drop-off points

---

### F. SEO & Marketing

**SEO Optimization**
- Meta tags per page
- Open Graph tags
- Structured data (Schema.org)
- Sitemap.xml generation
- Robots.txt
- Canonical URLs

**Marketing Tools**
- Facebook Pixel
- Google Tag Manager
- LinkedIn Insight Tag
- Referral tracking (UTM parameters)

**Blog/Content Management** (optional)
- Tips untuk orang tua
- Info pendidikan
- News & updates
- SEO-optimized articles

---

### G. API & Webhooks

**Public API** (for schools)
- REST API
- Authentication (API key)
- Rate limiting
- Endpoints:
  - Get applicants
  - Create applicant
  - Update status
  - Get statistics
- Swagger documentation
- SDKs (JavaScript, PHP)

**Webhooks**
- Subscribe to events:
  - New registration
  - Payment received
  - Document verified
  - Selection completed
- Retry mechanism
- Webhook logs
- Test webhook

---

### H. Import/Export

**Bulk Import**
- Import applicants from Excel/CSV
- Template download
- Validation before import
- Preview import data
- Error handling (skip invalid rows)
- Import history

**Bulk Export**
- Export applicants (all fields)
- Export filtered data
- Export format: Excel, CSV, PDF
- Scheduled exports (daily, weekly)
- Email export file

**Data Migration**
- Import from old system
- Migration tools/scripts
- Data validation

---

### I. Backup & Recovery

**Automated Backups**
- Daily Firestore backup
- Storage backup
- Retention policy (30 days)
- Backup to Google Cloud Storage

**Disaster Recovery**
- Restore from backup
- Point-in-time recovery
- Test restore procedure

**Data Export** (GDPR Compliance)
- User can download their data
- School can export all data
- Data portability

---

### J. Security Features

**Authentication Security**
- Password hashing (Firebase Auth)
- Rate limiting (login attempts)
- CAPTCHA (after failed attempts)
- Two-factor authentication (2FA)
- Session management
- Auto-logout on inactivity

**Data Security**
- HTTPS (SSL certificate)
- Firestore Security Rules
- Role-based access control (RBAC)
- Data encryption at rest
- Sensitive data masking (KTP, NIK)

**File Upload Security**
- File type validation
- File size limit
- Malware scanning (ClamAV)
- Signed URLs (expired links)

**API Security**
- API key authentication
- Rate limiting
- CORS configuration
- IP whitelisting (for admin)

**Compliance**
- GDPR compliant
- Data privacy policy
- Terms of service
- Cookie consent
- Audit logs (all sensitive actions)

---

### K. Performance Optimization

**Frontend Performance**
- Code splitting (Next.js automatic)
- Image optimization (next/image)
- Lazy loading
- Prefetching
- Service Worker (PWA)
- Bundle size optimization

**Backend Performance**
- Firebase indexes (Firestore)
- Query optimization
- Caching (Redis/Vercel Edge Cache)
- API response compression
- Edge functions (Vercel Edge)

**Database Optimization**
- Denormalization (where needed)
- Pagination (cursor-based)
- Batch operations
- Composite indexes

---

### L. Testing & QA

**Unit Testing**
- Jest
- React Testing Library
- Test coverage > 80%

**Integration Testing**
- API endpoint testing
- Firebase emulator
- Cypress (E2E)

**Manual QA Checklist**
- Browser compatibility (Chrome, Firefox, Safari, Edge)
- Mobile responsive (iOS, Android)
- Payment flow testing
- Email delivery testing
- Notification testing

**Load Testing**
- Artillery / K6
- Concurrent users simulation
- Stress testing (peak registration time)

---

### M. DevOps & CI/CD

**Version Control**
- Git (GitHub/GitLab)
- Branch strategy (main, develop, feature/*)
- Pull request workflow
- Code review

**CI/CD Pipeline**
- GitHub Actions / GitLab CI
- Automated testing on PR
- Build & deploy on merge
- Staging environment
- Production deployment
- Rollback capability

**Monitoring & Alerts**
- Uptime monitoring (UptimeRobot / Pingdom)
- Server monitoring (Vercel)
- Error alerts (Sentry)
- Slack/Discord notifications
- On-call rotation

---

### N. Documentation

**Technical Documentation**
- Architecture diagram
- Database schema
- API documentation (Swagger)
- Deployment guide
- Environment variables

**User Documentation**
- Admin user manual
- Panitia user manual
- Student/parent guide
- FAQ (comprehensive)
- Video tutorials

**Developer Documentation**
- Setup instructions
- Code conventions
- Component library (Storybook)
- Contributing guidelines

---

### O. Legal & Compliance

**Legal Documents**
- Terms of Service
- Privacy Policy
- Cookie Policy
- Data Processing Agreement (DPA)
- Service Level Agreement (SLA)

**GDPR Compliance**
- Right to access data
- Right to erasure
- Data portability
- Consent management
- Data breach notification

**Indonesia Compliance**
- UU Perlindungan Data Pribadi
- Ministry of Education standards (if any)

---

## Database Schema

### Firestore Collections Structure

```javascript
// Root Collections

// 1. TENANTS (Schools)
tenants
  └─ {schoolId}
      ├─ name: string
      ├─ slug: string (for custom domain)
      ├─ email: string
      ├─ phone: string
      ├─ address: {street, city, province, postal_code, coordinates}
      ├─ npsn: string
      ├─ nss: string
      ├─ schoolType: "SD" | "SMP" | "SMA" | "SMK"
      ├─ status: "negeri" | "swasta"
      ├─ accreditation: "A" | "B" | "C" | "Belum"
      ├─ logo: string (URL)
      ├─ coverImage: string
      ├─ gallery: string[]
      ├─ about: {vision, mission, history, facilities, achievements}
      ├─ socialMedia: {facebook, instagram, twitter, youtube, whatsapp}
      ├─ branding: {primaryColor, secondaryColor, font, favicon}
      ├─ customDomain: string
      ├─ subscription: {
      │    planId: string
      │    status: "trial" | "active" | "expired" | "suspended"
      │    startDate: timestamp
      │    endDate: timestamp
      │    billingCycle: "monthly" | "yearly"
      │    autoRenew: boolean
      │  }
      ├─ quotas: {
      │    maxStudents: number
      │    maxAdmins: number
      │    maxStorage: number (GB)
      │    maxEmailsPerMonth: number
      │    maxSMSPerMonth: number
      │    usedStudents: number
      │    usedStorage: number
      │    usedEmails: number
      │    usedSMS: number
      │  }
      ├─ features: {
      │    customForms: boolean
      │    whatsappNotif: boolean
      │    whiteLabel: boolean
      │    apiAccess: boolean
      │    prioritySupport: boolean
      │  }
      ├─ settings: {
      │    timezone: string
      │    dateFormat: string
      │    language: string
      │    emailSignature: string
      │  }
      ├─ createdAt: timestamp
      ├─ updatedAt: timestamp
      └─ createdBy: string (userId)

// 2. USERS (All users: super admin, school admin, panitia, students)
users
  └─ {userId}
      ├─ email: string
      ├─ phone: string
      ├─ name: string
      ├─ photoURL: string
      ├─ role: "super_admin" | "school_admin" | "panitia" | "student"
      ├─ schoolId: string (null for super_admin)
      ├─ permissions: string[] (for granular access)
      ├─ status: "active" | "inactive" | "suspended"
      ├─ twoFactorEnabled: boolean
      ├─ preferences: {
      │    emailNotif: boolean
      │    smsNotif: boolean
      │    pushNotif: boolean
      │    language: string
      │  }
      ├─ lastLogin: timestamp
      ├─ createdAt: timestamp
      └─ updatedAt: timestamp

// 3. SUBSCRIPTION PLANS
subscription_plans
  └─ {planId}
      ├─ name: string ("Free", "Starter", "Pro", "Enterprise")
      ├─ description: string
      ├─ price: number
      ├─ billingCycle: "monthly" | "yearly"
      ├─ features: {
      │    maxStudents: number
      │    maxAdmins: number
      │    maxStorage: number
      │    maxEmails: number
      │    maxSMS: number
      │    customForms: boolean
      │    whatsappNotif: boolean
      │    whiteLabel: boolean
      │    apiAccess: boolean
      │    prioritySupport: boolean
      │    customDomain: boolean
      │    removeBranding: boolean
      │  }
      ├─ trialDays: number
      ├─ isActive: boolean
      ├─ sortOrder: number
      └─ createdAt: timestamp

// 4. PPDB PERIODS
ppdb_periods
  └─ {periodId}
      ├─ schoolId: string (indexed)
      ├─ name: string ("PPDB 2024/2025")
      ├─ academicYear: string ("2024/2025")
      ├─ batch: number (1, 2, 3)
      ├─ status: "draft" | "active" | "closed" | "archived"
      ├─ timeline: {
      │    registrationStart: timestamp
      │    registrationEnd: timestamp
      │    editDeadline: timestamp
      │    documentDeadline: timestamp
      │    verificationStart: timestamp
      │    verificationEnd: timestamp
      │    testDate: timestamp
      │    announcementDate: timestamp
      │    reregistrationStart: timestamp
      │    reregistrationEnd: timestamp
      │  }
      ├─ quotas: {
      │    total: number
      │    prestasi: number
      │    zonasi: number
      │    umum: number
      │    afirmasi: number
      │    perpindahan: number
      │  }
      ├─ fees: {
      │    registrationFee: number
      │    reregistrationFee: number
      │    paymentMethods: string[]
      │    paymentDeadline: number (days)
      │  }
      ├─ jalur: [
      │    {
      │      id: string
      │      name: string
      │      description: string
      │      quota: number
      │      criteria: object
      │      active: boolean
      │    }
      │  ]
      ├─ autoCloseWhenFull: boolean
      ├─ createdAt: timestamp
      ├─ updatedAt: timestamp
      └─ createdBy: string

// 5. FORM CONFIGURATIONS
form_configs
  └─ {formId}
      ├─ schoolId: string
      ├─ periodId: string
      ├─ name: string
      ├─ isDefault: boolean
      ├─ sections: [
      │    {
      │      id: string
      │      title: string
      │      order: number
      │      fields: [
      │        {
      │          id: string
      │          type: "text" | "number" | "email" | "phone" | "date" | "select" | "radio" | "checkbox" | "textarea" | "file" | "address" | "map"
      │          label: string
      │          placeholder: string
      │          required: boolean
      │          validation: {min, max, regex, message}
      │          options: string[] (for select, radio, checkbox)
      │          helpText: string
      │          defaultValue: any
      │          conditionalVisibility: {fieldId, operator, value}
      │          order: number
      │        }
      │      ]
      │    }
      │  ]
      ├─ documents: [
      │    {
      │      id: string
      │      name: string
      │      description: string
      │      required: boolean
      │      allowedFormats: string[]
      │      maxSizeKB: number
      │      multipleFiles: boolean
      │      exampleUrl: string
      │    }
      │  ]
      ├─ settings: {
      │    multiStep: boolean
      │    showProgress: boolean
      │    autoSaveInterval: number (seconds)
      │    allowEditAfterSubmit: boolean
      │    confirmationMessage: string
      │  }
      ├─ createdAt: timestamp
      └─ updatedAt: timestamp

// 6. APPLICATIONS (Pendaftaran)
applications
  └─ {applicationId}
      ├─ schoolId: string (indexed)
      ├─ periodId: string (indexed)
      ├─ userId: string (indexed)
      ├─ registrationNumber: string (unique per school+period)
      ├─ jalurId: string
      ├─ status: "draft" | "submitted" | "paid" | "verified" | "rejected" | "selected" | "accepted" | "declined" | "re_registered"
      ├─ formData: {
      │    personal: {
      │      fullName: string
      │      nik: string
      │      nisn: string
      │      birthPlace: string
      │      birthDate: timestamp
      │      gender: "L" | "P"
      │      religion: string
      │      phone: string
      │      email: string
      │      photoUrl: string
      │    }
      │    address: {
      │      street: string
      │      rt: string
      │      rw: string
      │      kelurahan: string
      │      kecamatan: string
      │      city: string
      │      province: string
      │      postalCode: string
      │      coordinates: {lat, lng}
      │      distanceFromSchool: number (km)
      │      residenceStatus: string
      │    }
      │    parents: {
      │      father: {name, nik, birthDate, education, occupation, income, phone}
      │      mother: {same}
      │      guardian: {name, relation, nik, phone, occupation} (nullable)
      │    }
      │    education: {
      │      previousSchool: string
      │      npsn: string
      │      graduationYear: number
      │      certificateNumber: string
      │      grades: object (nilai per mapel per semester)
      │      averageGrade: number
      │    }
      │    achievements: [
      │      {
      │        type: string
      │        name: string
      │        level: string
      │        rank: string
      │        year: number
      │        organizer: string
      │        certificateUrl: string
      │        points: number
      │      }
      │    ]
      │    customFields: object (dynamic fields from form builder)
      │  }
      ├─ documents: {
      │    photo: {url, status: "pending" | "approved" | "rejected", note, verifiedBy, verifiedAt}
      │    kk: {same}
      │    akta: {same}
      │    ijazah: {same}
      │    rapor: {same}
      │    prestasi: {same}
      │    // ... other documents
      │  }
      ├─ payment: {
      │    amount: number
      │    status: "pending" | "paid" | "failed" | "refunded"
      │    method: string
      │    transactionId: string
      │    paidAt: timestamp
      │    proofUrl: string (for manual transfer)
      │    invoiceUrl: string
      │    gatewayResponse: object
      │  }
      ├─ verification: {
      │    status: "pending" | "in_progress" | "approved" | "rejected"
      │    verifiedBy: string (userId)
      │    verifiedAt: timestamp
      │    notes: string
      │    rejectionReason: string
      │  }
      ├─ scores: {
      │    academic: number
      │    achievement: number
      │    zonasi: number
      │    test: number
      │    interview: number
      │    total: number
      │  }
      ├─ ranking: number (per jalur)
      ├─ selectionResult: {
      │    status: "passed" | "failed" | "waitlist"
      │    announcedAt: timestamp
      │    acceptanceLetterUrl: string
      │    reregistered: boolean
      │    reregisteredAt: timestamp
      │    declinedAt: timestamp
      │    declineReason: string
      │  }
      ├─ timeline: [
      │    {event: string, timestamp: timestamp, by: string}
      │  ]
      ├─ notes: string (internal notes by admin/panitia)
      ├─ createdAt: timestamp
      ├─ updatedAt: timestamp
      └─ submittedAt: timestamp

// 7. PAYMENTS
payments
  └─ {paymentId}
      ├─ schoolId: string
      ├─ applicationId: string (indexed)
      ├─ userId: string
      ├─ type: "registration" | "reregistration" | "subscription"
      ├─ amount: number
      ├─ method: string
      ├─ status: "pending" | "processing" | "success" | "failed" | "expired" | "refunded"
      ├─ gatewayProvider: "midtrans" | "xendit" | "manual"
      ├─ externalId: string (transaction ID dari gateway)
      ├─ vaNumber: string (if VA)
      ├─ qrCodeUrl: string (if QRIS)
      ├─ paymentUrl: string
      ├─ expiryDate: timestamp
      ├─ paidAt: timestamp
      ├─ proofUrl: string (for manual verification)
      ├─ invoiceUrl: string
      ├─ refund: {
      │    status: "none" | "pending" | "processed"
      │    amount: number
      │    reason: string
      │    processedAt: timestamp
      │    processedBy: string
      │  }
      ├─ gatewayResponse: object (full response dari gateway)
      ├─ metadata: object (additional data)
      ├─ createdAt: timestamp
      └─ updatedAt: timestamp

// 8. INVOICES
invoices
  └─ {invoiceId}
      ├─ schoolId: string (indexed)
      ├─ invoiceNumber: string (unique)
      ├─ type: "subscription" | "registration"
      ├─ relatedId: string (subscriptionId atau paymentId)
      ├─ amount: number
      ├─ tax: number
      ├─ total: number
      ├─ status: "draft" | "issued" | "paid" | "overdue" | "cancelled"
      ├─ issuedDate: timestamp
      ├─ dueDate: timestamp
      ├─ paidDate: timestamp
      ├─ pdfUrl: string
      ├─ items: [
      │    {description, quantity, unitPrice, total}
      │  ]
      ├─ createdAt: timestamp
      └─ updatedAt: timestamp

// 9. NOTIFICATIONS
notifications
  └─ {notificationId}
      ├─ userId: string (indexed)
      ├─ schoolId: string
      ├─ type: "info" | "success" | "warning" | "error"
      ├─ category: "application" | "payment" | "document" | "announcement" | "system"
      ├─ title: string
      ├─ message: string
      ├─ actionUrl: string (link to relevant page)
      ├─ read: boolean
      ├─ readAt: timestamp
      ├─ metadata: object
      ├─ createdAt: timestamp
      └─ expiresAt: timestamp

// 10. EMAIL LOGS
email_logs
  └─ {emailId}
      ├─ to: string
      ├─ from: string
      ├─ subject: string
      ├─ templateId: string
      ├─ schoolId: string
      ├─ userId: string
      ├─ status: "queued" | "sent" | "delivered" | "opened" | "clicked" | "bounced" | "failed"
      ├─ sentAt: timestamp
      ├─ deliveredAt: timestamp
      ├─ openedAt: timestamp
      ├─ clickedAt: timestamp
      ├─ error: string (if failed)
      ├─ metadata: object
      └─ createdAt: timestamp

// 11. SMS LOGS (similar structure to email_logs)
sms_logs
  └─ {smsId}
      ├─ to: string (phone number)
      ├─ message: string
      ├─ schoolId: string
      ├─ userId: string
      ├─ provider: "twilio" | "vonage" | "local"
      ├─ status: "queued" | "sent" | "delivered" | "failed"
      ├─ sentAt: timestamp
      ├─ deliveredAt: timestamp
      ├─ error: string
      ├─ creditsUsed: number
      └─ createdAt: timestamp

// 12. ANNOUNCEMENTS
announcements
  └─ {announcementId}
      ├─ schoolId: string (indexed)
      ├─ periodId: string (nullable)
      ├─ title: string
      ├─ content: string (markdown/HTML)
      ├─ type: "info" | "important" | "urgent"
      ├─ status: "draft" | "published" | "archived"
      ├─ publishedAt: timestamp
      ├─ expiresAt: timestamp
      ├─ targetAudience: "all" | "applicants" | "admins" | "panitia"
      ├─ views: number
      ├─ createdAt: timestamp
      ├─ updatedAt: timestamp
      └─ createdBy: string

// 13. SUPPORT TICKETS
support_tickets
  └─ {ticketId}
      ├─ schoolId: string (indexed)
      ├─ userId: string (indexed)
      ├─ ticketNumber: string (unique)
      ├─ subject: string
      ├─ category: string
      ├─ priority: "low" | "medium" | "high" | "urgent"
      ├─ status: "open" | "in_progress" | "resolved" | "closed"
      ├─ assignedTo: string (super admin userId)
      ├─ messages: [
      │    {
      │      id: string
      │      from: string (userId)
      │      message: string
      │      attachments: string[]
      │      timestamp: timestamp
      │    }
      │  ]
      ├─ resolution: string
      ├─ resolvedAt: timestamp
      ├─ rating: number (1-5)
      ├─ feedback: string
      ├─ createdAt: timestamp
      └─ updatedAt: timestamp

// 14. AUDIT LOGS
audit_logs
  └─ {logId}
      ├─ userId: string (indexed)
      ├─ schoolId: string (indexed, nullable for super admin actions)
      ├─ action: string ("create", "update", "delete", "login", "logout", etc.)
      ├─ resource: string ("application", "user", "period", "payment", etc.)
      ├─ resourceId: string
      ├─ changes: object (before & after values)
      ├─ ipAddress: string
      ├─ userAgent: string
      ├─ metadata: object
      └─ timestamp: timestamp

// 15. SETTINGS (Global system settings)
system_settings
  └─ {settingKey}
      ├─ value: any
      ├─ description: string
      ├─ category: string
      ├─ updatedAt: timestamp
      └─ updatedBy: string

// 16. EMAIL TEMPLATES
email_templates
  └─ {templateId}
      ├─ name: string
      ├─ subject: string
      ├─ htmlContent: string
      ├─ textContent: string
      ├─ variables: string[] (e.g., ["{{name}}", "{{school}}"])
      ├─ category: string
      ├─ isDefault: boolean
      ├─ schoolId: string (nullable - null for system templates)
      ├─ createdAt: timestamp
      └─ updatedAt: timestamp

// 17. MEDIA LIBRARY
media_library
  └─ {mediaId}
      ├─ schoolId: string
      ├─ userId: string (uploader)
      ├─ fileName: string
      ├─ fileUrl: string
      ├─ fileType: string (image, document, video)
      ├─ mimeType: string
      ├─ size: number (bytes)
      ├─ tags: string[]
      ├─ usedIn: string[] (references where this media is used)
      ├─ uploadedAt: timestamp
      └─ deletedAt: timestamp (soft delete)

// 18. COUPONS (for subscription discounts)
coupons
  └─ {couponId}
      ├─ code: string (unique)
      ├─ type: "percentage" | "fixed"
      ├─ value: number
      ├─ applicablePlans: string[] (planIds)
      ├─ maxUses: number
      ├─ usedCount: number
      ├─ validFrom: timestamp
      ├─ validUntil: timestamp
      ├─ isActive: boolean
      ├─ createdAt: timestamp
      └─ createdBy: string

// 19. SUBSCRIPTION HISTORY
subscription_history
  └─ {historyId}
      ├─ schoolId: string (indexed)
      ├─ planId: string
      ├─ action: "started" | "renewed" | "upgraded" | "downgraded" | "cancelled" | "expired"
      ├─ previousPlan: string
      ├─ amount: number
      ├─ paymentId: string
      ├─ timestamp: timestamp
      └─ notes: string

// 20. FEATURE FLAGS
feature_flags
  └─ {flagId}
      ├─ name: string
      ├─ description: string
      ├─ enabled: boolean
      ├─ rolloutPercentage: number (0-100, for gradual rollout)
      ├─ targetSchools: string[] (schoolIds, empty = all schools)
      ├─ createdAt: timestamp
      └─ updatedAt: timestamp

// 21. SYSTEM JOBS (for background tasks)
system_jobs
  └─ {jobId}
      ├─ type: "email_batch" | "backup" | "cleanup" | "report_generation" | etc.
      ├─ status: "pending" | "running" | "completed" | "failed"
      ├─ scheduledAt: timestamp
      ├─ startedAt: timestamp
      ├─ completedAt: timestamp
      ├─ progress: number (0-100)
      ├─ result: object
      ├─ error: string
      └─ createdAt: timestamp

// 22. CHAT MESSAGES
chat_messages
  └─ {messageId}
      ├─ schoolId: string
      ├─ applicationId: string (nullable)
      ├─ participants: string[] (userIds)
      ├─ from: string (userId)
      ├─ message: string
      ├─ attachments: string[]
      ├─ read: boolean
      ├─ readBy: string[] (userIds who deleted for themselves)
      ├─ timestamp: timestamp
      └─ deletedBy: string[] (userIds who deleted for themselves)

// 23. FAQ
faq
  └─ {faqId}
      ├─ schoolId: string (null for global FAQ)
      ├─ category: string
      ├─ question: string
      ├─ answer: string
      ├─ order: number
      ├─ isPublic: boolean
      ├─ views: number
      ├─ helpful: number
      ├─ notHelpful: number
      ├─ createdAt: timestamp
      └─ updatedAt: timestamp
```

---

## Project Structure

```
ppdb/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── .husky/
│   ├── pre-commit
│   └── commit-msg
├── public/
│   ├── images/
│   ├── icons/
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── app/                          # Next.js 14 App Router
│   │   ├── (auth)/                   # Auth routes group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (super-admin)/            # Super admin routes
│   │   │   ├── dashboard/
│   │   │   ├── schools/
│   │   │   ├── subscriptions/
│   │   │   ├── users/
│   │   │   ├── analytics/
│   │   │   ├── settings/
│   │   │   └── layout.tsx
│   │   ├── (school-admin)/           # School admin routes
│   │   │   ├── dashboard/
│   │   │   ├── profile/
│   │   │   ├── periods/
│   │   │   ├── forms/
│   │   │   ├── applicants/
│   │   │   ├── payments/
│   │   │   ├── selection/
│   │   │   ├── announcements/
│   │   │   ├── reports/
│   │   │   ├── settings/
│   │   │   └── layout.tsx
│   │   ├── (panitia)/                # Panitia routes
│   │   │   ├── dashboard/
│   │   │   ├── verification/
│   │   │   ├── scoring/
│   │   │   ├── applicants/
│   │   │   └── layout.tsx
│   │   ├── (public)/                 # Public routes (per school)
│   │   │   ├── [schoolSlug]/
│   │   │   │   ├── page.tsx          # Landing page
│   │   │   │   ├── about/
│   │   │   │   ├── faq/
│   │   │   │   ├── contact/
│   │   │   │   └── register/
│   │   │   └── layout.tsx
│   │   ├── (student)/                # Student/applicant routes
│   │   │   ├── dashboard/
│   │   │   ├── application/
│   │   │   ├── documents/
│   │   │   ├── payment/
│   │   │   ├── status/
│   │   │   ├── result/
│   │   │   └── layout.tsx
│   │   ├── api/                      # API Routes
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   ├── logout/
│   │   │   │   └── me/
│   │   │   ├── schools/
│   │   │   ├── periods/
│   │   │   ├── applications/
│   │   │   ├── payments/
│   │   │   │   └── webhook/          # Payment gateway webhooks
│   │   │   ├── documents/
│   │   │   ├── notifications/
│   │   │   ├── upload/
│   │   │   └── webhooks/
│   │   ├── layout.tsx                # Root layout
│   │   ├── globals.css
│   │   └── error.tsx
│   ├── components/                   # React components
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── table.tsx
│   │   │   ├── form.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── dashboard/
│   │   │   ├── StatsCard.tsx
│   │   │   ├── Chart.tsx
│   │   │   └── RecentActivity.tsx
│   │   ├── forms/
│   │   │   ├── FormBuilder.tsx
│   │   │   ├── FormRenderer.tsx
│   │   │   ├── DynamicField.tsx
│   │   │   └── FileUpload.tsx
│   │   ├── applicants/
│   │   │   ├── ApplicantList.tsx
│   │   │   ├── ApplicantDetail.tsx
│   │   │   ├── DocumentViewer.tsx
│   │   │   └── VerificationPanel.tsx
│   │   ├── payment/
│   │   │   ├── PaymentForm.tsx
│   │   │   ├── PaymentStatus.tsx
│   │   │   └── InvoiceTemplate.tsx
│   │   ├── landing/
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Timeline.tsx
│   │   │   └── FAQ.tsx
│   │   └── shared/
│   │       ├── DataTable.tsx
│   │       ├── Modal.tsx
│   │       ├── Toast.tsx
│   │       ├── Loader.tsx
│   │       └── EmptyState.tsx
│   ├── lib/                          # Utility functions
│   │   ├── firebase/
│   │   │   ├── config.ts
│   │   │   ├── auth.ts
│   │   │   ├── firestore.ts
│   │   │   ├── storage.ts
│   │   │   └── functions.ts
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   └── endpoints.ts
│   │   ├── utils/
│   │   │   ├── date.ts
│   │   │   ├── format.ts
│   │   │   ├── validation.ts
│   │   │   └── helpers.ts
│   │   ├── payment/
│   │   │   ├── midtrans.ts
│   │   │   └── xendit.ts
│   │   ├── email/
│   │   │   ├── resend.ts
│   │   │   └── templates.tsx
│   │   └── constants.ts
│   ├── hooks/                        # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useFirestore.ts
│   │   ├── useStorage.ts
│   │   ├── useForm.ts
│   │   ├── useDebounce.ts
│   │   └── useMediaQuery.ts
│   ├── store/                        # State management (Zustand)
│   │   ├── authStore.ts
│   │   ├── schoolStore.ts
│   │   ├── applicationStore.ts
│   │   └── uiStore.ts
│   ├── types/                        # TypeScript types
│   │   ├── index.ts
│   │   ├── auth.ts
│   │   ├── school.ts
│   │   ├── application.ts
│   │   ├── payment.ts
│   │   └── api.ts
│   ├── middleware.ts                 # Next.js middleware (auth, tenant routing)
│   └── config/
│       ├── site.ts
│       └── navigation.ts
├── firebase/
│   ├── rules/
│   │   ├── firestore.rules
│   │   └── storage.rules
│   └── functions/                    # Cloud Functions (optional)
│       ├── src/
│       │   ├── index.ts
│       │   ├── payment-webhook.ts
│       │   ├── email-trigger.ts
│       │   └── cleanup-jobs.ts
│       ├── package.json
│       └── tsconfig.json
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── plan/                             # Documentation
│   └── PPDB_SAAS_COMPLETE_SPEC.md
├── .env.local
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── README.md
└── CHANGELOG.md
```

---

## Dependencies

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "firebase": "^10.12.0",
    "firebase-admin": "^12.1.0",
    "@radix-ui/react-*": "latest",
    "tailwindcss": "^3.4.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0",
    "lucide-react": "^0.378.0",
    "react-hook-form": "^7.51.0",
    "@hookform/resolvers": "^3.3.4",
    "zod": "^3.23.0",
    "@tanstack/react-table": "^8.16.0",
    "zustand": "^4.5.0",
    "@tanstack/react-query": "^5.35.0",
    "date-fns": "^3.6.0",
    "react-day-picker": "^8.10.0",
    "react-dropzone": "^14.2.0",
    "recharts": "^2.12.0",
    "@react-pdf/renderer": "^3.4.0",
    "jspdf": "^2.5.1",
    "xlsx": "^0.18.5",
    "resend": "^3.2.0",
    "@react-email/components": "^0.0.17",
    "midtrans-client": "^1.3.1",
    "xendit-node": "^3.0.0",
    "@tiptap/react": "^2.3.0",
    "@tiptap/starter-kit": "^2.3.0",
    "sharp": "^0.33.0",
    "validator": "^13.11.0",
    "react-hot-toast": "^2.4.0",
    "@react-google-maps/api": "^2.19.0",
    "qrcode": "^1.5.3",
    "react-qr-code": "^2.0.12",
    "tesseract.js": "^5.1.0",
    "bcryptjs": "^2.4.3",
    "lodash": "^4.17.21",
    "nanoid": "^5.0.7"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0",
    "prettier": "^3.2.0",
    "prettier-plugin-tailwindcss": "^0.5.0",
    "jest": "^29.7.0",
    "@testing-library/react": "^15.0.0",
    "@testing-library/jest-dom": "^6.4.0",
    "cypress": "^13.8.0",
    "husky": "^9.0.0",
    "lint-staged": "^15.2.0",
    "@types/bcryptjs": "^2.4.6",
    "@types/lodash": "^4.17.0"
  }
}
```

---

## Deployment Strategy

### Phase 1: MVP (2-3 bulan)
- Basic multi-tenant architecture
- User authentication & authorization
- CRUD pendaftaran siswa
- Payment integration (Midtrans/Xendit)
- Document upload & verification
- Basic email notifications
- Super admin dashboard (basic)
- School admin dashboard (core features)
- Student portal (registration flow)
- Deploy 1 school pilot

### Phase 2: Enhancement (1-2 bulan)
- Custom form builder
- Advanced reporting & analytics
- WhatsApp/SMS notification
- Scoring & ranking system
- Automated selection
- Payment reconciliation
- Support ticket system
- Onboard 5-10 schools

### Phase 3: Scale (ongoing)
- API & webhooks for integrations
- Mobile app (PWA atau native)
- White-label support
- Custom domain per school
- Enterprise features
- Advanced analytics & BI
- AI-powered document verification (OCR)
- Scale to 50+ schools

---

## Next Steps

1. **Setup Development Environment**
   - Initialize Next.js project
   - Setup Firebase project
   - Configure Tailwind CSS & shadcn/ui
   - Setup Git repository

2. **Database Design**
   - Create Firestore collections
   - Define security rules
   - Create indexes
   - Setup backup strategy

3. **Authentication & Authorization**
   - Firebase Auth setup
   - Custom claims implementation
   - Role-based middleware
   - Protected routes

4. **Core Features Development**
   - Start with school registration
   - User management
   - PPDB period creation
   - Application form
   - Document upload
   - Payment integration

5. **Testing & QA**
   - Unit tests
   - Integration tests
   - E2E tests
   - User acceptance testing

6. **Deployment**
   - Setup CI/CD pipeline
   - Deploy to Vercel
   - Configure custom domains
   - Monitor & optimize

---

**Document Version**: 1.0  
**Last Updated**: 2024  
**Status**: Draft - Ready for Implementation
