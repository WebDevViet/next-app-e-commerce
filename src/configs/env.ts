import z from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_SERVER: z.string().url(),
  NEXT_PUBLIC_API_NEXT: z.string().url()
})

export const envProject = envSchema.safeParse({
  NEXT_PUBLIC_API_SERVER: process.env.NEXT_PUBLIC_API_SERVER,
  NEXT_PUBLIC_API_NEXT: process.env.NEXT_PUBLIC_API_NEXT
})

if (envProject.error) {
  throw new Error(`Environment variable error: ${envProject.error.issues}`)
}

export const env = envProject.data
