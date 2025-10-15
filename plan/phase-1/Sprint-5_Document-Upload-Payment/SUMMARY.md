# Sprint 5: Quick Summary & Checklist

## 🎯 Sprint Goal
Implement document upload system and payment gateway integration

---

## 📊 Sprint Metrics

| Metric | Value |
|--------|-------|
| **Duration** | 2 weeks |
| **Story Points** | 26 SP |
| **Team Size** | 4-5 developers |
| **Stories** | 5 |

---

## 📚 Stories Overview

| # | Story | SP | Owner | Status |
|---|-------|----|----|--------|
| 5.1 | Document Upload System | 7 | FSD2 + DEV | [ ] |
| 5.2 | File Processing | 5 | DEV + FSD2 | [ ] |
| 5.3 | Payment Gateway | 8 | TL + FSD2 | [ ] |
| 5.4 | Payment Management | 4 | FSD1 + FSD2 | [ ] |
| 5.5 | Invoice & Receipt | 2 | FSD1 | [ ] |

---

## ✅ Master Checklist

### Story 5.1: Document Upload (Day 1-3)
- [ ] File upload component with drag-drop (3h)
- [ ] File validation (type, size) (2h)
- [ ] Firebase Storage integration (3h)
- [ ] Progress indicator (2h)
- [ ] Multiple file upload (2h)
- [ ] File preview (image/PDF) (2h)

**Verification**:
```bash
# Test upload
# 1. Select file < 5MB
# 2. Upload succeeds
# 3. Check Firebase Storage
# 4. Verify file URL in application doc

# Test validation
# 1. Try upload > 5MB - should fail
# 2. Try non-image/PDF - should fail
```

---

### Story 5.2: File Processing (Day 3-4)
- [ ] Image compression (3h)
- [ ] Thumbnail generation (2h)
- [ ] PDF optimization (2h)
- [ ] Secure file URLs (2h)

**Verification**:
```bash
# Upload large image (3MB)
# Check compressed size < 1MB
# Verify thumbnail exists
# Check signed URL expires
```

---

### Story 5.3: Payment Gateway (Day 5-8)
- [ ] Midtrans SDK setup (2h)
- [ ] Create payment API (3h)
- [ ] Handle payment methods (VA, E-wallet, Card) (3h)
- [ ] Webhook endpoint (3h)
- [ ] Transaction logging (2h)
- [ ] Payment status updates (2h)

**Verification**:
```bash
# Create payment
# Complete payment (sandbox)
# Verify webhook received
# Check payment status updated
# Verify transaction logged
```

---

### Story 5.4: Payment Management (Day 8-9)
- [ ] Manual payment verification (2h)
- [ ] Payment proof upload (2h)
- [ ] Refund processing (2h)
- [ ] Payment history (2h)

**Verification**:
```bash
# Admin verifies manual payment
# Upload payment proof
# Process refund
# View payment history
```

---

### Story 5.5: Invoice & Receipt (Day 10)
- [ ] PDF invoice generation (2h)
- [ ] Email invoice (1h)
- [ ] Receipt download (1h)

**Verification**:
```bash
# Generate invoice PDF
# Send via email
# Download receipt
# Verify all data correct
```

---

## ⚡ Quick Commands

### Development
```bash
npm run dev

# Upload documents
open http://localhost:3000/student/documents

# Payment page
open http://localhost:3000/student/payment

# Admin verification
open http://localhost:3000/school-admin/payments
```

### Testing Upload
```bash
# Test file types
# ✓ image/jpeg, image/png, image/jpg
# ✓ application/pdf
# ✗ other types

# Test file sizes
# ✓ < 5MB
# ✗ > 5MB

# Check Firebase Storage
# /applications/{applicationId}/documents/
```

### Testing Payment (Sandbox)
```bash
# Midtrans Sandbox Cards
# Success: 4811 1111 1111 1114
# Failure: 4911 1111 1111 1113

# Virtual Account
# Bank: BCA
# VA Number: Auto-generated

# E-Wallet
# Gopay: Use sandbox app
```

---

## 📁 Key Files Created

### Document Upload (Story 5.1-5.2)
- `src/components/documents/FileUpload.tsx` - Upload component
- `src/components/documents/FilePreview.tsx` - Preview component
- `src/lib/utils/fileValidation.ts` - Validation utilities
- `src/lib/utils/imageCompression.ts` - Compression utilities
- `src/app/api/upload/route.ts` - Upload API
- `src/app/api/documents/route.ts` - Document management API

### Payment Gateway (Story 5.3)
- `src/lib/payment/midtrans.ts` - Midtrans SDK wrapper
- `src/app/api/payment/create/route.ts` - Create payment
- `src/app/api/payment/webhook/route.ts` - Payment webhook
- `src/components/payment/PaymentMethods.tsx` - Payment options
- `src/components/payment/PaymentStatus.tsx` - Status display

### Payment Management (Story 5.4)
- `src/app/(school-admin)/payments/page.tsx` - Payment list
- `src/components/payment/VerificationModal.tsx` - Verify payment
- `src/components/payment/RefundModal.tsx` - Refund processing
- `src/app/api/payment/verify/route.ts` - Verify API
- `src/app/api/payment/refund/route.ts` - Refund API

### Invoice (Story 5.5)
- `src/lib/pdf/invoiceGenerator.ts` - PDF generation
- `src/components/payment/InvoiceButton.tsx` - Download button
- `src/app/api/invoice/generate/route.ts` - Generate API
- `src/lib/email/sendInvoice.ts` - Email sender

---

## 🎨 Tech Stack (Sprint 5 Additions)

| Category | Technology |
|----------|-----------|
| **File Upload** | react-dropzone |
| **Image Processing** | browser-image-compression |
| **PDF Generation** | jsPDF / PDFKit |
| **Payment Gateway** | Midtrans SDK / Xendit SDK |
| **Email** | Nodemailer / SendGrid |
| **Storage** | Firebase Storage |

---

## 🔍 Verification Checklist

### Document Upload Working
- [ ] Can select files
- [ ] Drag-drop works
- [ ] File validation enforced
- [ ] Upload progress shown
- [ ] File appears in list
- [ ] Can preview images
- [ ] Can preview PDFs
- [ ] Can delete uploaded file
- [ ] Stored in Firebase Storage
- [ ] File URL saved in Firestore

### File Processing Working
- [ ] Large images compressed
- [ ] Thumbnails generated
- [ ] PDFs optimized
- [ ] Signed URLs expire correctly
- [ ] File access controlled

### Payment Gateway Working
- [ ] Can select payment method
- [ ] Payment creation succeeds
- [ ] Redirect to payment page
- [ ] Can complete payment (sandbox)
- [ ] Webhook receives notification
- [ ] Payment status updates
- [ ] Transaction logged
- [ ] Student notified

### Payment Management Working
- [ ] Admin sees pending payments
- [ ] Can verify manual payment
- [ ] Can upload payment proof
- [ ] Can process refund
- [ ] Payment history displays
- [ ] Filters work

### Invoice Working
- [ ] Invoice generates as PDF
- [ ] All data correct
- [ ] Invoice sent via email
- [ ] Can download receipt
- [ ] Receipt contains all info

---

## 🐛 Common Issues

### Issue: "File upload fails"
```bash
# Solution
# 1. Check Firebase Storage rules
# 2. Verify file size < 5MB
# 3. Check file type allowed
# 4. Check network connectivity
```

### Issue: "Payment webhook not receiving"
```bash
# Solution
# 1. Check webhook URL is public
# 2. Verify Midtrans dashboard has correct URL
# 3. Check webhook signature validation
# 4. Test with Midtrans webhook simulator
```

### Issue: "Invoice PDF not generating"
```bash
# Solution
# 1. Install jsPDF: npm install jspdf
# 2. Check payment data is complete
# 3. Verify PDF template
# 4. Check browser console for errors
```

### Issue: "Image compression too slow"
```bash
# Solution
# 1. Reduce maxWidth (try 1200 instead of 1600)
# 2. Show loading indicator
# 3. Compress on server-side instead
```

---

## 🧪 Testing Scenarios

### Scenario 1: Complete Document Upload
1. Login as student
2. Go to Documents page
3. Click "Upload"
4. Select valid file (image < 5MB)
5. Upload succeeds
6. File appears in list
7. **Expected**: File in Firebase Storage, URL in Firestore

### Scenario 2: Payment Flow
1. Student completes registration
2. Go to Payment page
3. Select payment method (Virtual Account)
4. Create payment
5. Complete payment (sandbox)
6. **Expected**: Webhook updates status, student notified

### Scenario 3: Manual Payment Verification
1. Admin goes to Payments
2. Finds pending payment
3. Student uploads proof
4. Admin verifies
5. **Expected**: Status updates to "paid", invoice generated

---

## 📊 Sprint Velocity

**Planned**: 26 SP  
**Completed**: ___ SP  
**Velocity**: ___% 

---

**Last Updated**: [Date]  
**Sprint Status**: 🚀 In Progress

---

## 🚀 Next Actions

After Sprint 5:
1. Sprint Demo
2. Sprint Retrospective  
3. Sprint 6: Verification & Admin Features

---

**Need Help?** Check SETUP-GUIDE.md or ask in #dev-payment
