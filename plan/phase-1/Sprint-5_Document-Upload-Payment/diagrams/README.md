# Sprint 5 Architecture Diagrams

This directory contains PlantUML C4 diagrams for Sprint 5: Document Upload & Payment Integration.

---

## 📐 Diagram Files

### 01-document-upload-flow.puml
**Document Upload System Flow**

Contains 3 sub-diagrams:
1. **Complete Upload Sequence** - End-to-end file upload process
2. **File Validation Flow** - Type & size validation logic
3. **Storage Structure** - Firebase Storage folder hierarchy

**Key components**:
- FileUpload Component (drag-drop)
- Image compression (browser-image-compression)
- Firebase Storage integration
- Progress tracking

---

### 02-payment-gateway-integration.puml
**Payment Gateway Integration Architecture**

Contains 3 sub-diagrams:
1. **Complete Payment Flow** - Student payment journey with Midtrans
2. **Webhook Processing** - Payment notification handling
3. **Payment Methods Support** - VA, E-wallet, Card, Retail

**Key components**:
- Midtrans Snap.js
- Payment token generation
- Webhook signature verification
- Transaction status mapping

---

### 03-payment-verification.puml
**Manual Payment Verification System**

Contains 3 sub-diagrams:
1. **Complete Verification Process** - Admin approve/reject flow
2. **Payment Verification UI** - Admin & student interfaces
3. **Refund Processing** - Refund workflow

**Key components**:
- Payment proof upload
- Admin verification panel
- Approval/rejection workflow
- Refund API integration

---

### 04-invoice-generation.puml
**Invoice & Receipt Generation**

Contains 3 sub-diagrams:
1. **Invoice Generation Process** - PDF creation & email delivery
2. **Invoice Template Structure** - PDF layout design
3. **Receipt Download Flow** - Student download journey

**Key components**:
- jsPDF invoice generator
- Invoice numbering system
- Email template
- PDF storage & download

---

## 🎯 How to View Diagrams

### Online (Easiest)
1. Copy diagram content
2. Go to: http://www.plantuml.com/plantuml/uml/
3. Paste and view

### VS Code
1. Install extension: "PlantUML"
2. Open `.puml` file
3. Press `Alt + D` (or `Cmd + D` on Mac)

### Command Line
```bash
# Install PlantUML
brew install plantuml

# Generate PNG
plantuml 01-document-upload-flow.puml

# Generate all
plantuml *.puml
```

---

## 📊 Diagram Overview

| Diagram | Sub-diagrams | Focus Area |
|---------|--------------|------------|
| 01-document-upload-flow | 3 | File upload, validation, storage |
| 02-payment-gateway-integration | 3 | Midtrans, webhook, payment methods |
| 03-payment-verification | 3 | Manual verification, refund |
| 04-invoice-generation | 3 | PDF generation, email, download |

**Total**: 4 files, 12 sub-diagrams

---

## 🔍 Reading Order

**For Developers**:
1. Start with `01-document-upload-flow.puml` - Understand file upload
2. Then `02-payment-gateway-integration.puml` - Payment flow
3. Then `03-payment-verification.puml` - Admin verification
4. Finally `04-invoice-generation.puml` - Invoice system

**For Security Review**:
1. `01-document-upload-flow.puml` - File validation
2. `02-payment-gateway-integration.puml` - Webhook security
3. `03-payment-verification.puml` - Verification access control

**For Payment Integration**:
1. `02-payment-gateway-integration.puml` - Full payment flow
2. `03-payment-verification.puml` - Manual verification
3. `04-invoice-generation.puml` - Invoice generation

---

## 🛠️ Technologies Depicted

- **Frontend**: React, react-dropzone
- **Backend**: Next.js API Routes
- **Storage**: Firebase Storage
- **Database**: Firestore
- **Payment**: Midtrans SDK
- **PDF**: jsPDF
- **Email**: Nodemailer/SendGrid

---

## 📝 Notes

- All diagrams use C4 PlantUML notation
- Sequence diagrams show time-based flows
- Component diagrams show structural relationships
- Each diagram is self-contained and can be viewed independently

---

**Last Updated**: 2024  
**Sprint**: 5 - Document Upload & Payment Integration
