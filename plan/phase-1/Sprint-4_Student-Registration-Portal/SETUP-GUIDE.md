# Sprint 4: Setup Guide - Step-by-Step Implementation

This guide provides detailed, step-by-step instructions for implementing all tasks in Sprint 4: Student Registration Portal.

---

## 📋 Table of Contents

- [Story 4.1: School Landing Pages](#story-41-school-landing-pages-5-sp)
- [Story 4.2: Student Registration Flow](#story-42-student-registration-flow-8-sp)
- [Story 4.3: Dynamic Form Rendering](#story-43-dynamic-form-rendering-7-sp)
- [Story 4.4: Form Auto-Save & Draft](#story-44-form-auto-save--draft-4-sp)
- [Story 4.5: Student Dashboard](#story-45-student-dashboard-3-sp)
- [Troubleshooting](#troubleshooting)

---

# STORY 4.1: School Landing Pages (5 SP)

**Assigned to**: FED + FSD1  
**Duration**: 1.5 days  
**Priority**: P0

---

## Task 4.1.1: Create School Profile Page

**Owner**: FED  
**Duration**: 3 hours

### Steps:

**1. Create dynamic school page** (`src/app/schools/[slug]/page.tsx`):
```typescript
import { notFound } from 'next/navigation'
import { getSchoolBySlug } from '@/lib/firebase/collections/schools'
import { getActivePPDBPeriod } from '@/lib/firebase/collections/periods'
import SchoolHeader from '@/components/landing/SchoolHeader'
import PPDBInfo from '@/components/landing/PPDBInfo'
import Requirements from '@/components/landing/Requirements'
import FAQ from '@/components/landing/FAQ'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const school = await getSchoolBySlug(params.slug)
  return {
    title: `${school?.name} - PPDB SaaS`,
    description: `Pendaftaran Peserta Didik Baru ${school?.name}`
  }
}

export default async function SchoolLandingPage({ params }: { params: { slug: string } }) {
  const school = await getSchoolBySlug(params.slug)
  
  if (!school) {
    notFound()
  }

  const activePeriod = await getActivePPDBPeriod(school.id)

  return (
    <div className="min-h-screen">
      <SchoolHeader school={school} />
      
      {activePeriod && (
        <>
          <PPDBInfo period={activePeriod} school={school} />
          <Requirements period={activePeriod} />
          <FAQ school={school} />
          
          <div className="fixed bottom-0 w-full bg-white border-t p-4 text-center">
            <a 
              href={`/register/${activePeriod.id}`}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Daftar Sekarang
            </a>
          </div>
        </>
      )}
      
      {!activePeriod && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">PPDB Belum Dibuka</h2>
          <p className="text-gray-600 mt-2">
            Silakan cek kembali nanti untuk informasi pendaftaran
          </p>
        </div>
      )}
    </div>
  )
}
```

**2. Create School Header Component** (`src/components/landing/SchoolHeader.tsx`):
```typescript
'use client'

import Image from 'next/image'
import { School } from '@/types/database'
import { MapPin, Phone, Mail, Globe } from 'lucide-react'

interface SchoolHeaderProps {
  school: School
}

export default function SchoolHeader({ school }: SchoolHeaderProps) {
  return (
    <div className="relative">
      {/* Banner */}
      {school.coverImage && (
        <div className="h-64 relative">
          <Image
            src={school.coverImage}
            alt={school.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        </div>
      )}

      {/* School Info */}
      <div className="container mx-auto px-4 -mt-16 relative">
        <div className="bg-white rounded-lg shadow-lg p-6 flex gap-6">
          {/* Logo */}
          {school.logo && (
            <div className="w-32 h-32 relative flex-shrink-0">
              <Image
                src={school.logo}
                alt={`Logo ${school.name}`}
                fill
                className="object-contain"
              />
            </div>
          )}

          {/* Details */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{school.name}</h1>
            <p className="text-gray-600 mt-1">
              {school.schoolType} {school.status === 'negeri' ? 'Negeri' : 'Swasta'} | 
              Akreditasi {school.accreditation}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">
                  {school.address.city}, {school.address.province}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{school.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{school.email}</span>
              </div>
              {school.socialMedia?.website && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Globe className="w-4 h-4" />
                  <a href={school.socialMedia.website} target="_blank" className="text-sm text-blue-600 hover:underline">
                    Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### Files Created:
- `src/app/schools/[slug]/page.tsx`
- `src/components/landing/SchoolHeader.tsx`

### Acceptance Criteria:
- ✅ School profile displays correctly
- ✅ Logo and banner show
- ✅ Contact information visible
- ✅ Mobile responsive

---

# STORY 4.2: Student Registration Flow (8 SP)

**Assigned to**: FSD1 + FSD2  
**Duration**: 2 days  
**Priority**: P0

---

## Task 4.2.1: Create Registration Wizard Structure

**Owner**: FSD1  
**Duration**: 3 hours

### Steps:

**1. Create Registration Context** (`src/contexts/RegistrationContext.tsx`):
```typescript
'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface RegistrationData {
  step1Personal: PersonalData | null
  step2Address: AddressData | null
  step3Parents: ParentsData | null
  step4Education: EducationData | null
  step5Achievements: Achievement[] | null
}

interface RegistrationContextType {
  currentStep: number
  data: RegistrationData
  periodId: string
  setCurrentStep: (step: number) => void
  updateStepData: (step: number, data: any) => void
  nextStep: () => void
  prevStep: () => void
  submitApplication: () => Promise<void>
}

const RegistrationContext = createContext<RegistrationContextType>({} as RegistrationContextType)

export function useRegistration() {
  return useContext(RegistrationContext)
}

export function RegistrationProvider({ 
  children,
  periodId 
}: { 
  children: React.ReactNode
  periodId: string
}) {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<RegistrationData>({
    step1Personal: null,
    step2Address: null,
    step3Parents: null,
    step4Education: null,
    step5Achievements: null,
  })

  // Load from draft on mount
  useEffect(() => {
    loadDraft()
  }, [])

  const loadDraft = async () => {
    // Load draft from API (implemented in Story 4.4)
    const response = await fetch(`/api/drafts?periodId=${periodId}`)
    if (response.ok) {
      const draft = await response.json()
      if (draft) {
        setData(draft.formData)
        setCurrentStep(draft.currentStep || 1)
      }
    }
  }

  const updateStepData = (step: number, stepData: any) => {
    setData(prev => ({
      ...prev,
      [`step${step}${getStepName(step)}`]: stepData
    }))
  }

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 6)) // 6 = review step
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const submitApplication = async () => {
    const response = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        periodId,
        formData: data
      })
    })

    if (!response.ok) {
      throw new Error('Failed to submit application')
    }

    return response.json()
  }

  return (
    <RegistrationContext.Provider
      value={{
        currentStep,
        data,
        periodId,
        setCurrentStep,
        updateStepData,
        nextStep,
        prevStep,
        submitApplication
      }}
    >
      {children}
    </RegistrationContext.Provider>
  )
}

function getStepName(step: number): string {
  const names = ['Personal', 'Address', 'Parents', 'Education', 'Achievements']
  return names[step - 1] || ''
}
```

**2. Create Registration Page** (`src/app/register/[periodId]/page.tsx`):
```typescript
import { RegistrationProvider } from '@/contexts/RegistrationContext'
import RegistrationWizard from '@/components/registration/RegistrationWizard'
import { getPeriod } from '@/lib/firebase/collections/periods'
import { notFound } from 'next/navigation'

export default async function RegisterPage({ params }: { params: { periodId: string } }) {
  const period = await getPeriod(params.periodId)
  
  if (!period || period.status !== 'active') {
    notFound()
  }

  return (
    <RegistrationProvider periodId={params.periodId}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">
            Pendaftaran PPDB {period.name}
          </h1>
          
          <RegistrationWizard />
        </div>
      </div>
    </RegistrationProvider>
  )
}
```

**3. Create Registration Wizard** (`src/components/registration/RegistrationWizard.tsx`):
```typescript
'use client'

import { useRegistration } from '@/contexts/RegistrationContext'
import StepIndicator from './StepIndicator'
import PersonalDataStep from './steps/PersonalDataStep'
import AddressStep from './steps/AddressStep'
import ParentInfoStep from './steps/ParentInfoStep'
import EducationStep from './steps/EducationStep'
import AchievementStep from './steps/AchievementStep'
import ReviewStep from './steps/ReviewStep'

const steps = [
  { number: 1, title: 'Data Pribadi' },
  { number: 2, title: 'Alamat' },
  { number: 3, title: 'Orang Tua/Wali' },
  { number: 4, title: 'Pendidikan' },
  { number: 5, title: 'Prestasi' },
  { number: 6, title: 'Review' },
]

export default function RegistrationWizard() {
  const { currentStep } = useRegistration()

  return (
    <div className="max-w-4xl mx-auto">
      <StepIndicator steps={steps} currentStep={currentStep} />
      
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        {currentStep === 1 && <PersonalDataStep />}
        {currentStep === 2 && <AddressStep />}
        {currentStep === 3 && <ParentInfoStep />}
        {currentStep === 4 && <EducationStep />}
        {currentStep === 5 && <AchievementStep />}
        {currentStep === 6 && <ReviewStep />}
      </div>
    </div>
  )
}
```

### Files Created:
- `src/contexts/RegistrationContext.tsx`
- `src/app/register/[periodId]/page.tsx`
- `src/components/registration/RegistrationWizard.tsx`

### Acceptance Criteria:
- ✅ Wizard structure renders
- ✅ Can navigate between steps
- ✅ Context stores data
- ✅ Progress indicator shows current step

---

## Task 4.2.2: Personal Data Form

**Owner**: FSD1  
**Duration**: 2 hours

### Steps:

**1. Create Personal Data Step** (`src/components/registration/steps/PersonalDataStep.tsx`):
```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRegistration } from '@/contexts/RegistrationContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const personalDataSchema = z.object({
  fullName: z.string().min(3, 'Nama minimal 3 karakter'),
  nik: z.string().regex(/^\d{16}$/, 'NIK harus 16 digit'),
  nisn: z.string().regex(/^\d{10}$/, 'NISN harus 10 digit').optional(),
  birthPlace: z.string().min(2, 'Tempat lahir minimal 2 karakter'),
  birthDate: z.string().min(1, 'Tanggal lahir harus diisi'),
  gender: z.enum(['L', 'P']),
  religion: z.string().min(1, 'Agama harus dipilih'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().regex(/^08\d{8,11}$/, 'Format: 08xxxxxxxxxx'),
})

type PersonalDataFormData = z.infer<typeof personalDataSchema>

export default function PersonalDataStep() {
  const { data, updateStepData, nextStep } = useRegistration()

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<PersonalDataFormData>({
    resolver: zodResolver(personalDataSchema),
    defaultValues: data.step1Personal || undefined
  })

  const onSubmit = (formData: PersonalDataFormData) => {
    updateStepData(1, formData)
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold">Data Pribadi</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nama Lengkap */}
        <div className="md:col-span-2">
          <Label htmlFor="fullName">Nama Lengkap *</Label>
          <Input
            id="fullName"
            placeholder="Sesuai Akta Kelahiran"
            {...register('fullName')}
          />
          {errors.fullName && (
            <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
          )}
        </div>

        {/* NIK */}
        <div>
          <Label htmlFor="nik">NIK *</Label>
          <Input
            id="nik"
            placeholder="16 digit"
            maxLength={16}
            {...register('nik')}
          />
          {errors.nik && (
            <p className="text-sm text-red-500 mt-1">{errors.nik.message}</p>
          )}
        </div>

        {/* NISN */}
        <div>
          <Label htmlFor="nisn">NISN (Opsional)</Label>
          <Input
            id="nisn"
            placeholder="10 digit"
            maxLength={10}
            {...register('nisn')}
          />
          {errors.nisn && (
            <p className="text-sm text-red-500 mt-1">{errors.nisn.message}</p>
          )}
        </div>

        {/* Tempat Lahir */}
        <div>
          <Label htmlFor="birthPlace">Tempat Lahir *</Label>
          <Input
            id="birthPlace"
            placeholder="Kota/Kabupaten"
            {...register('birthPlace')}
          />
          {errors.birthPlace && (
            <p className="text-sm text-red-500 mt-1">{errors.birthPlace.message}</p>
          )}
        </div>

        {/* Tanggal Lahir */}
        <div>
          <Label htmlFor="birthDate">Tanggal Lahir *</Label>
          <Input
            id="birthDate"
            type="date"
            {...register('birthDate')}
          />
          {errors.birthDate && (
            <p className="text-sm text-red-500 mt-1">{errors.birthDate.message}</p>
          )}
        </div>

        {/* Jenis Kelamin */}
        <div>
          <Label htmlFor="gender">Jenis Kelamin *</Label>
          <Select onValueChange={(value) => setValue('gender', value as 'L' | 'P')}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="L">Laki-laki</SelectItem>
              <SelectItem value="P">Perempuan</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-sm text-red-500 mt-1">{errors.gender.message}</p>
          )}
        </div>

        {/* Agama */}
        <div>
          <Label htmlFor="religion">Agama *</Label>
          <Select onValueChange={(value) => setValue('religion', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih agama" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Islam">Islam</SelectItem>
              <SelectItem value="Kristen">Kristen</SelectItem>
              <SelectItem value="Katolik">Katolik</SelectItem>
              <SelectItem value="Hindu">Hindu</SelectItem>
              <SelectItem value="Buddha">Buddha</SelectItem>
              <SelectItem value="Konghucu">Konghucu</SelectItem>
            </SelectContent>
          </Select>
          {errors.religion && (
            <p className="text-sm text-red-500 mt-1">{errors.religion.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* No. HP */}
        <div>
          <Label htmlFor="phone">No. HP *</Label>
          <Input
            id="phone"
            placeholder="08123456789"
            {...register('phone')}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">
          Lanjut ke Alamat
        </Button>
      </div>
    </form>
  )
}
```

### Files Created:
- `src/components/registration/steps/PersonalDataStep.tsx`

### Acceptance Criteria:
- ✅ All fields validate correctly
- ✅ NIK format validated (16 digits)
- ✅ NISN format validated (10 digits)
- ✅ Phone format validated
- ✅ Can proceed to next step

---

*[Continue with remaining tasks...]*

---

# STORY 4.3: Dynamic Form Rendering (7 SP)

**Assigned to**: TL + FSD1  
**Duration**: 2 days  
**Priority**: P0

---

## Task 4.3.1: Create Form Renderer Engine

**Owner**: TL  
**Duration**: 4 hours

### Steps:

**1. Create Form Renderer** (`src/components/form-renderer/FormRenderer.tsx`):
```typescript
'use client'

import { FormConfig, FormSection } from '@/types/form'
import SectionRenderer from './SectionRenderer'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@/components/ui/button'

interface FormRendererProps {
  config: FormConfig
  onSubmit: (data: any) => void
  defaultValues?: any
}

export default function FormRenderer({ config, onSubmit, defaultValues }: FormRendererProps) {
  const methods = useForm({
    defaultValues
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
        {config.sections
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <SectionRenderer key={section.id} section={section} />
          ))}
        
        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </FormProvider>
  )
}
```

**2. Create Section Renderer** (`src/components/form-renderer/SectionRenderer.tsx`):
```typescript
'use client'

import { FormSection } from '@/types/form'
import FieldRenderer from './FieldRenderer'

interface SectionRendererProps {
  section: FormSection
}

export default function SectionRenderer({ section }: SectionRendererProps) {
  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {section.fields
          .sort((a, b) => a.order - b.order)
          .map((field) => (
            <FieldRenderer key={field.id} field={field} />
          ))}
      </div>
    </div>
  )
}
```

**3. Create Field Renderer** (`src/components/form-renderer/FieldRenderer.tsx`):
```typescript
'use client'

import { FormField } from '@/types/form'
import { useFormContext } from 'react-hook-form'
import TextField from './field-types/TextField'
import SelectField from './field-types/SelectField'
import FileField from './field-types/FileField'
import { evaluateCondition } from '@/lib/form-renderer/conditionalLogic'

interface FieldRendererProps {
  field: FormField
}

export default function FieldRenderer({ field }: FieldRendererProps) {
  const { watch } = useFormContext()
  const formValues = watch()

  // Check conditional visibility
  if (field.conditionalVisibility) {
    const isVisible = evaluateCondition(field.conditionalVisibility, formValues)
    if (!isVisible) return null
  }

  // Render appropriate field type
  switch (field.type) {
    case 'text':
    case 'textarea':
    case 'number':
      return <TextField field={field} />
    case 'select':
    case 'radio':
    case 'checkbox':
      return <SelectField field={field} />
    case 'file':
      return <FileField field={field} />
    // Add more types...
    default:
      return null
  }
}
```

**4. Create Conditional Logic** (`src/lib/form-renderer/conditionalLogic.ts`):
```typescript
import { Condition } from '@/types/form'

export function evaluateCondition(
  condition: Condition,
  formValues: Record<string, any>
): boolean {
  const fieldValue = formValues[condition.fieldId]

  switch (condition.operator) {
    case '==':
      return fieldValue === condition.value
    case '!=':
      return fieldValue !== condition.value
    case '>':
      return Number(fieldValue) > Number(condition.value)
    case '<':
      return Number(fieldValue) < Number(condition.value)
    case 'contains':
      return String(fieldValue).includes(String(condition.value))
    case 'in':
      return Array.isArray(condition.value) && condition.value.includes(fieldValue)
    default:
      return false
  }
}
```

### Files Created:
- `src/components/form-renderer/FormRenderer.tsx`
- `src/components/form-renderer/SectionRenderer.tsx`
- `src/components/form-renderer/FieldRenderer.tsx`
- `src/lib/form-renderer/conditionalLogic.ts`

### Acceptance Criteria:
- ✅ Forms render from configuration
- ✅ All sections display
- ✅ Fields render by type
- ✅ Conditional fields work

---

# STORY 4.4: Form Auto-Save & Draft (4 SP)

**Assigned to**: FSD2  
**Duration**: 1 day  
**Priority**: P1

---

## Task 4.4.1: Create Auto-Save Hook

**Owner**: FSD2  
**Duration**: 2 hours

### Steps:

**1. Create Auto-Save Hook** (`src/hooks/useAutoSave.ts`):
```typescript
import { useEffect, useRef } from 'react'
import { debounce } from 'lodash'

interface UseAutoSaveOptions {
  data: any
  onSave: (data: any) => Promise<void>
  delay?: number
  enabled?: boolean
}

export function useAutoSave({ 
  data, 
  onSave, 
  delay = 30000, // 30 seconds
  enabled = true 
}: UseAutoSaveOptions) {
  const dataRef = useRef(data)
  
  useEffect(() => {
    dataRef.current = data
  }, [data])

  const debouncedSave = useRef(
    debounce(async () => {
      if (enabled) {
        try {
          await onSave(dataRef.current)
          console.log('Auto-saved at', new Date().toLocaleTimeString())
        } catch (error) {
          console.error('Auto-save failed:', error)
        }
      }
    }, delay)
  ).current

  useEffect(() => {
    if (enabled && data) {
      debouncedSave()
    }

    return () => {
      debouncedSave.cancel()
    }
  }, [data, enabled, debouncedSave])
}
```

**2. Integrate Auto-Save in Registration Context**:
```typescript
// Add to RegistrationContext.tsx

import { useAutoSave } from '@/hooks/useAutoSave'

// Inside RegistrationProvider component:
useAutoSave({
  data,
  onSave: async (formData) => {
    await fetch('/api/drafts/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        periodId,
        currentStep,
        formData
      })
    })
  },
  enabled: currentStep < 6 // Don't auto-save on review step
})
```

**3. Create Draft API** (`src/app/api/drafts/save/route.ts`):
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from 'firebase-admin/auth'
import { adminDb } from '@/lib/firebase/admin'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decodedToken = await getAuth().verifyIdToken(token)
    const userId = decodedToken.uid

    const { periodId, currentStep, formData } = await request.json()

    // Upsert draft
    await adminDb!.collection('drafts').doc(`${userId}_${periodId}`).set({
      userId,
      periodId,
      currentStep,
      formData,
      lastSaved: new Date(),
      updatedAt: new Date()
    }, { merge: true })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

### Files Created:
- `src/hooks/useAutoSave.ts`
- `src/app/api/drafts/save/route.ts`

### Acceptance Criteria:
- ✅ Auto-saves every 30 seconds
- ✅ Draft saved to Firestore
- ✅ Can resume from draft
- ✅ Draft deleted on submit

---

# Troubleshooting

## Common Issues

### Map not loading
```bash
# Add Google Maps API key to .env.local
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here

# Enable Maps JavaScript API in Google Cloud Console
```

### Auto-save not triggering
```bash
# Install lodash if missing
npm install lodash
npm install -D @types/lodash

# Check browser console for errors
# Verify Firestore rules allow draft writes
```

### Form not rendering
```bash
# Check form config exists
# Verify periodId is correct
# Check form_configs collection in Firestore
```

---

**Continue to**: [SUMMARY.md](SUMMARY.md) for quick reference
