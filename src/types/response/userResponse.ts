import { AccountType, Gender } from '@/enums/enumUser'

export interface User {
  id: string
  name: string
  email: string
  dateOfBirth: Date
  avatar: string
  username: string
  createdAt: Date
  updatedAt: Date
  phone: string
  gender?: Gender.Other | Gender.Male | Gender.Female
  address: string
  accountType: AccountType.Email | AccountType.Google | AccountType.Facebook
  likedProducts: string[]
  viewedProducts: string[]
}

export type GetMeResponse = Pick<User, 'username'>
