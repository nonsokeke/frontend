"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useGlobalState, type Opportunity } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, DollarSign, Calendar, Building, Briefcase, ArrowRight } from "lucide-react"
import Link from "next/link"
import { formatDate } from "@/lib/utils"

export default function OpportunityDetailPage() {
  const { id } = useParams()
  const { authState, fetchOpportunity } = useGlobalState()
  const router = useRouter()
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authState === "none") {
      router.push("/login")
      return
    }

  }, [authState, fetchOpportunity, id, router])

  useEffect(() => {

    const loadOpportunity = async () => {
      setLoading(true)
      try {
        const opportunityData = await fetchOpportunity(id as string)
        setOpportunity(opportunityData)
      } catch (error) {
        console.error("Error fetching opportunity:", error)
      } finally {
        setLoading(false)
      }
    }

    loadOpportunity()

  }, [])

  if (authState === "none") {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Please log in to view opportunities</h1>
        <p className="text-muted-foreground">You need to be logged in to access this page.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Loading opportunity...</h1>
      </div>
    )
  }

  if (!opportunity) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Opportunity not found</h1>
        <p className="text-muted-foreground">The opportunity you're looking for doesn't exist or has been removed.</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link href="/opportunities">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Opportunities
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <Button variant="outline" className="mb-6" asChild>
        <Link href="/opportunities">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Opportunities
        </Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{opportunity.title}</h1>
            <Badge variant={opportunity.type === "full-time" ? "default" : "secondary"} className="text-sm">
              {opportunity.type === "full-time" ? "full-time" : "Internship"}
            </Badge>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-muted-foreground whitespace-pre-line">{opportunity.description}</p>
            </CardContent>
          </Card>

          <Button size="lg" className="w-full md:w-auto bg-[#0C5640] text-white">
            Apply Now <ArrowRight />
          </Button>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Details</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Building className="h-5 w-5 mr-3 mt-0.5 text-[#46923D]" />
                  <div>
                    <h3 className="font-medium">Company</h3>
                    <p className="text-muted-foreground">{opportunity.posted_by}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Briefcase className="h-5 w-5 mr-3 mt-0.5 text-[#46923D]" />
                  <div>
                    <h3 className="font-medium">Job Type</h3>
                    <p className="text-muted-foreground">
                      {opportunity.type === "job" ? "Full-time Job" : "Internship"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 mr-3 mt-0.5 text-[#46923D]" />
                  <div>
                    <h3 className="font-medium">Compensation</h3>
                    <p className="text-muted-foreground">
                      {opportunity.is_paid ? opportunity.amount || "Paid (rate not specified)" : "Unpaid"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-3 mt-0.5 text-[#46923D]" />
                  <div>
                    <h3 className="font-medium">Posted Date</h3>
                    <p className="text-muted-foreground">{formatDate(opportunity.createdAt)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
