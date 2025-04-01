export const addJsonContentType = (options: RequestInit): RequestInit => {
  if (options.body instanceof FormData) return options

  options.headers = {
    ...options.headers,
    'Content-Type': 'application/json'
  }
  return options
}
