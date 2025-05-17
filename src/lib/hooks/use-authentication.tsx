'use client'

// * Next React
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

// * Types
import { authPaths } from '@/configs/path'

// * Hooks
import { useUser } from '@/lib/hooks/use-user'

// * States
import useAppStore from '@/stores'

// * Actions
import { actionLogout } from '@/server/actions/actionLogout'

// * Utils
import { isClient } from '@/utils/checkEnvironment'

export const useAuthentication = () => {
  const router = useRouter()
  const pathname = usePathname()

  const { user } = useUser({ revalidateOnMount: true })

  const authStatus = useAppStore.authStatus.use()

  useEffect(() => {
    if (authStatus === 'loggingIn' && user) {
      useAppStore.setAuthStatus('loggedIn')
      if (authPaths.some((path) => pathname.startsWith(path))) {
        router.push('/')
      } else {
        router.back()
      }
    }

    if (authStatus === 'loggingOut') {
      ;(async () => {
        useAppStore.setAuthStatus('idle')
        await actionLogout()
      })()
    }
  }, [authStatus, pathname, router, user])

  useEffect(() => {
    useAppStore.setAppMounted(true)

    const isLoggedIn = isClient() && document.cookie.includes('logged_in=true')

    if (isLoggedIn) return useAppStore.setAuthStatus('loggedIn')

    useAppStore.setAuthStatus('idle')
  }, [])
}
