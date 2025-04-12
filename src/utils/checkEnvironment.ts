const isServer = () => {
  return typeof window === 'undefined'
}

const isClient = () => {
  return typeof window !== 'undefined'
}

export { isServer, isClient }
