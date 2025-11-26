import bcrypt from "bcrypt"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { env } from "../config/config.js"
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export async function RegisterController(req: Request, res: Response) {
  const { username, password } = req.body
  const userExists = await prisma.user.findUnique({ where: { username } })
  if (userExists) return res.status(400).json({ success: false, message: "Username already taken" })
  const hash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({ data: { username, password: hash } })
  res.status(201).json({ success: true, user: { id: user.id, username: user.username } })
}

export async function LoginController(req:Request , res: Response) {
  const { username, password } = req.body
  const user = await prisma.user.findUnique({ where: { username } })
  if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" })
  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(401).json({ success: false, message: "Invalid credentials" })
  const token = jwt.sign({ id: user.id, username: user.username }, env.JWT_SECRET!, { expiresIn: "1d" })
  res.json({ success: true, token })
}
