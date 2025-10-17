'use client'

interface PasswordStrengthMeterProps {
  password: string
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  if (!password) return null

  const calculateStrength = (pwd: string): number => {
    let strength = 0

    if (pwd.length >= 8) strength++
    if (pwd.length >= 12) strength++
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
    if (/[0-9]/.test(pwd)) strength++
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++

    return strength
  }

  const strength = calculateStrength(password)

  const getStrengthLabel = (strength: number): string => {
    if (strength <= 1) return 'Lemah'
    if (strength <= 2) return 'Sedang'
    if (strength <= 3) return 'Kuat'
    return 'Sangat Kuat'
  }

  const getStrengthColor = (strength: number): string => {
    if (strength <= 1) return 'bg-red-500'
    if (strength <= 2) return 'bg-yellow-500'
    if (strength <= 3) return 'bg-blue-500'
    return 'bg-green-500'
  }

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full ${
              level <= strength ? getStrengthColor(strength) : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-gray-600">
        Kekuatan password: {getStrengthLabel(strength)}
      </p>
    </div>
  )
}
