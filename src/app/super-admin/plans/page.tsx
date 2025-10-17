'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { PlanCard } from '@/components/plans/PlanCard'
import { DeletePlanDialog } from '@/components/plans/DeletePlanDialog'
import { useToast } from '@/hooks/use-toast'
import type { SubscriptionPlan } from '@/types/database'

export default function PlansPage() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/plans')
      const data = await res.json()

      if (res.ok) {
        setPlans(data.plans)
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to fetch plans',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch plans',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedPlan) return

    try {
      const res = await fetch(`/api/plans/${selectedPlan.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        toast({
          title: 'Success',
          description: 'Plan deleted successfully',
        })
        fetchPlans()
        setDeleteDialogOpen(false)
        setSelectedPlan(null)
      } else {
        const data = await res.json()
        toast({
          title: 'Error',
          description: data.error || 'Failed to delete plan',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete plan',
        variant: 'destructive',
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Subscription Plans</h1>
          <p className="text-gray-600 mt-1">
            Manage pricing tiers and features
          </p>
        </div>
        <Link href="/super-admin/plans/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Plan
          </Button>
        </Link>
      </div>

      {plans.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-600 mb-4">No plans created yet</p>
          <Link href="/super-admin/plans/new">
            <Button>Create Your First Plan</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onDelete={() => {
                setSelectedPlan(plan)
                setDeleteDialogOpen(true)
              }}
            />
          ))}
        </div>
      )}

      <DeletePlanDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        planName={selectedPlan?.name || ''}
        onConfirm={handleDelete}
      />
    </div>
  )
}
