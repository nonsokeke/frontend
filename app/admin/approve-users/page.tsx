"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useGlobalState } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GraduationCap, Briefcase, CheckCircle, X } from "lucide-react"

export default function ApproveUsersPage() {
  const { authState, users, pendingUsers, fetchPendingUsers, approveUser, rejectUser } = useGlobalState()
  const router = useRouter()

  useEffect(() => {
    fetchPendingUsers()
  }, [])


  useEffect(() => {
    // Redirect if not admin
    if (authState !== "admin") {
      router.push("/")
    }
  }, [authState, router])

  if (authState !== "admin") {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
        <p className="text-muted-foreground">You need admin privileges to access this page.</p>
      </div>
    )
  }

  const handleApprove = async (id: string) => {
    await approveUser(id)
  }

  const handleReject = async (id: string) => {
    await rejectUser(id)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Approve Users</h1>
          <p className="text-muted-foreground">Review and approve pending user registrations</p>
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="pending">Pending ({pendingUsers.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          {pendingUsers.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {pendingUsers.map((user) => (
                <Card key={user._id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{user.first_name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl">{user.first_name} {user.last_name}</CardTitle>
                        <CardDescription>@{user.user_name}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="mb-4">{user.email}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{user.major}</span>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{user.company} - {user.role}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" size="sm" onClick={() => handleReject(user._id)}>
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button size="sm" onClick={() => handleApprove(user._id)}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">No pending users</h2>
              <p className="text-muted-foreground">All user registrations have been reviewed</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="approved">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Approved Users</h2>
            <p className="text-muted-foreground">{users.filter((u) => u.approved).length} users have been approved</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
