import { RegisterForm } from '@/app/(auth)/register/_components/register-form'

const RegisterPage = () => {
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6'>
      <div className='w-full max-w-sm'>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage
