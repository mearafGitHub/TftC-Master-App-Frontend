
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, LineChart, PieChart } from "recharts";
import { Bar, Line, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Sample data - in a real application, this would come from your backend
const userActivityData = [
  { name: 'Jan', active: 400, new: 240 },
  { name: 'Feb', active: 300, new: 139 },
  { name: 'Mar', active: 200, new: 980 },
  { name: 'Apr', active: 278, new: 390 },
  { name: 'May', active: 189, new: 480 },
  { name: 'Jun', active: 239, new: 380 },
  { name: 'Jul', active: 349, new: 430 },
];

const userDemographicsData = [
  { name: '18-24', value: 400 },
  { name: '25-34', value: 300 },
  { name: '35-44', value: 300 },
  { name: '45-54', value: 200 },
  { name: '55+', value: 100 },
];

const COLORS = ['#fc0d89', '#f65cca', '#7eb0d5', '#fd7f6f', '#bd7ebe'];

const UsersPage = () => {
  return (
    <DashboardLayout isAdmin title="User Statistics">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">User Statistics</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,641</div>
              <p className="text-xs text-muted-foreground">
                +180 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">
                +30% increase
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24m 32s</div>
              <p className="text-xs text-muted-foreground">
                +2m from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Retention Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78.5%</div>
              <p className="text-xs text-muted-foreground">
                +2.4% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer 
                config={{
                  active: { theme: { light: '#fc0d89', dark: '#fc0d89' } },
                  new: { theme: { light: '#f65cca', dark: '#f65cca' } },
                }}
                className="h-80 p-2"
              >
                <LineChart data={userActivityData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="active" 
                    name="Active Users" 
                    stroke="#fc0d89" 
                    strokeWidth={3} 
                    dot={{ r: 4 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="new" 
                    name="New Users" 
                    stroke="#f65cca" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    strokeDasharray="3 3"
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Age Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer 
                config={{
                  demographics: { theme: { light: '#fc0d89', dark: '#fc0d89' } },
                }}
                className="h-80 p-2"
              >
                <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <Pie
                    data={userDemographicsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {userDemographicsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} users`, 'Count']} />
                  <Legend />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Monthly Registration</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={{
                new: { theme: { light: '#a5f3b2', dark: '#a5f3b2' } },
              }}
              className="h-80 p-2"
            >
              <BarChart data={userActivityData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="new" 
                  name="New Registrations" 
                  fill="#a5f3b2" 
                  fillOpacity={0.8}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
