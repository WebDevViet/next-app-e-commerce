import { FormLogin } from '@/app/(auth)/login/_components/form-login'

export default function Page() {
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6'>
      <div className='w-full max-w-sm'>
        <FormLogin />
      </div>
    </div>
  )
}
