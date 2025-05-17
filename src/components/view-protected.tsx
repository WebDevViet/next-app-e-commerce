'use client'

// * Components
import useAppStore from '@/stores'

type Props = {
  forGuest?: boolean
  forUser?: boolean
  children?: React.ReactNode
}

const ProtectedView = ({ children, forGuest, forUser }: Props) => {
  const appMounted = useAppStore.appMounted.use()
  const authStatus = useAppStore.authStatus.use()

  if (!appMounted) return null

  if (!forUser && !forGuest) return children

  if (forUser && authStatus === 'loggedIn') return children
  // if (forUser && ['loggedIn', 'loggingIn'].includes(authStatus)) return children

  if (forGuest && authStatus === 'idle') return children

  return null
}

export default ProtectedView
