// * Http
import clientFetcher from '@/helpers/http/clientFetcher'

// * Config
import { API_ROUTES } from '@/constants/apiRoutes'

// * Types
import type { BodyLogin, BodyRegister } from '@/schemas/schemaValidations/authenSchema'

const clientAuthServices = {
  login: (body: BodyLogin) => clientFetcher.post(API_ROUTES.auth.login, { body }),
  register: (body: BodyRegister) => clientFetcher.post(API_ROUTES.auth.register, { body })
}

export default clientAuthServices
