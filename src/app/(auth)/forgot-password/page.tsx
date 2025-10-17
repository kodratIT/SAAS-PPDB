'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { ArrowLeft, Mail } from 'lucide-react'

const forgotPasswordSchema = z.object({
  email: z.string().email('Email tidak valid').min(1, 'Email wajib diisi'),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setLoading(true)
      await resetPassword(data.email)
      setEmailSent(true)

      toast({
        title: 'Email Terkirim',
        description: 'Silakan cek email Anda untuk reset password',
      })
    } catch (error: any) {
      toast({
        title: 'Gagal Mengirim Email',
        description: error.message || 'Terjadi kesalahan',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Cek Email Anda</h1>
          <p className="mt-2 text-gray-600">
            Kami telah mengirimkan link reset password ke email Anda.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Catatan:</strong> Link reset password akan kadaluarsa dalam 1
            jam.
          </p>
        </div>

        <Link href="/login">
          <Button variant="outline" className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Login
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Lupa Password</h1>
        <p className="mt-2 text-gray-600">
          Masukkan email Anda untuk reset password
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="nama@example.com"
            {...register('email')}
            disabled={loading}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Mengirim...' : 'Kirim Link Reset'}
        </Button>
      </form>

      <Link href="/login">
        <Button variant="ghost" className="w-full">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Login
        </Button>
      </Link>
    </div>
  )
}
