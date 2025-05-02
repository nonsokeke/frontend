"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useGlobalState } from "@/lib/store"
import ProfileView from "@/components/profile-view"

export default function ProfilePage() {
  const { authState, currentUser } = useGlobalState()
  const router = useRouter()

  useEffect(() => {
    if (authState === "none") {
      router.push("/login")
    }
  }, [authState, router])

  if (authState === "none") {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
        <p className="text-muted-foreground">You need to be logged in to access this page.</p>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Loading profile...</h1>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <ProfileView user={currentUser} isCurrentUser={true} />
    </div>
  )
}
