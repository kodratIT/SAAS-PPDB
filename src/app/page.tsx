import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>PPDB SaaS</CardTitle>
          <CardDescription>Sistem Penerimaan Peserta Didik Baru</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge>Sprint 1</Badge>
            <Badge variant="secondary">In Progress</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Project setup dengan Next.js 15, TypeScript, Tailwind CSS, dan shadcn/ui berhasil!
          </p>
          <Button className="w-full">Get Started</Button>
        </CardContent>
      </Card>
    </main>
  )
}
