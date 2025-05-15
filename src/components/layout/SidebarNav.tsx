
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BarChart, FileText, Home, LayoutDashboard, LogOut, Settings, Users } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
}

const NavItem = ({ icon: Icon, label, href, isActive }: NavItemProps) => (
  <a
    href={href}
    className={cn(
      "sidebar-item",
      isActive && "sidebar-item-active"
    )}
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </a>
);

interface SidebarNavProps {
  isAdmin?: boolean;
  onLogout: () => void;
}

const SidebarNav = ({ isAdmin = false, onLogout }: SidebarNavProps) => {
  const location = useLocation();
  
  const userNavItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
    },
  ];
  
  const adminNavItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/admin",
    },
    {
      icon: Users,
      label: "Users",
      href: "/admin/users",
    },
    {
      icon: FileText,
      label: "Content",
      href: "/admin/content",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/admin/settings",
    },
  ];
  
  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <div className="flex h-full flex-col">
      <div className="px-3 py-4">
        <div className="mb-8 px-3">
          <h2 className="text-lg font-bold text-sidebar-foreground">TftC</h2>
          <p className="text-xs text-sidebar-foreground/60">Tools for the Commons</p>
        </div>
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={location.pathname === item.href}
            />
          ))}
        </div>
      </div>
      <div className="mt-auto px-6 pb-6">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SidebarNav;
