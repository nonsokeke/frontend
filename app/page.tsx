import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">

      {/* News Cards Section */}
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <h2 className="text-center font-bold py-5 text-2xl">Latest</h2>
          <div className="grid gap-6 max-w-3xl mx-auto">
            {/* News Card 1 */}

            <div className="group rounded-lg border p-6 hover:bg-muted/50 transition-colors cursor-pointer">
              <h2 className="text-xl font-semibold mb-2 group-hover:text-primary">
                Computer Science club wins world championship!
              </h2>
              <p className="text-muted-foreground">
                Learn more about our CS club's incredible achievement...
              </p>
            </div>


            {/* News Card 2 */}
            <div className="group rounded-lg border p-6 hover:bg-muted/50 transition-colors cursor-pointer">
              <h2 className="text-xl font-semibold mb-2 group-hover:text-primary">
                New dorm built
              </h2>
              <p className="text-muted-foreground">
                Explore our newest residential facility...
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
