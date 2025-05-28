'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import handleErrorClient from '@/helpers/error/handleErrorClient'
import { actionTest } from '@/server/actions/actionTest'
import clientUserServices from '@/services/client/user'
import { useState, useTransition } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [isPending, startTransition] = useTransition()
  const getMeClient = async () => {
    setLoading(true)
    try {
      const data = await clientUserServices.getMe()
      // eslint-disable-next-line no-console
      console.log('🚀 ~ handleGetMe ~ data:', data)
    } catch (error) {
      handleErrorClient({ error })
    } finally {
      setLoading(false)
    }
  }

  const getMeServer = async () => {
    startTransition(async () => {
      try {
        const { payload, status } = await actionTest()
        if (payload.typeError !== null) {
          throw { payload, status }
        }
        // eslint-disable-next-line no-console
        console.log('🚀 ~ handleGetMe ~ data:', payload)
      } catch (error) {
        handleErrorClient({ error, isServerAction: true })
      }
    })
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-start p-24'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-4'>Home</h1>
      <Button onClick={getMeClient} disabled={loading}>
        Get Me on Client
      </Button>
      <Separator className='my-4' />
      <Button disabled={isPending} onClick={getMeServer}>
        Get Me on Server
      </Button>
    </main>
  )
}
