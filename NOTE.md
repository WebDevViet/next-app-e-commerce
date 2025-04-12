# Naming Conventions

## HTTP

```ts
type GetUserResponse = {}
```

## React

### Props

```ts
interface Props {
  isTrue?: boolean
}

interface ChildProps {
  isTrue?: boolean
}

export interface ButtonProps
```

### Data

```ts
interface MenuItem {
  title: string
  description?: string
}
```

## Schema

```ts
export interface User {
  id: string
  name: string
  email: string
}
```

## Parameters

```ts
interface ConstructorHttp {
  baseUrl?: string
  credentials?: RequestCredentials
}
```
