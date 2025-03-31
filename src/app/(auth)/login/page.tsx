import { LoginForm } from '@/app/(auth)/login/_components/login-form'

export default function Page() {
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6'>
      <div className='w-full max-w-sm'>
        <LoginForm />
      </div>
    </div>
  )
}
