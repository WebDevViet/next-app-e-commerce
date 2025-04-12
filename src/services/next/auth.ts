// * Http
import nextToServer from '@/helpers/http/nextToServer'

// * Config
import { API_ROUTES } from '@/configs/apiRoutes'

// * Types
const nextAuthServices = {
  logout: () => nextToServer.post(API_ROUTES.AUTH.LOGOUT)
}

export default nextAuthServices
