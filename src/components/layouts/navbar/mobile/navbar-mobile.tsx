// * Next
import Link from 'next/link'

// * Shadcn
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

// * Components
import { ButtonLang } from '@/components/layouts/navbar/button-lang'
import Logo from '@/components/layouts/navbar/logo'
import { ModeToggle } from '@/components/layouts/navbar/mode-toggle'
import { SubNavbarMenuLink } from '@/components/layouts/navbar/sub-navbar-menu-link'
import ProtectedView from '@/components/view-protected'

// * Types
import NavUserMobile from '@/components/layouts/navbar/mobile/nav-user-mobile'
import type { NavbarMenuItem, PropsNavbar } from '@/components/layouts/navbar/navbar'

const NavbarMobile = ({ menu, auth }: PropsNavbar) => {
  return (
    <div className='block md:hidden'>
      <div className='flex items-center justify-between'>
        <Logo />
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
              <Accordion type='single' collapsible className='flex w-full flex-col gap-4'>
                {menu.map((item) => renderMobileMenuItem(item))}
              </Accordion>

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
      </div>
    </div>
  )
}

const renderMobileMenuItem = (item: NavbarMenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className='border-b-0'>
        <AccordionTrigger className='text-md py-0 font-semibold hover:no-underline'>{item.title}</AccordionTrigger>
        <AccordionContent className='mt-2'>
          {item.items.map((subItem) => (
            <SheetClose asChild key={subItem.title}>
              <SubNavbarMenuLink item={subItem} />
            </SheetClose>
          ))}
        </AccordionContent>
      </AccordionItem>
    )
  }

  return (
    <Link key={item.title} href={item.url} className='text-md font-semibold'>
      {item.title}
    </Link>
  )
}

export { NavbarMobile }
