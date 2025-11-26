import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Card } from "@/components/ui/card"
import api from "@/utils/api"

export type NodeData = {
  id: number
  parentId: number | null
  computedValue: number
  operation: "add" | "sub" | "mul" | "div" | null
  rightOperand: number | null
  authorId: number
  createdAt: string
}

type Props = {
  node: NodeData
  depth?: number
  isAuthenticated: boolean
}

export function CommentNode({ node, depth = 0, isAuthenticated }: Props) {
  const [children, setChildren] = useState<NodeData[] | null>(null)
  const [showReplies, setShowReplies] = useState(false)
  const [showReplyBox, setShowReplyBox] = useState(false)
  const [operation, setOperation] = useState<"add" | "sub" | "mul" | "div">("add")
  const [rightOperand, setRightOperand] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (showReplies && children === null) {
      api.get(`/nodes/${node.id}/children`).then(r => setChildren(r.data))
    }
  }, [showReplies, children, node.id])

  const handleShowReplies = () => setShowReplies(v => !v)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await api.post("/nodes/reply", {
        parentId: node.id,
        operation,
        rightOperand: Number(rightOperand)
      })
      setShowReplyBox(false)
      setChildren(null)
      setShowReplies(true)
    } catch (e: any) {
      const errors =
        e?.response?.data?.error?.fieldErrors ||
        e?.response?.data?.error?.formErrors ||
        e?.response?.data?.message ||
        e?.message ||
        "Error"
      if (typeof errors === "string") {
        toast.error(errors)
      } else if (Array.isArray(errors)) {
        errors.forEach((msg: string) => toast.error(msg))
      } else if (typeof errors === "object") {
        Object.values(errors).flat().forEach((msg: any) => toast.error(msg))
      }
    }
    setLoading(false)
  }
  return (
    <Card className="ml-0" style={{ marginLeft: depth * 36 }}>
      <div className="p-4 flex flex-col gap-2">
        <div>
          <span className="ml-2">{node.computedValue}</span>
          {node.operation && (
            <span className="ml-2 text-muted-foreground">
              [{node.operation} {node.rightOperand}]
            </span>
          )}
          <span className="ml-2 text-xs text-muted-foreground">{new Date(node.createdAt).toLocaleString()}</span>
        </div>
        <div className="flex gap-2">
          {children !== null && children.length === 0 ? (
            <span className="text-muted-foreground text-sm">No more replies</span>
          ) : (
            <Button variant="ghost" size="sm" onClick={handleShowReplies}>
              {showReplies ? "Hide Replies" : "Show Replies"}
            </Button>
          )}
          {isAuthenticated && (
            <Button variant="ghost" size="sm" onClick={() => setShowReplyBox(x => !x)}>
              {showReplyBox ? "Cancel" : "Reply"}
            </Button>
          )}
        </div>
        {showReplyBox && isAuthenticated && (
          <div className="flex gap-2 mt-2">
            <select
              className="border rounded px-2 py-1 bg-input"
              value={operation}
              onChange={e => setOperation(e.target.value as "add" | "sub" | "mul" | "div")}
            >
              <option value="add">+</option>
              <option value="sub">-</option>
              <option value="mul">*</option>
              <option value="div">/</option>
            </select>
            <Input
              value={rightOperand}
              onChange={e => setRightOperand(e.target.value)}
              placeholder="Value"
              type="number"
            />
            <Button disabled={loading || !rightOperand} onClick={handleSubmit} size="sm">
              Send
            </Button>
          </div>
        )}
        {showReplies && children && children.length > 0 && (
          <div className="mt-2 flex flex-col gap-2">
            {children.map(child => (
              <CommentNode key={child.id} node={child} depth={depth + 1} isAuthenticated={isAuthenticated} />
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
