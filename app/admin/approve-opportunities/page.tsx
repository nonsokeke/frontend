"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useGlobalState } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Calendar, Building, CheckCircle, X } from "lucide-react"
import { formatDate } from "@/lib/utils"

export default function ApproveOpportunitiesPage() {
  const { authState, opportunities, pendingOpportunities, fetchPendingOpportunities, approveOpportunity, rejectOpportunity } = useGlobalState()
  const router = useRouter()

  useEffect(() => {
    fetchPendingOpportunities()
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
    await approveOpportunity(id)
  }

  const handleReject = async (id: string) => {
    await rejectOpportunity(id)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Approve Opportunities</h1>
          <p className="text-muted-foreground">Review and approve pending opportunities</p>
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="pending">Pending ({pendingOpportunities.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          {pendingOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {pendingOpportunities.map((opportunity) => (
                <Card key={opportunity._id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                        <CardDescription>Posted by: {opportunity.posted_by}</CardDescription>
                      </div>
                      <Badge variant={opportunity.type === "full-time" ? "default" : "secondary"}>
                        {opportunity.type === "full-time" ? "full-time" : "Internship"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="mb-4">{opportunity.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{opportunity.posted_by}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Posted: {formatDate(opportunity.createdAt)}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>
                          {opportunity.is_paid
                            ? `Paid ${opportunity.amount ? `- ${opportunity.amount}` : ""}`
                            : "Unpaid"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" size="sm" onClick={() => handleReject(opportunity._id)}>
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button size="sm" onClick={() => handleApprove(opportunity._id)}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">No pending opportunities</h2>
              <p className="text-muted-foreground">All opportunities have been reviewed</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="approved">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Approved Opportunities</h2>
            <p className="text-muted-foreground">
              {opportunities.filter((o) => o.approved).length} opportunities have been approved
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
