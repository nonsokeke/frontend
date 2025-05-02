"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useGlobalState } from "@/lib/store"
import type { User } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, UserIcon, Briefcase, UserCog, LogIn, UserPlus, CheckCircle } from "lucide-react"
import AuthToggle from "./auth-toggle"
import Image from "next/image"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { authState, user, setAuthState, setUser, setAccessToken } = useGlobalState()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleLogout = () => {
    setAuthState("none")
    setUser(null)
    setAccessToken(null)
    localStorage.clear()
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto max-w-[1300px] flex h-20 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/images/logo.png" className="h-14 w-auto" alt="Stetson Logo" width={200} height={100} />
          </Link>
          <nav className="hidden md:flex gap-6">
            {authState !== "none" && (
              <>
                <Link
                  href="/users"
                  className={`text-sm font-medium transition-colors hover:bg-muted px-4 py-2 rounded-lg ${isActive("/users") ? "bg-[#0C5640] hover:bg-[#0C5640] text-white px-4 py-2 rounded-lg" : "text-muted-foreground"
                    }`}
                >
                  Users
                </Link>
                <Link
                  href="/opportunities"
                  className={`text-sm font-medium transition-colors hover:bg-muted px-4 py-2 rounded-lg ${isActive("/opportunities") ? "bg-[#0C5640] hover:bg-[#0C5640] text-white px-4 py-2 rounded-lg" : "text-muted-foreground"
                    }`}
                >
                  Opportunities
                </Link>
                <Link
                  href="/profile"
                  className={`text-sm font-medium transition-colors hover:bg-muted px-4 py-2 rounded-lg ${isActive("/profile") ? "bg-[#0C5640] hover:bg-[#0C5640] text-white px-4 py-2 rounded-lg" : "text-muted-foreground"
                    }`}
                >
                  Profile
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">

          {authState === "none" ? (
            <div className="hidden md:flex gap-2">
              <Button className="border-[#46923D] text-[#46923D] hover:bg-[#46923D] hover:text-white" variant="outline" asChild>
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button className="bg-[#0C5640] text-white hover:bg-[#11362b]" asChild>
                <Link href="/signup">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {authState === "admin" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Admin Panel
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/admin/approve-opportunities">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve Posted Opportunity
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/approve-users">
                        <UserCog className="mr-2 h-4 w-4" />
                        Approve New User
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-[#46923D] text-white font-bold">
                          {user.first_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[200px]" align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <UserIcon className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/opportunities">
                        <Briefcase className="mr-2 h-4 w-4" />
                        Opportunities
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogIn className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4">
          <nav className="flex flex-col space-y-4">
            {authState !== "none" ? (
              <>
                <Link
                  href="/users"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Users
                </Link>
                <Link
                  href="/opportunities"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Opportunities
                </Link>
                <Link
                  href="/profile"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                {authState === "admin" && (
                  <>
                    <div className="font-medium text-sm">Admin Panel</div>
                    <Link
                      href="/admin/approve-opportunities"
                      className="text-sm font-medium pl-4 transition-colors hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Approve Posted Opportunity
                    </Link>
                    <Link
                      href="/admin/approve-users"
                      className="text-sm font-medium pl-4 transition-colors hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Approve New User
                    </Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
