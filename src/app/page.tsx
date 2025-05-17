'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import handleErrorClient from '@/helpers/error/handleErrorClient'
import { actionTest } from '@/server/actions/actionTest'
import clientUserServices from '@/services/client/user'
import { useState } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const handleGetMe = async () => {
    setLoading(true)
    try {
      const data = await clientUserServices.getMe()
      // eslint-disable-next-line no-console
      console.log(data)
    } catch (error) {
      handleErrorClient({ error })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-start p-24'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-4'>Home</h1>
      <Button onClick={handleGetMe} disabled={loading}>
        clientUserServices
      </Button>
      <Separator className='my-4' />
      <Button onClick={async () => await actionTest()} disabled={loading}>
        NextUserServices
      </Button>
    </main>
  )
}
