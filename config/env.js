import dotenv from 'dotenv'

dotenv.config()

export const MONGO_URI = process.env.MONGO_URI
export const JWT_SECRET = process.env.JWT_SECRET
export const PORT = process.env.PORT || 5000

if (!MONGO_URI || !JWT_SECRET) {
  console.error('Missing required environment variables (MONGO_URI or JWT_SECRET)')
  process.exit(1)
}