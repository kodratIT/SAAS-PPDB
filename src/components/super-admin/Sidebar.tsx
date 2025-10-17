'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  School,
  Users,
  Package,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/super-admin/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: 'Sekolah',
    href: '/super-admin/schools',
    icon: <School className="w-5 h-5" />,
  },
  {
    label: 'Pengguna',
    href: '/super-admin/users',
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: 'Paket Langganan',
    href: '/super-admin/plans',
    icon: <Package className="w-5 h-5" />,
  },
  {
    label: 'Laporan',
    href: '/super-admin/reports',
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    label: 'Pengaturan',
    href: '/super-admin/settings',
    icon: <Settings className="w-5 h-5" />,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'bg-white border-r border-gray-200 flex flex-col transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PP</span>
            </div>
            <span className="font-bold text-lg text-gray-900">PPDB SaaS</span>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors',
                'hover:bg-gray-100',
                isActive && 'bg-blue-50 text-blue-600 hover:bg-blue-100',
                !isActive && 'text-gray-700'
              )}
              title={collapsed ? item.label : undefined}
            >
              {item.icon}
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          {!collapsed && (
            <>
              <div>PPDB SaaS v1.0</div>
              <div className="mt-1">&copy; 2024</div>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
