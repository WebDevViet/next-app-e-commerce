'use server'

// * Next React
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// * Services
import nextAuthServices from '@/services/next/auth'

export async function actionLogout() {
  const cookieStore = await cookies()
  try {
    await nextAuthServices.logout()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('🚀 ~ actionLogout ~ e:', e)
  } finally {
    cookieStore.delete('Authorization')
    cookieStore.delete('refresh-token')

    redirect('/login')
  }
}
