import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Trophy, Calendar, Target } from "lucide-react";

export function DashboardContent() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">
            Teams registered for the fest
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">
            Students participating
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Programs</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">
            Stage, Non-stage & Sports programs
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Participations</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">
            Total participation entries
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Welcome to Fest Management System</CardTitle>
          <CardDescription>
            Manage your school fest programs, teams, students, and track results all in one place.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <Users className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Manage Teams</h3>
              <p className="text-sm text-muted-foreground text-center">Create and organize student teams for the fest</p>
            </div>
            
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <Calendar className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Programs</h3>
              <p className="text-sm text-muted-foreground text-center">Set up stage, non-stage, and sports programs</p>
            </div>
            
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <Trophy className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Track Results</h3>
              <p className="text-sm text-muted-foreground text-center">Record results and maintain leaderboards</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
