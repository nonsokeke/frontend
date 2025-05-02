"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useGlobalState, type User } from "@/lib/store"
import ProfileView from "@/components/profile-view"

export default function UserProfilePage() {
  const { username } = useParams()
  const { authState, fetchUser } = useGlobalState()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authState === "none") {
      router.push("/login")
      return
    }

    const loadUser = async () => {
      setLoading(true)
      try {
        const userData = await fetchUser(username as string)
        setUser(userData)
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [authState, fetchUser, router, username])

  if (authState === "none") {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Please log in to view profiles</h1>
        <p className="text-muted-foreground">You need to be logged in to access this page.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Loading profile...</h1>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">User not found</h1>
        <p className="text-muted-foreground">The user you're looking for doesn't exist or has been removed.</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <ProfileView user={user} isCurrentUser={false} />
    </div>
  )
}
