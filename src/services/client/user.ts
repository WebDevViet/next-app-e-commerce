// * Http
import clientToServer from '@/helpers/http/clientToServer'

// * Config
import { API_ROUTES } from '@/configs/apiRoutes'

// * Types
import { GetMeResponse } from '@/types/response/userResponse'

const clientUserServices = {
  getMe: () => clientToServer.get<GetMeResponse>(API_ROUTES.USERS.ME)
}

export default clientUserServices
