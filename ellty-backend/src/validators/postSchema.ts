import { z } from "zod"

export const createRootSchema = z.object({
  startingNumber: z
    .number()
    .finite("Number must be finite")
    .min(-1e10, "Number too small")
    .max(1e10, "Number too big")
})

export const createReplySchema = z.object({
  parentId: z
    .number()
    .int("Parent ID must be an integer")
    .positive("Parent ID must be positive"),
  operation: z.enum(["add", "sub", "mul", "div"], "Invalid operation"),
  rightOperand: z
    .number()
    .finite("Operand must be finite")
    .min(-1e10, "Operand too small")
    .max(1e10, "Operand too big")
})
