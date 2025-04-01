'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function actionDeleteSessionToken() {
  const cookieStore = await cookies()

  cookieStore.delete('sessionToken')
  redirect('/login')
}
