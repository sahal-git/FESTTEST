import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, Medal, Award } from "lucide-react"

const Leaderboard = () => {
  const mockTeams = [
    { name: "Red Team", points: 150, position: 1 },
    { name: "Blue Team", points: 135, position: 2 },
    { name: "Green Team", points: 120, position: 3 },
    { name: "Yellow Team", points: 105, position: 4 },
  ]

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="h-5 w-5 flex items-center justify-center text-sm font-bold">{position}</span>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <p className="text-muted-foreground">Current standings and team rankings</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Team Rankings</CardTitle>
            <CardDescription>
              Live leaderboard based on all competition results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTeams.map((team) => (
                <div key={team.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getPositionIcon(team.position)}
                    <span className="font-semibold">{team.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{team.points} points</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Junior Category</CardTitle>
              <CardDescription>Rankings for junior participants</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Category-wise rankings coming soon...</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Senior Category</CardTitle>
              <CardDescription>Rankings for senior participants</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Category-wise rankings coming soon...</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Super Senior Category</CardTitle>
              <CardDescription>Rankings for super senior participants</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Category-wise rankings coming soon...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
