'use client'

// * Next React
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
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
  isAuthenticated: boolean
  handleLogin: () => Promise<void>
  handleLogout: () => Promise<void>
  messageError: string | null
  setMessageError: Dispatch<SetStateAction<string | null>>
}>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  handleLogin: async () => {},
  handleLogout: async () => {},
  messageError: null,
  setMessageError: () => {}
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

  const isAuthenticated = Boolean(user)
  const handleLogin = async () => {
    const {
      payload: { data }
    } = await clientUserServices.getMe()

    setUser(data)

    if (authPaths.some((path) => pathname.startsWith(path))) {
      router.push('/')
    } else {
      router.back()
    }
  }

  const handleLogout = async () => {
    setUser(null)
    await actionLogout()
  }

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
    ;(async function () {
      try {
        const {
          payload: { data }
        } = await clientUserServices.getMe()
        setUser(data)
      } catch (error) {
        setUser(null)
        handleErrorClient({ error })
      }
    })()
  }, [])

  return (
    <AppContext.Provider
      value={{
        user: user,
        setUser: setUser,
        isAuthenticated,
        handleLogin,
        handleLogout,
        messageError,
        setMessageError
      }}
    >
      {children}
      <Toaster />
    </AppContext.Provider>
  )
}
