
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import SidebarNav from "./SidebarNav";
import DashboardHeader from "./DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
  isAdmin?: boolean;
  title?: string;
}

const DashboardLayout = ({ children, isAdmin = false, title }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check authentication
  useEffect(() => {
    const authData = localStorage.getItem("tftc-auth");
    if (!authData) {
      navigate("/login");
      return;
    }
    
    try {
      const { isAuthenticated, user } = JSON.parse(authData);
      
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }

      // Check for admin access if required
      if (isAdmin && user.role !== "admin") {
        toast({
          title: "Access denied",
          description: "You don't have permission to access this page.",
          variant: "destructive"
        });
        navigate("/dashboard");
      }
    } catch (e) {
      localStorage.removeItem("tftc-auth");
      navigate("/login");
    }
  }, [isAdmin, navigate, toast]);
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("tftc-auth");
    toast({
      title: "Logged out successfully",
    });
    navigate("/login");
  };
  
  // Toggle sidebar on mobile
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-sidebar transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarNav isAdmin={isAdmin} onLogout={handleLogout} />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader onMenuClick={toggleSidebar} title={title} />
        
        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl animate-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
