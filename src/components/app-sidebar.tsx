import { useState } from "react"
import { 
  Home, 
  Users, 
  Trophy, 
  Calendar, 
  UserCheck, 
  BarChart3,
  Crown
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Teams", url: "/teams", icon: Crown },
  { title: "Students", url: "/students", icon: Users },
  { title: "Programs", url: "/programs", icon: Calendar },
  { title: "Participation", url: "/participation", icon: UserCheck },
  { title: "Results", url: "/results", icon: Trophy },
  { title: "Leaderboard", url: "/leaderboard", icon: BarChart3 },
]

export function AppSidebar() {
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Fest Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} end>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
