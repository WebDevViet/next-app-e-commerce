'use client'

// * Next React
import { useAppContext } from '@/app/app-provider'
import NavUserContent from '@/components/layouts/navbar/nav-user-content'

// * Shadcn
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreVerticalIcon, User } from 'lucide-react'

// * Components

const NavUserMobile = () => {
  const { user } = useAppContext()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='lg' variant='ghost' className='flex w-full p-2 h-fit'>
          <Avatar className='h-8 w-8 rounded-lg'>
            <AvatarImage src={user?.avatar} alt={user?.username} />
            <AvatarFallback className='rounded-lg'>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-medium'>{user?.username}</span>
            <span className='truncate text-xs text-muted-foreground'>{user?.email}</span>
          </div>
          {/* <div className='grid flex-1 text-left text-sm leading-tight'>
            <Skeleton className='h-4 w-4/5' />
            <Skeleton className='h-4 w-3/5' />
          </div> */}
          <MoreVerticalIcon className='ml-auto size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
        side='bottom'
        align='end'
        sideOffset={4}
      >
        <NavUserContent />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NavUserMobile
