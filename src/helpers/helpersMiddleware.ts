import { allowedOrigins } from '@/constants/corsConstants'
import { NextRequest } from 'next/server'

export const isValidOrigin = (request: NextRequest) => allowedOrigins.includes(request.headers.get('origin') || '')
