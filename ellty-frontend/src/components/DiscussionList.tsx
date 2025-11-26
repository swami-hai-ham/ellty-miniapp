import { useEffect, useState } from "react"
import api from "@/utils/api"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { CommentNode, type NodeData } from "./CommentNode"


export default function DiscussionList() {
  const [roots, setRoots] = useState<NodeData[]>([])
  const [newValue, setNewValue] = useState("")
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const token = localStorage.getItem("token")
  const isAuthenticated = !!token

  useEffect(() => {
    api.get("/roots").then(r => setRoots(r.data))
  }, [])

  const handleCreateRoot = async () => {
    setCreating(true)
    try {
      await api.post(
        "/nodes/root",
        { startingNumber: Number(newValue) }
      )
      setNewValue("")
      const updated = await api.get("/roots")
      setRoots(updated.data)
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
    setCreating(false)
  }

  return (
    <div className="flex flex-col gap-6 w-1/2">
      {isAuthenticated && (
        <Card className="p-4 flex items-center gap-3">
          <Input
            value={newValue}
            type="number"
            placeholder="Start a new discussion number"
            onChange={e => setNewValue(e.target.value)}
            className="max-w-xs"
          />
          <Button
            disabled={creating || !newValue}
            onClick={handleCreateRoot}
          >Create</Button>
          {error && <span className="text-red-500 ml-2">{error}</span>}
        </Card>
      )}
      <div className="flex flex-col gap-4">
        {roots.map(node => (
          <CommentNode key={node.id} node={node} isAuthenticated={isAuthenticated} />
        ))}
      </div>
    </div>
  )
}
