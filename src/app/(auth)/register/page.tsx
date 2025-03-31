import { FormRegister } from '@/app/(auth)/register/_components/form-register'

const RegisterPage = () => {
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6'>
      <div className='w-full max-w-sm'>
        <FormRegister />
      </div>
    </div>
  )
}

export default RegisterPage
