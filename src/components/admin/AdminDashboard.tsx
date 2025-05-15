
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, ExternalLink, Settings } from "lucide-react";

const statsItems = [
  {
    title: "Total Users",
    value: "245",
    icon: <Users className="h-5 w-5" />,
    description: "Active accounts",
  },
  {
    title: "Applications",
    value: "5",
    icon: <ExternalLink className="h-5 w-5" />,
    description: "Available tools",
  },
  {
    title: "Content Items",
    value: "24",
    icon: <FileText className="h-5 w-5" />,
    description: "Managed resources",
  },
  {
    title: "Settings",
    value: "12",
    icon: <Settings className="h-5 w-5" />,
    description: "Configuration options",
  },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Admin Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsItems.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                {item.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { user: "Admin", action: "Updated content settings", time: "2 hours ago" },
              { user: "System", action: "Maintenance completed", time: "5 hours ago" },
              { user: "Admin", action: "Added new application", time: "1 day ago" },
              { user: "System", action: "Backup completed", time: "2 days ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 border-b pb-4 last:border-0">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">
                    By {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
