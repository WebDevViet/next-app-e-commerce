'use server'

// * Next React
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// * Services
import nextAuthServices from '@/services/next/auth'
import { protectedPaths } from '@/configs/path'
import handleErrorServer from '@/helpers/error/handleErrorServer'

export async function actionLogout(pathname?: string, redirectPath?: string) {
  const cookieStore = await cookies()

  const authorization = cookieStore.get('Authorization')
  const refreshToken = cookieStore.get('refresh_token')

  const isRedirectLoginPage = protectedPaths.some((path) => pathname?.match(path))

  try {
    if (authorization?.value || refreshToken?.value) {
      await nextAuthServices.logout()
    }
  } catch (e) {
    handleErrorServer(e)
  } finally {
    cookieStore.delete('Authorization')
    cookieStore.delete('refresh_token')
    cookieStore.delete('logged_in')

    if (isRedirectLoginPage) redirect('/login')
    if (redirectPath) redirect(redirectPath)
  }
}
