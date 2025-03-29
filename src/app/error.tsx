'use client'
import { Button } from '@/components/ui/button'

// Error boundaries must be Client Components

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    // global-error must include html and body tags
    <main className='flex flex-col items-center justify-center gap-y-3'>
      <h2 className='text-2xl'>Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </main>
  )
}
