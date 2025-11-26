import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { Request, Response } from 'express'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export async function getRoots(req: Request, res: Response) {
  const order =
    req.query.order === "created_at"
      ? { createdAt: "desc" as const }
      : undefined
  const roots = await prisma.post.findMany({
    where: { parentId: null },
    orderBy: order,
    select: {
      id: true,
      parentId: true,
      value: true,
      operation: true,
      operand: true,
      authorId: true,
      createdAt: true
    }
  })
  res.json(roots.map((x: any) => ({
    id: x.id,
    parentId: x.parentId,
    computedValue: x.value,
    operation: x.operation,
    rightOperand: x.operand,
    authorId: x.authorId,
    createdAt: x.createdAt
  })))
}

export async function getChildren(req: Request, res: Response) {
  const parentId = Number(req.params.id)
  if (isNaN(parentId))
    return res.status(400).json({ success: false, message: "Invalid parent id" })
  const children = await prisma.post.findMany({
    where: { parentId },
    select: {
      id: true,
      parentId: true,
      value: true,
      operation: true,
      operand: true,
      authorId: true,
      createdAt: true
    }
  })
  res.json(children.map((x: any) => ({
    id: x.id,
    parentId: x.parentId,
    computedValue: x.value,
    operation: x.operation,
    rightOperand: x.operand,
    authorId: x.authorId,
    createdAt: x.createdAt
  })))
}

export async function createRootNode(req: Request, res: Response) {
  const userId = (res.locals as any).id
  const data = req.body
  const node = await prisma.post.create({
    data: {
      authorId: userId,
      value: data.startingNumber,
      operation: null,
      operand: null,
      parentId: null
    }
  })
  return res.status(201).json({
    id: node.id,
    parentId: node.parentId,
    computedValue: node.value,
    operation: node.operation,
    rightOperand: node.operand,
    authorId: node.authorId,
    createdAt: node.createdAt
  })
}

export async function createReplyNode(req: Request, res: Response) {
  const userId = (res.locals as any).id
  const data = req.body
  const parent = await prisma.post.findUnique({ where: { id: data.parentId } })
  if (!parent) return res.status(404).json({ success: false, message: "Parent not found" })

  // Check for scientific notation in rightOperand
  if (
    (typeof data.rightOperand === "string" && /e/i.test(data.rightOperand)) ||
    String(data.rightOperand).includes("e") ||
    String(data.rightOperand).includes("E")
  ) {
    return res.status(400).json({ success: false, message: "Scientific notation not allowed" })
  }

  let val = parent.value
  if (data.operation === "add") val += data.rightOperand
  else if (data.operation === "sub") val -= data.rightOperand
  else if (data.operation === "mul") val *= data.rightOperand
  else if (data.operation === "div") val /= data.rightOperand

  // Check for scientific notation in result
  if (
    String(val).includes("e") ||
    String(val).includes("E")
  ) {
    return res.status(400).json({ success: false, message: "Scientific notation not allowed" })
  }

  // Range checks
  const MIN_ALLOWED = -1e10
  const MAX_ALLOWED = 1e10
  if (!isFinite(val)) return res.status(400).json({ success: false, message: "Result must be finite" })
  if (val < MIN_ALLOWED) return res.status(400).json({ success: false, message: "Result too small" })
  if (val > MAX_ALLOWED) return res.status(400).json({ success: false, message: "Result too big" })

  const node = await prisma.post.create({
    data: {
      authorId: userId,
      value: val,
      operation: data.operation,
      operand: data.rightOperand,
      parentId: data.parentId
    }
  })
  return res.status(201).json({
    id: node.id,
    parentId: node.parentId,
    computedValue: node.value,
    operation: node.operation,
    rightOperand: node.operand,
    authorId: node.authorId,
    createdAt: node.createdAt
  })
}
