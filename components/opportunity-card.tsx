import Link from "next/link"
import type { Opportunity } from "@/lib/store"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, DollarSign } from "lucide-react"

interface OpportunityCardProps {
  opportunity: Opportunity
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <Link href={`/opportunities/${opportunity._id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">{opportunity.title}</h3>
            <Badge variant={opportunity.type === "full-time" ? "default" : "secondary"}>
              {opportunity.type === "full-time" ? "full-time" : "Internship"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Posted by: {opportunity.posted_by}</p>
          <p className="text-sm line-clamp-3 mb-4">{opportunity.description}</p>
        </CardContent>
        <CardFooter className="bg-muted/50 px-6 py-3">
          <div className="flex items-center text-sm">
            {opportunity.is_paid ? (
              <div className="flex items-center text-green-600">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>Paid {opportunity.amount && `- ${opportunity.amount}`}</span>
              </div>
            ) : (
              <div className="flex items-center text-muted-foreground">
                <Briefcase className="h-4 w-4 mr-1" />
                <span>Unpaid</span>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
