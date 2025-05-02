"use client"

import { useEffect, useState } from "react"
import { useGlobalState } from "@/lib/store"
import OpportunityCard from "@/components/opportunity-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus } from "lucide-react"
import { type Opportunity } from "@/lib/types"

export default function OpportunitiesPage() {
  const { opportunities, fetchOpportunities, authState } = useGlobalState()
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [paidFilter, setPaidFilter] = useState("all")

  useEffect(() => {
    fetchOpportunities()
  }, [])

  // Filter opportunities based on search query and filters
  const filteredOpportunities = opportunities.filter((opportunity) => {
    const matchesSearch =
      opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.posted_by.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === "all" || opportunity.type === typeFilter
    const matchesPaid =
      paidFilter === "all" ||
      (paidFilter === "paid" && opportunity.is_paid) ||
      (paidFilter === "unpaid" && !opportunity.is_paid)

    return matchesSearch && matchesType && matchesPaid
  })

  if (authState === "none") {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Please log in to view opportunities</h1>
        <p className="text-muted-foreground">You need to be logged in to access this page.</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Opportunities</h1>
          <p className="text-muted-foreground">Find your next job or internship</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Post Opportunity
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search opportunities..."
            className="pl-8 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="full-time">Full Time</SelectItem>
            <SelectItem value="internship">Internships</SelectItem>
          </SelectContent>
        </Select>
        <Select value={paidFilter} onValueChange={setPaidFilter}>
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Payment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="paid">Paid Only</SelectItem>
            <SelectItem value="unpaid">Unpaid Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredOpportunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opportunity) => (
            <OpportunityCard key={opportunity._id} opportunity={opportunity} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No opportunities found</h2>
          <p className="text-muted-foreground">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  )
}
