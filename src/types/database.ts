import { Timestamp } from 'firebase/firestore'

// ==================== ENUMS ====================

export type UserRole = 'super_admin' | 'school_admin' | 'panitia' | 'student'
export type UserStatus = 'active' | 'inactive' | 'suspended'
export type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'suspended'
export type BillingCycle = 'monthly' | 'yearly'
export type SchoolType = 'SD' | 'SMP' | 'SMA' | 'SMK'
export type SchoolStatus = 'negeri' | 'swasta'
export type Accreditation = 'A' | 'B' | 'C' | 'Belum'
export type PeriodStatus = 'draft' | 'active' | 'closed' | 'archived'
export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'paid'
  | 'verified'
  | 'rejected'
  | 'selected'
  | 'accepted'
  | 'declined'
  | 're_registered'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'
export type VerificationStatus = 'pending' | 'in_progress' | 'approved' | 'rejected'
export type DocumentStatus = 'pending' | 'approved' | 'rejected'
export type Gender = 'L' | 'P'

// ==================== INTERFACES ====================

// Address
export interface Address {
  street: string
  city: string
  province: string
  postalCode: string
  coordinates?: {
    lat: number
    lng: number
  }
}

// School (Tenant)
export interface School {
  id: string
  name: string
  slug: string
  email: string
  phone: string
  address: Address
  npsn: string
  nss?: string
  schoolType: SchoolType
  status: SchoolStatus
  accreditation: Accreditation
  logo?: string
  coverImage?: string
  gallery?: string[]
  about?: {
    vision?: string
    mission?: string
    history?: string
    facilities?: string[]
    achievements?: string[]
  }
  socialMedia?: {
    facebook?: string
    instagram?: string
    twitter?: string
    youtube?: string
    whatsapp?: string
  }
  branding?: {
    primaryColor?: string
    secondaryColor?: string
    font?: string
    favicon?: string
  }
  customDomain?: string
  subscription: {
    planId: string
    status: SubscriptionStatus
    startDate: Timestamp
    endDate: Timestamp
    billingCycle: BillingCycle
    autoRenew: boolean
  }
  quotas: {
    maxStudents: number
    maxAdmins: number
    maxStorage: number
    maxEmailsPerMonth: number
    maxSMSPerMonth: number
    usedStudents: number
    usedStorage: number
    usedEmails: number
    usedSMS: number
  }
  features: {
    customForms: boolean
    whatsappNotif: boolean
    whiteLabel: boolean
    apiAccess: boolean
    prioritySupport: boolean
  }
  settings: {
    timezone: string
    dateFormat: string
    language: string
    emailSignature?: string
  }
  createdAt: Timestamp
  updatedAt: Timestamp
  createdBy: string
}

// User
export interface User {
  id: string
  email: string
  phone?: string
  name: string
  photoURL?: string
  role: UserRole
  schoolId?: string
  permissions?: string[]
  status: UserStatus
  twoFactorEnabled: boolean
  preferences: {
    emailNotif: boolean
    smsNotif: boolean
    pushNotif: boolean
    language: string
  }
  lastLogin?: Timestamp
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Subscription Plan
export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  billingCycle: BillingCycle
  features: {
    maxStudents: number
    maxAdmins: number
    maxStorage: number
    maxEmails: number
    maxSMS: number
    customForms: boolean
    whatsappNotif: boolean
    whiteLabel: boolean
    apiAccess: boolean
    prioritySupport: boolean
    customDomain: boolean
    removeBranding: boolean
  }
  trialDays: number
  isActive: boolean
  sortOrder: number
  createdAt: Timestamp
}

// PPDB Period
export interface PPDBPeriod {
  id: string
  schoolId: string
  name: string
  academicYear: string
  batch: number
  status: PeriodStatus
  timeline: {
    registrationStart: Timestamp
    registrationEnd: Timestamp
    editDeadline: Timestamp
    documentDeadline: Timestamp
    verificationStart: Timestamp
    verificationEnd: Timestamp
    testDate?: Timestamp
    announcementDate: Timestamp
    reregistrationStart: Timestamp
    reregistrationEnd: Timestamp
  }
  quotas: {
    total: number
    prestasi: number
    zonasi: number
    umum: number
    afirmasi: number
    perpindahan: number
  }
  fees: {
    registrationFee: number
    reregistrationFee: number
    paymentMethods: string[]
    paymentDeadline: number
  }
  jalur: JalurPendaftaran[]
  autoCloseWhenFull: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
  createdBy: string
}

export interface JalurPendaftaran {
  id: string
  name: string
  description: string
  quota: number
  criteria: Record<string, unknown>
  active: boolean
}

// Application
export interface Application {
  id: string
  schoolId: string
  periodId: string
  userId: string
  registrationNumber: string
  jalurId: string
  status: ApplicationStatus
  formData: {
    personal: PersonalData
    address: ApplicationAddress
    parents: ParentsData
    education: EducationData
    achievements: Achievement[]
    customFields?: Record<string, unknown>
  }
  documents: Record<string, DocumentData>
  payment?: PaymentData
  verification?: VerificationData
  scores?: ScoreData
  ranking?: number
  selectionResult?: string
  notes?: string
  lastModified: Timestamp
  submittedAt?: Timestamp
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface PersonalData {
  fullName: string
  nik: string
  nisn: string
  birthPlace: string
  birthDate: Timestamp
  gender: Gender
  religion: string
  phone: string
  email: string
  photoUrl?: string
}

export interface ApplicationAddress {
  street: string
  rt: string
  rw: string
  kelurahan: string
  kecamatan: string
  city: string
  province: string
  postalCode: string
  coordinates?: {
    lat: number
    lng: number
  }
  distanceFromSchool?: number
  residenceStatus: string
}

export interface ParentsData {
  father: ParentInfo
  mother: ParentInfo
  guardian?: GuardianInfo
}

export interface ParentInfo {
  name: string
  nik: string
  birthDate: Timestamp
  education: string
  occupation: string
  income: number
  phone: string
}

export interface GuardianInfo {
  name: string
  relation: string
  nik: string
  phone: string
  occupation: string
}

export interface EducationData {
  previousSchool: string
  npsn: string
  graduationYear: number
  certificateNumber: string
  grades: Record<string, unknown>
  averageGrade: number
}

export interface Achievement {
  type: string
  name: string
  level: string
  rank: string
  year: number
  organizer: string
  certificateUrl?: string
  points: number
}

export interface DocumentData {
  url: string
  status: DocumentStatus
  note?: string
  verifiedBy?: string
  verifiedAt?: Timestamp
}

export interface PaymentData {
  amount: number
  status: PaymentStatus
  method: string
  transactionId: string
  paidAt?: Timestamp
  proofUrl?: string
  invoiceUrl?: string
  gatewayResponse?: Record<string, unknown>
}

export interface VerificationData {
  status: VerificationStatus
  verifiedBy?: string
  verifiedAt?: Timestamp
  notes?: string
  rejectionReason?: string
}

export interface ScoreData {
  academic?: number
  achievement?: number
  zonasi?: number
  test?: number
  interview?: number
  total: number
}

// Form Configuration
export interface FormConfig {
  id: string
  schoolId: string
  periodId: string
  name: string
  isDefault: boolean
  sections: FormSection[]
  documents: DocumentRequirement[]
  settings: FormSettings
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface FormSection {
  id: string
  title: string
  order: number
  fields: FormField[]
}

export interface FormField {
  id: string
  type: string
  label: string
  placeholder?: string
  required: boolean
  validation?: {
    min?: number
    max?: number
    regex?: string
    message?: string
  }
  options?: string[]
  helpText?: string
  defaultValue?: unknown
  conditionalVisibility?: {
    fieldId: string
    operator: string
    value: unknown
  }
  order: number
}

export interface DocumentRequirement {
  id: string
  name: string
  description: string
  required: boolean
  allowedFormats: string[]
  maxSizeKB: number
  multipleFiles: boolean
  exampleUrl?: string
}

export interface FormSettings {
  multiStep: boolean
  showProgress: boolean
  autoSaveInterval: number
  allowEditAfterSubmit: boolean
  confirmationMessage: string
}
