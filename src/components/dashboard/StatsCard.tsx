import { type LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    label: string
  }
  iconBgColor?: string
  iconColor?: string
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  iconBgColor = 'bg-blue-100',
  iconColor = 'text-blue-600',
}: StatsCardProps) {
  const trendPositive = trend && trend.value > 0
  const trendNegative = trend && trend.value < 0

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>

            {trend && (
              <div className="flex items-center mt-2">
                <span
                  className={cn(
                    'text-sm font-medium',
                    trendPositive && 'text-green-600',
                    trendNegative && 'text-red-600',
                    !trendPositive && !trendNegative && 'text-gray-600'
                  )}
                >
                  {trendPositive && '+'}
                  {trend.value}%
                </span>
                <span className="text-sm text-gray-500 ml-2">{trend.label}</span>
              </div>
            )}
          </div>

          <div className={cn('p-3 rounded-lg', iconBgColor)}>
            <Icon className={cn('w-6 h-6', iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
