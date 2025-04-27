'use client'

import { Button } from '@/components/ui/button'
import handleErrorClient from '@/helpers/error/handleErrorClient'
import clientUserServices from '@/services/client/user'

export default function Home() {
  const handleGetMe = async () => {
    try {
      const data = await clientUserServices.getMe()
      // eslint-disable-next-line no-console
      console.log(data)
    } catch (error) {
      handleErrorClient({ error })
    }
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-start p-24'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-4'>Home</h1>
      <Button onClick={handleGetMe}>clientUserServices</Button>
    </main>
  )
}
