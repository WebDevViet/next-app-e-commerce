'use client'

// * React
import { useEffect, useRef, useState } from 'react'

// * Libraries
import { toast } from 'sonner'

// * Type
import { type BodyRegister } from '@/schemas/schemaValidations/authenSchema'
import { type UseFormReturn } from 'react-hook-form'

// * Components
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

// * Icons
import { Eye, EyeOff } from 'lucide-react'

// * Utils
import { handleCapsLock } from '@/utils/input/inputUtils'

// * REGEX
import { VN_CHAR_REGEX } from '@/constants/regex'

type Props = {
  form: UseFormReturn<BodyRegister>
  propsInput?: React.ComponentProps<typeof Input>
  showFormMessage?: 'server' | false
  customLabel?: React.ReactNode
}
const InputPassword = ({ form, propsInput, showFormMessage, customLabel }: Props) => {
  const [showPass, setShowPass] = useState(false)

  const password = form.watch('password', '')

  const passwordError = form.formState.errors.password
  const hasServerError = passwordError?.type === 'server'

  const hasShownToastRef = useRef(false)

  useEffect(() => {
    if (VN_CHAR_REGEX.test(password)) {
      if (!hasShownToastRef.current) {
        toast.warning(
          'Mật khẩu của bạn chứa ký tự có dấu tiếng Việt. Vui lòng kiểm tra lại hoặc đảm bảo đây là ý định của bạn.',
          {
            id: 'vn-char-warning',
            duration: 3000,
            richColors: true
          }
        )
        hasShownToastRef.current = true
      }
    } else {
      hasShownToastRef.current = false
    }
  }, [password])

  let formMessage: React.ReactNode

  if (showFormMessage !== false) {
    formMessage = showFormMessage === 'server' ? hasServerError && <FormMessage /> : <FormMessage />
  }

  return (
    <FormField
      control={form.control}
      name='password'
      render={({
        field
        /**fieldState */
      }) => (
        <FormItem className='grid gap-1'>
          {customLabel ?? (
            <FormLabel>
              Password <span className='text-destructive'>*</span>
            </FormLabel>
          )}

          <div className='relative'>
            <FormControl>
              <Input
                required
                type={showPass ? 'text' : 'password'}
                placeholder='password'
                autoComplete='password'
                onKeyUp={handleCapsLock}
                {...field}
                {...propsInput}
              />
            </FormControl>
            <button
              className='absolute inset-y-px right-px flex h-full w-9 items-center justify-center rounded-r-lg text-muted-foreground/80 transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
              type='button'
              onClick={() => setShowPass(!showPass)}
              aria-label={showPass ? 'Hide password' : 'Show password'}
              aria-pressed={showPass}
              aria-controls='password'
            >
              {showPass ? (
                <EyeOff size={16} strokeWidth={2} aria-hidden='true' role='presentation' />
              ) : (
                <Eye size={16} strokeWidth={2} aria-hidden='true' role='presentation' />
              )}
            </button>
          </div>
          {formMessage}
          {/* {fieldState.error && fieldState.error.type === 'server' && <FormMessage />} */}
        </FormItem>
      )}
    />
  )
}

export default InputPassword
