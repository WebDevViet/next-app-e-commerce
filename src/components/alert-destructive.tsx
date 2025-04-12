import { AlertCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useAppContext } from '@/app/app-provider'
import { useEffect } from 'react'

interface Props {
  title?: string
  description?: string | null
  visible?: boolean
}

export function AlertDestructive({ title, description, visible = true }: Props) {
  const { messageError, setMessageError } = useAppContext()

  useEffect(() => {
    return () => {
      setMessageError(null)
    }
  }, [setMessageError])

  if (messageError === null || !visible) return null

  return (
    <Alert variant='destructive'>
      <AlertCircle className='h-4 w-4' />
      <AlertTitle>{title ?? 'Error'}</AlertTitle>
      <AlertDescription>{description ?? messageError}</AlertDescription>
    </Alert>
  )
}
