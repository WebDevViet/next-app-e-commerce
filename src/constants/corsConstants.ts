import { envServer } from '@/configs/envServer'

export const allowedOrigins: string[] = JSON.parse(envServer.ALLOWED_ORIGINS || "['http://localhost:3000']")

export const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}
