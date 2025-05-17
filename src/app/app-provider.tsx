'use client'

// * Shadcn
import { Toaster } from '@/components/ui/sonner'

// * Hooks
import { useAuthentication } from '@/lib/hooks/use-authentication'

// * Contexts
import SWRProvider from '@/lib/context/swr-provider'

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRProvider>
      {children}
      <InitApp />
    </SWRProvider>
  )
}

function InitApp() {
  useAuthentication()

  return (
    <>
      <Toaster />
    </>
  )
}
