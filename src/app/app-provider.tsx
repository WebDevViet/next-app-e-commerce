'use client'

// * Next React
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

// * Actions
import { actionLogout } from '@/server/actions/actionLogout'

// * Paths
import clientUserServices from '@/services/client/user'

// * Types
import { GetMeResponse } from '@/types/response/userResponse'
import { authPaths } from '@/configs/path'

// * Shadcn
import { Toaster } from '@/components/common/notifications/sonner'
import handleErrorClient from '@/helpers/error/handleErrorClient'

const AppContext = createContext<{
  user: GetMeResponse | null
  setUser: (user: GetMeResponse | null) => void
  handleLogin: () => Promise<void>
  handleLogout: () => Promise<void>
  messageError: string | null
  setMessageError: Dispatch<SetStateAction<string | null>>
  authStatus: 'loading' | 'unLogin' | 'logged'
  setAuthStatus: Dispatch<SetStateAction<'loading' | 'unLogin' | 'logged'>>
}>({
  user: null,
  setUser: () => {},
  handleLogin: async () => {},
  handleLogout: async () => {},
  messageError: null,
  setMessageError: () => {},
  authStatus: 'unLogin',
  setAuthStatus: () => {}
})
export const useAppContext = () => {
  const context = useContext(AppContext)
  return context
}

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const [user, setUser] = useState<GetMeResponse | null>(null)
  const [messageError, setMessageError] = useState<string | null>(null)
  const [authStatus, setAuthStatus] = useState<'loading' | 'unLogin' | 'logged'>('unLogin')

  const mounted = useRef(false)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }

    if (!user) localStorage.removeItem('user')

    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    const userStore = localStorage.getItem('user')

    if (!userStore || userStore === 'null') return setUser(null)
    setAuthStatus('loading')
    setUser(JSON.parse(userStore))
    ;(async function () {
      try {
        const {
          payload: { data }
        } = await clientUserServices.getMe()
        setUser(data)
        setAuthStatus('logged')
      } catch (error) {
        setUser(null)
        setAuthStatus('unLogin')
        handleErrorClient({ error })
      }
    })()
  }, [])

  const valueContext = useMemo(() => {
    return {
      async handleLogin() {
        setAuthStatus('loading')
        try {
          const {
            payload: { data }
          } = await clientUserServices.getMe()

          setUser(data)
          setAuthStatus('logged')

          if (authPaths.some((path) => pathname.startsWith(path))) {
            router.push('/')
          } else {
            router.back()
          }
        } catch (error) {
          setAuthStatus('unLogin')
          throw error
        }
      },
      async handleLogout() {
        setUser(null)
        await actionLogout()
      },
      user,
      setUser,
      messageError,
      setMessageError,
      authStatus,
      setAuthStatus
    }
  }, [user, messageError, authStatus, pathname, router])

  return (
    <AppContext.Provider value={valueContext}>
      {children}
      <Toaster />
    </AppContext.Provider>
  )
}
