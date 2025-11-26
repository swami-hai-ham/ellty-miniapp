import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import api from "@/utils/api"
import { Link } from "react-router-dom"

export default function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const handleRegister = async () => {
    setLoading(true)
    setError(null)
    try {
      await api.post("/auth/register", { username, password })
      window.location.href = "/login"
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Error")
    }
    setLoading(false)
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-card">
        <h1 className="text-2xl font-semibold mb-6 text-card-foreground text-center">Sign Up</h1>
        <div className="flex flex-col gap-4">
          <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <Button onClick={handleRegister} disabled={loading} className="w-full mt-4">Register</Button>
          <Link to="/login" className="text-primary text-center mt-3 hover:underline">Already have an account? Login</Link>
          {error && <div className="text-red-500 text-center mt-2">{error}</div>}
        </div>
      </div>
    </div>
  )
}
