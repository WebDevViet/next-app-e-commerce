import { z } from 'zod'

export const cookieSchema = z.object({
  expires: z.coerce.date(),
  httpOnly: z.boolean(),
  secure: z.boolean(),
  sameSite: z
    .union([z.literal('lax'), z.literal('none'), z.literal('strict'), z.undefined(), z.boolean()])
    .default('strict')
})
