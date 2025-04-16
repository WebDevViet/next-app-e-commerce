import { ButtonLoading } from '@/components/common/buttons/button-loading'
import Show from '@/components/show'

import { UseFormReturn } from 'react-hook-form'

type Props = {
  form: UseFormReturn<any>
  children: React.ReactNode
}

const ButtonSubmitting = ({ form, children }: Props) => {
  return (
    <Show>
      <Show.When isTrue={form.formState.isSubmitting}>
        <ButtonLoading />
      </Show.When>
      <Show.Else>{children}</Show.Else>
    </Show>
  )
}

export default ButtonSubmitting
