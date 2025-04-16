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
  authLoading: boolean
  setAuthLoading: Dispatch<SetStateAction<boolean>>
}>({
  user: null,
  setUser: () => {},
  handleLogin: async () => {},
  handleLogout: async () => {},
  messageError: null,
  setMessageError: () => {},
  authLoading: false,
  setAuthLoading: () => {}
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
  const [authLoading, setAuthLoading] = useState<boolean>(false)

  const mounted = useRef(false)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }

    if (!user) {
      localStorage.removeItem('user')
      return
    }

    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    const userStore = localStorage.getItem('user')

    if (!userStore || userStore === 'null') return setUser(null)
    ;(async function () {
      try {
        setAuthLoading(true)
        setUser(JSON.parse(userStore))
        const {
          payload: { data }
        } = await clientUserServices.getMe()
        setUser(data)
      } catch (error) {
        setUser(null)
        handleErrorClient({ error })
      } finally {
        setAuthLoading(false)
      }
    })()
  }, [])

  const valueContext = useMemo(() => {
    return {
      async handleLogin() {
        try {
          setAuthLoading(true)
          const {
            payload: { data }
          } = await clientUserServices.getMe()

          setUser(data)

          if (authPaths.some((path) => pathname.startsWith(path))) {
            router.push('/')
          } else {
            router.back()
          }
        } catch (error) {
          throw error
        } finally {
          setAuthLoading(false)
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
      authLoading,
      setAuthLoading
    }
  }, [user, messageError, authLoading, pathname, router])

  return (
    <AppContext.Provider value={valueContext}>
      {children}
      <Toaster />
    </AppContext.Provider>
  )
}
