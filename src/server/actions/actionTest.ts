'use server'

// * Next React

// * Services
import nextAuthServices from '@/services/next/auth'

export async function actionTest() {
  try {
    const result = await nextAuthServices.getMe()
    // eslint-disable-next-line no-console
    console.log('🚀 ~ actionLogout ~ result:', result)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('🚀 ~ actionLogout ~ e:', e)
  }
}
