
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

const Settings = () => {
  const [email, setEmail] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [newTabsEnabled, setNewTabsEnabled] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const authData = localStorage.getItem("tftc-auth");
    if (authData) {
      try {
        const { user } = JSON.parse(authData);
        setEmail(user.email);
      } catch (e) {
        console.error("Failed to parse auth data");
      }
    }
  }, []);

  const handleSaveSettings = () => {
    // In a real app, you'd save these settings to a database
    localStorage.setItem("tftc-settings", JSON.stringify({
      notificationsEnabled,
      newTabsEnabled,
    }));

    toast({
      title: "Settings saved",
      description: "Your preferences have been updated.",
    });
  };

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-3xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>
              Manage your account information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" value={email} readOnly />
              <p className="text-sm text-muted-foreground">
                Your email is used for signing in and notifications
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about updates and activity
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="newTabs">Open applications in new tabs</Label>
                  <p className="text-sm text-muted-foreground">
                    Applications will open in a new browser tab
                  </p>
                </div>
                <Switch
                  id="newTabs"
                  checked={newTabsEnabled}
                  onCheckedChange={setNewTabsEnabled}
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

export default Settings;
