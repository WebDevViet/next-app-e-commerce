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
import { Toaster } from '@/components/ui/sonner'

// * Utils
import handleErrorClient from '@/helpers/error/handleErrorClient'

// * Zod
import { z } from 'zod'
import { USERNAME_REGEX } from '@/constants/regex'
import { isClient } from '@/utils/checkEnvironment'

const userStoreSchema = z.object({
  email: z.string().trim().nonempty().email(),
  avatar: z.union([z.literal(''), z.string().url()]),
  username: z.string().trim().min(4).max(15).regex(USERNAME_REGEX)
})

const AppContext = createContext<{
  user: GetMeResponse | null
  setUser: (user: GetMeResponse | null) => void
  handleGetMe: () => Promise<void>
  handleLogout: () => Promise<void>
  messageError: string | null
  setMessageError: Dispatch<SetStateAction<string | null>>
  authLoading: boolean
  setAuthLoading: Dispatch<SetStateAction<boolean>>
  isAuthenticated: boolean | null
}>({
  user: null,
  setUser: () => {},
  handleGetMe: async () => {},
  handleLogout: async () => {},
  messageError: null,
  setMessageError: () => {},
  authLoading: false,
  setAuthLoading: () => {},
  isAuthenticated: null
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
  const [isAuthenticated, setAuthenticated] = useState<boolean | null>(null)

  const appMounted = useRef(false)

  useEffect(() => {
    const isAuthenticated = isClient() && document.cookie.includes('logged_in=true')

    if (!isAuthenticated) return setAuthenticated(false)
    setAuthenticated(true)
  }, [])

  useEffect(() => {
    if (!isAuthenticated) return

    const userStore = localStorage.getItem('user')

    const userStoreParsed = userStoreSchema.safeParse(userStore && JSON.parse(userStore))

    if (userStoreParsed.success) {
      return setUser(userStoreParsed.data)
    }

    ;(async function () {
      try {
        setAuthLoading(true)
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
  }, [isAuthenticated])

  useEffect(() => {
    if (!appMounted.current) {
      appMounted.current = true
      return
    }

    if (!user) {
      localStorage.removeItem('user')
      return
    }

    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const valueContext = useMemo(() => {
    return {
      async handleGetMe() {
        try {
          setAuthLoading(true)
          const {
            payload: { data }
          } = await clientUserServices.getMe()

          setUser(data)
          setAuthenticated(true)

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
        setAuthenticated(false)
        await actionLogout()
      },
      user,
      setUser,
      messageError,
      setMessageError,
      authLoading,
      setAuthLoading,
      isAuthenticated
    }
  }, [user, messageError, authLoading, pathname, router, isAuthenticated])

  return (
    <AppContext.Provider value={valueContext}>
      {children}
      <Toaster />
    </AppContext.Provider>
  )
}
