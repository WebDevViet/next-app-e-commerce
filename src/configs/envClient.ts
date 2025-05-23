import ms from 'ms'
import z from 'zod'

const envClientSchema = z.object({
  NEXT_ENV: z.string().optional(),
  ACCESS_TOKEN_EXPIRES_IN: z.string().transform((value) => {
    const parsedValue = ms(value as ms.StringValue)
    if (parsedValue === undefined) {
      throw new Error(`Invalid ACCESS_TOKEN_EXPIRES_IN value: ${value}`)
    }
    return parsedValue
  })
})

export const envClientParsed = envClientSchema.safeParse({
  NEXT_ENV: process.env.NEXT_PUBLIC_NEXT_ENV,
  ACCESS_TOKEN_EXPIRES_IN: process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRES_IN
})

if (envClientParsed.error) {
  throw new Error(`Environment variable error: ${envClientParsed.error.issues}`)
}

export const envClient = envClientParsed.data
