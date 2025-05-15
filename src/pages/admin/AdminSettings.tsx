
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const AdminSettings = () => {
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [siteTitle, setSiteTitle] = useState("Tools for the Commons");
  const { toast } = useToast();

  const handleSaveSettings = () => {
    // In a real app, you'd save these settings to a database
    toast({
      title: "Settings saved",
      description: "The system settings have been updated.",
    });
  };

  return (
    <DashboardLayout isAdmin title="Admin Settings">
      <div className="max-w-3xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
            <CardDescription>
              Configure global settings for the platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="siteTitle">Site Title</Label>
              <Input 
                id="siteTitle" 
                value={siteTitle} 
                onChange={(e) => setSiteTitle(e.target.value)} 
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="registration">Allow User Registration</Label>
                  <p className="text-sm text-muted-foreground">
                    Let new users create accounts on the platform
                  </p>
                </div>
                <Switch
                  id="registration"
                  checked={allowRegistration}
                  onCheckedChange={setAllowRegistration}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance" className="text-red-500">
                    Maintenance Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Put the site in maintenance mode (only admins can access)
                  </p>
                </div>
                <Switch
                  id="maintenance"
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                />
              </div>
            </div>
            
            <Button onClick={handleSaveSettings}>Save settings</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
