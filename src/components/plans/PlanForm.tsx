'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { planSchema, type CreatePlanDTO } from '@/lib/validations/plan'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import type { SubscriptionPlan } from '@/types/database'

interface PlanFormProps {
  initialData?: SubscriptionPlan
  isEdit?: boolean
}

export function PlanForm({ initialData, isEdit = false }: PlanFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreatePlanDTO>({
    resolver: zodResolver(planSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      price: 0,
      billingCycle: 'monthly',
      features: {
        maxStudents: 100,
        maxAdmins: 5,
        maxStorage: 1024,
        maxEmails: 1000,
        maxSMS: 100,
        customForms: false,
        whatsappNotif: false,
        whiteLabel: false,
        apiAccess: false,
        prioritySupport: false,
        customDomain: false,
        removeBranding: false,
      },
      trialDays: 14,
      isActive: true,
      sortOrder: 0,
    },
  })

  const billingCycle = watch('billingCycle')

  const onSubmit = async (data: CreatePlanDTO) => {
    try {
      setLoading(true)

      const url = isEdit ? `/api/plans/${initialData?.id}` : '/api/plans'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      })

      const result = await res.json()

      if (res.ok) {
        toast({
          title: 'Berhasil',
          description: isEdit ? 'Paket berhasil diperbarui' : 'Paket berhasil dibuat',
        })
        router.push('/super-admin/plans')
        router.refresh()
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Gagal menyimpan paket',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Terjadi kesalahan saat menyimpan paket',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Informasi Dasar</CardTitle>
          <CardDescription>Informasi umum tentang paket langganan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Paket *</Label>
            <Input
              id="name"
              placeholder="Basic, Pro, Enterprise"
              {...register('name')}
              disabled={loading}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi *</Label>
            <Textarea
              id="description"
              placeholder="Deskripsi singkat tentang paket ini"
              rows={3}
              {...register('description')}
              disabled={loading}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Harga (IDR) *</Label>
              <Input
                id="price"
                type="number"
                placeholder="100000"
                {...register('price', { valueAsNumber: true })}
                disabled={loading}
              />
              {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="billingCycle">Siklus Pembayaran *</Label>
              <Select
                value={billingCycle}
                onValueChange={(value) => setValue('billingCycle', value as 'monthly' | 'yearly')}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih siklus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Bulanan</SelectItem>
                  <SelectItem value="yearly">Tahunan</SelectItem>
                </SelectContent>
              </Select>
              {errors.billingCycle && (
                <p className="text-sm text-destructive">{errors.billingCycle.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="trialDays">Masa Trial (hari)</Label>
              <Input
                id="trialDays"
                type="number"
                placeholder="14"
                {...register('trialDays', { valueAsNumber: true })}
                disabled={loading}
              />
              {errors.trialDays && (
                <p className="text-sm text-destructive">{errors.trialDays.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sortOrder">Urutan Tampilan</Label>
              <Input
                id="sortOrder"
                type="number"
                placeholder="0"
                {...register('sortOrder', { valueAsNumber: true })}
                disabled={loading}
              />
              {errors.sortOrder && (
                <p className="text-sm text-destructive">{errors.sortOrder.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quotas */}
      <Card>
        <CardHeader>
          <CardTitle>Kuota & Batasan</CardTitle>
          <CardDescription>Tentukan batasan resource untuk paket ini</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxStudents">Maksimal Siswa (-1 = unlimited) *</Label>
              <Input
                id="maxStudents"
                type="number"
                placeholder="100"
                {...register('features.maxStudents', { valueAsNumber: true })}
                disabled={loading}
              />
              {errors.features?.maxStudents && (
                <p className="text-sm text-destructive">{errors.features.maxStudents.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxAdmins">Maksimal Admin *</Label>
              <Input
                id="maxAdmins"
                type="number"
                placeholder="5"
                {...register('features.maxAdmins', { valueAsNumber: true })}
                disabled={loading}
              />
              {errors.features?.maxAdmins && (
                <p className="text-sm text-destructive">{errors.features.maxAdmins.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxStorage">Storage (MB) *</Label>
              <Input
                id="maxStorage"
                type="number"
                placeholder="1024"
                {...register('features.maxStorage', { valueAsNumber: true })}
                disabled={loading}
              />
              {errors.features?.maxStorage && (
                <p className="text-sm text-destructive">{errors.features.maxStorage.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxEmails">Email/Bulan (-1 = unlimited) *</Label>
              <Input
                id="maxEmails"
                type="number"
                placeholder="1000"
                {...register('features.maxEmails', { valueAsNumber: true })}
                disabled={loading}
              />
              {errors.features?.maxEmails && (
                <p className="text-sm text-destructive">{errors.features.maxEmails.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxSMS">SMS/Bulan (-1 = unlimited) *</Label>
              <Input
                id="maxSMS"
                type="number"
                placeholder="100"
                {...register('features.maxSMS', { valueAsNumber: true })}
                disabled={loading}
              />
              {errors.features?.maxSMS && (
                <p className="text-sm text-destructive">{errors.features.maxSMS.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Fitur Tambahan</CardTitle>
          <CardDescription>Fitur premium yang tersedia di paket ini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: 'customForms', label: 'Form Kustom' },
              { key: 'whatsappNotif', label: 'Notifikasi WhatsApp' },
              { key: 'whiteLabel', label: 'White Label' },
              { key: 'apiAccess', label: 'API Access' },
              { key: 'prioritySupport', label: 'Priority Support' },
              { key: 'customDomain', label: 'Custom Domain' },
              { key: 'removeBranding', label: 'Hapus Branding' },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={key}
                  {...register(`features.${key}` as any)}
                  disabled={loading}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor={key} className="cursor-pointer">
                  {label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status */}
      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              {...register('isActive')}
              disabled={loading}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="isActive" className="cursor-pointer">
              Paket Aktif (dapat dipilih oleh sekolah)
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEdit ? 'Perbarui Paket' : 'Buat Paket'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Batal
        </Button>
      </div>
    </form>
  )
}
