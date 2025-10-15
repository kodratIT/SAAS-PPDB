# Sprint 3: Setup Guide - Step-by-Step Implementation

This guide provides detailed, step-by-step instructions for implementing all tasks in Sprint 3: School Management & PPDB Periods.

---

## 📋 Table of Contents

- [Story 3.1: School Registration & Onboarding](#story-31-school-registration--onboarding-8-sp)
- [Story 3.2: Multi-Tenancy System](#story-32-multi-tenancy-system-6-sp)
- [Story 3.3: PPDB Period Management](#story-33-ppdb-period-management-7-sp)
- [Story 3.4: Custom Form Builder](#story-34-custom-form-builder-5-sp)
- [Story 3.5: School Admin Dashboard](#story-35-school-admin-dashboard-2-sp)
- [Troubleshooting](#troubleshooting)

---

# STORY 3.1: School Registration & Onboarding (8 SP)

**Assigned to**: TL + FSD1 + FED  
**Duration**: 2 days  
**Priority**: P0

---

## Task 3.1.1: Create Multi-Step Onboarding Wizard Structure

**Owner**: FED  
**Duration**: 3 hours

### Steps:

**1. Install dependencies**:
```bash
npm install react-hook-form zod @hookform/resolvers
npm install lucide-react  # for icons
```

**2. Create Onboarding Context** (`src/contexts/OnboardingContext.tsx`):
```typescript
'use client'

import { createContext, useContext, useState } from 'react'

interface OnboardingData {
  step1: SchoolBasicInfo | null
  step2: SchoolAddress | null
  step3: SchoolBranding | null
  step4: SubscriptionSelection | null
  step5: AdminAccount | null
}

interface OnboardingContextType {
  currentStep: number
  data: OnboardingData
  setCurrentStep: (step: number) => void
  updateStepData: (step: number, data: any) => void
  nextStep: () => void
  prevStep: () => void
  resetOnboarding: () => void
}

const OnboardingContext = createContext<OnboardingContextType>({} as OnboardingContextType)

export function useOnboarding() {
  return useContext(OnboardingContext)
}

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    step1: null,
    step2: null,
    step3: null,
    step4: null,
    step5: null,
  })

  const updateStepData = (step: number, stepData: any) => {
    setData(prev => ({
      ...prev,
      [`step${step}`]: stepData
    }))
  }

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5))
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const resetOnboarding = () => {
    setCurrentStep(1)
    setData({
      step1: null,
      step2: null,
      step3: null,
      step4: null,
      step5: null,
    })
  }

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        data,
        setCurrentStep,
        updateStepData,
        nextStep,
        prevStep,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}
```

**3. Create Onboarding Layout** (`src/app/school/register/layout.tsx`):
```typescript
import { OnboardingProvider } from '@/contexts/OnboardingContext'

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto py-8 px-4">
          {children}
        </div>
      </div>
    </OnboardingProvider>
  )
}
```

**4. Create Stepper Component** (`src/components/onboarding/Stepper.tsx`):
```typescript
'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  number: number
  title: string
  description: string
}

interface StepperProps {
  currentStep: number
  steps: Step[]
}

export function Stepper({ currentStep, steps }: StepperProps) {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex-1">
            <div className="flex items-center">
              {/* Step Circle */}
              <div className="relative">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                    currentStep > step.number && "bg-green-500 border-green-500",
                    currentStep === step.number && "bg-blue-500 border-blue-500",
                    currentStep < step.number && "bg-white border-gray-300"
                  )}
                >
                  {currentStep > step.number ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        currentStep === step.number ? "text-white" : "text-gray-500"
                      )}
                    >
                      {step.number}
                    </span>
                  )}
                </div>
              </div>

              {/* Step Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-2 transition-colors",
                    currentStep > step.number ? "bg-green-500" : "bg-gray-300"
                  )}
                />
              )}
            </div>

            {/* Step Label */}
            <div className="mt-2">
              <p
                className={cn(
                  "text-sm font-medium",
                  currentStep >= step.number ? "text-gray-900" : "text-gray-500"
                )}
              >
                {step.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

**5. Create Main Onboarding Page** (`src/app/school/register/page.tsx`):
```typescript
'use client'

import { useOnboarding } from '@/contexts/OnboardingContext'
import { Stepper } from '@/components/onboarding/Stepper'
import { Step1BasicInfo } from '@/components/onboarding/Step1BasicInfo'
import { Step2Address } from '@/components/onboarding/Step2Address'
import { Step3Branding } from '@/components/onboarding/Step3Branding'
import { Step4Subscription } from '@/components/onboarding/Step4Subscription'
import { Step5AdminAccount } from '@/components/onboarding/Step5AdminAccount'

const steps = [
  { number: 1, title: 'Informasi Sekolah', description: 'Data dasar sekolah' },
  { number: 2, title: 'Alamat & Kontak', description: 'Lokasi dan kontak' },
  { number: 3, title: 'Logo & Branding', description: 'Identitas visual' },
  { number: 4, title: 'Paket Langganan', description: 'Pilih paket' },
  { number: 5, title: 'Akun Admin', description: 'Buat akun admin' },
]

export default function SchoolOnboardingPage() {
  const { currentStep } = useOnboarding()

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Pendaftaran Sekolah</h1>
        <p className="text-gray-600 mt-2">
          Lengkapi informasi sekolah Anda untuk mulai menggunakan PPDB SaaS
        </p>
      </div>

      <Stepper currentStep={currentStep} steps={steps} />

      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        {currentStep === 1 && <Step1BasicInfo />}
        {currentStep === 2 && <Step2Address />}
        {currentStep === 3 && <Step3Branding />}
        {currentStep === 4 && <Step4Subscription />}
        {currentStep === 5 && <Step5AdminAccount />}
      </div>
    </div>
  )
}
```

### Files Created:
- `src/contexts/OnboardingContext.tsx`
- `src/app/school/register/layout.tsx`
- `src/app/school/register/page.tsx`
- `src/components/onboarding/Stepper.tsx`

### Acceptance Criteria:
- ✅ 5-step wizard renders
- ✅ Step navigation works
- ✅ Progress indicator shows current step
- ✅ Context stores data across steps

---

## Task 3.1.2: Step 1 - School Basic Info Form

**Owner**: FSD1  
**Duration**: 2 hours

### Steps:

**1. Create Step 1 Component** (`src/components/onboarding/Step1BasicInfo.tsx`):
```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useOnboarding } from '@/contexts/OnboardingContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const step1Schema = z.object({
  name: z.string().min(5, 'Nama sekolah minimal 5 karakter'),
  npsn: z.string().regex(/^\d{8}$/, 'NPSN harus 8 digit angka'),
  nss: z.string().optional(),
  schoolType: z.enum(['SD', 'SMP', 'SMA', 'SMK']),
  status: z.enum(['negeri', 'swasta']),
  accreditation: z.enum(['A', 'B', 'C', 'Belum']),
  email: z.string().email('Email tidak valid'),
  phone: z.string().regex(/^08\d{8,11}$/, 'Format nomor telepon: 08xxxxxxxxxx'),
})

type Step1FormData = z.infer<typeof step1Schema>

export function Step1BasicInfo() {
  const { data, updateStepData, nextStep } = useOnboarding()

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: data.step1 || undefined
  })

  const onSubmit = (formData: Step1FormData) => {
    updateStepData(1, formData)
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold">Informasi Dasar Sekolah</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nama Sekolah */}
        <div className="md:col-span-2">
          <Label htmlFor="name">Nama Sekolah *</Label>
          <Input
            id="name"
            placeholder="SMA Negeri 1 Jakarta"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* NPSN */}
        <div>
          <Label htmlFor="npsn">NPSN *</Label>
          <Input
            id="npsn"
            placeholder="12345678"
            {...register('npsn')}
          />
          {errors.npsn && (
            <p className="text-sm text-red-500 mt-1">{errors.npsn.message}</p>
          )}
        </div>

        {/* NSS */}
        <div>
          <Label htmlFor="nss">NSS (Opsional)</Label>
          <Input
            id="nss"
            placeholder="123456789012"
            {...register('nss')}
          />
        </div>

        {/* Jenis Sekolah */}
        <div>
          <Label htmlFor="schoolType">Jenis Sekolah *</Label>
          <Select onValueChange={(value) => setValue('schoolType', value as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih jenis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SD">SD</SelectItem>
              <SelectItem value="SMP">SMP</SelectItem>
              <SelectItem value="SMA">SMA</SelectItem>
              <SelectItem value="SMK">SMK</SelectItem>
            </SelectContent>
          </Select>
          {errors.schoolType && (
            <p className="text-sm text-red-500 mt-1">{errors.schoolType.message}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <Label htmlFor="status">Status *</Label>
          <Select onValueChange={(value) => setValue('status', value as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="negeri">Negeri</SelectItem>
              <SelectItem value="swasta">Swasta</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && (
            <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>
          )}
        </div>

        {/* Akreditasi */}
        <div>
          <Label htmlFor="accreditation">Akreditasi *</Label>
          <Select onValueChange={(value) => setValue('accreditation', value as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih akreditasi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A">A</SelectItem>
              <SelectItem value="B">B</SelectItem>
              <SelectItem value="C">C</SelectItem>
              <SelectItem value="Belum">Belum Terakreditasi</SelectItem>
            </SelectContent>
          </Select>
          {errors.accreditation && (
            <p className="text-sm text-red-500 mt-1">{errors.accreditation.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email Sekolah *</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@sekolah.sch.id"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone">Nomor Telepon *</Label>
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
- `src/components/onboarding/Step1BasicInfo.tsx`

### Acceptance Criteria:
- ✅ Form validates all required fields
- ✅ NPSN format validated (8 digits)
- ✅ Phone format validated
- ✅ Data saved to context
- ✅ Navigates to step 2

---

## Task 3.1.3: Step 2 - Address & Contact Form

**Owner**: FSD1  
**Duration**: 2 hours

### Steps:

**1. Install react-select for province/city dropdown**:
```bash
npm install react-select
```

**2. Create Indonesia province data** (`src/data/provinces.ts`):
```typescript
export const provinces = [
  { value: 'jakarta', label: 'DKI Jakarta' },
  { value: 'jabar', label: 'Jawa Barat' },
  { value: 'jateng', label: 'Jawa Tengah' },
  { value: 'jatim', label: 'Jawa Timur' },
  { value: 'banten', label: 'Banten' },
  { value: 'yogya', label: 'DI Yogyakarta' },
  // ... add all provinces
]

export const cities = {
  jakarta: [
    { value: 'jakarta-pusat', label: 'Jakarta Pusat' },
    { value: 'jakarta-utara', label: 'Jakarta Utara' },
    { value: 'jakarta-selatan', label: 'Jakarta Selatan' },
    { value: 'jakarta-barat', label: 'Jakarta Barat' },
    { value: 'jakarta-timur', label: 'Jakarta Timur' },
  ],
  // ... add cities for each province
}
```

**3. Create Step 2 Component** (`src/components/onboarding/Step2Address.tsx`):
```typescript
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useOnboarding } from '@/contexts/OnboardingContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Select from 'react-select'
import { provinces, cities } from '@/data/provinces'
import { ArrowLeft } from 'lucide-react'

const step2Schema = z.object({
  street: z.string().min(10, 'Alamat lengkap minimal 10 karakter'),
  province: z.string().min(1, 'Pilih provinsi'),
  city: z.string().min(1, 'Pilih kota/kabupaten'),
  postalCode: z.string().regex(/^\d{5}$/, 'Kode pos harus 5 digit'),
  whatsapp: z.string().regex(/^08\d{8,11}$/, 'Format WA: 08xxxxxxxxxx').optional(),
  website: z.string().url('URL tidak valid').optional(),
})

type Step2FormData = z.infer<typeof step2Schema>

export function Step2Address() {
  const { data, updateStepData, nextStep, prevStep } = useOnboarding()
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: data.step2 || undefined
  })

  const onSubmit = (formData: Step2FormData) => {
    updateStepData(2, formData)
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold">Alamat & Kontak</h2>
      
      <div className="space-y-4">
        {/* Alamat Lengkap */}
        <div>
          <Label htmlFor="street">Alamat Lengkap *</Label>
          <Textarea
            id="street"
            placeholder="Jl. Contoh No. 123, RT/RW 001/002, Kelurahan, Kecamatan"
            rows={3}
            {...register('street')}
          />
          {errors.street && (
            <p className="text-sm text-red-500 mt-1">{errors.street.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Province */}
          <div>
            <Label>Provinsi *</Label>
            <Select
              options={provinces}
              placeholder="Pilih provinsi"
              onChange={(option) => {
                setSelectedProvince(option?.value || null)
                setValue('province', option?.label || '')
              }}
            />
            {errors.province && (
              <p className="text-sm text-red-500 mt-1">{errors.province.message}</p>
            )}
          </div>

          {/* City */}
          <div>
            <Label>Kota/Kabupaten *</Label>
            <Select
              options={selectedProvince ? cities[selectedProvince as keyof typeof cities] : []}
              placeholder="Pilih kota"
              isDisabled={!selectedProvince}
              onChange={(option) => setValue('city', option?.label || '')}
            />
            {errors.city && (
              <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>
            )}
          </div>

          {/* Postal Code */}
          <div>
            <Label htmlFor="postalCode">Kode Pos *</Label>
            <Input
              id="postalCode"
              placeholder="12345"
              maxLength={5}
              {...register('postalCode')}
            />
            {errors.postalCode && (
              <p className="text-sm text-red-500 mt-1">{errors.postalCode.message}</p>
            )}
          </div>

          {/* WhatsApp */}
          <div>
            <Label htmlFor="whatsapp">WhatsApp (Opsional)</Label>
            <Input
              id="whatsapp"
              placeholder="08123456789"
              {...register('whatsapp')}
            />
            {errors.whatsapp && (
              <p className="text-sm text-red-500 mt-1">{errors.whatsapp.message}</p>
            )}
          </div>

          {/* Website */}
          <div className="md:col-span-2">
            <Label htmlFor="website">Website (Opsional)</Label>
            <Input
              id="website"
              placeholder="https://www.sekolah.sch.id"
              {...register('website')}
            />
            {errors.website && (
              <p className="text-sm text-red-500 mt-1">{errors.website.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={prevStep}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <Button type="submit">
          Lanjut ke Branding
        </Button>
      </div>
    </form>
  )
}
```

### Files Created:
- `src/data/provinces.ts`
- `src/components/onboarding/Step2Address.tsx`

### Acceptance Criteria:
- ✅ Province/city cascading dropdown works
- ✅ All fields validated
- ✅ Can go back to step 1
- ✅ Data saved and moves to step 3

---

## Task 3.1.4: Step 3 - Logo & Banner Upload

**Owner**: FSD1  
**Duration**: 3 hours

### Steps:

**1. Create file upload utility** (`src/lib/utils/upload.ts`):
```typescript
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/lib/firebase/config'

export async function uploadSchoolImage(
  file: File,
  schoolSlug: string,
  type: 'logo' | 'banner'
): Promise<string> {
  // Validate file
  if (!file.type.startsWith('image/')) {
    throw new Error('File harus berupa gambar')
  }

  if (file.size > 2 * 1024 * 1024) {  // 2MB
    throw new Error('Ukuran file maksimal 2MB')
  }

  // Create unique filename
  const timestamp = Date.now()
  const filename = `${type}-${timestamp}.${file.name.split('.').pop()}`
  const path = `schools/${schoolSlug}/${filename}`

  // Upload to Firebase Storage
  const storageRef = ref(storage, path)
  await uploadBytes(storageRef, file)

  // Get download URL
  const url = await getDownloadURL(storageRef)
  return url
}

export function compressImage(file: File, maxWidth: number = 800): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        if (width > maxWidth) {
          height = (maxWidth / width) * height
          width = maxWidth
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0, width, height)

        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            })
            resolve(compressedFile)
          } else {
            reject(new Error('Compression failed'))
          }
        }, 'image/jpeg', 0.8)
      }
    }
    reader.onerror = reject
  })
}
```

**2. Create Step 3 Component** (`src/components/onboarding/Step3Branding.tsx`):
```typescript
'use client'

import { useState } from 'react'
import { useOnboarding } from '@/contexts/OnboardingContext'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Upload, X } from 'lucide-react'
import Image from 'next/image'
import { compressImage } from '@/lib/utils/upload'

export function Step3Branding() {
  const { data, updateStepData, nextStep, prevStep } = useOnboarding()
  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(
    data.step3?.logoPreview || null
  )
  const [banner, setBanner] = useState<File | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(
    data.step3?.bannerPreview || null
  )
  const [isUploading, setIsUploading] = useState(false)

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      // Compress image
      const compressed = await compressImage(file, 400)
      setLogo(compressed)
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(compressed)
    } catch (error) {
      alert('Gagal memproses gambar')
    }
  }

  const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      // Compress image
      const compressed = await compressImage(file, 1200)
      setBanner(compressed)
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setBannerPreview(reader.result as string)
      }
      reader.readAsDataURL(compressed)
    } catch (error) {
      alert('Gagal memproses gambar')
    }
  }

  const handleSubmit = () => {
    // Save to context (files will be uploaded in final step)
    updateStepData(3, {
      logo,
      logoPreview,
      banner,
      bannerPreview,
    })
    nextStep()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Logo & Banner Sekolah</h2>
      <p className="text-gray-600">
        Upload logo dan banner sekolah Anda (opsional, bisa diisi nanti)
      </p>

      <div className="space-y-6">
        {/* Logo Upload */}
        <div>
          <Label>Logo Sekolah</Label>
          <p className="text-sm text-gray-500 mb-2">
            Rekomendasi: Persegi, maksimal 2MB
          </p>
          
          {logoPreview ? (
            <div className="relative w-32 h-32 border-2 border-gray-300 rounded-lg overflow-hidden">
              <Image
                src={logoPreview}
                alt="Logo preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setLogo(null)
                  setLogoPreview(null)
                }}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="text-xs text-gray-500 mt-2">Upload</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
            </label>
          )}
        </div>

        {/* Banner Upload */}
        <div>
          <Label>Banner Sekolah</Label>
          <p className="text-sm text-gray-500 mb-2">
            Rekomendasi: 16:9 landscape, maksimal 2MB
          </p>
          
          {bannerPreview ? (
            <div className="relative w-full h-40 border-2 border-gray-300 rounded-lg overflow-hidden">
              <Image
                src={bannerPreview}
                alt="Banner preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setBanner(null)
                  setBannerPreview(null)
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-500 mt-2">Upload Banner</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBannerChange}
              />
            </label>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={prevStep}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <Button type="button" onClick={handleSubmit}>
          {logo || banner ? 'Lanjut ke Paket' : 'Lewati & Lanjut'}
        </Button>
      </div>
    </div>
  )
}
```

### Files Created:
- `src/lib/utils/upload.ts`
- `src/components/onboarding/Step3Branding.tsx`

### Acceptance Criteria:
- ✅ Image upload works
- ✅ Image compression works
- ✅ Preview shows uploaded images
- ✅ Can remove uploaded images
- ✅ Can skip this step
- ✅ File size validation (max 2MB)

---

*[Continue with Tasks 3.1.5 (Step 4 - Subscription Selection), 3.1.6 (Step 5 - Admin Account), and remaining stories...]*

---

# Troubleshooting

## Common Issues

### File upload fails

**Issue**: Error uploading to Firebase Storage
```bash
# Solution
# 1. Check Firebase Storage rules
# 2. Verify file size < 2MB
# 3. Check file type is image/*
# 4. Check Firebase Storage quota
```

### Province dropdown not populating

**Issue**: Cities not showing after selecting province
```bash
# Solution
# Check provinces.ts has matching keys
# Verify react-select version
```

### Image compression slow

**Issue**: Large images take long to compress
```bash
# Solution
# Reduce maxWidth in compressImage (e.g., 600 instead of 800)
# Show loading indicator during compression
```

---

**Continue to**: [SUMMARY.md](SUMMARY.md) for quick reference
