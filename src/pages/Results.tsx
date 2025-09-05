import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Calculator, List } from "lucide-react"

const Results = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Results</h1>
        <p className="text-muted-foreground">Enter and manage competition results</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Enter Results
            </CardTitle>
            <CardDescription>
              Record positions and grades for participants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Enter Result</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Calculate Points
            </CardTitle>
            <CardDescription>
              Auto-calculate points based on scoring rules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Calculate Points</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <List className="h-5 w-5" />
              View Results
            </CardTitle>
            <CardDescription>
              Browse all recorded results and scores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">View All Results</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Results
