import z from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_SERVER: z.string().url(),
  NEXT_PUBLIC_API_NEXT: z.string().url(),
  PATH_LOGOUT: z.string().regex(/^\/logout\/[a-f0-9]{64}$/, 'Định dạng path logout không hợp lệ ')
})

export const envProject = envSchema.safeParse({
  NEXT_PUBLIC_API_SERVER: process.env.NEXT_PUBLIC_API_SERVER,
  NEXT_PUBLIC_API_NEXT: process.env.NEXT_PUBLIC_API_NEXT,
  PATH_LOGOUT: process.env.PATH_LOGOUT
})

if (envProject.error) {
  throw new Error(`Environment variable error: ${envProject.error.issues}`)
}

export const env = envProject.data
