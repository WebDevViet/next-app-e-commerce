// * Http
import clientFetcher from '@/helpers/http/clientFetcher'

// * Config
import { API_ROUTES } from '@/constants/apiRoutes'

// * Types
import { GetMeResponse } from '@/types/response/userResponse'

const clientUserServices = {
  getMe: () => clientFetcher.get<GetMeResponse>(API_ROUTES.users.me)
}

export default clientUserServices
