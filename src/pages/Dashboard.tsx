
import DashboardLayout from "@/components/layout/DashboardLayout";
import ApplicationGrid from "@/components/dashboard/ApplicationGrid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  
  useEffect(() => {
    const authData = localStorage.getItem("tftc-auth");
    if (authData) {
      try {
        const { user } = JSON.parse(authData);
        setUserName(user.email.split('@')[0]);
      } catch (e) {
        console.error("Failed to parse auth data");
      }
    }
  }, []);

  return (
    <DashboardLayout title="Tftc Master Dashboard">
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Welcome, {userName}</CardTitle>
            <CardDescription>
              Access and launch the digital zones from this dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Click on any of the digital zones applications from the list to launch it in a new tab.
              Each application will open in its own window, allowing you to work seamlessly across multiple tools.
            </p>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Avaialble digital zones</h2>
          <ApplicationGrid />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
