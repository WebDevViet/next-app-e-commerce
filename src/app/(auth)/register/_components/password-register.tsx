'use client'

// * React
import { useMemo } from 'react'

// * Type
import { type BodyRegister } from '@/schemas/schemaValidations/authenSchema'
import { type UseFormReturn } from 'react-hook-form'

// * Component
import InputPassword from '@/components/input-password'

// * Icons
import { Check, X } from 'lucide-react'

type TProps = {
  form: UseFormReturn<BodyRegister>
}

const PasswordRegister = ({ form }: TProps) => {
  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: 'At least 8 characters' },
      { regex: /[0-9]/, text: 'At least 1 number' },
      { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
      { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
      { regex: /[^A-Za-z0-9]/, text: 'At least 1 special character' }
    ]

    return requirements.map((require) => ({
      met: require.regex.test(pass),
      text: require.text
    }))
  }

  const getStrengthColor = (score: number) => {
    if (score === 0) return 'bg-border'
    if (score <= 1) return 'bg-red-500'
    if (score <= 2) return 'bg-orange-500'
    if (score <= 3) return 'bg-amber-500'
    if (score === 4) return 'bg-lime-500'
    return 'bg-emerald-500'
  }

  const getStrengthText = (score: number) => {
    if (score === 0) return 'Enter a password'
    if (score <= 2) return 'Weak password'
    if (score <= 4) return 'Medium password'
    return 'Strong password'
  }

  const password = form.watch('password', '')

  const strength = checkStrength(password)

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length
  }, [strength])

  const isSubmitted = form.formState.isSubmitted

  return (
    <>
      <InputPassword
        form={form}
        showFormMessage={false}
        propsInput={{ 'aria-invalid': strengthScore < 4, 'aria-describedby': 'password-strength' }}
      />

      <div className='grid gap-2'>
        {/* Password strength indicator */}
        <div
          className='h-1 w-full overflow-hidden rounded-full bg-border'
          role='progressbar'
          aria-valuenow={strengthScore}
          aria-valuemin={0}
          aria-valuemax={5}
          aria-label='Password strength'
        >
          <div
            className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
            style={{ width: `${(strengthScore / 5) * 100}%` }}
          ></div>
        </div>

        {/* Password strength description */}
        <p id='password-strength' className='text-sm font-medium text-foreground'>
          {getStrengthText(strengthScore)}. Must contain:
        </p>

        {/* Password requirements list */}
        <ul aria-label='Password requirements'>
          {strength.map((require, index) => {
            let colorIcon = 'text-muted-foreground/80'
            if (isSubmitted && !require.met) colorIcon = 'text-red-600'
            if (require.met) colorIcon = 'text-emerald-600'

            const colorText = colorIcon === 'text-muted-foreground/80' ? 'text-muted-foreground' : colorIcon

            return (
              <li key={index} className='flex items-center space-x-2'>
                {require.met ? (
                  <Check size={16} className='text-emerald-500' aria-hidden='true' />
                ) : (
                  <X size={16} className={colorIcon} aria-hidden='true' />
                )}
                <span className={`text-sm ${colorText}`}>
                  {require.text}
                  <span className='sr-only'>{require.met ? ' - Requirement met' : ' - Requirement not met'}</span>
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default PasswordRegister
