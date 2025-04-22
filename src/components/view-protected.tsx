'use client'

// * Components
import { useAppContext } from '@/app/app-provider'

type Props = {
  forGuest?: boolean
  forUser?: boolean
  children?: React.ReactNode
}

const ProtectedView = ({ children, forGuest, forUser }: Props) => {
  const { isAuthenticated } = useAppContext()

  if (forUser && isAuthenticated) return children

  if (forGuest && !isAuthenticated) return children

  return null
}

export default ProtectedView

// const Show = ({ children }: { children: React.ReactNode }) => {
//   let when: React.ReactNode | undefined, otherwise: React.ReactNode | undefined

//   Children.forEach(children, (child) => {
//     if (!isValidElement(child)) return
//     const props = child.props as ChildProps
//     if (props.isTrue === void 0) {
//       otherwise = child
//     } else if (!when && props.isTrue === true) {
//       when = child
//     }
//   })

//   return when || otherwise
// }

// export default Show

// Show.When = ({ isTrue, children }: { isTrue: boolean; children: React.ReactNode }): React.ReactNode =>
//   isTrue && children
// Show.Else = ({ render, children }: { render?: React.ReactNode; children?: React.ReactNode }): React.ReactNode =>
//   render || children
