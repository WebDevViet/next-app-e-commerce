// * Next
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  hasTitle?: boolean
}

const logo = {
  url: '/',
  src: '/vercel.svg',
  alt: 'logo',
  title: 'Vercel'
} as const

const Logo = ({ hasTitle = true }: Props) => {
  return (
    <Link href={logo.url} className='flex items-center gap-2'>
      <Image width={32} height={32} src={logo.src} className='dark:filter-none filter invert w-8 h-8' alt={logo.alt} />
      {hasTitle && <span className='text-lg font-semibold tracking-tighter'>{logo.title}</span>}
    </Link>
  )
}

export default Logo
