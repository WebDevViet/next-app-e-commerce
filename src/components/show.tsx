import { Children, isValidElement } from 'react'

interface ChildProps {
  isTrue?: boolean
}

const Show = ({ children }: { children: React.ReactNode }) => {
  let when: React.ReactNode | undefined, otherwise: React.ReactNode | undefined

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return
    const props = child.props as ChildProps
    if (props.isTrue === void 0) {
      otherwise = child
    } else if (!when && props.isTrue === true) {
      when = child
    }
  })

  return when || otherwise
}

export default Show

Show.When = ({ isTrue, children }: { isTrue: boolean; children: React.ReactNode }): React.ReactNode =>
  isTrue && children
Show.Else = ({ render, children }: { render?: React.ReactNode; children?: React.ReactNode }): React.ReactNode =>
  render || children

{
  /* <Show.When isTrue={status === 'pending'}>
       <p>Loading...</p>
    </Show.When>

<Show.When isTrue={status === 'failed'}>
    <p> <strong>{error}</strong></p>
</Show.When>

<Show.Else>
  <ul>
    {todoList?.map((todo) => (
      <li key={todo.id}>{todo.title}</li>
    ))}
  </ul>
</Show.Else> */
}

// Show When
//  <Show.When isTrue={true}><Component/></Show.When> => return children
//  <Show.When isTrue={false}><Component/></Show.When> => return false

// Show Else
// TH1: <Show.Else><Component/></Show.Else>
// TH2: <Show.Else render={<Component/>}/></Show.Else>
