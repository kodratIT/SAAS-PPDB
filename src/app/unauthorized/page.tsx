import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShieldAlert } from 'lucide-react'

export const metadata = {
  title: 'Akses Ditolak - PPDB SaaS',
}

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
          <ShieldAlert className="w-10 h-10 text-red-600" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Akses Ditolak
          </h1>
          <p className="text-gray-600">
            Anda tidak memiliki izin untuk mengakses halaman ini.
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            Jika Anda merasa ini adalah kesalahan, silakan hubungi administrator.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard">
            <Button variant="default">Ke Dashboard</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline">Logout</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
