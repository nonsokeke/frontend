"use client"

import { useGlobalState, type UserRole } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, UserCog } from "lucide-react"

export default function AuthToggle() {
  const { authState, setAuthState } = useGlobalState()

  const handleAuthChange = (newState: UserRole) => {
    setAuthState(newState)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <UserCog className="mr-2 h-4 w-4" />
          Auth State <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleAuthChange("none")}>
          Not Logged In {authState === "none" && "✓"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAuthChange("user")}>
          User Logged In {authState === "user" && "✓"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAuthChange("admin")}>
          Admin Logged In {authState === "admin" && "✓"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
