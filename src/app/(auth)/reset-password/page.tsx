'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { confirmPasswordReset } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { PasswordInput } from '@/components/auth/PasswordInput'
import { PasswordStrengthMeter } from '@/components/auth/PasswordStrengthMeter'

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password minimal 8 karakter')
      .regex(/[A-Z]/, 'Password harus mengandung huruf besar')
      .regex(/[0-9]/, 'Password harus mengandung angka'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak cocok',
    path: ['confirmPassword'],
  })

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [oobCode, setOobCode] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  useEffect(() => {
    const code = searchParams.get('oobCode')
    if (!code) {
      toast({
        title: 'Link Tidak Valid',
        description: 'Link reset password tidak valid atau sudah kadaluarsa',
        variant: 'destructive',
      })
      router.push('/forgot-password')
    } else {
      setOobCode(code)
    }
  }, [searchParams, router, toast])

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!oobCode) return

    try {
      setLoading(true)
      await confirmPasswordReset(auth, oobCode, data.password)

      toast({
        title: 'Password Berhasil Direset',
        description: 'Anda bisa login dengan password baru',
      })

      router.push('/login')
    } catch (error: any) {
      toast({
        title: 'Reset Password Gagal',
        description:
          error.code === 'auth/expired-action-code'
            ? 'Link sudah kadaluarsa'
            : error.code === 'auth/invalid-action-code'
            ? 'Link tidak valid'
            : 'Terjadi kesalahan',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (!oobCode) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
        <p className="mt-2 text-gray-600">Masukkan password baru Anda</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="password">Password Baru</Label>
          <PasswordInput
            id="password"
            placeholder="Minimal 8 karakter"
            {...register('password', {
              onChange: (e) => setPassword(e.target.value),
            })}
            disabled={loading}
          />
          <PasswordStrengthMeter password={password} />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
          <PasswordInput
            id="confirmPassword"
            placeholder="Ulangi password baru"
            {...register('confirmPassword')}
            disabled={loading}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Loading...' : 'Reset Password'}
        </Button>
      </form>
    </div>
  )
}
