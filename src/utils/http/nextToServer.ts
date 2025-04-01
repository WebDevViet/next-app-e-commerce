import Http from './http'

// * Standard Interceptors
import applyCommonInterceptors from '@/utils/http/commonInterceptors'

const nextToServer = new Http({ baseUrl: process.env.NEXT_PUBLIC_API_SERVER, credentials: 'include' })

applyCommonInterceptors(nextToServer)

export default nextToServer
