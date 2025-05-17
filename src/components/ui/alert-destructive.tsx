// * React
import { useEffect } from 'react'

// * Shadcn
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

// * Store
import useAppStore from '@/stores'

interface Props {
  title?: string
  description?: string | null
  visible?: boolean
}

export function AlertDestructive({ title, description, visible = true }: Props) {
  const messageError = useAppStore.messageError.use()

  useEffect(() => {
    return () => {
      useAppStore.setMessageError('')
    }
  }, [])

  if (!messageError || !visible) return null

  return (
    <Alert variant='destructive'>
      <AlertCircle className='h-4 w-4' />
      <AlertTitle>{title ?? 'Error'}</AlertTitle>
      <AlertDescription>{description ?? messageError}</AlertDescription>
    </Alert>
  )
}
