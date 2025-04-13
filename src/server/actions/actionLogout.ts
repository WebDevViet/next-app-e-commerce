/* eslint-disable no-console */
'use server'

// * Next React
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// * Services
import nextAuthServices from '@/services/next/auth'

export async function actionLogout() {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get('Authorization')?.value
  console.log('🚀 ~ accessToken:', accessToken)
  const refreshToken = cookieStore.get('refresh-token')?.value
  console.log('🚀 ~ refreshToken:', refreshToken)

  try {
    const result = await nextAuthServices.logout()
    return result
  } catch (e) {
    console.log('🚀 ~ actionLogout ~ e:', e)
  } finally {
    cookieStore.delete('Authorization')
    cookieStore.delete('refresh-token')
    redirect('/login')
  }
}
