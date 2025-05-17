// * React

// * Hooks
import useAppStore from '@/stores'
import useSWR, { SWRConfiguration } from 'swr'

// * Http
import clientFetcher from '@/helpers/http/clientFetcher'

// * Config
import { API_ROUTES } from '@/constants/apiRoutes'
// import { envClient } from '@/configs/envClient'

// * Types
import { GetMeResponse } from '@/types/response/userResponse'

export const useUser = (optionsSWR?: SWRConfiguration) => {
  const authStatus = useAppStore.authStatus.use()

  const key = ['loggingIn', 'loggedIn'].includes(authStatus) ? API_ROUTES.users.me : null

  const { data, error, isLoading, isValidating } = useSWR(key, clientFetcher.get<GetMeResponse>, {
    // refreshInterval: envClient.ACCESS_TOKEN_EXPIRES_IN,
    ...optionsSWR
  })

  return {
    user: data?.payload.data,
    isValidating,
    isLoading,
    error
  }
}
