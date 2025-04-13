'use client'

// * Next React
import Link from 'next/link'

// * Components
import { Button, ButtonProps } from '@/components/ui/button'
import { useAppContext } from '@/app/app-provider'
import Show from '@/components/show'
import ButtonUser from '@/components/navbar/components/button-user'

type Props = {
  btnProps?: ButtonProps
  ignoreBtn?: 'auth' | 'user'
}

const auth = {
  login: { title: 'Login', url: '/login' },
  register: { title: 'Register', url: '/register' }
} as const

const ButtonAuth = ({ btnProps = {}, ignoreBtn }: Props) => {
  const { isAuthenticated } = useAppContext()
  // const isAuthenticated = true
  return (
    <Show>
      <Show.When isTrue={!isAuthenticated && ignoreBtn !== 'auth'}>
        <Button asChild variant='outline' {...btnProps}>
          <Link href={auth.login.url}>{auth.login.title}</Link>
        </Button>
        <Button asChild {...btnProps}>
          <Link href={auth.register.url}>{auth.register.title}</Link>
        </Button>
      </Show.When>
      <Show.When isTrue={isAuthenticated && ignoreBtn !== 'user'}>
        <ButtonUser />
      </Show.When>
    </Show>
  )
}

export default ButtonAuth
