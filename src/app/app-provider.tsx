'use client'
import { useLayoutEffect } from 'react'

// * Shadcn
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

// * Hooks
import { useAuthentication } from '@/lib/hooks/use-authentication'

// * Contexts
import SWRProvider from '@/lib/context/swr-provider'

// * Configs
import { envClient } from '@/configs/envClient'

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

  useLayoutEffect(() => {
    if (envClient.NEXT_ENV !== 'development') return
    const ignoreConsoleLog = ['[Fast Refresh]']
    // eslint-disable-next-line no-console
    const originalLog = console.log
    // eslint-disable-next-line no-console
    console.log = function (...args) {
      if (
        typeof args[0] === 'string' &&
        args[0].startsWith('🚀') &&
        !ignoreConsoleLog.some((item) => args[0].includes(item))
      ) {
        const formattedArgs = args.map((arg) => {
          if (typeof arg === 'object' && arg !== null) {
            try {
              return JSON.stringify(arg, null, 2) // format đẹp hơn với indent 2 khoảng trắng
            } catch {
              return String(arg)
            }
          }
          return String(arg)
        })

        // Hiển thị toast; bạn có thể tùy chỉnh giao diện theo nhu cầu
        toast.info(formattedArgs.join(' '), { richColors: true, id: args.join(' ') })
      }

      originalLog.apply(console, args)
    }
  }, [])

  return (
    <>
      <Toaster />
    </>
  )
}
