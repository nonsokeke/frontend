import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { GlobalProvider } from "@/lib/store"
import AuthToggle from "@/components/auth-toggle"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Stetson University Professional Network",
  description: "Connect with professionals and find opportunities",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 bg-muted">
              <div className="mx-auto max-w-[1300px]">
                {children}
                <Toaster />
              </div>

              {/* <div className="text-center py-5">
                <AuthToggle />
              </div> */}
            </main>
          </div>
        </GlobalProvider>
      </body>
    </html>
  )
}
