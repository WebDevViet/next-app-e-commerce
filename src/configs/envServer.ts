import z from 'zod'

const envServerSchema = z.object({
  API_SERVER: z.string().url(),
  ALLOWED_ORIGINS: z.string().regex(/^\[.*\]$/, 'Allowed origins format is invalid'),
  PATH_LOGOUT: z.string().regex(/^\/logout\/[a-f0-9]{64}$/, 'Path logout format is invalid'),
  API_KEY: z.string(),
  NEXT_ENV: z.string().optional(),
  NEXTJS_SERVER_KEY: z.string().regex(/^[a-f0-9]{64}$/, 'Nextjs server key format is invalid')
})

export const envServerParsed = envServerSchema.safeParse({
  API_SERVER: process.env.API_SERVER,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
  PATH_LOGOUT: process.env.PATH_LOGOUT,
  API_KEY: process.env.API_KEY,
  NEXTJS_SERVER_KEY: process.env.NEXTJS_SERVER_KEY,
  NEXT_ENV: process.env.NEXT_PUBLIC_NEXT_ENV
})

if (envServerParsed.error) {
  throw new Error(`Environment variable error: ${envServerParsed.error.issues}`)
}

export const envServer = envServerParsed.data
