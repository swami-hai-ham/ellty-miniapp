import DiscussionList from "@/components/DiscussionList"
import Navbar from "@/components/NavBar"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Main() {
  const [username] = useState(() => localStorage.getItem("username"))

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    window.location.href = "/login"
  }

  const handleLogin = () => {
    window.location.href = "/login"
  }

  return (
    <div className="min-h-screen bg-background">
      {username ? (
        <Navbar username={username} onLogout={handleLogout} />
      ) : (
        <nav className="w-full flex items-center justify-between bg-card p-4 shadow">
          <div className="font-medium text-card-foreground">Welcome</div>
          <Button variant="default" onClick={handleLogin}>
            Login
          </Button>
        </nav>
      )}
      <div className="p-12 flex justify-center items-center text-xl text-card-foreground">
        <DiscussionList />
      </div>
    </div>
  )
}
