'use client'

// * Next React
import Link from 'next/link'

// * Components
import { Button, ButtonProps } from '@/components/common/buttons/button'
import { useAppContext } from '@/app/app-provider'
import Show from '@/components/show'
import ButtonUser from '@/components/layouts/navbar/button-user'

type Props = {
  btnProps?: ButtonProps
  ignoreBtn?: 'auth' | 'user'
}

const auth = {
  login: { title: 'Login', url: '/login' },
  register: { title: 'Register', url: '/register' }
} as const

const ButtonAuth = ({ btnProps = {}, ignoreBtn }: Props) => {
  const { user, authLoading } = useAppContext()
  return (
    <Show>
      <Show.When isTrue={!user && !authLoading && ignoreBtn !== 'auth'}>
        <Button asChild variant='outline' {...btnProps}>
          <Link href={auth.login.url}>{auth.login.title}</Link>
        </Button>
        <Button asChild {...btnProps}>
          <Link href={auth.register.url}>{auth.register.title}</Link>
        </Button>
      </Show.When>
      <Show.When isTrue={(!!user || authLoading) && ignoreBtn !== 'user'}>
        <ButtonUser />
      </Show.When>
    </Show>
  )
}

export default ButtonAuth
