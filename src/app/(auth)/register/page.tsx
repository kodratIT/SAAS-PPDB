import { RegisterForm } from '@/components/auth/RegisterForm'
import Link from 'next/link'

export const metadata = {
  title: 'Daftar - PPDB SaaS',
  description: 'Buat akun PPDB SaaS baru',
}

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Buat Akun Baru</h1>
        <p className="mt-2 text-gray-600">
          Daftar untuk memulai pendaftaran PPDB
        </p>
      </div>

      <RegisterForm />

      <div className="text-center text-sm">
        <span className="text-gray-600">Sudah punya akun? </span>
        <Link
          href="/login"
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Login
        </Link>
      </div>
    </div>
  )
}
