import { Calendar, Home, Trophy, Users, BookOpen, Target, BarChart3 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Teams",
    url: "/teams", 
    icon: Users,
  },
  {
    title: "Students",
    url: "/students",
    icon: Users,
  },
  {
    title: "Programs",
    url: "/programs",
    icon: BookOpen,
  },
  {
    title: "Participation",
    url: "/participation",
    icon: Target,
  },
  {
    title: "Results",
    url: "/results", 
    icon: Trophy,
  },
  {
    title: "Leaderboard",
    url: "/leaderboard",
    icon: BarChart3,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Fest Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-center text-sm text-muted-foreground">
          School Fest Management System
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
