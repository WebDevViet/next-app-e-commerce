import Http from './http'

// * Standard Interceptors
import applyStandardInterceptor from '@/utils/http/standardInterceptor'

const clientToServer = new Http({ baseUrl: process.env.NEXT_PUBLIC_API_SERVER, credentials: 'include' })

applyStandardInterceptor(clientToServer)

export default clientToServer
