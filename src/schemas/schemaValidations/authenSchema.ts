// * Libraries
import { z } from 'zod'

// * Regex
import { PASSWORD_REGEX } from '@/constants/regex'

// * Messages
const messEmail = 'The field must a email'
const messPassword =
  'The password must be at least 6 characters long and include uppercase letters, lowercase letters, numbers, and special characters'

// * Schema login
export const BodyLoginSchema = z.object({
  email: z.string().trim().nonempty({ message: 'Please enter your email' }).email({ message: messEmail }),
  password: z
    .string()
    .nonempty({ message: 'Please enter your password' })
    .min(6, { message: messPassword })
    .regex(PASSWORD_REGEX, { message: messPassword })
})

export type BodyLogin = z.infer<typeof BodyLoginSchema>

// * Schema Register
export const BodyRegisterSchema = BodyLoginSchema

export type BodyRegister = z.infer<typeof BodyRegisterSchema>
