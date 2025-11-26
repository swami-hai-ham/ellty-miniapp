import { z } from "zod"

export const registerSchema = z.object({
  username: z.string().min(3).max(32),
  password: z.string().min(6).max(128)
})

export const loginSchema = z.object({
  username: z.string(),
  password: z.string()
})
