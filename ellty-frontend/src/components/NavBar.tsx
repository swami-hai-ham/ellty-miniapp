import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Props = {
  username: string
  onLogout: () => void
}

export default function Navbar({ username, onLogout }: Props) {
  return (
    <nav className="w-full flex items-center justify-between bg-card p-4 shadow">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>{username[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="font-medium text-card-foreground">{username}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </nav>
  )
}
