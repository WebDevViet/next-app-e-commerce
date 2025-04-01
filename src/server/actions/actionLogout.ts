'use server'

// * Next React
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// * Services
import authService from '@/services/auth'

export async function actionLogout() {
  const cookieStore = await cookies()

  try {
    await authService.logout()
  } catch {
  } finally {
    cookieStore.delete('refresh_token')
    redirect('/login')
  }
}
