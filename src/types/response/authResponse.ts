type AuthToken = {
  value: string
  httpOnly: boolean
  secure: boolean
  sameSite: string
  expires: Date
}

export type AuthTokenResponse = {
  accessToken: AuthToken
  refreshToken: AuthToken
}
