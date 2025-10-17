'use client'

import { useEffect, useState } from 'react'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { School, Users, FileText, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface DashboardStats {
  totalSchools: number
  activeSchools: number
  totalUsers: number
  totalApplications: number
  revenue: number
  growthRates: {
    schools: number
    users: number
    applications: number
    revenue: number
  }
}

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/super-admin/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">
          Platform statistics and recent activity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Sekolah"
          value={stats?.totalSchools || 0}
          icon={School}
          trend={{
            value: stats?.growthRates.schools || 0,
            label: 'vs bulan lalu',
          }}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />

        <StatsCard
          title="Sekolah Aktif"
          value={stats?.activeSchools || 0}
          icon={School}
          trend={{
            value: stats?.growthRates.schools || 0,
            label: 'vs bulan lalu',
          }}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />

        <StatsCard
          title="Total Pengguna"
          value={stats?.totalUsers || 0}
          icon={Users}
          trend={{
            value: stats?.growthRates.users || 0,
            label: 'vs bulan lalu',
          }}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />

        <StatsCard
          title="Total Pendaftar"
          value={stats?.totalApplications || 0}
          icon={FileText}
          trend={{
            value: stats?.growthRates.applications || 0,
            label: 'vs bulan lalu',
          }}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4">
              <div className="text-left">
                <div className="font-semibold">Tambah Sekolah</div>
                <div className="text-xs text-gray-500 mt-1">
                  Daftarkan sekolah baru
                </div>
              </div>
            </Button>

            <Button variant="outline" className="h-auto py-4">
              <div className="text-left">
                <div className="font-semibold">Kelola Paket</div>
                <div className="text-xs text-gray-500 mt-1">
                  Atur paket langganan
                </div>
              </div>
            </Button>

            <Button variant="outline" className="h-auto py-4">
              <div className="text-left">
                <div className="font-semibold">Lihat Laporan</div>
                <div className="text-xs text-gray-500 mt-1">
                  Analytics & reports
                </div>
              </div>
            </Button>

            <Button variant="outline" className="h-auto py-4">
              <div className="text-left">
                <div className="font-semibold">Pengaturan</div>
                <div className="text-xs text-gray-500 mt-1">
                  System settings
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>No recent activities</p>
            <p className="text-sm mt-1">Activity tracking coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
