import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserCheck, Users, Crown } from "lucide-react"

const Participation = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Participation</h1>
        <p className="text-muted-foreground">Assign participants to programs and events</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Individual Participation
            </CardTitle>
            <CardDescription>
              Assign individual students to programs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Assign Student</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Group Participation
            </CardTitle>
            <CardDescription>
              Create groups for team-based events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Create Group</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5" />
              Team Participation
            </CardTitle>
            <CardDescription>
              Assign entire teams to competitions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Assign Team</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Participation
