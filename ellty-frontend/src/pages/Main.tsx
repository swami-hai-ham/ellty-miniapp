import DiscussionList from "@/components/DiscussionList"
import Navbar from "@/components/NavBar"
import { useState } from "react"

export default function Main() {
  const [username] = useState(() => localStorage.getItem("username"))
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    window.location.href = "/login"
  }
  return (
    <div className="min-h-screen bg-background">
      {username && <Navbar username={username} onLogout={handleLogout} />}
      <div className="p-12 flex justify-center items-center text-xl text-card-foreground">
        <DiscussionList />
      </div>
    </div>
  )
}
