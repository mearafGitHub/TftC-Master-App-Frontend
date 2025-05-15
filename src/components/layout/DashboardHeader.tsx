
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/theme/ThemeToggle";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  title?: string;
}

const DashboardHeader = ({ onMenuClick, title = "Dashboard" }: DashboardHeaderProps) => {
  const [user, setUser] = useState({ email: "" });

  useEffect(() => {
    const authData = localStorage.getItem("tftc-auth");
    if (authData) {
      try {
        const { user } = JSON.parse(authData);
        setUser(user);
      } catch (e) {
        console.error("Failed to parse auth data");
      }
    }
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 glass-effect">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <span className="hidden text-sm text-muted-foreground md:inline-block">
          {user.email}
        </span>
        <Avatar>
          <AvatarFallback>
            {user.email.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default DashboardHeader;
