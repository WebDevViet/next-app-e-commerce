export interface TResLogin {
  user: User
  access_token: string
  refresh_token: string
}

interface User {
  _id: string
  email: string
  password: string
  role: Role
  status: number
  likedProducts: any[]
  viewedProducts: any[]
  userType: number
  addresses: any[]
  createdAt: string
  updatedAt: string
  __v: number
}

interface Role {
  _id: string
  name: string
  permissions: string[]
}
