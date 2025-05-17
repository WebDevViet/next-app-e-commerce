// * Http
import serverFetcher from '@/helpers/http/serverFetcher'

// * Config
import { API_ROUTES } from '@/constants/apiRoutes'
import { GetMeResponse } from '@/types/response/userResponse'

// * Types
const nextAuthServices = {
  logout: () => serverFetcher.post(API_ROUTES.auth.logout),
  getMe: () => serverFetcher.get<GetMeResponse>(API_ROUTES.users.me)
}

export default nextAuthServices
