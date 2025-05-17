'use client'

// * Next React
import NavUserContent from '@/components/layouts/navbar/nav-user-content'

// * Shadcn
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

// * Components
import { User } from 'lucide-react'

// * swr
import { useUser } from '@/lib/hooks/use-user'

const NavUser = () => {
  const { user } = useUser()

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
