import { LoginForm } from '@/components/auth/LoginForm'
import Link from 'next/link'

export const metadata = {
  title: 'Login - PPDB SaaS',
  description: 'Login ke akun PPDB SaaS Anda',
}

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Selamat Datang</h1>
        <p className="mt-2 text-gray-600">
          Login untuk mengakses dashboard Anda
        </p>
      </div>

      <LoginForm />

      <div className="text-center text-sm">
        <span className="text-gray-600">Belum punya akun? </span>
        <Link
          href="/register"
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Daftar Sekarang
        </Link>
      </div>
    </div>
  )
}
