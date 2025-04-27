'use client'

// * Components
import { useAppContext } from '@/app/app-provider'

type Props = {
  forGuest?: boolean
  forUser?: boolean
  children?: React.ReactNode
}

const ProtectedView = ({ children, forGuest, forUser }: Props) => {
  const { isAuthenticated } = useAppContext()

  if (isAuthenticated === null) return null

  if (!forUser && !forGuest) return children

  if (forUser && isAuthenticated) return children

  if (forGuest && !isAuthenticated) return children

  return null
}

export default ProtectedView
