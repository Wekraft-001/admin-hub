import { LayoutDashboard, Users, BookOpen, Award, BarChart, FolderOpen } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';

const items = [
  { title: 'Dashboard', url: '/admin/dashboard', icon: LayoutDashboard },
  { title: 'Users', url: '/admin/users', icon: Users },
  { title: 'Modules', url: '/admin/modules', icon: BookOpen },
  { title: 'Certificates', url: '/admin/certificates', icon: Award },
  { title: 'Reports', url: '/admin/reports', icon: BarChart },
  { title: 'Media Library', url: '/admin/media', icon: FolderOpen },
];

export function AdminSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar className={open ? 'w-60' : 'w-14'} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Logo</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="hover:bg-muted/50"
                      activeClassName="bg-muted text-primary font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
