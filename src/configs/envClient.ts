import z from 'zod'

const envClientSchema = z.object({
  NEXT_DEV: z
    .string()
    .optional()
    .transform((value) => value === 'development')
})

export const envClientParsed = envClientSchema.safeParse({
  NEXT_DEV: process.env.NEXT_PUBLIC_NEXT_DEV
})

if (envClientParsed.error) {
  throw new Error(`Environment variable error: ${envClientParsed.error.issues}`)
}

export const envClient = envClientParsed.data
