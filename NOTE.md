# Naming Conventions

## HTTP

```ts
type GetUserResponse = {}
```

_headers_

```http
Content-Type: application/json
Authorization: Bearer <token>
X-API-Key: abc123
```

_cookie_

```http
Set-Cookie: session_id=abc123; Path=/; HttpOnly; Secure
Set-Cookie: user_pref=dark_mode; Max-Age=3600; SameSite=Strict
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
