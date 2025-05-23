// type RecursiveObject<T> = {
//   [K in keyof T]: T[K] extends object ? RecursiveObject<T[K]> : T[K]
// }

// const addPrefix = <T extends object>(obj: T, prefix = ''): RecursiveObject<T> => {
//   return Object.fromEntries(
//     Object.entries(obj).map(([key, value]) => {
//       if (typeof value === 'object' && value !== null) {
//         return [key, addPrefix(value, key)]
//       } else {
//         return [key, prefix ? `${prefix}/${value}` : (value as string)]
//       }
//     })
//   )
// }

// const serverRoutes = {
//   auth: { login: `login`, register: `register`, logout: `logout`, refreshToken: `refresh-token` },
//   users: { me: `me` },
//   products: 'products'
// }

export const API_ROUTES = {
  auth: { login: 'auth/login', register: 'auth/register', logout: 'auth/logout', refreshToken: 'auth/refresh-token' },
  users: { me: 'users/me' },
  products: 'products'
}

// const arr = [['auth', ['login', 'register', 'logout', 'refresh-token']], ['users', ['me']], ['products']]

// const obj = {
//   auth: { login: 'auth/login', register: 'auth/register', logout: 'auth/logout', refreshToken: 'auth/refresh-token' },
//   users: { me: 'users/me' },
//   products: 'products'
// }
