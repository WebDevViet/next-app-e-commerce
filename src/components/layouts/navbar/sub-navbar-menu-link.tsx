// * Next
import Link from 'next/link'

// * Shadcn
import { SheetClose } from '@/components/ui/sheet'

// * Components
import { NavbarMenuItem } from '@/components/layouts/navbar/navbar'

export const SubNavbarMenuLink = ({ item }: { item: NavbarMenuItem }) => {
  return (
    <SheetClose asChild>
      <Link
        className='flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground'
        href={item.url}
      >
        <div className='text-foreground'>{item.icon}</div>
        <div>
          <div className='text-sm font-semibold'>{item.title}</div>
          {item.description && <p className='text-sm leading-snug text-muted-foreground'>{item.description}</p>}
        </div>
      </Link>
    </SheetClose>
  )
}
