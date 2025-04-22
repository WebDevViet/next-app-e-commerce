'use client'

// * Next React
import { useAppContext } from '@/app/app-provider'
import NavUserContent from '@/components/layouts/navbar/nav-user-content'

// * Shadcn
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

// * Components
import { User } from 'lucide-react'

const NavUser = () => {
  const { user } = useAppContext()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='cursor-pointer justify-center items-center'>
          <AvatarImage src={user?.avatar} alt={user?.username} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <NavUserContent />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NavUser
