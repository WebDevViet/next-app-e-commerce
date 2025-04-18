// * Next
import Link from 'next/link'

// * Shadcn
import { Book, Menu, Sunset, Trees, Zap } from 'lucide-react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/common/menu/accordion'
import { Button } from '@/components/common/buttons/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/common/menu/navigation-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

// * Components
import { ModeToggle } from '@/components/layouts/navbar/mode-toggle'
import Logo from '@/components/layouts/navbar/logo'
import ButtonAuth from '@/components/layouts/navbar/button-auth'
import { ButtonLang } from '@/components/layouts/navbar/button-lang'

// * Libs

interface MenuItem {
  title: string
  url: string
  description?: string
  icon?: React.ReactNode
  items?: MenuItem[]
}

interface Props {
  logo?: {
    url: string
    src: string
    alt: string
    title: string
  }
  menu?: MenuItem[]
  auth?: {
    login: {
      title: string
      url: string
    }
    register: {
      title: string
      url: string
    }
  }
}

const Navbar = ({
  menu = [
    { title: 'Home', url: '/' },
    {
      title: 'Products',
      url: '#',
      items: [
        {
          title: 'Blog',
          description: 'The latest industry news, updates, and info',
          icon: <Book className='size-5 shrink-0' />,
          url: '#'
        },
        {
          title: 'Company',
          description: 'Our mission is to innovate and empower the world',
          icon: <Trees className='size-5 shrink-0' />,
          url: '#'
        },
        {
          title: 'Careers',
          description: 'Browse job listing and discover our workspace',
          icon: <Sunset className='size-5 shrink-0' />,
          url: '#'
        },
        {
          title: 'Support',
          description: 'Get in touch with our support team or visit our community forums',
          icon: <Zap className='size-5 shrink-0' />,
          url: '#'
        }
      ]
    },
    {
      title: 'Resources',
      url: '#',
      items: [
        {
          title: 'Help Center',
          description: 'Get all the answers you need right here',
          icon: <Zap className='size-5 shrink-0' />,
          url: '#'
        },
        {
          title: 'Contact Us',
          description: 'We are here to help you with any questions you have',
          icon: <Sunset className='size-5 shrink-0' />,
          url: '#'
        },
        {
          title: 'Status',
          description: 'Check the current status of our services and APIs',
          icon: <Trees className='size-5 shrink-0' />,
          url: '#'
        },
        {
          title: 'Terms of Service',
          description: 'Our terms and conditions for using our services',
          icon: <Book className='size-5 shrink-0' />,
          url: '#'
        }
      ]
    },
    {
      title: 'Pricing',
      url: '#'
    },
    {
      title: 'Blog',
      url: '#'
    }
  ]
}: Props) => {
  return (
    <section className='py-4 px-6 border-b flex items-center justify-center sticky top-0 z-[50] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container'>
        {/* Desktop Menu */}
        <nav className='hidden justify-between lg:flex'>
          <div className='flex items-center min-w-48'>
            <Logo />
          </div>

          {/* Menu */}
          <div className='flex items-center'>
            <NavigationMenu>
              <NavigationMenuList>{menu.map((item) => renderMenuItem(item))}</NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Actions */}
          <div className='flex gap-2 min-w-48 justify-end items-center'>
            <ButtonLang />
            <ModeToggle />
            <ButtonAuth btnProps={{}} />
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className='block lg:hidden'>
          <div className='flex items-center justify-between'>
            <Logo />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='outline' size='icon'>
                  <Menu className='size-4' />
                </Button>
              </SheetTrigger>
              <SheetContent className='overflow-y-auto'>
                <SheetHeader>
                  <SheetTitle className='px-4'>
                    <Logo hasTitle={false} />
                  </SheetTitle>
                </SheetHeader>
                <div className='flex flex-col gap-6 p-4 h-full'>
                  <Accordion type='single' collapsible className='flex w-full flex-col gap-4'>
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  {/* Actions */}
                  <div className='flex flex-col gap-3 flex-grow justify-between'>
                    <section className='flex flex-col gap-2'>
                      <ModeToggle />
                      <ButtonLang />
                      <ButtonAuth ignoreBtn='user' />
                    </section>
                    <section className='flex justify-end flex-col gap-2'>
                      <ButtonAuth ignoreBtn='auth' />
                    </section>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  )
}

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className='bg-popover text-popover-foreground'>
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className='w-80'>
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className='group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground'
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className='border-b-0'>
        <AccordionTrigger className='text-md py-0 font-semibold hover:no-underline'>{item.title}</AccordionTrigger>
        <AccordionContent className='mt-2'>
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
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

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className='flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground'
      href={item.url}
    >
      <div className='text-foreground'>{item.icon}</div>
      <div>
        <div className='text-sm font-semibold'>{item.title}</div>
        {item.description && <p className='text-sm leading-snug text-muted-foreground'>{item.description}</p>}
      </div>
    </a>
  )
}

export { Navbar }
