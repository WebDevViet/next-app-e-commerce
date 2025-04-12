type CamelCase<S extends string> = S extends `${infer T}_${infer U}` ? `${T}${Capitalize<CamelCase<U>>}` : S

export type ToCamelCase<T> = {
  [K in keyof T as K extends string ? CamelCase<K> : K]: T[K]
}

type SnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${SnakeCase<U>}`
  : S

export type ToSnakeCase<T> = {
  [K in keyof T as K extends string ? SnakeCase<K> : K]: T[K]
}
