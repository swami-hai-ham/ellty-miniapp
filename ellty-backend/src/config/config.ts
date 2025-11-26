import dotenv from 'dotenv'
dotenv.config()
export const env = {
    DATABASE_URL: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET
}