import Http from './http'
// import { z } from 'zod'

// * Standard Interceptors
import applyCommonInterceptors from '@/utils/http/commonInterceptors'

const clientToServer = new Http({ baseUrl: process.env.NEXT_PUBLIC_API_SERVER, credentials: 'include' })

applyCommonInterceptors(clientToServer)

// export class HttpError extends Error {
//   status: number
//   payload: {
//     message: string
//     [key: string]: any
//   }
//   constructor({ status, payload }: { status: number; payload: any }) {
//     super('Http Error')
//     this.status = status
//     this.payload = payload
//   }
// }

// // 400 Invalid
// const payloadError400Schema = z.object({
//   status: z.literal('Error'),
//   message: z.literal('Unauthorized'),
//   typeError: z.literal('UNAUTHORIZED'),
//   data: z.null()
// })

// type PayloadError400 = z.infer<typeof payloadError400Schema>

// class Error400 extends HttpError {
//   status = 400
//   payload: PayloadError400
//   constructor(payload: PayloadError400) {
//     super({ status: 400, payload })
//     this.payload = payload
//   }
// }

// clientToServer.errorInterceptor((response: Response) => {
//   if (response.status === 400) {
//     const payload = payloadError400Schema.parse(response)
//     throw new Error400(payload)
//   }
// })

// // 401 Unauthorized

// const payloadError401Schema = z.object({
//   message: z.string()
// })

// type PayloadError401 = z.infer<typeof payloadError401Schema>

// export class Error401 extends HttpError {
//   status = 401
//   payload: PayloadError401
//   constructor(payload: PayloadError401) {
//     super({ status: 401, payload })
//     this.payload = payload
//   }
// }

export default clientToServer
