import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2, Check } from 'lucide-react'
import Link from 'next/link'
import type { SubscriptionPlan } from '@/types/database'

interface PlanCardProps {
  plan: SubscriptionPlan
  onDelete: () => void
}

export function PlanCard({ plan, onDelete }: PlanCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className={!plan.isActive ? 'opacity-60' : ''}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription className="mt-1">
              {plan.description}
            </CardDescription>
          </div>
          {!plan.isActive && (
            <Badge variant="secondary">Inactive</Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-4">
          <p className="text-3xl font-bold">
            {formatPrice(plan.price)}
            <span className="text-base font-normal text-gray-600">
              /{plan.billingCycle === 'monthly' ? 'bulan' : 'tahun'}
            </span>
          </p>
          {plan.trialDays > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              Trial {plan.trialDays} hari
            </p>
          )}
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-sm">Features:</p>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              {plan.features.maxStudents === -1
                ? 'Unlimited students'
                : `${plan.features.maxStudents} students`}
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              {plan.features.maxAdmins} admins
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              {plan.features.maxStorage} MB storage
            </li>
            {plan.features.customForms && (
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Custom forms
              </li>
            )}
            {plan.features.whatsappNotif && (
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                WhatsApp notifications
              </li>
            )}
            {plan.features.prioritySupport && (
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Priority support
              </li>
            )}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Link href={`/super-admin/plans/${plan.id}/edit`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </Link>
        <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
          className="flex-1"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
