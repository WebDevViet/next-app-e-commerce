import Http from './http'

// * Standard Interceptors
import applyCommonInterceptors from '@/utils/http/commonInterceptors'

const clientToServer = new Http({ baseUrl: process.env.NEXT_PUBLIC_API_SERVER, credentials: 'include' })

applyCommonInterceptors(clientToServer)

export default clientToServer
