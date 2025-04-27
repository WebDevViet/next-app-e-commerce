// * Next
import Link from 'next/link'

// * Shadcn
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

// * Components
import { ButtonLang } from '@/components/layouts/navbar/button-lang'
import Logo from '@/components/layouts/navbar/logo'
import { ModeToggle } from '@/components/layouts/navbar/mode-toggle'
import ProtectedView from '@/components/view-protected'

// * Types
import NavUserMobile from '@/components/layouts/navbar/mobile/nav-user-mobile'
import type { PropsNavbar } from '@/components/layouts/navbar/navbar'

export const ActionsNavbarTablet = ({ auth }: Pick<PropsNavbar, 'auth'>) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon'>
          <Menu className='size-4' />
        </Button>
      </SheetTrigger>
      <SheetContent className='overflow-y-auto flex flex-col'>
        <SheetHeader>
          <SheetTitle className='px-4'>
            <Logo hasTitle={false} />
          </SheetTitle>
        </SheetHeader>
        <div className='flex flex-col gap-6 p-4 flex-grow'>
          {/* Actions */}
          <section className='flex flex-col gap-2'>
            <ModeToggle />
            <ButtonLang />
            <ProtectedView forGuest>
              <SheetClose asChild>
                <Button asChild variant='outline'>
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild>
                  <Link href={auth.register.url}>{auth.register.title}</Link>
                </Button>
              </SheetClose>
            </ProtectedView>
          </section>
        </div>
        <div className='p-4'>
          <ProtectedView forUser>
            <NavUserMobile />
          </ProtectedView>
        </div>
      </SheetContent>
    </Sheet>
  )
}
