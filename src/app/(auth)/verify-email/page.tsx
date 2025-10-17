'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Mail } from 'lucide-react'

export default function VerifyEmailPage() {
  const router = useRouter()
  const { user, sendVerificationEmail } = useAuth()
  const { toast } = useToast()
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    if (user.emailVerified) {
      toast({
        title: 'Email Sudah Terverifikasi',
        description: 'Redirecting to dashboard...',
      })
      setTimeout(() => router.push('/dashboard'), 2000)
    }
  }, [user, router, toast])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const handleResend = async () => {
    try {
      await sendVerificationEmail()
      toast({
        title: 'Email Terkirim',
        description: 'Silakan cek email Anda',
      })
      setCountdown(60)
      setCanResend(false)
    } catch (error: any) {
      toast({
        title: 'Gagal Mengirim Email',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Mail className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Verifikasi Email</h1>
        <p className="mt-2 text-gray-600">
          Kami telah mengirimkan link verifikasi ke <br />
          <strong>{user?.email}</strong>
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Penting:</strong> Cek folder spam jika tidak menemukan email.
        </p>
      </div>

      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleResend}
          disabled={!canResend}
        >
          {canResend ? 'Kirim Ulang Email' : `Kirim ulang dalam ${countdown}s`}
        </Button>

        <Button
          variant="ghost"
          className="w-full"
          onClick={() => router.push('/login')}
        >
          Kembali ke Login
        </Button>
      </div>
    </div>
  )
}
