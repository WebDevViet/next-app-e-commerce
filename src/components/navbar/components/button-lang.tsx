'use client'

import { Languages } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export function ButtonLang() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='default'>
          <Languages className='absolute h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>Langues</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>Tiếng Việt</DropdownMenuItem>
        <DropdownMenuItem>English</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
