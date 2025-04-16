// * Http
import nextToServer from '@/helpers/http/nextToServer'

// * Config
import { API_ROUTES } from '@/constants/apiRoutes'

// * Types
const nextAuthServices = {
  logout: () => nextToServer.post(API_ROUTES.auth.logout)
}

export default nextAuthServices
