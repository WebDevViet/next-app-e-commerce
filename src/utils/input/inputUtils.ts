import { toast } from 'sonner'

export const handleCapsLock = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const { shiftKey, key } = e
  const isLetter = key.length === 1 && /[a-zA-Z]/.test(key)

  if (isLetter && !shiftKey && e.getModifierState('CapsLock')) {
    toast.warning('Caps Lock is on!', {
      richColors: true,
      id: 'caps-lock',
      duration: 5000
    })
  }
}
