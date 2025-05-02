"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useGlobalState } from "@/lib/store"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { authState } = useGlobalState()
  const router = useRouter()

  useEffect(() => {
    // Redirect if not admin
    if (authState !== "admin") {
      router.push("/")
    }
  }, [authState, router])

  return <>{children}</>
}
