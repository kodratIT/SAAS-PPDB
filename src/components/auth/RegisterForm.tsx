'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { GoogleLoginButton } from './GoogleLoginButton'
import { PasswordInput } from './PasswordInput'
import { PasswordStrengthMeter } from './PasswordStrengthMeter'

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Nama minimal 3 karakter')
      .max(50, 'Nama maksimal 50 karakter'),
    email: z.string().email('Email tidak valid').min(1, 'Email wajib diisi'),
    password: z
      .string()
      .min(8, 'Password minimal 8 karakter')
      .regex(/[A-Z]/, 'Password harus mengandung huruf besar')
      .regex(/[0-9]/, 'Password harus mengandung angka'),
    confirmPassword: z.string(),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: 'Anda harus menyetujui syarat dan ketentuan',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak cocok',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export function RegisterForm() {
  const router = useRouter()
  const { register: registerUser } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      agreeTerms: false,
    },
  })

  const agreeTerms = watch('agreeTerms')

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true)
      await registerUser(data.email, data.password, data.name)

      toast({
        title: 'Registrasi Berhasil',
        description: 'Silakan cek email Anda untuk verifikasi',
      })

      router.push('/verify-email')
    } catch (error: any) {
      toast({
        title: 'Registrasi Gagal',
        description: error.message || 'Terjadi kesalahan saat registrasi',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Nama Lengkap</Label>
          <Input
            id="name"
            placeholder="John Doe"
            {...register('name')}
            disabled={loading}
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

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

        <div>
          <Label htmlFor="password">Password</Label>
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
            placeholder="Ulangi password"
            {...register('confirmPassword')}
            disabled={loading}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={agreeTerms}
            onCheckedChange={(checked) =>
              setValue('agreeTerms', checked as boolean)
            }
            disabled={loading}
          />
          <Label htmlFor="terms" className="text-sm font-normal leading-none">
            Saya setuju dengan{' '}
            <a href="/terms" className="text-blue-600 hover:underline">
              syarat dan ketentuan
            </a>{' '}
            serta{' '}
            <a href="/privacy" className="text-blue-600 hover:underline">
              kebijakan privasi
            </a>
          </Label>
        </div>
        {errors.agreeTerms && (
          <p className="text-sm text-red-600">{errors.agreeTerms.message}</p>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Loading...' : 'Daftar'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-50 text-gray-500">Atau</span>
        </div>
      </div>

      <GoogleLoginButton disabled={loading} />
    </div>
  )
}
