import { Router } from "express"
import { getRoots, getChildren, createRootNode, createReplyNode } from "../controllers/post.controller.js"
import { validate } from "../middlewares/validate.js"
import { createRootSchema, createReplySchema } from '../validators/postSchema.js'
import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = Router()

router.get("/roots", getRoots)
router.get("/nodes/:id/children", getChildren)
router.post("/nodes/root", authMiddleware, validate(createRootSchema, "body"), createRootNode)
router.post("/nodes/reply", authMiddleware, validate(createReplySchema, "body"), createReplyNode)

export default router
