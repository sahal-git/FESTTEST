import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Trophy, Crown } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getTeamsCount } from "@/queries/teams"
import { getStudentsCount } from "@/queries/students"
import { getProgramsCount } from "@/queries/programs"
import { Skeleton } from "@/components/ui/skeleton"

const Index = () => {
  const { data: teamsCount, isLoading: isLoadingTeamsCount } = useQuery({
    queryKey: ["teamsCount"],
    queryFn: getTeamsCount,
  });

  const { data: studentsCount, isLoading: isLoadingStudentsCount } = useQuery({
    queryKey: ["studentsCount"],
    queryFn: getStudentsCount,
  });

  const { data: programsCount, isLoading: isLoadingProgramsCount } = useQuery({
    queryKey: ["programsCount"],
    queryFn: getProgramsCount,
  });

  const stats = [
    { title: "Total Teams", value: teamsCount, isLoading: isLoadingTeamsCount, icon: Crown, color: "text-blue-600" },
    { title: "Registered Students", value: studentsCount, isLoading: isLoadingStudentsCount, icon: Users, color: "text-green-600" },
    { title: "Total Programs", value: programsCount, isLoading: isLoadingProgramsCount, icon: Calendar, color: "text-purple-600" },
    { title: "Completed Events", value: "0", isLoading: false, icon: Trophy, color: "text-orange-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the Fest Management System</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              {stat.isLoading ? (
                <Skeleton className="h-7 w-12" />
              ) : (
                <div className="text-2xl font-bold">{stat.value}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>No recent activity.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Teams</CardTitle>
            <CardDescription>Current leaderboard snapshot</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
                <p>Leaderboard data is not yet available.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
