import { camelCase } from 'change-case'

export const camelizeKeys = <T extends Record<string, any>>(obj: T, ignoreKeys?: string[]) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [ignoreKeys?.includes(key) ? key : camelCase(key), value])
  )

export const camelizeObj = <T extends Record<string, any>>(obj: T, ignoreKeys?: string[]) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [ignoreKeys?.includes(key) ? key : camelCase(key), camelCase(value)])
  )
