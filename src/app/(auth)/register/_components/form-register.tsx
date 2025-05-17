'use client'

// * Next React
import Link from 'next/link'

// * Libraries
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

// * Services Api
import clientAuthServices from '@/services/client/auth'

// * Schema
import { BodyRegisterSchema, type BodyRegister } from '@/schemas/schemaValidations/authenSchema'

// * Components
import PasswordRegister from '@/app/(auth)/register/_components/password-register'
import ButtonSubmitting from '@/components/common/buttons/button-submitting'

// * Shadcn
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

// * Utils
import { cn } from '@/lib/utils'

// * Errors
// import { HttpError401 } from '@/cores/http/interceptor/errorInterceptors'
import { AlertDestructive } from '@/components/ui/alert-destructive'
import handleErrorClient from '@/helpers/error/handleErrorClient'
import useAppStore from '@/stores'

export function FormRegister({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const form = useForm<BodyRegister>({
    resolver: zodResolver(BodyRegisterSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: BodyRegister) {
    try {
      const {
        payload: { message }
      } = await clientAuthServices.register(values)

      toast.success(message, { richColors: true })

      useAppStore.setAuthStatus('loggingIn')
    } catch (error) {
      handleErrorClient({
        error,
        showAlertDestructive: true,
        setErrorForm: form.setError
      })
    }
  }

  function onInvalid(data: unknown) {
    // eslint-disable-next-line no-console
    console.log('🚀 ~ onInvalid ~ data:', data)
  }
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl'>Register</CardTitle>
          <CardDescription>Create an account with your email and password</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='mb-6'>
            <AlertDestructive />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} noValidate>
              <div className='grid gap-6'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='grid gap-1'>
                      <FormLabel>
                        Email <span className='text-red-600'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type='email' required placeholder='m@example.com' autoComplete='email' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <InputPassword form={form} serverErrorOnly /> */}
                <PasswordRegister form={form} />

                <ButtonSubmitting form={form}>
                  <Button type='submit' className='w-full'>
                    Register
                  </Button>
                </ButtonSubmitting>
              </div>
            </form>
          </Form>

          <div className='mt-4 text-center text-sm'>
            Already have an account?{' '}
            <Link href='/login' className='underline underline-offset-4'>
              Login
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  '>
        By clicking continue, you agree to our <Link href='#'>Terms of Service</Link> and
        <Link href='#'>Privacy Policy</Link>.
      </div>
    </div>
  )
}
