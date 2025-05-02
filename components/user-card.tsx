import Link from "next/link"
import type { User } from "@/lib/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageSquare, Linkedin } from "lucide-react"

interface UserCardProps {
  user: User
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader>
        <h3 className="font-semibold">{`${user.first_name} ${user.last_name}`}</h3>
        <p className="text-sm text-muted-foreground">{user.title} at {user.company}</p>
      </CardHeader>
      <CardContent className="p-0">
        <Link href={`/profile/${user.user_name}`} className="block">
          <div className="flex items-center p-4 gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-[#46923D] text-white font-bold">{user.first_name.charAt(0)}{user.last_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-medium">Major:</span> {user.major}
              </p>
              <p className="text-sm">
                <span className="font-medium">Graduated:</span> {user.year_graduated}
              </p>
              <a
                href={user.linkedin_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-600 hover:underline"
              >
                <Linkedin className="h-4 w-4 mr-1" />
                LinkedIn Profile
              </a>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}
