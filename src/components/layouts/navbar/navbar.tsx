// * Next
import Link from 'next/link'

// * Shadcn
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import { Book, Sunset, Trees, Zap } from 'lucide-react'

// * Components
import { ButtonLang } from '@/components/layouts/navbar/button-lang'
import Logo from '@/components/layouts/navbar/logo'
import { ModeToggle } from '@/components/layouts/navbar/mode-toggle'
import NavUser from '@/components/layouts/navbar/nav-user'
import { NavbarMobile } from '@/components/layouts/navbar/mobile/navbar-mobile'
import { SubNavbarMenuLink } from '@/components/layouts/navbar/sub-navbar-menu-link'
import ProtectedView from '@/components/view-protected'
import { ActionsNavbarTablet } from '@/components/layouts/navbar/tablet/actions-navbar-tablet'

export interface NavbarMenuItem {
  title: string
  url: string
  description?: string
  icon?: React.ReactNode
  items?: NavbarMenuItem[]
}

export interface PropsNavbar {
  menu: NavbarMenuItem[]
  auth: {
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

const menu = [
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

const auth = {
  login: { title: 'Login', url: '/login' },
  register: { title: 'Register', url: '/register' }
}

const Navbar = () => {
  return (
    <section className='py-4 px-6 border-b flex items-center justify-center sticky top-0 z-[50] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container'>
        {/* Desktop Menu */}
        <nav className='hidden justify-between xl:flex'>
          <div className='flex items-center min-w-[260px]'>
            <Logo />
          </div>

          {/* Menu */}
          <div className='flex items-center'>
            <NavigationMenu>
              <NavigationMenuList>{menu.map((item) => renderMenuItem(item))}</NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Actions */}
          <div className='flex items-center min-w-[260px] justify-end gap-2'>
            <ProtectedView>
              <ButtonLang />
              <ModeToggle />
              <ProtectedView forGuest>
                <Button asChild variant='outline'>
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button asChild>
                  <Link href={auth.register.url}>{auth.register.title}</Link>
                </Button>
              </ProtectedView>
              <ProtectedView forUser>
                <NavUser />
              </ProtectedView>
            </ProtectedView>
          </div>
        </nav>

        {/* Tablet Menu */}
        <nav className='hidden justify-between md:max-xl:flex'>
          <div className='flex items-center min-w-24'>
            <Logo />
          </div>

          {/* Menu */}
          <div className='flex items-center'>
            <NavigationMenu>
              <NavigationMenuList>{menu.map((item) => renderMenuItem(item))}</NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Actions */}
          <div className='flex items-center min-w-24 justify-end gap-2'>
            <ActionsNavbarTablet auth={auth} />
          </div>
        </nav>

        {/* Mobile Menu */}
        <NavbarMobile menu={menu} auth={auth} />
      </div>
    </section>
  )
}

const renderMenuItem = (item: NavbarMenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className='bg-popover text-popover-foreground'>
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className='w-80'>
              <SubNavbarMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        asChild
        className='group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground'
      >
        <Link href={item.url}>{item.title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

export { Navbar }
