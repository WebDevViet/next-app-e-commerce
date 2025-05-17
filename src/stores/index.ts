import { envClient } from '@/configs/envClient'
import { store } from '@davstack/store'
import { createJSONStorage } from 'zustand/middleware'

const useAppStore = store(
  {
    messageError: '',
    appMounted: false,
    authStatus: 'idle' as 'idle' | 'loggingIn' | 'loggedIn' | 'loggingOut'
  },
  {
    middlewares: [],
    name: 'app-store',
    devtools: {
      enabled: envClient.NEXT_DEV,
      serialize: true
    },
    persist: {
      enabled: true,
      storage: createJSONStorage(() => localStorage),
      version: 1
    }
  }
)
  .computed((/** store */) => ({
    // fullName: () => `${store.name.use()} Doe`
  }))
  .actions((store) => ({
    setMessageError: (messageError: string) => store.messageError.set(messageError),
    setAppMounted: (appMounted: boolean) => store.appMounted.set(appMounted),
    setAuthStatus: (authStatus: 'idle' | 'loggingIn' | 'loggedIn' | 'loggingOut') => store.authStatus.set(authStatus)
  }))

export default useAppStore
