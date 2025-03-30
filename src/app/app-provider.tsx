'use client'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { TResLogin } from '@/types/response/authenResponse'

type User = TResLogin['user']

const AppContext = createContext<{
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
}>({
  user: null,
  setUser: () => {},
  isAuthenticated: false
})
export const useAppContext = () => {
  const context = useContext(AppContext)
  return context
}

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)
  const isAuthenticated = Boolean(user)

  const setUser = useCallback(
    (user: User | null) => {
      setUserState(user)
      localStorage.setItem('user', JSON.stringify(user))
    },
    [setUserState]
  )

  useEffect(() => {
    const user = localStorage.getItem('user')
    setUserState(user && JSON.parse(user))
  }, [setUserState])

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
