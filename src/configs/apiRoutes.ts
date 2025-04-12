export const API_ROUTES = {
  AUTH: {
    LOGIN: `auth/login`,
    REGISTER: `auth/register`,
    LOGOUT: `auth/logout`,
    REFRESH_TOKEN: `auth/refresh-token`
  },
  USERS: {
    ME: `users/me`
  }
} as const
